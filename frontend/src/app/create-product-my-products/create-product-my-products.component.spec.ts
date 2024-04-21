import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductMyProductsComponent } from './create-product-my-products.component';

describe('CreateProductMyProductsComponent', () => {
  let component: CreateProductMyProductsComponent;
  let fixture: ComponentFixture<CreateProductMyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductMyProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProductMyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
