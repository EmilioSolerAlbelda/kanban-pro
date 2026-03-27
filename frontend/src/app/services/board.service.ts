// frontend/src/app/services/board.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:3000/api/lists';
  private taskUrl = 'http://localhost:3000/api/tasks'; // URL para tareas

  constructor(private http: HttpClient) {}

  getLists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createList(title: string, position: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      title: title,
      position_index: position,
    });
  }

  // NUEVO MÉTODO PARA TAREAS
  createTask(listId: number, title: string, order: number): Observable<any> {
    return this.http.post<any>(this.taskUrl, {
      list_id: listId,
      title: title,
      order_index: order,
    });
  }
  deleteList(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
