import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchStr: string;
  searchAlb: [];

  constructor(private httpService: HttpService) {}

  searchAlbum() {
    if (this.searchStr !== "") {
    this.httpService.searchAlbum(this.searchStr)
      .subscribe(alb => {
        this.searchAlb = alb.albums.items;
      })
    } else {
      this.searchAlb = null;
    }
  }

  SortName() {
    if (this.searchAlb !== undefined) {
    this.searchAlb.sort(function (a, b) { return a.name < b.name ? -1 : 1 });
    } else {}
  }
  SortDate() {
    if (this.searchAlb !== undefined) {
    this.searchAlb.sort(function (a, b) { return a.release_date < b.release_date ? -1 : 1 });
    } else {}
  }

  ShowMore(event) {
    if (event.target.className === "SortBtn hide") {
      event.target.classList.add("show");
      event.target.classList.remove("hide");
    } else if (event.target.className === "SortBtn show") {
      event.target.classList.remove("show");
      event.target.classList.add("hide");
    }
  }
}
