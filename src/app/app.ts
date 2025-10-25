import { Component } from '@angular/core';
import { ListsManagerComponent } from './lists-manager/lists-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListsManagerComponent],
  template: '<app-lists-manager></app-lists-manager>',
  styles: []
})
export class AppComponent {
  title = 'lists-manager-app';
}