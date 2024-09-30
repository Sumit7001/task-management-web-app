import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
  task:any={
    title:'',
    description:'',
    date:'',
    status:''
  }
  taskId :any;
constructor(private route:ActivatedRoute,private router:Router,private taskservice:TodoService){}
ngOnInit(): void {
  this.taskId = this.route.snapshot.paramMap.get('id'); // Get task id from route parameters
  this.taskservice.getTodoById(this.taskId).subscribe(
    response=>{
      this.task=response;

    },
    error=>{

    }
  );
  
}
updateTask():void{
  this.taskservice.updateTodo(this.taskId,this.task).subscribe(
    response=>{
this.router.navigate(['/todo']);
    },
    error=>{
      console.log(error);
    }
  );
}

}
