import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementformComponent } from './movementform.component';

describe('MovementformComponent', () => {
  let component: MovementformComponent;
  let fixture: ComponentFixture<MovementformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
