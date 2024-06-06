import { Component } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public currentScheme: Theme = Theme.Dark;
  themeChecked = true;

  constructor(
    private themeService: ThemeService,
  ) {
    this.currentScheme = this.themeService.get();
    
  }

  setTheme() {
    const scheme = this.currentScheme === Theme.Light ? Theme.Dark : Theme.Light;
    this.themeService.set(scheme);
    this.currentScheme = scheme;
    this.themeChecked = !this.themeChecked;
  }

}
