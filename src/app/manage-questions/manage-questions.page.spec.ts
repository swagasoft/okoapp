import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionsPage } from './manage-questions.page';

describe('ManageQuestionsPage', () => {
  let component: ManageQuestionsPage;
  let fixture: ComponentFixture<ManageQuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQuestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
