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

  constructor(private store: Store, private router : Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }
}
