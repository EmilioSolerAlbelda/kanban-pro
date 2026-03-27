// frontend/src/app/board/board.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  lists: any[] = [];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.boardService.getLists().subscribe({
      next: (data: any[]) => {
        this.lists = data.map((list: any) => ({
          ...list,
          // Si el backend no devuelve tareas, inicializamos array vacío
          tasks: list.tasks || [],
        }));
        console.log('✅ Tablero cargado desde la DB');
      },
      error: (err: any) => console.error('❌ Error al obtener datos:', err),
    });
  }

  addList(): void {
    const title = prompt('¿Cómo se llamará la nueva columna?');
    if (title && title.trim()) {
      const nextPosition = this.lists.length + 1;
      this.boardService.createList(title, nextPosition).subscribe({
        next: (newList: any) => {
          // Aseguramos que la nueva lista tenga el array de tareas listo
          this.lists.push({ ...newList, tasks: [] });
          console.log('✅ Lista creada');
        },
        error: (err: any) => console.error('❌ Error al crear lista:', err),
      });
    }
  }

  // --- FUNCIÓN PARA ELIMINAR LISTAS ---
  deleteList(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta columna?')) {
      this.boardService.deleteList(id).subscribe({
        next: () => {
          // Quitamos la lista del array local para que desaparezca de inmediato
          this.lists = this.lists.filter((l) => l.id !== id);
          console.log('🗑️ Lista eliminada');
        },
        error: (err: any) => console.error('❌ Error al eliminar lista:', err),
      });
    }
  }

  addTask(list: any): void {
    const title = prompt(`Añadir nueva tarea a "${list.title}":`);
    if (title && title.trim()) {
      const order = list.tasks.length + 1;
      this.boardService.createTask(list.id, title, order).subscribe({
        next: (newTask: any) => {
          // Forzamos la actualización de la lista para que Angular detecte el cambio rápido
          list.tasks = [...list.tasks, newTask.title || title];
          console.log('✅ Tarea guardada en DB');
        },
        error: (err: any) => {
          console.error('❌ Error al crear tarea:', err);
          alert('No se pudo guardar la tarea.');
        },
      });
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
