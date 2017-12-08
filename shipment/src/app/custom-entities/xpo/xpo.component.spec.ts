import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XpoComponent } from './xpo.component';

describe('XpoComponent', () => {
  let component: XpoComponent;
  let fixture: ComponentFixture<XpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
