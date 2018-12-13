import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalenderComponent} from './calender/calender.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {RulesComponent} from './rules/rules.component';
import {TrophyRoomComponent} from './trophy-room/trophy-room.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {MatchHistoryComponent} from './match-history/match-history.component';
import {TournamentComponent} from './tournament/tournament.component';
import {AdminTournamentComponent} from './admin-tournament/admin-tournament.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'calender', component: CalenderComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'trophy-room', component: TrophyRoomComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'match-history', component: MatchHistoryComponent},
  {path: 'tournament', component: TournamentComponent},
  {path: 'admin-tournament', component: AdminTournamentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

