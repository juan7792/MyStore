import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMyProductsComponent } from './table-my-products.component';

describe('TableMyProductsComponent', () => {
  let component: TableMyProductsComponent;
  let fixture: ComponentFixture<TableMyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableMyProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableMyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
