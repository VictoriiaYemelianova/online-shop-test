import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotiesComponent } from './categories.component';

describe('CategotiesComponent', () => {
  let component: CategotiesComponent;
  let fixture: ComponentFixture<CategotiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategotiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategotiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
