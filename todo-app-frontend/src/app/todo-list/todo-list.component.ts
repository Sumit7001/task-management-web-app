import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { response } from 'express';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
tasks:any='';
user:any='';
  constructor(private taskservice:TodoService,private userservice:UserService, private router:Router){}
  ngOnInit(): void {
    const email = sessionStorage.getItem('userEmail'); // Ensure 'userEmail' is the key you set when storing the email
    if (email) {
      this.userservice.getUserByEmail(email).subscribe(
        (user) => {
          // Handle the user data returned from the service
          console.log('User data:', user);
          // You can also set user data to a component property if needed
          this.user = user; // Assuming you have a user property in your component
          this.getAllTask();
        },
        (error) => {
          console.error('Error fetching user:', error);
          // Handle the error appropriately
        }
      );
    } else {
      console.warn('No email found in session storage');
    }
  
   
  }
  

  getAllTask():void{
    this.taskservice.getTodoByUserId(this.user.id).subscribe(
      (response:any)=>{
this.tasks=response;

      },(error:any)=>{
        console.log(error);
      }
    );
  }
  add():void{
    this.router.navigate(['/add-todo',this.user.id]);
  }
  update(id: number): void {
    this.router.navigate([`/update-todo`, id]);
  }
  
  delete(id: number): void {
    this.taskservice.removeTodo(id).subscribe(
      (response: any) => {
        console.log("Task deleted successfully");
        this.getAllTask();
      },
      (error: any) => {
        // Handle error if needed
        console.error("Error deleting todo:", error);
      }
    );
  }
  

}
