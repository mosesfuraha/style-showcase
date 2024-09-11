import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [CommonModule, MainRoutingModule, HttpClientModule],
})
export class MainModule {}
