import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { LazyLoadDirective } from '../directives/lazy-load.directive';

@NgModule({
  declarations: [
   
  ],
  imports: [CommonModule, MainRoutingModule, HttpClientModule, LazyLoadDirective],
})
export class MainModule {}
