import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../product';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  URL = 'http://localhost/Angular7Api/PHPAPI-Angular7/web_api/';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.URL + 'read.php')
      .pipe(retry(3), catchError(this.handleError));
  }

  searchProductByID(productID: number) {
    return this.httpClient.get(this.URL + 'search.php?id=' + productID);
  }

  createNewProduct(product) {
    return this.httpClient.get(this.URL + 'create.php', product);
  }

  updateProduct(product) {
    return this.httpClient.get(this.URL + 'create.php', product);
  }

  deleteProductByID(productID: number) {
    return this.httpClient.get(this.URL + 'delete.php?id=' + productID);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(' An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
