import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationInfoComponent } from './compensation-info.component';

describe('CompensationInfoComponent', () => {
  let component: CompensationInfoComponent;
  let fixture: ComponentFixture<CompensationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
