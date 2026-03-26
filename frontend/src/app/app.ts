import { Component } from '@angular/core';
import { Board } from './board/board';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Board],
  template: `<app-board></app-board>`,
})
export class App {} // <-- ¡Aquí está la magia! Cambiamos AppComponent por App
