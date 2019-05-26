import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @ViewChild('productsTable') Table;
  public dataTable: any;
  public ProductsList: Product[];
  public errorMsg: any;

  constructor(private crudService: CrudService, private router: Router) { }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList() {
    return this.crudService.getProducts().subscribe(
      productsData => {
        this.ProductsList = productsData;
        this.dataTable = $(this.Table.nativeElement);
        setTimeout(() => { this.dataTable.DataTable(); }, 2000);
      },
      error => this.errorMsg = error
    );
  }

  deleteProduct(productID: number) {
    this.crudService.deleteProductByID(productID).subscribe(
      error => this.errorMsg = error
    );

    this.getProductsList();
  }

  getNavigation(link: string, id: string) {
    if (id === '') {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link + '/' + id]);
    }
  }
}
