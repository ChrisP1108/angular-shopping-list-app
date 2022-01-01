import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces';
import { listUrl } from '../../../url';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent {

  list: Product[] = [];
  text: string = '';
  loading: boolean = true;
  loadError: boolean = false;
  serverError: boolean = false;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService
      .get(listUrl)
      .subscribe({
        next: res => {
          console.log(res);
          this.list = res; 
          this.loading = false;
        },
        error: err => {
          console.error(err)
          this.loading = false;
          this.serverError = true;
        },
        complete: () => console.log('Get Request To List Successful')
      })
    ;
    setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.loadError = true;
      }
    }, 10000);
  }

  deleteProduct(item: Product): void {
    this.httpService
      .delete(listUrl, item)
      .subscribe({
        next: res => {
          console.log(res);
          this.list = this.list.filter(i => i._id !== item._id);
          this.serverError = false;
        },
        error: err => {
          console.error(err);
          this.serverError = true;
        },
        complete: () => console.log('Delete Request To List Successful')
      })
    ;
  }

  addProduct(): void {
    if (!this.text) {
      alert('Please Enter A Product Item Before Clicking Add');
      return
    }
    if (this.list.some(item => item.product === this.text)) {
      alert('You already have a product with that same name listed');
      this.text = '';
      return
    }
    if (this.list.length > 7) {
      alert('You cannot have more than 8 items on the list');
      return
    }
    const output: Product = {
      product: this.text
    }
    this.httpService
      .post(listUrl, output)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          this.list = [...this.list, res.product];
          this.text = '';
          this.serverError = false;
        },
        error: err => {
          console.error(err);
          this.serverError = true;
        },
        complete: () => console.log('Post Request To List Successful')
      })
    ;
  }

  updateProduct(item: Product): void {
    this.httpService
      .put(listUrl, item)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.list = this.list.map(i => i._id === item._id ? res.product : i);
          this.serverError = false;
        },
        error: err => {
          console.error(err);
          this.serverError = true;
        },
        complete: () => console.log('Put Request To List Successful')
      })
    ;
  }

  typingProduct(e: any): void {
    this.text = e.target.value;
    if (e.keyCode === 13) { // Enter key
      this.addProduct();
    }
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/