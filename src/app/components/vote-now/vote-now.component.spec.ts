import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteNowComponent } from './vote-now.component';

describe('VoteNowComponent', () => {
  let component: VoteNowComponent;
  let fixture: ComponentFixture<VoteNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteNowComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
