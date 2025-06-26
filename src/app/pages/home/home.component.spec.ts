import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router'; // Add ActivatedRoute
import { By } from '@angular/platform-browser';
import { loadBoard } from 'src/app/store/sudoku.actions';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute; // Declare ActivatedRoute mock

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {} as any; 
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute } 
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
});