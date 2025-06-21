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
  highlightedNumber: number | null = null;

  constructor(private store: Store, private router : Router) {}

  onCellChange(row: number, col: number, event: any, original: number[][]) {
    const value = parseInt(event.target.value, 10) || 0;
  
    // Only allow editing if the cell was not originally filled
    if (original[row][col] === 0) {
      this.store.dispatch(updateCell({ row, col, value }));
  
      // Set the highlighted number if value is 1 (or any specific rule)
      this.highlightedNumber = value > 0 ? value : null;
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
