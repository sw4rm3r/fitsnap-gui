import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {IonIcon} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, IonIcon],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    addIcons(icons);
  }
  title = 'fitsnap-pwa';
  darkMode = 'light';

  toggleDarkMode() {
    if(this.darkMode === 'light') {
      this.darkMode = 'dark';
    } else {
      this.darkMode = 'light';
    }
  }
}
