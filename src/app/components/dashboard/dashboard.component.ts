import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Observable, Subscription } from 'rxjs';
import { Account } from 'src/app/shared/models/account.model';
import { MovementsService } from '../../services/movements.service';
import { Movement } from '../../shared/models/movement.model';
import { Store } from '@ngrx/store';
import { getIsAdmin } from 'src/app/store/officers/officers.reducers';
import { MatDialog } from '@angular/material/dialog';
import { MovementformComponent } from '../forms/movementform/movementform.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isAdmin: any = false;
  currentAccount: Account | undefined = undefined;
  accountSub: Subscription = new Subscription();
  movements: Observable<Movement[] | any> = new Observable();
  displayedColumns = [
    'data_pagamento',
    'descrizione',
    'importo',
    'effettuato_da',
  ];

  constructor(
    private accountService: AccountService,
    private movementsService: MovementsService,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.movementsService.fetchMovements();
  }

  ngOnInit(): void {
    this.accountSub = this.accountService.account.subscribe(
      (x) => (this.currentAccount = x)
    );
    this.movements = this.movementsService.movements;
    this.store.select(getIsAdmin).subscribe((x) => (this.isAdmin = x));
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
  }

  onClick() {
    this.dialog.open(MovementformComponent, {
      maxWidth: '98vw',
      minWidth: '40vw',
      id: 'new-movement',
    });
  }
}
