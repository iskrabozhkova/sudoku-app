import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { loadBoard } from 'src/app/store/sudoku.actions';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display 4 difficulty buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.difficulty-btn'));
    expect(buttons.length).toBe(4);
    const buttonTexts = buttons.map(b => b.nativeElement.textContent.trim().toLowerCase());
    expect(buttonTexts).toEqual(['easy', 'medium', 'hard', 'random']);
  });

  it('should dispatch loadBoard and navigate when startGame is called', fakeAsync(() => {
    component.startGame('medium');

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadBoard({ difficulty: 'medium' }));
    expect(component.loading).toBeTrue();

    tick(1000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/board']);
    expect(component.loading).toBeFalse();
  }));
});
