import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userToken = sessionStorage.getItem('userToken');
    if( !userToken ) {
      this.userService.loginUser().subscribe( result => {
        if( result.status ) {
          sessionStorage.setItem('userToken', result.auth_token);
        }
      });
    }
  }
}
