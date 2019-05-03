import { BrowserModule } from '@angular/platform-browser';
import { EnvServiceProvider } from './env.service.provider';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchEvalComponent } from './search-eval/search-eval.component';
import { CreateEvalComponent } from './create-eval/create-eval.component';
import { UpdateEvalComponent } from './update-eval/update-eval.component';
import { CreateEvalBasedOnComponent } from './create-eval-based-on/create-eval-based-on.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderServiceService } from './services/loader-service.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Material Angular Import*/
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

/*ngx-charts*/
import { NgxChartsModule } from '@swimlane/ngx-charts';

/*Owl Date Time Picker*/
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    SearchEvalComponent,
    CreateEvalComponent,
    UpdateEvalComponent,
    CreateEvalBasedOnComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [EnvServiceProvider, LoaderServiceService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
