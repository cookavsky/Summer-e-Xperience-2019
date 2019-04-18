import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private searchUrl: string;
  private access_token: string = 'BQBN9HOzzrrDH8SilC4_A5xNVm82HVUIr5dy3HxvwJFS89yEuy6vzpzpmm65n7EOLUFIVYVl2GK3GKQYaKbUF8XUjLBf-y2OEq3I_J9_LflK-DfbsWqWiFTLxdqQhVt76OqjMKth6nRASZaKQRWhwLKmwQ';

  constructor(private _http: HttpClient) { }

  searchAlbum(str: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&type=album&market=PL&offset=0&limit=20';
    return this._http.get(this.searchUrl, { headers: headers })
  }
}
