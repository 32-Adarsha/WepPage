import { Routes } from '@angular/router';
import {WindowComponent} from './components/window/window.component';
import {ProfileComponent} from './components/profile/profile.component';
import {TetrisComponent} from './components/tetris/tetris.component';
import {TickTackToeComponent} from './components/tick-tack-toe/tick-tack-toe.component';
import {BigCertificateComponent} from './components/big-certificate/big-certificate.component';
export const routes: Routes = [
  {path: '', component: WindowComponent},
  {path:'profile', component: ProfileComponent},
  {path:'tetris', component: TetrisComponent},
  {path:'tictactoe', component: TickTackToeComponent},
  {path:'certificate', component: BigCertificateComponent}
];
