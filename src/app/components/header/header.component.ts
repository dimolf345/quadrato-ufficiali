import { Component, OnInit } from '@angular/core';
import { IUser } from '../../store/user/users.reducers';
import { Store, State } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/modules/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  userSub: Subscription;

  constructor(private store: Store<{ user: IUser }>) {
    this.userSub = this.store
      .select('user')
      .subscribe((x) => (this.currentUser = x.currentUser));
  }

  ngOnInit(): void {}
}
