import { Component, Input } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-content',
  templateUrl: './splash-content.component.html',
  styleUrls: ['./splash-content.component.scss'],
})
export class SplashContentComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageSrc!: string;
  @Input() nextRoute!: string;

  // Initialize progress at 25%
  progress: number = 0.25;

  constructor(private router: Router) {}

  // Method to handle navigation and update progress
  goToNext() {
    this.updateProgress();
    this.router.navigate([this.nextRoute]); // Navigate to the next route
  }

  // Increment progress by 25% each time (or cap at 100%)
  updateProgress() {
    if (this.progress < 1) {
      this.progress += 0.25; // Increment by 25%
    } else {
      this.progress = 1; // Cap at 100%
    }
  }
}
