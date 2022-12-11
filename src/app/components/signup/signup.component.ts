import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  canRegister: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  async verifyEmail(emailInput: HTMLInputElement) {
    const result = await this.auth.verifyEmail(emailInput.value);
    console.log(result);
  }
}
