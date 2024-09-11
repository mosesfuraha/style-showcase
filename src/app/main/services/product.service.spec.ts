import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductService } from '../services/product.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../models/product.interface';
import { ProductComponent } from '../product/product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productServiceMock: jest.Mocked<ProductService>;

  beforeEach(async () => {
    productServiceMock = ({
      getProducts: jest.fn()
    } as unknown) as jest.Mocked<ProductService>;

    await TestBed.configureTestingModule({
      imports: [ProductComponent, HttpClientTestingModule],
      providers: [{ provide: ProductService, useValue: productServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', done => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 19.99,
        category: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg'
      },
      {
        id: 2,
        title: 'Product 2',
        price: 29.99,
        category: 'Category 2',
        description: 'Description 2',
        image: 'image2.jpg'
      }
    ];
    productServiceMock.getProducts.mockReturnValue(of(mockProducts));

    fixture.detectChanges(); // Triggers ngOnInit

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(component.products$).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component.products$?.subscribe((products: any) => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });

  it('should handle error when loading products fails', () => {
    const errorMessage = 'Error fetching products';
    productServiceMock.getProducts.mockReturnValue(
      throwError(() => new Error(errorMessage))
    );

    fixture.detectChanges(); // Triggers ngOnInit

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Error fetching products.');
  });

  it('should retry twice before failing', () => {
    const errorMessage = 'Error fetching products';
    productServiceMock.getProducts.mockReturnValue(
      throwError(() => new Error(errorMessage))
    );

    fixture.detectChanges(); // Triggers ngOnInit

    expect(productServiceMock.getProducts).toHaveBeenCalledTimes(3); // Initial call + 2 retries
  });

  it('should log fetched products', done => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 19.99,
        category: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg'
      }
    ];
    productServiceMock.getProducts.mockReturnValue(of(mockProducts));
    const consoleSpy = jest.spyOn(console, 'log');

    fixture.detectChanges(); // Triggers ngOnInit

    component.products$?.subscribe(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Fetched products:',
        mockProducts
      );
      done();
    });
  });

  it('should log error when fetching products fails', () => {
    const errorMessage = 'Error fetching products';
    productServiceMock.getProducts.mockReturnValue(
      throwError(() => new Error(errorMessage))
    );
    const consoleErrorSpy = jest.spyOn(console, 'error');

    fixture.detectChanges(); // Triggers ngOnInit

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching products:',
      expect.any(Error)
    );
  });
});
