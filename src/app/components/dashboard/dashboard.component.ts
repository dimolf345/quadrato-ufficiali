import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { map, Subscription, take } from 'rxjs';
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

  constructor(
    private accountService: AccountService,
    private movementsService: MovementsService
  ) {}

  ngOnInit(): void {
    this.accountSub = this.accountService.account.subscribe(
      (x) => (this.currentAccount = x)
    );
    this.movementsService.movements
      .pipe(
        take(1),
        map((el) => {})
      )
      .subscribe();
  }
}
