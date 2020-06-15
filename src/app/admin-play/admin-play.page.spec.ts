import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayPage } from './admin-play.page';

describe('AdminPlayPage', () => {
  let component: AdminPlayPage;
  let fixture: ComponentFixture<AdminPlayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
