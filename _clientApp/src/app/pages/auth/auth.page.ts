import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  signIn() {
    const user = {
      email: 'bbeqqqsdqsSeb@aaa.com',
      password: '123"21',
    };
    this.auth.signIn(user).toPromise().then(() => console.log('created ! ')).catch(() => console.log('email used'));
  }
}
