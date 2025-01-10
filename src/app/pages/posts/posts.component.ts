import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  errorMessage: string | null = null;

  constructor(private postsService: PostsService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }
  
  navigateToCreatePost(): void {
    this.router.navigate(['/create-post']);
  }

  fetchPosts(): void {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts recibidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener los posts:', err);
        this.errorMessage = 'Error al cargar los posts. Intenta nuevamente más tarde.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}