import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  currentStep = 1;
  registerFormStep1: FormGroup;
  registerFormStep2: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Formulário para o Passo 1
    this.registerFormStep1 = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });

    // Formulário para o Passo 2
    this.registerFormStep2 = this.fb.group({
      gender: ['', Validators.required],
      dmy: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToNextStep() {
    if (this.registerFormStep1.valid) {
      this.currentStep = 2;
    }
  }

  async onRegister() {
    if (this.registerFormStep2.valid) {
      try {
        // Coletar todos os dados do formulário
        const { fullName, phoneNumber, email, password } = this.registerFormStep1.value;
        const { gender, dmy, weight, height } = this.registerFormStep2.value;
  
        // Enviar para o AuthService para registrar o usuário
        await this.authService.register(email, password, fullName, phoneNumber, gender, dmy, weight, height);
  
        // Redirecionar após o registro bem-sucedido
        this.router.navigate(['/login']);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao registrar:', error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
      }
    }
  }
  
}
