import { Component } from '@angular/core';
import { Board } from './board/board'; // <--- Revisa que la ruta sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Board], // <--- Aquí es donde se quejaba
  template: `<app-board></app-board>`,
})
export class App {}
