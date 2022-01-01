import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../interfaces';
import { UiService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {
  @Input() item: any;
  @Output() deleteItem: EventEmitter<Product> = new EventEmitter();
  @Output() updateItem: EventEmitter<Product> = new EventEmitter();
  edit: boolean = false;
  updatedText: string = '';
  empty: boolean = false;
  noChange: boolean = true;

  constructor(private uiService:UiService) {
    this.uiService.editID().subscribe(value => {
      if (this.item._id === value && !this.edit) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    });
  }

  ngOnInit(): void {
    this.updatedText = this.item.product;
  }

  deleteProduct(): void {
    this.deleteItem.emit(this.item);
  }

  editProduct(id: number): void {
    this.uiService.setEditId(id);
    this.updatedText = this.item.product;
  }

  updateTyping(e: any) {
    this.updatedText = e.target.value || '';
    if (!this.updatedText) {
      this.empty = true;
    } else {
      this.empty = false;
    }
    if (this.updatedText === this.item.product) {
      this.noChange = true;
    } else {
      this.noChange = false;
    }
    if (e.keyCode === 13) { // Enter key
      this.updateProduct();
    }
  }

  updateProduct(): void {
    if (this.empty) {
      this.updatedText = this.item.product;
      this.edit = false;
      return;
    }
    if(this.noChange) {
      this.edit = false;
      return;
    }
    const updatedTask: Product = {
      _id: this.item._id,
      product: this.updatedText
    }
    this.updateItem.emit(updatedTask);
    this.edit = false;
  }
}
