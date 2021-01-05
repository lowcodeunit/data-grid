import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoGridDataComponent } from './no-grid-data.component';

describe('NoGridDataComponent', () => {
  let component: NoGridDataComponent;
  let fixture: ComponentFixture<NoGridDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoGridDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoGridDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
