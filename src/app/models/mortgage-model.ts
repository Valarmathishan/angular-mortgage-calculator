export interface ImortgageDetail {
  mortgageAmount: number;
  interstRate: number;
  amortizationPeriodYear: number;
  amortizationPeriodMonth: number;
  paymentFrequency: string;
  numberOfPaymentTerms: number;
  mortgagePayment: number;
  interestPayment: number;
  totalCost: number;
}

export interface IamortizationDetail {
   id?: number;
   pOutstanding?: number;
   pniPayment?: number;
   interest?: number;
   principal?: number;
   npOutstanding?:number;
}

export const PAYMENT_FREQUENCY = [
  { id: 'SM', value: 'semi-monthly (24x per year)', text: 'Semi-monthly', numb: 24 },
  { id: 'M', value: 'Monthly (12x per year)', text: 'Monthly', numb: 12 },
];

export const AMORTIZATION_TABLE_HEADER = [
  'Payment', 'Principal Outstanding', 'Principal & Interest Payment' ,'Interest', 'Principal', 'New Principal Outstanding'
];


export const AMORTIZATION_TABLE_COLUMN = [
  'id', 'pOutstanding', 'pniPayment' ,'interest', 'principal', 'npOutstanding'
];


