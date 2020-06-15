import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoplayPage } from './howtoplay.page';

describe('HowtoplayPage', () => {
  let component: HowtoplayPage;
  let fixture: ComponentFixture<HowtoplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
