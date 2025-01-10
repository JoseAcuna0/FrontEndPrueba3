import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    });
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    if (!/\d/.test(value)) {
      return { noNumber: true };
    }
    return null;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      this.authService.register(email, password).subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.successMessage = '¡Usuario registrado con éxito! Redirigiendo al login...';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          console.error('Error al registrarse:', err);

          if (err.error && Array.isArray(err.error) && err.error[0].code === 'DuplicateUserName') {
            this.errorMessage = 'El correo electrónico ya está registrado.';
          } else {
            this.errorMessage = 'EL correo ya esta en uso.';
          }
        },
      });
    } else {
      console.log('Formulario inválido');
    }

    
  }
}