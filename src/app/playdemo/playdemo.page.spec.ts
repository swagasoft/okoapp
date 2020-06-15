import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaydemoPage } from './playdemo.page';

describe('PlaydemoPage', () => {
  let component: PlaydemoPage;
  let fixture: ComponentFixture<PlaydemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaydemoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaydemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
