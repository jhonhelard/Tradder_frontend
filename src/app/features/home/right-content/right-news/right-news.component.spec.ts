import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNewsComponent } from './right-news.component';

describe('RightNewsComponent', () => {
  let component: RightNewsComponent;
  let fixture: ComponentFixture<RightNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
