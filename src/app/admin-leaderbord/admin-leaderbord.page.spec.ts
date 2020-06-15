import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaderbordPage } from './admin-leaderbord.page';

describe('AdminLeaderbordPage', () => {
  let component: AdminLeaderbordPage;
  let fixture: ComponentFixture<AdminLeaderbordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLeaderbordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeaderbordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
