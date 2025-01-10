import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      file: [null, [Validators.required, this.fileSizeValidator]],
    });
  }

  
  fileSizeValidator(control: AbstractControl): { [key: string]: any } | null {
    const file = control.value;
    if (file && file.size > 5 * 1024 * 1024) {
      return { fileTooLarge: true };
    }
    return null;
  }

  goToPosts(): void {
    this.router.navigate(['/posts']);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({ file });
      this.postForm.get('file')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const { title, file } = this.postForm.value;
      this.postsService.createPost(title, file).subscribe({
        next: () => {
          console.log('Post creado con éxito');
          this.errorMessage = null;
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          console.error('Error al crear el post:', err);
          this.errorMessage = 'Error al subir el post. Intenta nuevamente.';
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}