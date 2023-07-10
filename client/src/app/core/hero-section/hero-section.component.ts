import { Component } from '@angular/core';
import { heroConstants } from 'src/app/constants/heroConstants';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent {
  heroConstants = heroConstants;
}
