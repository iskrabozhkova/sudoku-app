import { createAction, props } from '@ngrx/store';
import { Board } from '../shared/models/board.model';

export const loadBoard = createAction('[Sudoku] Load Board', props<{ difficulty: string }>());
export const loadBoardSuccess = createAction('[Sudoku] Load Board Success', props<{ board: Board }>());
export const updateCell = createAction('[Sudoku] Update Cell', props<{ row: number; col: number; value: number }>());
export const validateBoard = createAction('[Sudoku] Validate');
export const solveBoard = createAction('[Sudoku] Solve');
export const setSolution = createAction('[Sudoku] Set Solution', props<{ board: Board }>());

export const validationSuccess = createAction(
    '[Sudoku] Validation Success',
    props<{ message: string }>()
  );
  
  export const validationFailed = createAction(
    '[Sudoku] Validation Failed',
    props<{ message: string }>()
  );
