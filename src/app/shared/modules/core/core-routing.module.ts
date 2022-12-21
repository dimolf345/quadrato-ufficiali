import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { PaymentsComponent } from 'src/app/components/payments/payments.component';
import { OfficerspageComponent } from '../../../components/officerspage/officerspage.component';
import { ProfileComponent } from '../../../components/profile/profile.component';
import { AccountComponent } from '../../../components/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'officers',
    component: OfficerspageComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
