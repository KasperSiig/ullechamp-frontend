import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalenderComponent} from './calender/calender.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {RulesComponent} from './rules/rules.component';
import {TrophyRoomComponent} from './trophy-room/trophy-room.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {MatchHistoryComponent} from './match-history/match-history.component';
import {TournamentComponent} from './tournament/tournament.component';
import {AdminLeaderboardComponent} from './admin-leaderboard/admin-leaderboard.component';
import {AdminTournamentsComponent} from './admin-tournaments/admin-tournaments.component';
import {AdminGuard} from './shared/guards/admin.guard';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'calender', component: CalenderComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'trophy-room', component: TrophyRoomComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'match-history', component: MatchHistoryComponent},
  {path: 'tournament', component: TournamentComponent, canActivate: [AuthGuard]},
  {path: 'admin-leaderboard/:id', component: AdminLeaderboardComponent, canActivate: [AdminGuard]},
  {path: 'admin-tournaments', component: AdminTournamentsComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

