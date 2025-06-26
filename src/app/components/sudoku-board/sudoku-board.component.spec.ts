import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SudokuBoardComponent } from './sudoku-board.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectBoard, selectOriginalBoard, selectValidationMessage } from 'src/app/store/sudoku.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SudokuBoardComponent', () => {
  let component: SudokuBoardComponent;
  let fixture: ComponentFixture<SudokuBoardComponent>;

  const mockBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
  const mockValidationMessage = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SudokuBoardComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectBoard, value: mockBoard },
            { selector: selectOriginalBoard, value: mockBoard },
            { selector: selectValidationMessage, value: mockValidationMessage }
          ]
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SudokuBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 81 cells (9x9)', () => {
    const inputs = fixture.debugElement.queryAll(By.css('.sudoku-cell'));
    expect(inputs.length).toBe(81);
  });

  it('should render all inputs as editable if original board has only zeros', () => {
    const inputs = fixture.debugElement.queryAll(By.css('.sudoku-cell'));
    inputs.forEach(input => {
      const el = input.nativeElement as HTMLInputElement;
      expect(el.readOnly).toBeFalse();
      expect(el.value).toBe('');
    });
  });

  it('should render Validate and Solve buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const buttonTexts = buttons.map(btn => btn.nativeElement.textContent.trim());
    expect(buttonTexts).toContain('Validate');
    expect(buttonTexts).toContain('Solve');
  });
});
