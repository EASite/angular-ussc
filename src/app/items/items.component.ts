import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: any = [];
  showAddForm: boolean = false;
  editedItem: number;
  systemMessage: string;
  systemMessageType: string = 'success';
  curPage: number = 1;
  itemsOnPage: number = 10;
  config: Object = {
    sortBy: 'title',
    sortDir: 'ASC',
  };
  filters: Object = {
    beginPrice: null,
    endPrice: null,
  };
  visibleCols: Object = {
    title: true,
    author: true,
    description: true,
    price: true,
  };

  constructor(private item:ItemsService) {
    this.getItems();
  }

  ngOnInit(): void {}

  getItems() {
    if (this.filters['beginPrice'] && this.filters['endPrice'] && this.filters['beginPrice'] > this.filters['endPrice']) {
      this.showSystemMessage('Начальная цена не может быть больше конечной.', 'danger', false)
      return;
    }

    this.systemMessage = '';

    this.item.getItems(this.filters, this.config).subscribe(data => {
      this.items = data;
    });
  }

  showSystemMessage(message: string, message_type: string = 'success', autoclose: boolean = true) {
    this.systemMessage = message;
    this.systemMessageType = message_type;

    if ( autoclose ) {
      let app = this;

      window.setTimeout(function() {
        app.systemMessage = '';
      }, 2500);
    }
  }

  sortItems(sortBy: string) {
    if (this.config['sortBy'] !== sortBy || this.config['sortDir'] !== 'ASC') {
      this.config['sortBy'] = sortBy;
      this.config['sortDir'] = 'ASC';
    } else {
      this.config['sortDir'] = 'DESC';
    }

    this.config['curPage'] = 1;

    this.getItems();
  }

  addItem(form: NgForm) {
    this.item.addItem(form.value).subscribe(res => {
      this.items.push(form.value);

      this.showSystemMessage(`Запись "${form.value.title}" добавлена!`);

      form.reset();
    });
  }

  saveItem(form: NgForm) {
    this.item.saveItem(form.value).subscribe(res => {
      let itemForSaveIndex = this.items.findIndex(item => item.id == form.value['id']);

      this.items[itemForSaveIndex] = form.value;

      delete this.editedItem;

      this.showSystemMessage(`Запись "${form.value.title}" изменена!`);
    });
  }

  deleteItem(id: number) {
    if ( confirm('Запись будет удалена без возможности восстановления.') ) {
      this.item.deleteItem(id).subscribe(data => {
        let itemForDeleteIndex = this.items.findIndex(item => item.id === id);

        this.items.splice(itemForDeleteIndex, 1);
        this.showSystemMessage(`Запись удалена!`);
      });
    }
  }

  isVisibleTable() {
    return (
        ( this.visibleCols['title'] ||
          this.visibleCols['author'] ||
          this.visibleCols['description'] ||
          this.visibleCols['price'] ) &&
        this.items.length > 0
      );
  }
}
