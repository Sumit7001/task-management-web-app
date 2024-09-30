import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string='';
  password:string='';
  constructor(private userservice:UserService,private router:Router){}
  login():void{
this.userservice.login(this.email,this.password).subscribe(
  response=>{
    this.userservice.setSession('some-auth-token', this.email);

    console.log(response);
    console.log("login successsfull");
    this.router.navigate(['/home']);
  },
  error=>{
    console.log(error);
  }
);
  }
}
