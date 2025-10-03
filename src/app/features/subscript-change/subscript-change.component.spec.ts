import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptChangeComponent } from './subscript-change.component';

describe('SubscriptComponent', () => {
  let component: SubscriptChangeComponent;
  let fixture: ComponentFixture<SubscriptChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
