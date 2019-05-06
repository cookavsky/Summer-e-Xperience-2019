import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit{
  private albumUrl: string;
  private searchUrl: string;

  private access_token: string = 'BQCLcHakOi0mzgRhG9-whhUBma11g14NWiRpJsv098EADhXK0bMNUYLHQ_o8XS9r-5U5-fCcNcbhctheu_MM5wP-sp6JtbyLnJWzsqdQs3IdXX5mu7FIQUg6KxLfU78YDaqO96L9bcB1oPoUcZR-GgjsTA';

  constructor(private _http: HttpClient) { }

  searchAlbum(str: string) {
    /* Dodaj wartość do headers poprzez HttpHeaders() i nadaj mu klucz dostępu
      Połącz się z biblioteką przechodząc do www... zgodnie z GET Spotify API
    */

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&type=album&market=PL&offset=0&limit=20';
    return this._http.get(this.searchUrl, { headers: headers })
  }

  getMore(id: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
    return this._http.get(this.albumUrl, { headers: headers });
  }

  ngOnInit() {

  }
}
