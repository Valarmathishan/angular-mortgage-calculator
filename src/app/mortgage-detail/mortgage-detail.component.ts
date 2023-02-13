import { Component, OnInit, Input } from '@angular/core';
import { ImortgageDetail } from 'src/app/models/mortgage-model';

@Component({
  selector: 'app-mortgage-detail',
  templateUrl: './mortgage-detail.component.html',
  styleUrls: ['./mortgage-detail.component.css'],
})
export class MortgageDetailComponent implements OnInit {
  showTable: boolean;
  //Getting data from parent
  @Input() mortgageDetails: ImortgageDetail;

  ngOnInit(): void {
    this.showTable = false;
  }

  checkViewChartStatus(event: any) {
    this.showTable = event.target.checked ? true : false;
  }
}
