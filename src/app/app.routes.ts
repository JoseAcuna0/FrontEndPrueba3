import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostsComponent } from './pages/posts/posts.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
    { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '/login' },
];
