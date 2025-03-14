import { Routes } from '@angular/router';
import {WindowComponent} from './components/window/window.component';
import {ProfileComponent} from './components/profile/profile.component';

export const routes: Routes = [
  {path: '', component: WindowComponent},
  {path:'profile', component: ProfileComponent}
];
