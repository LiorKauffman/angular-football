import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from "./components/matches/matches.component";
import {MatchDetailsComponent} from "./components/match-details/match-details.component";
import { myBetsComponents } from './components/myBets/myBets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':competitionName', component: MatchesComponent},
  { path: ':competitionName/:matchId', component: MatchDetailsComponent},
  {path:':competitionName/:matchId/:matchId',component:myBetsComponents}
];
const routes2: Routes = [
  { path: 'bets', component: myBetsComponents },

  //{path:'/myBets',component:myBetsComponents},
];


@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes2)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
