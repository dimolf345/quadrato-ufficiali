import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerspageComponent } from './officerspage.component';

describe('OfficerspageComponent', () => {
  let component: OfficerspageComponent;
  let fixture: ComponentFixture<OfficerspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
