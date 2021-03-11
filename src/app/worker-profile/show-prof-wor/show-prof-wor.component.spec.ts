import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfWorComponent } from './show-prof-wor.component';

describe('ShowProfWorComponent', () => {
  let component: ShowProfWorComponent;
  let fixture: ComponentFixture<ShowProfWorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProfWorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProfWorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
