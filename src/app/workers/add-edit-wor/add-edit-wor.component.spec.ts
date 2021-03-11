import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorComponent } from './add-edit-wor.component';

describe('AddEditWorComponent', () => {
  let component: AddEditWorComponent;
  let fixture: ComponentFixture<AddEditWorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
