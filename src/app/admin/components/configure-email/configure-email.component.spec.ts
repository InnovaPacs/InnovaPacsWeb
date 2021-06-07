import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureEmailComponent } from './configure-email.component';

describe('ConfigureEmailComponent', () => {
  let component: ConfigureEmailComponent;
  let fixture: ComponentFixture<ConfigureEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
