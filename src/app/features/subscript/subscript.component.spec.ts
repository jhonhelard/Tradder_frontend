import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptComponent } from './subscript.component';

describe('SubscriptComponent', () => {
  let component: SubscriptComponent;
  let fixture: ComponentFixture<SubscriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
