import { Component, OnInit } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from 'src/app/store/ui/ui.actions';
import { UIState } from 'src/app/store/ui/ui.reducers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<{ ui: UIState }>,
    private AuthService: AuthService
  ) {
    this.loading$ = this.store
      .select('ui')
      .pipe(map((state: UIState) => state.isLoading));
  }

  ngOnInit(): void {}

  onSubmit() {
    this.AuthService.login();
  }
}
