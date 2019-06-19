import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAlertComponent } from './preview-alert.component';

describe('PreviewAlertComponent', () => {
  let component: PreviewAlertComponent;
  let fixture: ComponentFixture<PreviewAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
