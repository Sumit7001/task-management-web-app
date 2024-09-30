import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private apiUrl = 'http://localhost:8086/user';
  private userNameSubject = new BehaviorSubject<string>('');
userName$ = this.userNameSubject.asObservable();  // Observable to subscribe to
  constructor(private http:HttpClient,private router:Router) {
    if (typeof window !== 'undefined') { // Check if window is available
      // Initialize username on service creation
     const email = sessionStorage.getItem('userEmail');
     if (email) {
       this.userNameSubject.next(email);
     }
   }
   }

  register(user:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, user);

  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?email=${email}&password=${password}`, {});
  }
  getUserByEmail(email:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${email}`);
  }
  setSession(token: string, email: string): void {
    sessionStorage.setItem('authToken', token);  // Save token in localStorage
    sessionStorage.setItem('userEmail', email); // Store email in localStorage
    console.log('Token stored:', sessionStorage.getItem('authToken'));  // Debugging
    console.log('Email stored:', sessionStorage.getItem('userEmail'));  // Debugging
  
    // Update BehaviorSubject so subscribers get the latest email
    this.userNameSubject.next(email);
  }
  
  // Check if a session exists
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
    let token=sessionStorage.getItem('authToken');
    console.log('Token :'+token);
    return token !== null;
  } 
  return false;  // Return false if window is not available
  }
  
  getLoggedInUserName(){
    return this.userNameSubject.value;
  }
  
  // Logout functionality: Clear session data
  logout(): void {
    if (typeof window !== 'undefined') {
    sessionStorage.removeItem('authToken');  // Clear token from localStorage
    sessionStorage.removeItem('userEmail');  // Clear email from sessionStorage
      
    // Reset BehaviorSubject after logout
    this.userNameSubject.next('');  
  }
    
  }
  
}
