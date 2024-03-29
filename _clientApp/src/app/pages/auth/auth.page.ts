import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  loginForm: FormGroup;
  err: string = '';

  constructor(
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    const { email, password } = this.loginForm.value;
    this.authService.signup(email, password, "test");
  }

  signIn() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).catch((error) => {
      this.err = error;
    });
  }

  recoverPassword() {}
}
