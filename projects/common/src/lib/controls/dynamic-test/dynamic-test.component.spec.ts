import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTestComponent } from './dynamic-test.component';

describe('DynamicTestComponent', () => {
  let component: DynamicTestComponent;
  let fixture: ComponentFixture<DynamicTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
