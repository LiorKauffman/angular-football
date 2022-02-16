import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import {Web3Service} from './services/Web3Service.service';
import { FormsModule } from '@angular/forms';
import { ConnectorService} from './services/connector.service';
import {myBetsComponents} from './components/myBets/myBets.component';
//import {NotificationService } from './services/notification.service';
//import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchesComponent,
    MatchDetailsComponent,
    BreadcrumbComponent,
    SpinnerComponent,
    myBetsComponents
   // SpinnerComponent,
  // CdkTableBasicExample
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
   
  //  MatTableModule
  ],
  providers: [Web3Service,ConnectorService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
