import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalenderComponent} from './calender/calender.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {RulesComponent} from './rules/rules.component';
import {TrophyRoomComponent} from './trophy-room/trophy-room.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'calender', component: CalenderComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'trophy-room', component: TrophyRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

