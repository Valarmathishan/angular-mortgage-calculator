import { Component, Input, OnInit } from '@angular/core';
import {
  ImortgageDetail,
  IamortizationDetail,
  AMORTIZATION_TABLE_COLUMN,
  AMORTIZATION_TABLE_HEADER,
} from 'src/app/models/mortgage-model';

@Component({
  selector: 'app-mortgage-amortization-table',
  templateUrl: './mortgage-amortization-table.component.html',
  styleUrls: ['./mortgage-amortization-table.component.css']
})
export class MortgageAmortizationTableComponent implements OnInit{
  //Getting data from parent
  @Input() mortgageDetails: ImortgageDetail;

  //Amortization Table Calculation Variables
  principalAmount: number;
  mortgagePayment: number;
  interestRate: number;
  count: number;
  numberOfPayments: number;
  amortizationData: IamortizationDetail[] = [];
  lastMonthPayment: number;
  lastMonthInterest: number;

  //ag-grid variables
  paginationPageSize = 10;
  rowData: any[] = [];
  colDefs: any[] = [];

  ngOnInit() {
     AMORTIZATION_TABLE_COLUMN.forEach((item, index) => {
       this.colDefs.push({'field': item, headerName:AMORTIZATION_TABLE_HEADER[index]});
     })
  }

  ngOnChanges() {
    //On change of form data
    this.amortizationData = [];
    this.updateMortagageDetail();
  }

  updateMortagageDetail() {
    if(this.mortgageDetails) {
      this.count = 1;
      this.principalAmount = this.mortgageDetails.mortgageAmount;
      this.mortgagePayment = this.mortgageDetails.mortgagePayment;
      this.interestRate = this.mortgageDetails.interstRate/1200;
      this.numberOfPayments = +this.mortgageDetails.numberOfPaymentTerms;
      this.calculateAmortizationData();
    }
  }

  calculateAmortizationData() {
    let currentMonthData:IamortizationDetail  = {};
    currentMonthData.pOutstanding = +(this.principalAmount);
    currentMonthData.pniPayment = this.count === this.numberOfPayments? this.lastMonthPayment :this.mortgagePayment;
    currentMonthData.principal = +(this.mortgagePayment - (this.principalAmount * this.interestRate)).toFixed(2);
    currentMonthData.interest = +(this.count === this.numberOfPayments? this.lastMonthInterest : (this.mortgagePayment - currentMonthData.principal)).toFixed(2);
    currentMonthData.npOutstanding = +(this.principalAmount - currentMonthData.principal).toFixed(2);
    currentMonthData.id = this.count;
    this.principalAmount = currentMonthData.npOutstanding;
    this.count++;
    this.amortizationData.push(currentMonthData);
    if(this.count <= this.numberOfPayments) {
      if(this.count === this.numberOfPayments) {
        this.lastMonthInterest = this.principalAmount * this.interestRate;
        this.lastMonthPayment = +(currentMonthData.npOutstanding + this.lastMonthInterest).toFixed(2);
      }
      this.calculateAmortizationData();
    } else {
      //Update the calculated amortixation data to the table row
      this.rowData = this.amortizationData;
    }
  }
}
