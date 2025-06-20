import { createReducer, on } from '@ngrx/store';
import * as SudokuActions from './sudoku.actions';
import { Board } from '../core/models/board.model';

export interface SudokuState {
    board: Board;
    originalBoard: Board;
    validationMessage: string | null;
  }
  
  export const initialState: SudokuState = {
    board: [],
    originalBoard: [],
    validationMessage: null,
  };
  
  export const sudokuReducer = createReducer(
    initialState,
    on(SudokuActions.loadBoardSuccess, (state, { board }) => ({
        ...state,
        board: board.map(row => [...row]),
        originalBoard: board.map(row => [...row]),
      })),
    on(SudokuActions.updateCell, (state, { row, col, value }) => {
      const newBoard = state.board.map(r => [...r]);
      newBoard[row][col] = value;
      return { ...state, board: newBoard };
    }),
    on(SudokuActions.setSolution, (state, { board }) => ({
      ...state,
      board: board.map(row => [...row]),
    })),
    on(SudokuActions.validationSuccess, (state, { message }) => ({
        ...state,
        validationMessage: message,
      })),
      
      on(SudokuActions.validationFailed, (state, { message }) => ({
        ...state,
        validationMessage: message,
      })),
    
  );