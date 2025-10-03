import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFilterPanelComponent } from './saved-filter-panel.component';

describe('DynamicPanelComponent', () => {
  let component: SavedFilterPanelComponent;
  let fixture: ComponentFixture<SavedFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
