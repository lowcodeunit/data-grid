import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-dummy-tester',
  templateUrl: './dummy-tester.component.html',
  styleUrls: ['./dummy-tester.component.scss']
})
export class DummyTesterComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('datasource')
  public DataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
