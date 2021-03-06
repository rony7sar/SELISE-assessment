import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongestRepeationLettersComponent } from './longest-repeation-letters.component';

describe('LongestRepeationLettersComponent', () => {
  let component: LongestRepeationLettersComponent;
  let fixture: ComponentFixture<LongestRepeationLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongestRepeationLettersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongestRepeationLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
