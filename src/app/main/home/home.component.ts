import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

interface SliderItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LazyLoadDirective], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sliderItems: SliderItem[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSliderData();
  }

  fetchSliderData(): void {
    this.http.get<{ slider: SliderItem[] }>('assets/slider.json').subscribe({
      next: data => {
        this.sliderItems = data.slider;
      },
      error: error => {
        this.errorMessage = 'Error fetching slider data.';
        console.error('Error fetching slider data:', error);
      }
    });
  }
}
