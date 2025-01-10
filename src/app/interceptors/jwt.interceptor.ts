import { HttpInterceptorFn } from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Clonar la petición e incluir el token en las cabeceras
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Continuar con la siguiente acción en la cadena de interceptores
  return next(req);
};