import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfficerState } from '../../store/officers/officers.reducers';
import { Store, State } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Officer } from '../../shared/models/officer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentOfficer: Officer | null = null;
  officerSub: Subscription = new Subscription();

  constructor(
    private store: Store<{ officers: OfficerState }>,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.officerSub = this.store
      .select('officers')
      .pipe(
        map((state) => {
          console.log(state);
          return state.currentOfficer;
        })
      )
      .subscribe((x) => {
        console.log(x);
        this.currentOfficer = x;
      });
  }

  ngOnDestroy(): void {}

  onLogout() {
    this.auth.logout();
  }
}
