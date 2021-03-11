import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorComponent } from './show-wor.component';

describe('ShowWorComponent', () => {
  let component: ShowWorComponent;
  let fixture: ComponentFixture<ShowWorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
