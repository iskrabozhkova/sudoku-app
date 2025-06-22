import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Store } from '@ngrx/store';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SudokuBoardComponent } from '../../components/sudoku-board/sudoku-board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, HeaderComponent, SudokuBoardComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => {},   
            dispatch: () => {}, 
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
