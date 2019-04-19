import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private albumUrl: string;
  private searchUrl: string;
  private access_token: string = 'BQC55Jq-JccpqT5R6l3wQ5i0hJd0Ens5bO1Lx0nMIU-ssKf-Om3NIrgUVDhOZ83aMV2kpnHcwywiRnK98hh1mCFNCA2qHS1y_Qw4nX-RaCs-8Xz-5lEirvQkslaxxM_Wnzo_fBCa1fmwmHxwfxdUfJls-A';

  constructor(private _http: HttpClient) { }

  searchAlbum(str: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&type=album&market=PL&offset=0&limit=20';
    return this._http.get(this.searchUrl, { headers: headers })
  }

  getMore(id: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
    return this._http.get(this.albumUrl, {headers: headers });
  }
}
