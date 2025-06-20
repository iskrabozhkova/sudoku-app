import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoardResponse, SolveResponse, ValidateResponse } from '../models/response.model';
import { Board, Difficulty } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  private baseUrl = 'https://sugoku.onrender.com';

  constructor(private http: HttpClient) {}

  getBoard(difficulty: Difficulty) {
    return this.http.get<BoardResponse>(`${this.baseUrl}/board?difficulty=${difficulty}`);
  }

  solveBoard(board: Board) {
    return this.http.post<SolveResponse>(`${this.baseUrl}/solve`, this.encodeBoard(board));
  }

  validateBoard(board: Board) {
    return this.http.post<ValidateResponse>(`${this.baseUrl}/validate`, this.encodeBoard(board));
  }

  private encodeBoard(board: Board) {
    const form = new FormData();
    form.append('board', JSON.stringify(board));
    return form;
  }
}
