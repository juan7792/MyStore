import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductAllProductsComponent } from './create-product-all-products.component';

describe('CreateProductAllProductsComponent', () => {
  let component: CreateProductAllProductsComponent;
  let fixture: ComponentFixture<CreateProductAllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductAllProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProductAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
