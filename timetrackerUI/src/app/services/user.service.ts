import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {};
  userNameUpdated: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  updateUserName(updatedUserName: string) {
    // Update the userName
    localStorage.setItem('userName', updatedUserName);

    // Emit the userNameUpdated event
    this.userNameUpdated.emit(updatedUserName);
  }

  deleteAccount(): Observable<void> {
    const idLS = parseInt(localStorage.getItem("userId"));

    const url = `${environment.userManagement.baseUrl}users/delete/id/${idLS}`;

    return this.http.delete<void>(url).pipe(
      tap(() => {
        // User deleted successfully
        // You can perform additional actions here, such as displaying a success message
        console.log("User deleted successfully");
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle the error appropriately
        console.error("Error deleting user:", error);
        // You can display an error message or perform any necessary actions

        // Throw the error again to propagate it to the component
        throw error;
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    const idLS = parseInt(localStorage.getItem("userId"));
    const url = `${environment.userManagement.baseUrl}users/updatePassword`;
    const requestBody = {
      id: idLS,
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.put<void>(url, requestBody);
  }

  getUser(userName: string) {
    const endpoint = environment.userManagement.baseUrl + 'users/userName/' + userName;
    return this.http.get<User>(endpoint);
  }

  getUserByLocalStorage(): Observable<User> {
    const idLS = parseInt(localStorage.getItem("userId"));
    return this.http.get<User>(environment.userManagement.baseUrl + 'users/id/' + idLS);
  }

  getUserById(userId: number) {
    return this.http.get<User>(environment.userManagement.baseUrl + 'users/id/' + userId);
  }

  updateUser(user: User) {
    return this.http.put<User>(environment.userManagement.baseUrl + 'users/update', user);
  }
}
