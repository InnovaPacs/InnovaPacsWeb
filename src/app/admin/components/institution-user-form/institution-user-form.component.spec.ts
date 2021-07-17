import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstitutionUserFormComponent } from './institution-user-form.component';

describe('InstitutionUserFormComponent', () => {
  let component: InstitutionUserFormComponent;
  let fixture: ComponentFixture<InstitutionUserFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
