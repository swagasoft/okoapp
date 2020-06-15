import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutRequestPage } from './cashout-request.page';

describe('CashoutRequestPage', () => {
  let component: CashoutRequestPage;
  let fixture: ComponentFixture<CashoutRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashoutRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
