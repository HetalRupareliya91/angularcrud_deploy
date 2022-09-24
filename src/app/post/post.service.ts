import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

	//private api_url = "http://localhost/my-crud-app/api";
	PHP_API_SERVER = "http://localhost/my-crud-app/api";

	httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient){}

  getAll(): Observable<any>{

  		return this.httpClient.get(this.PHP_API_SERVER + '/index.php/').pipe(catchError(this.errorHandler));

  }

  create11(post:Post):Observable<any>{

  		return this.httpClient.post(this.PHP_API_SERVER + '/create.php/', JSON.stringify(post), this.httpOptions)
  		.pipe(catchError(this.errorHandler));

  }

   create12(post:Post):Observable<any>{

       return this.httpClient.post(this.PHP_API_SERVER + '/create.php/', { data: post }).pipe(
        catchError((res: any) => {
          return res['data'];
        })
      );
  }

  create(post: Post): Observable<Post>{
    return this.httpClient.post<Post>(`${this.PHP_API_SERVER}/create.php`, post);
  }


  find(id:number): Observable<Post>{
    return this.httpClient.get<Post>(`${this.PHP_API_SERVER}/view.php/` +  id);
  }


  update(id:number, post: Post): Observable<Post>{
    return this.httpClient.put<Post>(`${this.PHP_API_SERVER}/update.php/`+ id, post);
  }


  delete(id:number){
    let response = this.httpClient.delete(this.PHP_API_SERVER + '/delete.php/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
    return response;
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
