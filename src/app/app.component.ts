/**
 * app.component.ts
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Imports.
import {Component, OnInit} from '@angular/core';
import {RichListService} from '../services/richList.service';
import {_} from 'underscore'; // Use Lodash next time. Wanted to reminisce on the old school days: )
import camelize from '../helpers/camelize';
import arrayRemove from '../helpers/arrayRemove';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RichListService],
})
export class AppComponent implements OnInit {
  pageTitleH1: string; // Main title.
  pageTitleH2: string; // Secondary title.
  description: string; // Page description.
  referenceLink: string; // Reference link.
  dollarValues: object; // Object to hold information about the different currencies.
  celebrityList: Array<object>; // Main list of richest celebrities.
  celebrityClone: Array<object>; // Clone of  main list.
  countries: Array<string>; // Birth place options.
  currencies: Array<string>; // Currency options.
  orders: Array<string>; // Order options.
  birthClause: string; // Selected birth place.
  currencyClause: string; // Selected currency.
  searchClause: string; // Current search string.
  orderClause: string; // Select order by.
  currencyPrefix = '$USD'; // Initial currency prefix.

  /**
   * constructor
   * Inject richList service to retrieve data.
   *
   * @param {RichList} richListService
   * @return {void}
   */
  constructor(private richListService: RichListService) {
  }

  /**
   * Initialise component
   *
   * @return {void}
   */
  ngOnInit() {
    // Retrive the data for the page.
    this.richListService.getData().subscribe(data => {
      // Initialise all the data.
      this.initData(data);
      this.initClauses();
      this.setCountryOptions();
      this.setCurrentcyOtions();
      this.setOrderOptions();
    });
  }

  /**
   * Initialize all the current field values.
   *
   * @return {void}
   */
  private initClauses() {
    this.birthClause = 'Show All';
    this.currencyClause = 'US Dollar';
    this.searchClause = '';
    this.orderClause = 'Rank';
  }

  /**
   * Initialize page data.
   *
   * @param {object} data The json data for the page.
   * @return {void}
   */
  private initData(data) {
    // Map data to models. We skip the dollar value keys as we build a custom object for them.
    for (const key in data) {
      if (data.hasOwnProperty(key) && !key.includes('Value')) {
        this[key] = data[key];
      }
    }
    // We create a new key to hold the converted currency as we don't want to mutate the original.
    this.celebrityList.map(function (value) {
      value['netWorthConvert'] = value['netWorth'];
      return value;
    });
    // We clone the celebrity list so we don't mutate it as filters are applied.
    this.celebrityClone = Object.assign([], this.celebrityList);
    // Set information about the different currencies. Including rate and prefix.
    // TODO: Build this dynamically based on key having "Dollar"?
    this.dollarValues = {
      usDollar: {
        value: data.usDollarValue,
        prefix: '$USD'
      },
      australianDollar: {
        value: data.australianDollarValue,
        prefix: '$AUD'
      },
      euro: {
        value: data.euroValue,
        prefix: '$EUR'
      }
    };
  }

  /**
   * Set birth place select options.
   *
   * @return {void}
   */
  private setCountryOptions() {
    // Dynamically set countries from celebrity list values. Ideally we should pull this data from a service.
    this.countries = _.chain(this.celebrityList).map(function (item) {
      return item.country;
    }).uniq().value().sort(function (a, b) {
      // Sort birth place list alphabetically to make it easier for the user to navigate.
      if (a < b) {
        return 1;
      }
      if (b < a) {
        return -1;
      }
      return 0;
    }).reverse();
    // Add option to unset filter.
    this.countries.unshift('Show All');
  }

  /**
   * Set currency select options.
   *
   * @return {void}
   */
  private setCurrentcyOtions() {
    // Get currency options from the dollarValues keys.
    const currencies = _.map(this.dollarValues, function (value, key) {
      return key.replace(/([A-Z])/g, function ($1) {
        return ' ' + $1;
      });
    });
    this.currencies = currencies.map(function (value) {
      let string;
      // When we build the options they first letter is not capitalized. Fix that.
      if (value === 'us Dollar') {
        // Hack to fix Us to US.
        string = value.charAt(0).toUpperCase() + value.charAt(1).toUpperCase() + value.substr(2);
      } else {
        string = value.charAt(0).toUpperCase() + value.substr(1);
      }
      // Remove "Value" from the option.
      return string.replace('Value', '');
    });
    // We don't wan't the "Net Worth Convert" to be an options.
    delete this.currencies['netWorthConvert'];
  }

  /**
   * Set order by select options.
   *
   * @return {void}
   */
  private setOrderOptions() {
    // Dynamically built order options from keys in celebrity list. Bit hacky here because celebrity list might be empty.
    const orders = _.map(this.celebrityList[0], function (num, key) {
      return key.replace(/([A-Z])/g, function ($1) {
        return ' ' + $1;
      });
    });
    // Uppercase the first letter.
    this.orders = orders.map(function (value) {
      return value.charAt(0).toUpperCase() + value.substr(1);
    });
    // Remove the order options we don't want. In the instructions you only want "Rank", "Name", and "Age".
    // Why not the other options? Obviously we don't want "Net Worth convert.
    const remove = ['Net Worth', 'Country', 'Net Worth Convert'];
    for (let i = 0; i < remove.length; i++) {
      this.orders = arrayRemove(this.orders, remove[i]);
    }
  }

  /**
   * Convert currency based on current selection.
   *
   * @return {void}
   */
  public currencyAction() {
    // Build a key from the selection.
    const key = camelize(this.currencyClause);
    // Find the currency prefix based on the key.
    this.currencyPrefix = this.dollarValues[key].prefix;
    // Set the conversion value. We do this outside otherwise I would have to bind the scope. Just easier.
    const conversion = this.dollarValues[key].value;
    this.celebrityList.map(function (value) {
      // Convert Net Worth to currently selected option.
      value['netWorthConvert'] = value['netWorth'] * conversion;
      return value;
    });
  }

  /**
   * Order celebrity list based on current order by.
   *
   * @return {void}
   */
  public orderAction() {
    // TODO: This should have an option to sort ASC or DESC. Currently it only does ASC. Maybe on re-select it will change sort order
    // Build a key from the selection.
    const key = camelize(this.orderClause);
    // Order the list based on the current order by option.
    this.celebrityClone = _.sortBy(this.celebrityClone, function (obj) {
      return obj[key];
    });
  }

  /**
   * Filter celebrity list.
   *
   * @return {void}
   */
  public filter() {
    // If "Show All" is selected obviously we don't want to use that value.
    let birthClause = this.birthClause;
    if (this.birthClause === 'Show All') {
      birthClause = '';
    }
    // Get the search clause here. Otherwise I would have to bind the scope. Just easier
    const searchClause = this.searchClause;
    this.celebrityClone = _.filter(this.celebrityList, function (obj) {
      // Filter by "Name", "Net Worth", "Age", and "Birthplace" but also include the selected birthplace option.
      return (
        obj.name.toLowerCase().includes(searchClause.toLowerCase()) ||
        obj.netWorthConvert.toLocaleString().toLowerCase().includes(searchClause.toLowerCase()) ||
        obj.age.toLowerCase().includes(searchClause.toLowerCase()) ||
        obj.country.toLowerCase().includes(searchClause.toLowerCase())
      ) && obj.country.includes(birthClause);
    });
  }
}
