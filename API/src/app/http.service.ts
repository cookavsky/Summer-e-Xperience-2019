import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit{
  private albumUrl: string;
  private searchUrl: string;

  private access_token: string = 'BQAOjk9b7p-JnbBJhKi_aHGZ4yrIcxklVZF2x8YN2XWelvgOsp0wFqBsMRfXN104ebgO3uAPrIBswq0LuwQvN8lD4CrNu1qXP9-biwLCK8pAMdxPD2b8p4sXhNHNwt2QX0v9C9AsrZoelhww-kICgV2vcA';

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
