import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCardsComponent } from './customer-card-list.component';

describe('SubscriptComponent', () => {
  let component: CustomerCardsComponent;
  let fixture: ComponentFixture<CustomerCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
