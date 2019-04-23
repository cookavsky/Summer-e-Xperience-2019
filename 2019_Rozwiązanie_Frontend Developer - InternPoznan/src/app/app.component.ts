import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Album } from './album';
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
    /*
    - Jeśli zmieniasz jest jakas dana w wyszukiwaniu -> zacznij nasłuchwać i przejdź do funkcji w httpService. Następnie ją wykonaj i dane wyjściowe wpisz w listę "this.searchAlb" wartość alb.albums.items zawiera dane albumu w bazie danych na spotify. W razie zmieniania wartości w wyszukiwania usuń dane szczegółowe
    - Jeśli w wyszukiwaniu nie ma danych lub sa usuwane -> usuń listę
    */
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
    /*
    - Porównuje każda wartość w nazwie i dacie, a następnie sortuje względem wielkości
    */
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
    /*
    - Dzieki "event" nasłuchwiany jest konkretny button. Po click wykonaj funkcję w httpService, wymarz dane z wyszukiwania i uzyskane szczegółowe dane wpisz do wartości album
    - Jeśli klikasz ponownie wymarz dane szczegółowe i wpisz ponownie dane z wyszukiwania
    */
    if (event.target.className === "SortBtn showBtn") {
      this.searchAlb = [];
      this.httpService.getMore(alb.id)
        .subscribe((art: any) => {
          this.album = art;
          this.getSum(art);
        })
    } else if (event.target.className === "SortBtn hideBtn") {
      this.album = null;
      this.httpService.searchAlbum(this.searchStr)
        .subscribe((alb: any) => {
          this.searchAlb = alb.albums.items;
        })
    }
  }
  getSum(art): number {
    /* Wyznacz ilość utworów, ściągnij dane o ich czasie trwania i dodaj je wszystkie go siebie. */
    let sum = 0;
    for (let i = 0; i < art.tracks.items.length; i++) {
      sum += art.tracks.items[i].duration_ms;
    }
    return sum;
  }
}
