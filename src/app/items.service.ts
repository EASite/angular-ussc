import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) { }

  getItems(curPage: number, itemsOnPage: number, filters: Object, config: Object) {
    return this.http.post("http://ussc/getItems", Object.assign(filters, config, {'curPage': curPage, 'itemsOnPage': itemsOnPage})).pipe(shareReplay());
  }

  filterItems(data: Object, config: Object) {
    data['sortBy'] = config['sortBy'];
    data['sortDir'] = config['sortDir'];

    return this.http.post("http://ussc/filterItems", data);
  }

  addItem(data: any) {
    return this.http.post("http://ussc/add", data);
  }

  saveItem(data: any) {
    return this.http.post("http://ussc/save", data);
  }

  deleteItem(id: number) {
    return this.http.delete(`http://ussc/delete/${id}`);
  }
}
