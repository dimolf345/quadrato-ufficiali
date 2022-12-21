import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AccountService } from '../../../services/account.service';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CoreRoutingModule, MaterialModule],
  exports: [MaterialModule],
  providers: [AccountService],
})
export class CoreModule {}
