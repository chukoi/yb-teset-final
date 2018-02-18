/**
 * app.component.spec.ts
 * Unit tests.
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Imports.
import {TestBed, async, inject} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {CurrencyConvertPipe} from '../pipes/currencyConvert..pipe';
import {RichListService} from '../services/richList.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CurrencyConvertPipe
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        BrowserModule
      ],
      providers: [RichListService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    inject([RichListService], (richListService) => {
      richListService.getData().subscribe((richList) => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const app = fixture.debugElement.nativeElement;
        expect(app.querySelector('h1').textContent).toContain('Technical Test');
      });
    });

  }));
  it('should have the right select currency options', async(() => {
    inject([RichListService], (richListService) => {
      richListService.getData().subscribe((richList) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        expect(expect(app.currencies).toEqual([
          'US Dollar', 'Australian Dollar', 'Euro'
        ]));
      });
    });
  }));
});
