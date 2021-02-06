import { Component, Input, OnInit } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  faPlaneDeparture = faPlaneDeparture;
  faPlaneArrival = faPlaneArrival;
  faClock = faClock;
  faCalendarWeek = faCalendarWeek;
  faSortAmountDown = faSortAmountDown;
  faSortAmountUp = faSortAmountUp;
  faShip = faShip;
  faPlane = faPlane;
  faShippingFast = faShippingFast;

  
  @Input()
  searchResult: SearchModel[];

  @Input()
  total: number;

  @Input()
  loading: boolean;

  constructor() {}

  ngOnInit(): void {}
}
