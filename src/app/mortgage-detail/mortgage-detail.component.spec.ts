import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageDetailComponent } from './mortgage-detail.component';

describe('MortgageDetailComponent', () => {
  let component: MortgageDetailComponent;
  let fixture: ComponentFixture<MortgageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
