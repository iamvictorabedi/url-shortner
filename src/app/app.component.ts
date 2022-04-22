import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ShortUrl} from './short-url.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly title = 'Url Shortner';
  shortUrl: ShortUrl;
  public longUrl: FormControl =  new FormControl('');

  /**
   * gets the long value from the form, passes it to the generateShortUrl
   * function and create an object of type ShortUrl
   */
  public fetchUrl(): void {
    this.shortUrl = {shortUrl: this.generateShortUrl(), actualUrl: this.longUrl.value};
    this.longUrl.reset();
  }

  /**
   * generates a random string of five characters from letters A-Z and numbers 0-9
   * this function the returns the current hostname http://localhost:8080 with the
   * random string which is the short url
   */
  public generateShortUrl(): string {
    let value = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (let i = 0; i < 5; i++) {
      value += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    /**
     * ensure you dont end up creating the same shortUrl
     */
    return (this.shortUrl && this.shortUrl.shortUrl === window.location.host + '/' + value ?  this.generateShortUrl() :
      encodeURI(window.location.host + '/' + value));
  }
}
