import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
} from 'rxjs/operators';
import { SearchModel } from '../models/search.model';
import { SearchService } from '../services/search.service';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';

const states = [
  'China',
  'Indonesia',
  'Country Name',
  'Country Name',
  'Country Name',
  'Country Name',
  'Country Name',
  'Country Name',
  'Country Name',
  'Country Name',
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  faPlaneDeparture = faPlaneDeparture;
  faPlaneArrival = faPlaneArrival;
  faClock = faClock;
  faCalendarWeek = faCalendarWeek;
  faSortAmountDown = faSortAmountDown;
  faSortAmountUp = faSortAmountUp;
  faShip = faShip;
  faPlane = faPlane;
  faShippingFast = faShippingFast;

  pickupDate: NgbDateStruct;
  originCountry: any;
  destinationCountry: any;
  searchForm: FormGroup;
  pageNumber = 0;
  search: SearchModel;
  splash: boolean = true;
  loading: boolean = false;
  total: number = 0;
  lastResultPage: boolean;
  @Input('resultData')
  searchResult: SearchModel[];

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadSearchForm();
  }

  save() {
    this.splash = false;
    if (this.searchForm.invalid) {
      alert('Nice one, Your form is not valid');
      this.splash = true;
    } else {
      this.loading = true;
      this.search = this.searchForm.value;
      if (this.search.sea == '') {
        this.search.sea = 'false';
      }
      if (this.search.air == '') {
        this.search.air = 'false';
      }
      if (this.search.land == '') {
        this.search.land = 'false';
      }

      this.pageNumber = 0;
      this.searchService
        .searchForResult(this.search, this.pageNumber)
        .pipe(
          catchError((err) => {
            throw 'error in source. Details: ' + err;
          }),
          finalize(() => { this.loading = false; }) // Execute when the observable completes
        )
        .subscribe(
          (res) => {
            (this.searchResult = res.freights), (this.total = res.total);
          },
          (err) => {
            alert('Server Down, please try again later');
            this.splash = true;
          }
        );
    }
  }

  loadMore() {
    this.pageNumber += 1;
    this.searchService
      .searchForResult(this.search, this.pageNumber)
      .pipe(
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (res) => {
          (this.searchResult = [...this.searchResult, ...res.freights]),
            this.searchResult.length == this.total
              ? (this.lastResultPage = true)
              : (this.lastResultPage = false);
        },
        (err) => {
          alert('Server Down, please try again later');
          this.splash = true;
        }
      );
  }

  loadSearchForm() {
    this.searchForm = this.fb.group({
      sea: ['', null],
      air: ['', null],
      land: ['', null],
      originCountry: ['', Validators.compose([Validators.required])],
      destinationCountry: ['', Validators.compose([Validators.required])],
      pickupDate: ['', Validators.compose([Validators.required])],
    });
  }
  

  searchOriginCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : states
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  searchDestinationCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : states
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  notValidControl(validation, controlName): boolean {
    const control = this.searchForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
