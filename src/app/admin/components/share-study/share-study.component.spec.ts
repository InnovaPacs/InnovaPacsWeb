import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShareStudyComponent } from './share-study.component';

describe('ShareStudyComponent', () => {
  let component: ShareStudyComponent;
  let fixture: ComponentFixture<ShareStudyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
