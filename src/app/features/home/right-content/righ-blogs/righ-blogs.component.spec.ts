import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RighBlogsComponent } from './righ-blogs.component';

describe('RighBlogsComponent', () => {
  let component: RighBlogsComponent;
  let fixture: ComponentFixture<RighBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RighBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RighBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
