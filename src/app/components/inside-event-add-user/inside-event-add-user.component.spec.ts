import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideEventAddUserComponent } from './inside-event-add-user.component';

describe('InsideEventAddUserComponent', () => {
  let component: InsideEventAddUserComponent;
  let fixture: ComponentFixture<InsideEventAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideEventAddUserComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideEventAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
