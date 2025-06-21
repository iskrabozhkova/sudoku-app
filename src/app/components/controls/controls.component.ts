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
  loading : boolean = false;

  constructor(private store: Store, private router: Router) {}

  startGame(difficulty: string) {
    this.loading = true;
    this.store.dispatch(loadBoard({ difficulty }));

    setTimeout(() => {
      this.router.navigate(['/board']);
      this.loading = false;
    }, 1000);
  }


  getButtonClass(diff: string): string {
    switch(diff.toLowerCase()) {
      case 'easy': return '#a0d8d8'; 
      case 'medium': return '#5fbdbd';
      case 'hard': return '#2a8c8c';  
      default: return '#a0d8d8';
  }
}

  solve() {
    this.store.dispatch(solveBoard());
  }

  validate() {
    this.store.dispatch(validateBoard());
  }
}
