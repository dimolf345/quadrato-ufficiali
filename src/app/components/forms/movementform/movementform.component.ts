import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movementform',
  templateUrl: './movementform.component.html',
  styleUrls: ['./movementform.component.scss'],
})
export class MovementformComponent implements OnInit {
  movementForm: FormGroup | null = null;

  constructor() {}

  ngOnInit(): void {}

  setMovementForm() {
    this.movementForm = new FormGroup({});
  }
}
