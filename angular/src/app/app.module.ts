import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { WebWorkerService } from './services/web-worker.service';


@NgModule({
  declarations: [
    AppComponent,
    MyGridApplicationComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([MyGridApplicationComponent]
    )
  ],
  providers: [WebWorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
