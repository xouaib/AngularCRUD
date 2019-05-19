import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  URL = 'http://localhost/Angular7Api/PHPAPI-Angular7/web_api/';
  constructor(private httpClient: HttpClient) { }

  // Should return observable of Product Class | Interface
  getProducts() {
    return this.httpClient.get(this.URL + 'read.php');
  }

  searchProductByID(productID: number) {
    return this.httpClient.get(this.URL + 'search.php?id=' + productID);
  }

  // Should be type of object
  createNewProduct(product) {
    return this.httpClient.get(this.URL + 'create.php', product);
  }

  updateProduct(product) {
    return this.httpClient.get(this.URL + 'create.php', product);
  }

  deleteProductByID(productID: number) {
    return this.httpClient.get(this.URL + 'delete.php?id=' + productID);
  }
}
