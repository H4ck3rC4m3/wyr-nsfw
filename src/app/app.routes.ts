import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'game', component: GameComponent }
];