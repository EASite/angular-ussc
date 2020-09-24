import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  // itemId: number;
  items: any = [];
  systemMessage: string;

  visibleCols: Object = {
    title: true,
    author: true,
    description: true,
    price: true
  };

  constructor(private item:ItemsService) {
    this.item.getData().subscribe(data=>{
      this.items = data;
    })
  }

  ngOnInit(): void {
  }

  addItem(form: NgForm) {
    // this.http.post<any>('http://uscc/add', form).subscribe(data=>{
    //   // this.itemId = data.id
    //   console.log(data);
    // });

    this.systemMessage = `Запись "${form.value.title}" добавлена!`;

    let app = this;

    window.setTimeout(function() {
      app.systemMessage = '';
    }, 2500);

    console.log(form.value);
  }

  isVisibleItems() {
    return ( this.visibleCols['title'] || this.visibleCols['author'] || this.visibleCols['description'] || this.visibleCols['price'] );
  }

  changeColVisibility(col: string) {
    this.visibleCols[col] = !this.visibleCols[col];
  }
}
