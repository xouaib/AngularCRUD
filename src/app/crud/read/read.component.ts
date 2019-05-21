import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  productID: any;
  product: Product;
  errorMsg: any;
  constructor(private crudService: CrudService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.setProductID();
    this.findProductFromID(this.productID);
  }

  setProductID() {
    this.productID = this.activeRoute.snapshot.params.id;
  }

  findProductFromID(productID: number) {
    this.crudService.searchProductByID(productID).subscribe(
      productDetail => this.product = productDetail,
      error => this.errorMsg = error
    );
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }

}
