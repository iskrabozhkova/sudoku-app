import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { ControlsComponent } from './components/controls/controls.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sudokuReducer } from './store/sudoku.reducer';
import { SudokuEffects } from './store/sudoku.effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    ControlsComponent,
    HeaderComponent
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
