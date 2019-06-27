import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialRequirementsComponent } from './credential-requirements.component';

describe('CredentialRequirementsComponent', () => {
  let component: CredentialRequirementsComponent;
  let fixture: ComponentFixture<CredentialRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
