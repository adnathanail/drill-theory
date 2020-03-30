import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionsComponent } from './progressions.component';

describe('ProgressionsComponent', () => {
  let component: ProgressionsComponent;
  let fixture: ComponentFixture<ProgressionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressionsComponent ]
    })
    .compileComponents();
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
