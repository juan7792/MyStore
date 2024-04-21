import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAllProductsComponent } from './table-all-products.component';

describe('TableAllProductsComponent', () => {
  let component: TableAllProductsComponent;
  let fixture: ComponentFixture<TableAllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableAllProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
