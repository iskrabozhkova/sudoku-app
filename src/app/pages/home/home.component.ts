import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Difficulty } from 'src/app/shared/models/board.model';
import { loadBoard, solveBoard, validateBoard } from 'src/app/store/sudoku.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'random'];
  selectedDifficulty: Difficulty = 'easy';
  loading: boolean = false;

  constructor(private store: Store, private router: Router) {}

  startGame(difficulty: string) {
    this.loading = true;
    this.store.dispatch(loadBoard({ difficulty }));

    setTimeout(() => {
      this.router.navigate(['/board'], {
        queryParams: { difficulty }
      });
      this.loading = false;
    }, 1000);
  }

  solve() {
    this.store.dispatch(solveBoard());
  }

  validate() {
    this.store.dispatch(validateBoard());
  }

  getButtonClass(diff: string): string {
    switch (diff.toLowerCase()) {
      case 'easy':
        return '#a0d8d8';
      case 'medium':
        return '#5fbdbd';
      case 'hard':
        return '#2a8c8c';
      default:
        return '#a0d8d8';
    }
  }
}
