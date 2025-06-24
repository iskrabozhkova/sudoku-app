import { createReducer, on } from '@ngrx/store';
import * as SudokuActions from './sudoku.actions';
import { Board } from '../shared/models/board.model';

export interface SudokuState {
  board: Board;
  originalBoard: Board;
  validationMessage: string | null;
  difficulty: string | null;
}

export const initialState: SudokuState = {
  board: [],
  originalBoard: [],
  validationMessage: null,
  difficulty: null
};

export const sudokuReducer = createReducer(
  initialState,
  on(SudokuActions.loadBoard, (state, { difficulty }) => ({
    ...state,
    difficulty
  })),
  on(SudokuActions.loadBoardSuccess, (state, { board }) => ({
    ...state,
    board: board.map((row) => [...row]),
    originalBoard: board.map((row) => [...row]),
  })),
  on(SudokuActions.updateCell, (state, { row, col, value }) => {
    const newBoard = state.board.map((row) => [...row]);
    newBoard[row][col] = value;
    return { ...state, board: newBoard };
  }),
  on(SudokuActions.setSolution, (state, { board }) => ({
    ...state,
    board: board.map((row) => [...row]),
  })),
  on(SudokuActions.validationSuccess, (state, { message }) => ({
    ...state,
    validationMessage: message,
  })),
  on(SudokuActions.validationFailed, (state, { message }) => ({
    ...state,
    validationMessage: message,
  })),
  on(SudokuActions.resetBoard, (state) => {
    const resetBoard = state.originalBoard.map((row, rowIndex) =>
      row.map((cell, colIndex) => cell)
    );
  
    return {
      ...state,
      board: resetBoard
    };
  }),
  on(SudokuActions.clearValidationMessage, (state) => ({
    ...state,
    validationMessage: null
  })),
);
