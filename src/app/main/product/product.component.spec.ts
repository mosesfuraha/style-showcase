import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from '../services/product.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Define the Product interface to match your actual interface
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productServiceMock: jest.Mocked<ProductService>;

  beforeEach(async () => {
    productServiceMock = {
      getProducts: jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

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

  it('should load products on init', () => {
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
    component.products$?.subscribe(products => {
      expect(products).toEqual(mockProducts);
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

  it('should log fetched products', () => {
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

    expect(consoleSpy).toHaveBeenCalledWith('Fetched products:', mockProducts);
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
