import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutsPage } from './payouts.page';

describe('PayoutsPage', () => {
  let component: PayoutsPage;
  let fixture: ComponentFixture<PayoutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
