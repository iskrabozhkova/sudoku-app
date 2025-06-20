import { Component } from '@angular/core';
import { selectBoard, selectOriginalBoard, selectValidationMessage } from 'src/app/store/sudoku.selectors';
import { loadBoard, solveBoard, updateCell, validateBoard } from 'src/app/store/sudoku.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  board$ = this.store.select(selectBoard);
  originalBoard$ = this.store.select(selectOriginalBoard);
  validationMessage$ = this.store.select(selectValidationMessage);

  constructor(private store: Store, private router : Router) {}

  onCellChange(row: number, col: number, event: any, original: number[][]) {
    const value = parseInt(event.target.value, 10) || 0;
    if (original[row][col] === 0) {
      this.store.dispatch(updateCell({ row, col, value }));
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
  
  solve() {
    this.store.dispatch(solveBoard());
  }

  validate() {
    this.store.dispatch(validateBoard());
  }
}
