import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Product } from '../models/product.interface';
import { ProductService } from '../services/product.service';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.getProducts().pipe(
      retry(2), // Retry the request up to 2 times on failure
      tap((data) => console.log('Fetched products:', data)), // Log the fetched products
      catchError((error) => {
        this.errorMessage = 'Error fetching products.';
        console.error('Error fetching products:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
