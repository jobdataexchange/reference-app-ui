import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalRequirementsComponent } from './additional-requirements.component';

describe('AdditionalRequirementsComponent', () => {
  let component: AdditionalRequirementsComponent;
  let fixture: ComponentFixture<AdditionalRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
