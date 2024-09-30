import { Component } from '@angular/core';
import { title } from 'process';
import { TodoService } from '../services/todo.service';
import { response } from 'express';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
userId:any='';
  constructor(private taskservice:TodoService,private router:Router,private route:ActivatedRoute){
  
  }
  task = { title: '', description: '', date: '', status: '', user: { id: null } };
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.task.user.id = this.userId;
  }
  
  
submit():void{
  this.taskservice.addTodo(this.task).subscribe(
    response=>{
      console.log(this.task);
this.router.navigate(['/todo']);
    },
    error=>{
      console.log(error);

    }
  );
}
}
