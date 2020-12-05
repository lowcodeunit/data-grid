import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-json-display',
  templateUrl: './json-display.component.html',
  styleUrls: ['./json-display.component.scss']
})
export class JsonDisplayComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('datasource')
  public DataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
