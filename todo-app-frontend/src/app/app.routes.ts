import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [

    {path:"home",component:HomeComponent},
    {path:"todo",component:TodoListComponent},
    {path:"add-todo/:userId",component:CreateTaskComponent},
    {path:"update-todo/:id",component:UpdateTaskComponent},
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"logout",component:LogoutComponent}
];
