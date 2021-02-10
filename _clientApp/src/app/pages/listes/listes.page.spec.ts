import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListesPage } from './listes.page';

describe('ListesPage', () => {
  let component: ListesPage;
  let fixture: ComponentFixture<ListesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
