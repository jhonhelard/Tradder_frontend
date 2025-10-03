import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolRealtimeNewsComponent } from './symbol-realtime-news.component';

describe('SymbolRealtimeNewsComponent', () => {
  let component: SymbolRealtimeNewsComponent;
  let fixture: ComponentFixture<SymbolRealtimeNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolRealtimeNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolRealtimeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
