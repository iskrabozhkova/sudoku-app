import { Component } from '@angular/core';
import { selectBoard, selectOriginalBoard } from 'src/app/store/sudoku.selectors';
import { loadBoard, updateCell } from 'src/app/store/sudoku.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  board$ = this.store.select(selectBoard);
  originalBoard$ = this.store.select(selectOriginalBoard);

  constructor(private store: Store) {}

  onCellChange(row: number, col: number, event: any, original: number[][]) {
    const value = parseInt(event.target.value, 10) || 0;
    if (original[row][col] === 0) {
      this.store.dispatch(updateCell({ row, col, value }));
    }
  }
}
