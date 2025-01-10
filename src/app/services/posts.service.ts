import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'http://localhost:5080/api/posts'; // Base URL para los posts

  constructor(private http: HttpClient) {}

  // Obtener todos los posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo post
  createPost(title: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('url', file);

    return this.http.post(this.apiUrl, formData);
  }
}
