import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SudokuActions from './sudoku.actions';
import { SudokuService } from '../shared/services/sudoku.service';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SudokuState } from './sudoku.reducer';
import { of, catchError } from 'rxjs';

@Injectable()
export class SudokuEffects {
  constructor(
    private actions$: Actions,
    private sudokuService: SudokuService,
    private store: Store<{ sudoku: SudokuState }>
  ) {}

  loadBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuActions.loadBoard),
      mergeMap(({ difficulty }) =>
        this.sudokuService
          .getBoard(difficulty as any)
          .pipe(
            map((res) => SudokuActions.loadBoardSuccess({ board: res.board }))
          )
      )
    )
  );

  solveBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuActions.solveBoard),
      withLatestFrom(this.store.select((state) => state.sudoku.board)),
      mergeMap(([_, board]) =>
        this.sudokuService.solveBoard(board).pipe(
          map((res) => {
            if (res.status === 'unsolvable') {
              return SudokuActions.validationFailed({
                message: 'Board is unsolvable.',
              });
            } else {
              return SudokuActions.setSolution({ board: res.solution });
            }
          })
        )
      )
    )
  );

  validateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuActions.validateBoard),
      withLatestFrom(this.store.select((state) => state.sudoku.board)),
      mergeMap(([_, board]) =>
        this.sudokuService.validateBoard(board).pipe(
          map((res) => {
            if (res.status === 'solved') {
              return SudokuActions.validationSuccess({
                message: ' Sudoku solved successfully!',
              });
            } else {
              return SudokuActions.validationFailed({
                message: ' The board is incorrect or incomplete.',
              });
            }
          }),
          catchError(() =>
            of(
              SudokuActions.validationFailed({
                message: ' Validation failed due to server error.',
              })
            )
          )
        )
      )
    )
  );
}
