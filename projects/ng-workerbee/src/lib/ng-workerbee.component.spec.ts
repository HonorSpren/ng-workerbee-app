import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWorkerbeeComponent } from './ng-workerbee.component';

describe('NgWorkerbeeComponent', () => {
  let component: NgWorkerbeeComponent;
  let fixture: ComponentFixture<NgWorkerbeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgWorkerbeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWorkerbeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
