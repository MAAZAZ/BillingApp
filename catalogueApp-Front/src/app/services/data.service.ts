import {Inject, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {root} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(@Inject(root) protected url: string, protected http: HttpClient) {}

  // @ts-ignore
  getAll() {
    return this.http.get(this.url);
  }

  // @ts-ignore
  getById(resource: Object) {
    return this.http.get(this.url + resource + '/');
  }

  // @ts-ignore
  add(resource:Object){
    return this.http.post(this.url, resource);
  }

  // @ts-ignore
  update(id: Number, resource: Object){
    return this.http.put(this.url + id + '/',resource);
  }

  // @ts-ignore
  delete(resource: Object){
    return this.http.delete(this.url + resource + '/');
  }
}
