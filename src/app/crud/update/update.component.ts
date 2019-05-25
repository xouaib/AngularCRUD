import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  productID;
  productForm: FormGroup;
  product: Product;
  errorMsg: any;
  resultMsg: any;
  constructor(private fb: FormBuilder, private crudService: CrudService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.initializeProductForm();
    this.setProductID();
    this.findProductFromID();
  }

  initializeProductForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      productPrice: ['', Validators.compose([Validators.required])],
    });
  }

  setProductID() {
    this.productID = this.activeRoute.snapshot.params.id;
  }

  findProductFromID() {
    this.crudService.searchProductByID(this.productID).subscribe(
      product => {
        this.product = product;
        // tslint:disable-next-line: no-string-literal
        this.productForm.controls.productName.setValue(this.product['p_name']);
        // tslint:disable-next-line: no-string-literal
        this.productForm.controls.productDescription.setValue(this.product['p_description']);
        // tslint:disable-next-line: no-string-literal
        this.productForm.controls.productPrice.setValue(this.product['p_price']);
      },
      error => this.errorMsg = error
    );
  }

  updateProduct(values) {
    const productData = new FormData();
    productData.append('id', this.productID);
    productData.append('name', values.productName);
    productData.append('description', values.productDescription);
    productData.append('price', values.productPrice);

    this.crudService.updateProduct(productData).subscribe(resultmsg => this.resultMsg = resultmsg);
  }
}
