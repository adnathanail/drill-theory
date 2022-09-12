import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressionsComponent } from './progressions.component';

describe('ProgressionsComponent', () => {
  let component: ProgressionsComponent;
  let fixture: ComponentFixture<ProgressionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
