import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  productForm: FormGroup;
  resultMsg: [];
  constructor(private fb: FormBuilder, private crudService: CrudService, private router: Router) { }

  ngOnInit() {
    this.initializeProductForm();
  }

  initializeProductForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      productPrice: ['', Validators.compose([Validators.required])],
    });
  }

  createProduct(values) {
    const productData = new FormData();
    productData.append('name', values.productName);
    productData.append('description', values.productDescription);
    productData.append('price', values.productPrice);

    this.crudService.createProduct(productData).subscribe(
      resultmsg => this.resultMsg = resultmsg
    );
  }

}
