import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [CommonModule, CoreRoutingModule, MaterialModule],
  exports: [MaterialModule],
})
export class CoreModule {}
