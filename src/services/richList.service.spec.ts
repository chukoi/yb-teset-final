/**
 * richList.service.spec.ts
 * Unit tests.
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Imports.
import {TestBed, inject} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {RichListService} from './richList.service';

describe('RichListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RichListService]
    });
  });
  describe('getData()', () => {
    it('should have property of celebrityList',
      inject([RichListService], (richListService) => {
        richListService.getData().subscribe((richList) => {
          expect(richList.hasOwnProperty('celebrityList')).toBeTruthy();
        });
      }));
    it('should have celebrityList as an array',
      inject([RichListService], (richListService) => {
        richListService.getData().subscribe((richList) => {
          expect(Array.isArray(richList['celebrityList'])).toBeTruthy();
        });
      }));
    it('should have celebrityList as not empty',
      inject([RichListService], (richListService) => {
        richListService.getData().subscribe((richList) => {
          expect(richList['celebrityList'].length > 0).toBeTruthy();
        });
      }));
  });
});
