import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AccountService } from '../../../services/account.service';

import { OfficerNamePipe } from 'src/app/pipes/officer-name.pipe';
import { MovementformComponent } from '../../../components/forms/movementform/movementform.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [DashboardComponent, OfficerNamePipe, MovementformComponent],
  imports: [CommonModule, SharedModule, CoreRoutingModule, MaterialModule],
  exports: [MaterialModule],
  providers: [AccountService],
})
export class CoreModule {}
