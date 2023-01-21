import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovementsService } from 'src/app/services/movements.service';
import { CATEGORIES } from 'src/app/shared/models/movement.model';
import { Officer } from 'src/app/shared/models/officer.model';
import {
  OfficerState,
  getAvailableOfficers,
} from 'src/app/store/officers/officers.reducers';
import { UIState, getIsLoading } from 'src/app/store/ui/ui.reducers';

@Component({
  selector: 'app-movementform',
  templateUrl: './movementform.component.html',
  styleUrls: ['./movementform.component.scss'],
})
export class MovementformComponent implements OnInit {
  movementForm: FormGroup = new FormGroup({});
  categories = CATEGORIES;
  maxDate = new Date();
  officers: Observable<Officer[] | any> = new Observable();
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private officerStore: Store<{ officers: OfficerState }>,
    private uiStore: Store<{ ui: UIState }>,
    private movements: MovementsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setMovementForm();
    this.officers = this.officerStore.select(getAvailableOfficers);
    this.isLoading$ = this.uiStore.select((state) => state.ui.isLoading);
  }

  setMovementForm() {
    this.movementForm = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      data_pagamento: new FormControl<Date | null>(null, [Validators.required]),
      descrizione: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      effettuato_da: new FormControl('', [Validators.required]),
      importo: new FormControl(0.0, [
        Validators.min(0),
        Validators.max(500),
        Validators.required,
      ]),
      note: new FormControl('', [Validators.minLength(10)]),
    });
  }

  onSubmit() {
    this.movements.addMovement(this.movementForm.value);
    this.onCloseDialog();
  }

  onCloseDialog() {
    this.dialog.getDialogById('new-movement')?.close();
  }
}
