import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGainerTableComponent } from './top-gainer-table.component';

describe('TopGainerTableComponent', () => {
  let component: TopGainerTableComponent;
  let fixture: ComponentFixture<TopGainerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopGainerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopGainerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
