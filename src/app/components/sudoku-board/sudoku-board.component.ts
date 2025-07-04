import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import {
  clearValidationMessage,
  resetBoard,
  solveBoard,
  updateCell,
  validateBoard,
} from 'src/app/store/sudoku.actions';
import {
  selectBoard,
  selectOriginalBoard,
  selectValidationMessage,
} from 'src/app/store/sudoku.selectors';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss'],
})
export class SudokuBoardComponent {
  board$ = this.store.select(selectBoard);
  originalBoard$ = this.store.select(selectOriginalBoard);
  validationMessage$ = this.store.select(selectValidationMessage);
  inputErrorMessage$ = new BehaviorSubject<string | null>(null);
  highlightedNumber: number | null = null;
  selectedRow: number | null = null;
  selectedCol: number | null = null;

  combinedValidationMessage$ = combineLatest([
    this.inputErrorMessage$,
    this.validationMessage$,
  ]).pipe(map(([inputError, validation]) => inputError || validation));

  combinedValidationType$ = this.inputErrorMessage$.pipe(
    map((inputError) => (inputError ? 'danger' : 'info'))
  );

  constructor(private store: Store, private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  solve() {
    this.inputErrorMessage$.next(null);
    this.store.dispatch(solveBoard());
  }

  validate() {
    this.inputErrorMessage$.next(null);
    this.store.dispatch(validateBoard());
  }

  reset() {
    this.inputErrorMessage$.next(null);
    this.store.dispatch(clearValidationMessage());
    this.store.dispatch(resetBoard());
    this.highlightedNumber = null;
  }

  onCellChange(row: number, col: number, event: any, original: number[][]) {
    const value = parseInt(event.target.value, 10);
    this.inputErrorMessage$.next(null);

    if (value >= 1 && value <= 9) {
      if (original[row][col] === 0) {
        this.store.dispatch(updateCell({ row, col, value }));
        this.selectedRow = null;
        this.selectedCol = null;
      }
    } else {
      this.inputErrorMessage$.next('Only digits 1-9 are allowed.');
      event.target.value = '';
    }
  }

  onCellClick(row: number, col: number, original: number[][]): void {
    if (original[row][col] === 0) {
      this.selectedRow = row;
      this.selectedCol = col;
    }
  }

  getCellClasses(
    row: number,
    col: number,
    value: number,
    original: number[][]
  ): string[] {
    const classes = [
      original[row][col] !== 0 ? 'original-cell' : 'editable-cell',
      (row + 1) % 3 === 0 && row !== 8 ? 'border-bottom-bold' : '',
      (col + 1) % 3 === 0 && col !== 8 ? 'border-right-bold' : '',
    ];

    if (this.selectedRow !== null && this.selectedCol !== null) {
      const inSameRow = row === this.selectedRow;
      const inSameCol = col === this.selectedCol;
      const inSameBox =
        Math.floor(row / 3) === Math.floor(this.selectedRow / 3) &&
        Math.floor(col / 3) === Math.floor(this.selectedCol / 3);

      if (inSameRow || inSameCol || inSameBox) {
        classes.push('highlight-cell');
      }
    }

    return classes;
  }
}
