import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { MortgageCalcComponent } from './mortgage-calc/mortgage-calc.component';
import { MortgageDetailComponent } from './mortgage-detail/mortgage-detail.component';
import { MortgageFormComponent } from './mortgage-form/mortgage-form.component';
import { MortgageAmortizationTableComponent } from './mortgage-amortization-table/mortgage-amortization-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MortgageCalcComponent,
    MortgageDetailComponent,
    MortgageFormComponent,
    MortgageAmortizationTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
