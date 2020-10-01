import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) { }

  getItems(filters: Object, config: Object) {
    return this.http.post("http://ussc/getItems", Object.assign(filters, config));
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
