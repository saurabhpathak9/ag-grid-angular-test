import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from "ag-grid-angular/main";
import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
