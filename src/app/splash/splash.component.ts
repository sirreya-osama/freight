import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  @Input()
  loading: boolean;

  @Input()
  splash: boolean;

  constructor() {}

  ngOnInit(): void {}
}
