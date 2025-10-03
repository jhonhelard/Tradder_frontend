import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTablesContentComponent } from './home-tables-content.component';

describe('HomeTablesContentComponent', () => {
  let component: HomeTablesContentComponent;
  let fixture: ComponentFixture<HomeTablesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTablesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTablesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
