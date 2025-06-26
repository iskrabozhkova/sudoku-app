import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BoardComponent } from './board.component';

@Component({
  selector: 'app-sudoku-board',
  template: ''
})
class SudokuBoardStubComponent {}

@Component({
  selector: 'app-timer',
  template: ''
})
class TimerStubComponent {} 

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let storeMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeMock.select.and.returnValue(of(false));

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    activatedRouteMock = {
      queryParams: of({ difficulty: 'hard' })
    };

    await TestBed.configureTestingModule({
      declarations: [BoardComponent, SudokuBoardStubComponent, TimerStubComponent], 
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set difficulty from query params on init', () => {
    expect(component.difficulty).toBe('hard');
  });

  it('should navigate back to home on goBack()', () => {
    component.goBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
