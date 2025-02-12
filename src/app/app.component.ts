import {Component, Injector, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {IonIcon} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import * as icons from 'ionicons/icons';
import {WebcamModule} from 'ngx-webcam';
import {WebcamService} from './services/webcam.service';
import {NgIf} from '@angular/common';
import {filter, interval, Subject, tap} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LocalAiService} from './services/local-ai.service';
import {man} from 'ionicons/icons';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SidebarComponent, IonIcon, HttpClientModule, WebcamModule, NgIf],
    templateUrl: './app.component.html',
  providers: [WebcamService, LocalAiService],
    styleUrl: './app.component.scss'
})
export class AppComponent {
  webcamService: WebcamService;
  manualPhoto: boolean = false;
  constructor(private injector: Injector) {
    addIcons(icons);
    this.webcamService = this.injector.get(WebcamService);
    const numbers = interval(1000);
    numbers.pipe(
      filter(() => this.webcamService.showWebcam),
      filter(() => !this.manualPhoto),
      tap(() => this.webcamTrigger.next())
    ).subscribe()
  }
  title = 'fitsnap-pwa';
  darkMode = 'light';
  webcamTrigger: Subject<void> = new Subject<void>();

  toggleDarkMode() {
    if(this.darkMode === 'light') {
      this.darkMode = 'dark';
    } else {
      this.darkMode = 'light';
    }
  }

  protected readonly man = man;
}
