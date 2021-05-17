import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionUserFormComponent } from './institution-user-form.component';

describe('InstitutionUserFormComponent', () => {
  let component: InstitutionUserFormComponent;
  let fixture: ComponentFixture<InstitutionUserFormComponent>;

  beforeEach(async(() => {
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
