import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SudokuService } from './sudoku.service';
import { Difficulty } from '../models/board.model';
import { SolveResponse, ValidateResponse, BoardResponse } from '../models/response.model';

describe('SudokuService', () => {
  let service: SudokuService;
  let httpMock: HttpTestingController;

  const mockBoard = Array(9).fill(0).map(() => Array(9).fill(0));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SudokuService]
    });

    service = TestBed.inject(SudokuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a board', () => {
    const mockResponse: BoardResponse = {
      board: mockBoard
    };

    service.getBoard('easy').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://sugoku.onrender.com/board?difficulty=easy');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should solve the board', () => {
    const mockResponse: SolveResponse = {
      solution: mockBoard,
      status: 'solved',
      difficulty: 'easy'
    };

    service.solveBoard(mockBoard).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://sugoku.onrender.com/solve');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.has('board')).toBeTrue();
    req.flush(mockResponse);
  });

  it('should validate the board', () => {
    const mockResponse: ValidateResponse = {
      status: 'solved'
    };

    service.validateBoard(mockBoard).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://sugoku.onrender.com/validate');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.has('board')).toBeTrue();
    req.flush(mockResponse);
  });
});
