import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;

  ngOnInit() {
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode) {
      this.isDarkMode = JSON.parse(savedMode);
      this.applyMode();
    }
  }

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyMode();

    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  private applyMode() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
