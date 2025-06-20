import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SudokuState } from './sudoku.reducer';

export const selectSudoku = createFeatureSelector<SudokuState>('sudoku');

export const selectBoard = createSelector(selectSudoku, (state) => state.board);
export const selectOriginalBoard = createSelector(selectSudoku, (state) => state.originalBoard);
export const selectValidationMessage = createSelector(
    selectSudoku,
    (state: SudokuState) => state.validationMessage
  );
