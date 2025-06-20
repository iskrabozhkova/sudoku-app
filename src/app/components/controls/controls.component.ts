import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadBoard, solveBoard, validateBoard } from 'src/app/store/sudoku.actions';
import { selectValidationMessage } from 'src/app/store/sudoku.selectors';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  difficulties = ['easy', 'medium', 'hard', 'random'];
  selectedDifficulty = 'easy';
  // validationMessage$ = this.store.select(selectValidationMessage);

  constructor(private store: Store, private router: Router) {}

  startGame() {
    // this.store.dispatch(loadBoard({ difficulty: this.selectedDifficulty }));
    this.store.dispatch(loadBoard({ difficulty: this.selectedDifficulty }));
    this.router.navigate(['/board']);
  }

  solve() {
    this.store.dispatch(solveBoard());
  }

  validate() {
    this.store.dispatch(validateBoard());
  }
}
