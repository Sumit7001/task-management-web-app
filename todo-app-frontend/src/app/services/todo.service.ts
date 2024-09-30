import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

   private apiUrl = 'http://localhost:8086/todo';

   addTodo(todo:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`,todo);
   }

   getAllTodo():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
   }

   updateTodo(id:number,task:any):Observable<any>{

    return this.http.put<any>(`${this.apiUrl}/${id}`,task);

   }

   getTodoById(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
   }

   removeTodo(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
   }

   getTodoByUserId(userId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`); 
   }

}
