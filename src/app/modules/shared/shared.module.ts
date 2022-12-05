import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
