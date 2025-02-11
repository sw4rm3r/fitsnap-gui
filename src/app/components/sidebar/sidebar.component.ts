import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    IonIcon
  ]
})
export class SidebarComponent  implements OnInit {

  @Input() darkMode = false;

  @Output() toggleDarkMode: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {}

  _toggleDarkMode(){
    this.darkMode = !this.darkMode;
    this.toggleDarkMode.emit();
  }

}
