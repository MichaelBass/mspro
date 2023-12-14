import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ACService } from './ac.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { FinishComponent } from './finish/finish.component';
import { ReportComponent } from './report/report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AssessmentComponent,
    DashboardComponent,
    FinishComponent,
    ReportComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule
  ],
  providers: [ACService],
  bootstrap: [AppComponent]
})
export class AppModule { }
