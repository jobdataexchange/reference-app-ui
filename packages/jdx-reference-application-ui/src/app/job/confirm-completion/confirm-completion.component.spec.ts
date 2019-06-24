import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCompletionComponent } from './confirm-completion.component';

describe('ConfirmCompletionComponent', () => {
  let component: ConfirmCompletionComponent;
  let fixture: ComponentFixture<ConfirmCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
