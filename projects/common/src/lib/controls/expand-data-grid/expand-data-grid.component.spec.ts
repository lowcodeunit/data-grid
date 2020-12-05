import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandDataGridComponent } from './expand-data-grid.component';

describe('ExpandDataGridComponent', () => {
  let component: ExpandDataGridComponent;
  let fixture: ComponentFixture<ExpandDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
