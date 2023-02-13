import { Component, OnInit } from '@angular/core';
import { ImortgageDetail } from 'src/app/models/mortgage-model';

@Component({
  selector: 'app-mortgage-calc',
  templateUrl: './mortgage-calc.component.html',
  styleUrls: ['./mortgage-calc.component.css'],
})
export class MortgageCalcComponent implements OnInit {
  mortgageDetails!: ImortgageDetail;
  isDetailAvailable: boolean;

  ngOnInit(): void {
    this.isDetailAvailable = false;
  }

  getMortageDetails = (obj: any) => {
    this.isDetailAvailable = true;
    this.mortgageDetails = { ...obj };
  };
}
