import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Observable<any>;
  items: any;
  url: string;

  constructor(
    public navCtrl: NavController
    , public http: HttpClient
  ) {
    this.url = "https://jsonplaceholder.typicode.com/posts";
    this.getData();
  }

  getData() {
    this.data = this.http.get(this.url);
    this.data.subscribe(data => {
      this.items = data;
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.data.subscribe(data => {
      this.items = data;
      refresher.complete();
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.data = this.http.get(this.url);
    this.data.subscribe(data => {
      this.items = this.items.concat(data);
      infiniteScroll.complete();
    });
  }

}
