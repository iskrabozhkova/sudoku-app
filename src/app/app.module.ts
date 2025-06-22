import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './pages/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sudokuReducer } from './store/sudoku.reducer';
import { SudokuEffects } from './store/sudoku.effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    HeaderComponent,
    ValidationMessageComponent,
    SudokuBoardComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ sudoku: sudokuReducer }),
    EffectsModule.forRoot([SudokuEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
