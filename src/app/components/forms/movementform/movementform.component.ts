import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CATEGORIES } from 'src/app/shared/models/movement.model';
import { Officer } from 'src/app/shared/models/officer.model';
import {
  OfficerState,
  getAvailableOfficers,
} from 'src/app/store/officers/officers.reducers';

@Component({
  selector: 'app-movementform',
  templateUrl: './movementform.component.html',
  styleUrls: ['./movementform.component.scss'],
})
export class MovementformComponent implements OnInit {
  movementForm: any;
  categories = CATEGORIES;
  maxDate = new Date();
  officers: Observable<Officer[] | any> = new Observable();

  constructor(private store: Store<{ officers: OfficerState }>) {}

  ngOnInit(): void {
    this.setMovementForm();
    this.officers = this.store.select(getAvailableOfficers);
  }

  setMovementForm() {
    this.movementForm = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      data_pagamento: new FormControl<Date | null>(null, [Validators.required]),
      descrizione: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      effettuato_da: new FormControl('', [
        Validators.required,
        Validators.min(20),
        Validators.max(20),
      ]),
      importo: new FormControl(0.0, [Validators.min(0), Validators.max(500)]),
      note: new FormControl('', [Validators.minLength(10)]),
    });
  }
}
