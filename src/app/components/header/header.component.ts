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
export class HeaderComponent implements OnInit {
  currentOfficer$: Observable<Officer | null> = new Observable();
  officerSub: Subscription = new Subscription();

  constructor(
    private store: Store<{ officers: OfficerState }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentOfficer$ = this.store.select((s) => s.officers.currentOfficer);
  }

  onLogout() {
    this.authService.logout();
  }
}
