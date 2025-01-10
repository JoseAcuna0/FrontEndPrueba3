import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      // Llamamos al servicio para registrarse
      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);

          // Redirigir al login tras un registro exitoso
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al registrarse:', err);
          alert('Error al registrar el usuario.');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}