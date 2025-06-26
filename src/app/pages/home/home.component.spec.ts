import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { loadBoard, solveBoard, validateBoard } from 'src/app/store/sudoku.actions';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignore unknown elements like <app-spinner>
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four difficulty options', () => {
    expect(component.difficulties.length).toBe(4);
    expect(component.difficulties).toEqual(['easy', 'medium', 'hard', 'random']);
  });

  it('should set loading to true and dispatch loadBoard action when startGame is called', () => {
    component.loading = false;
    component.startGame('medium');

    expect(component.loading).toBeTrue();
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadBoard({ difficulty: 'medium' }));
  });
});
