import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCatComponent } from './add-edit-cat.component';

describe('AddEditCatComponent', () => {
  let component: AddEditCatComponent;
  let fixture: ComponentFixture<AddEditCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
