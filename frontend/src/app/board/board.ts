import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importamos la magia del Drag and Drop
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule], // 2. Añadimos el módulo a los imports
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  lists = [
    { id: 1, title: 'Por Hacer', tasks: ['Configurar Angular', 'Crear BD'] },
    { id: 2, title: 'En Progreso', tasks: ['Maquetar Tablero'] },
    { id: 3, title: 'Hecho', tasks: ['Instalar dependencias'] },
  ];

  // 3. Esta función se dispara cuando soltamos una tarjeta
  drop(event: CdkDragDrop<string[]>) {
    // Caso A: Soltamos la tarjeta en la MISMA lista (solo cambiamos el orden)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    // Caso B: Soltamos la tarjeta en una lista DIFERENTE (la transferimos)
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
