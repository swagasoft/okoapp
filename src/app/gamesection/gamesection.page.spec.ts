import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamesectionPage } from './gamesection.page';

describe('GamesectionPage', () => {
  let component: GamesectionPage;
  let fixture: ComponentFixture<GamesectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamesectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
