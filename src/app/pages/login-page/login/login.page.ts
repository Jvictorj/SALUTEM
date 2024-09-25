import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  senha: string = '';
  passwordVisible: boolean = false;

  constructor() { }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    console.log('Login com', this.email, this.senha);
  }

  forgotPassword() {
    console.log('Redirecionando para recuperação de senha...');
  }

  loginWithGoogle() {
    // Lógica de login com Google
    console.log('Login com Google');
  }

  loginWithFacebook() {
    // Lógica de login com Facebook
    console.log('Login com Facebook');
  }

  register() {
    // Redirecionar para a página de registro
    console.log('Redirecionando para a página de registro...');
  }
 

}