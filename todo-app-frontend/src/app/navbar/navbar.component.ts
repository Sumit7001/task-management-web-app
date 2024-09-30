import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  username :string='';
  isUserLoggedIn:boolean=false; 
  


  constructor(public authService: UserService) {  }
  
  ngOnInit() {
    // Subscribe to userName$ observable to get updates dynamically
    this.authService.userName$.subscribe((email: string) => {
      this.username = email;
      this.isUserLoggedIn = this.authService.isLoggedIn();
    });
  }

  handleLogout(){
    this.authService.logout();
  }
}
