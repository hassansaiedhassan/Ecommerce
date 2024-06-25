import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whishlist3Component } from './whishlist3.component';

describe('Whishlist3Component', () => {
  let component: Whishlist3Component;
  let fixture: ComponentFixture<Whishlist3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Whishlist3Component]
    });
    fixture = TestBed.createComponent(Whishlist3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
