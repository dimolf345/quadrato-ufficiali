import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, map, pipe, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UIState } from 'src/app/store/ui/ui.reducers';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { OfficerState } from '../../store/officers/officers.reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean> = new Observable();
  userSub: Subscription = new Subscription();
  errorMsg: string | null = null;

  constructor(
    private store: Store<{ ui: UIState; officers: OfficerState }>,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.loading$ = this.store
      .select('ui')
      .pipe(map((state: UIState) => state.isLoading));
  }

  ngOnInit(): void {
    // this.userSub = this.store.select('user').subscribe((user) => {
    //   if (user.currentUser?.id) this.router.navigate(['', 'dashboard']);
    //   else return;
    // });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  async onSubmit(form: NgForm) {
    this.errorMsg = null;
    const { email, password } = form.value;
    form.resetForm();
    const error = await this.AuthService.login(email, password);
    if (error) {
      this.errorMsg = error;
      return;
    }
    this.router.navigate(['', 'dashboard']);
  }
}
