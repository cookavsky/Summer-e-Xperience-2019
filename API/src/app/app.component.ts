import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Album } from './Album';
import { More } from './More';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchStr: string;
  searchAlb: Album[];
  album: More[];

  constructor(private httpService: HttpService) {};

  searchAlbum() {
    if (this.searchStr !== "") {
      this.album = null;
    this.httpService.searchAlbum(this.searchStr)
      .subscribe((alb : any) => {
        this.searchAlb = alb.albums.items;
      })
    } else {
      this.searchAlb = null;
    }
  }

  SortName() {
    if (this.searchAlb !== undefined) {
      this.searchAlb.sort((a, b) => { return a.name < b.name ? -1 : 1 });
    } else {}
  }
  SortDate() {
    if (this.searchAlb !== undefined) {
      this.searchAlb.sort((a, b) => { return a.release_date < b.release_date ? -1 : 1 });
    } else {}
  }

  ShowMore(event, alb) {
    if (event.target.className === "SortBtn showBtn") {
      this.searchAlb = [];
      this.httpService.getMore(alb.id)
        .subscribe((art: any) => {
          this.album = art;
        })
    } else if (event.target.className === "SortBtn hideBtn") {
      this.album = null;
      this.httpService.searchAlbum(this.searchStr)
        .subscribe((alb: any) => {
          this.searchAlb = alb.albums.items;
        })
    }
  }
}
