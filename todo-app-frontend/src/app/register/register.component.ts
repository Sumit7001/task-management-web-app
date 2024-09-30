import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { response } from 'express';
import { error } from 'console';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  successMessage:string='';
  errorMessage:string='';
  submitted:boolean=false;
user:any=new FormGroup({
name:new FormControl('',Validators.required),email:new FormControl('',[Validators.required,Validators.email]),password:new FormControl('',[Validators.required,Validators.minLength(6)])
});


  constructor(private userservice:UserService,private router:Router){}
  register():void{
    this.submitted=true;
    this.userservice.register(this.user.value).subscribe(
      response=>{
        console.log(response);
this.successMessage="registration successfull!";
 setTimeout(() => {
              this.router.navigate(['/login']); // Navigate to the dashboard or home page
            },500)
      },
      error=>{
        console.log(error);
        this.errorMessage="Error Occured!";
      }
    );
  }
}
