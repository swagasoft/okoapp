import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysectionPage } from './playsection.page';

describe('PlaysectionPage', () => {
  let component: PlaysectionPage;
  let fixture: ComponentFixture<PlaysectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaysectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaysectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
