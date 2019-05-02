import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalenderComponent} from './calender/calender.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule, MatSelectModule, MatInputModule, MatTableModule, MatExpansionModule, MatRadioModule
} from '@angular/material';
import {MainNavComponent} from './shared/main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './welcome/welcome.component';
import {RulesComponent} from './rules/rules.component';
import {TrophyRoomComponent} from './trophy-room/trophy-room.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatchHistoryComponent} from './match-history/match-history.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';
import { TournamentComponent } from './tournament/tournament.component';
import { AdminLeaderboardComponent } from './admin-leaderboard/admin-leaderboard.component';
import { AdminTournamentsComponent } from './admin-tournaments/admin-tournaments.component';
import { TeamsComponent } from './teams/teams.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    MainNavComponent,
    WelcomeComponent,
    RulesComponent,
    TrophyRoomComponent,
    LeaderboardComponent,
    MatchHistoryComponent,
    TournamentComponent,
    AdminLeaderboardComponent,
    AdminTournamentsComponent,
    TeamsComponent,
    QueueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    ReactiveFormsModule,
    ScrollingModule,
    SlideshowModule,
    MatRadioModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
