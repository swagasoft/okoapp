import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadPage } from './admin-upload.page';

describe('AdminUploadPage', () => {
  let component: AdminUploadPage;
  let fixture: ComponentFixture<AdminUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
