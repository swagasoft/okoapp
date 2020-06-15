import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintransferPage } from './admintransfer.page';

describe('AdmintransferPage', () => {
  let component: AdmintransferPage;
  let fixture: ComponentFixture<AdmintransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintransferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
