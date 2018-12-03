import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalenderComponent} from './calender/calender.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'calender', component: CalenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
