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
import { StoreModule } from '@ngrx/store';
import * as fromTestStore from '../../../modules/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CoreRoutingModule, MaterialModule],
  exports: [MaterialModule],
  providers: [AccountService],
})
export class CoreModule {}
