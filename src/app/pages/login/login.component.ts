import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (token) => {
          console.log('Token recibido:', token);

          this.authService.saveToken(token);

          this.errorMessage = null;
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);

          
          if (err.status === 401) {
            this.errorMessage = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
          } else {
            this.errorMessage = 'Error en el servidor. Intenta nuevamente más tarde.';
          }
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
