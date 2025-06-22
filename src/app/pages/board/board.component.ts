import { Component } from '@angular/core';
import { selectBoard, selectOriginalBoard, selectValidationMessage } from 'src/app/store/sudoku.selectors';
import { loadBoard, solveBoard, updateCell, validateBoard } from 'src/app/store/sudoku.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  board$ = this.store.select(selectBoard);
  originalBoard$ = this.store.select(selectOriginalBoard);
  validationMessage$ = this.store.select(selectValidationMessage);
  inputErrorMessage$ = new BehaviorSubject<string | null>(null);
  highlightedNumber: number | null = null;
  
  combinedValidationMessage$ = combineLatest([
    this.inputErrorMessage$,
    this.validationMessage$
  ]).pipe(
    map(([inputError, validation]) => inputError || validation)
  );

  combinedValidationType$ = this.inputErrorMessage$.pipe(
    map(inputError => inputError ? 'danger' : 'info')
  );

  constructor(private store: Store, private router : Router) {}

  onCellChange(row: number, col: number, event: any, original: number[][]) {
    const value = parseInt(event.target.value, 10);

    this.inputErrorMessage$.next(null);
    if ((value >= 1 && value <= 9)) {
      if (original[row][col] === 0) {
        this.store.dispatch(updateCell({ row, col, value: isNaN(value) ? 0 : value }));
        this.highlightedNumber = value > 0 ? value : null;
      }
    } else {
      this.inputErrorMessage$.next('Only digits 1-9 are allowed.');
      event.target.value = '';
    }
  }
  
  

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

  getCellClasses(row: number, col: number, value: number, original: number[][]): string[] {
    return [
      original[row][col] !== 0 ? 'original-cell' : 'editable-cell',
      (row + 1) % 3 === 0 && row !== 8 ? 'border-bottom-bold' : '',
      (col + 1) % 3 === 0 && col !== 8 ? 'border-right-bold' : '',
      value === this.highlightedNumber ? 'highlight-cell' : ''
    ];
  }
}
