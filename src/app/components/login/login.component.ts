import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, map, pipe, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoadingService],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean> = new Observable();
  userSub: Subscription = new Subscription();
  errorMsg: string | null = null;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // this.userSub = this.store.select('user').subscribe((user) => {
    //   if (user.currentUser?.id) this.router.navigate(['', 'dashboard']);
    //   else return;
    // });
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  async onSubmit(form: NgForm) {
    this.errorMsg = null;
    const { email, password } = form.value;
    form.resetForm();
    this.loadingService.startLoading();
    try {
      const error = await this.AuthService.login(email, password);
      if (error) throw new Error(error);
    } catch (error) {
      if (error instanceof Error) this.errorMsg = error.message;
      return;
    } finally {
      this.loadingService.stopLoading();
      this.router.navigate(['', 'dashboard']);
    }
  }
}
