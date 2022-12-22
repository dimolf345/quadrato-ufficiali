import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { map, Observable, Subscription, take } from 'rxjs';
import { Account } from 'src/app/shared/models/account.model';
import { MovementsService } from '../../services/movements.service';
import { Movement } from '../../shared/models/movement.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentAccount: Account | undefined = undefined;
  accountSub: Subscription = new Subscription();
  movements: Observable<Movement[]> = new Observable();
  displayedColumns = ['data_pagamento'];

  constructor(
    private accountService: AccountService,
    private movementsService: MovementsService
  ) {}

  ngOnInit(): void {
    this.accountSub = this.accountService.account.subscribe(
      (x) => (this.currentAccount = x)
    );
    this.movements = this.movementsService.movements;
  }
}
