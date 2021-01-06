import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyTesterComponent } from './dummy-tester.component';

describe('DummyTesterComponent', () => {
  let component: DummyTesterComponent;
  let fixture: ComponentFixture<DummyTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
