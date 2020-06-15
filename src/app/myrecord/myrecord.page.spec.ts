import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrecordPage } from './myrecord.page';

describe('MyrecordPage', () => {
  let component: MyrecordPage;
  let fixture: ComponentFixture<MyrecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
