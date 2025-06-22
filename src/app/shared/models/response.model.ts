import { Board, Difficulty } from './board.model';

export interface BoardResponse {
  board: Board;
}

export interface SolveResponse {
  difficulty: Difficulty;
  solution: Board;
  status: 'solved' | 'broken' | 'unsolvable';
}

export interface ValidateResponse {
  status: 'solved' | 'broken';
}