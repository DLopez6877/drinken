/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditDrinkComponent } from './edit-drink.component';

describe('EditDrinkComponent', () => {
  let component: EditDrinkComponent;
  let fixture: ComponentFixture<EditDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
