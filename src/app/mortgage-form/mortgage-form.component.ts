import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ImortgageDetail,
  PAYMENT_FREQUENCY,
} from 'src/app/models/mortgage-model';

@Component({
  selector: 'app-mortgage-form',
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.css'],
})
export class MortgageFormComponent implements OnInit {
  //Passing data from child to parent
  @Output() mortageDetails: EventEmitter<ImortgageDetail> =
    new EventEmitter<ImortgageDetail>();

  paymentPlanForm: FormGroup;
  mortgageResult: any = {};
  amortizationYear: number[] = [];
  amortizationMonth: number[] = [];
  paymentFrequnecy: any[] = [];
  prePaymentAmt: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.paymentPlanForm = new FormGroup({
      mortgageAmount: new FormControl('100000.00', Validators.required),
      interstRate: new FormControl('5', Validators.required),
      amortizationPeriodYear: new FormControl('25', Validators.required),
      amortizationPeriodMonth: new FormControl(''),
      paymentFrequency: new FormControl('M', Validators.required),
    });

    //Drop-down option values
    this.amortizationYear = Array.from({ length: 30 }, (v, i) => i + 1);
    this.amortizationMonth = Array.from({ length: 11 }, (v, i) => i + 1);
    this.paymentFrequnecy = PAYMENT_FREQUENCY;
  }

  onSubmit = () => {
    //Mortgagr Calculation with M=P[i(1+i)^n]/[(1+i)^n-1]

    let selectedPaymentFrequency = PAYMENT_FREQUENCY.find(
      (item) => item.id === this.paymentPlanForm.get('paymentFrequency')?.value
    );

    let numberOfPaymentTerms =
      this.paymentPlanForm.get('amortizationPeriodYear')?.value *
        selectedPaymentFrequency!.numb +
      this.paymentPlanForm.get('amortizationPeriodMonth')?.value;
    let principlePayment = +this.paymentPlanForm.get('mortgageAmount')?.value;
    let monthlyInterestRatio =
      this.paymentPlanForm.get('interstRate')?.value / 1200;

    let mortgagePayment = +(
      (principlePayment *
        monthlyInterestRatio *
        Math.pow(1 + monthlyInterestRatio, numberOfPaymentTerms)) /
      (Math.pow(1 + monthlyInterestRatio, numberOfPaymentTerms) - 1)
    ).toFixed(2);

    let totalCost = +(numberOfPaymentTerms * mortgagePayment).toFixed(2);
    let interestPayment = +(totalCost - principlePayment).toFixed(2);
    let paymentFrequency = selectedPaymentFrequency!.text;

    this.mortgageResult = {
      ...this.paymentPlanForm.value,
      paymentFrequency,
      numberOfPaymentTerms,
      mortgagePayment,
      interestPayment,
      totalCost,
    };

    //Emitting the calculated values in obj to the parent
    this.mortageDetails.emit(this.mortgageResult);
  };

  //Validating the FormControls
  validateInput = (inputName: string): any => {
    if (inputName === 'mortgageAmount') {
      if (
        this.paymentPlanForm.get('mortgageAmount')?.invalid ||
        this.paymentPlanForm.get('mortgageAmount')?.value <= 0
      )
        return true;
      else return false;
    }
    if (inputName === 'interstRate') {
      if (
        this.paymentPlanForm.get('interstRate')?.invalid ||
        this.paymentPlanForm.get('interstRate')?.value <= 0 ||
        this.paymentPlanForm.get('interstRate')?.value > 100
      )
        return true;
      else return false;
    }
  };
}
