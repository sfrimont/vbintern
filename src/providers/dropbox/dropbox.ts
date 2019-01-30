import { Injectable } from '@angular/core';
import { Http, Headers , RequestOptions, ResponseContentType} from '@angular/http';
import {HTTP} from '@ionic-native/http';
import {HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/map';
 
@Injectable()
export class DropboxProvider {
 
  accessToken: any;
  folderHistory: any = [];
 
  constructor(public http: Http, public http1: HTTP, public http3: HttpClient) {

  }
 
  setAccessToken(token) {
    this.accessToken = token;
  }


  download(path) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer '+this.accessToken);
      headers.append('Dropbox-API-Arg','{"path": "'+path+'"}');
      return this.http.post('https://content.dropboxapi.com/2/files/download', null,
          new RequestOptions(
              {
                  headers: headers,
                  responseType: ResponseContentType.ArrayBuffer}
          )
      ).map(res => res.arrayBuffer());
      /*
          .subscribe((res) => {
          	return res;
          });
      */
  }

  getLink(path) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer '+this.accessToken);
      headers.append('Content-Type', 'application/json');
      let folderPath = {
          path: path
      };
      return this.http.post('https://api.dropboxapi.com/2/files/get_temporary_link', JSON.stringify(folderPath), {headers: headers})
          .map(res => res.json());
  }

  /*
  download(path)
  {
      let headers = new Headers();

      headers.append('Authorization', 'Bearer ' + this.accessToken);
      headers.append('Dropbox-API-Arg', '{"path":"/awomensworth/noten.pdf"}');

      let header = {
      	'Authorization': 'Bearer ' + this.accessToken,
          'Dropbox-API-Arg': '{"path":"/awomensworth/noten.pdf"}'
	  };

      let data = {
          'path': '/awomensworth/noten.pdf'
      };

      this.http1.setDataSerializer('json');

      return this.http3.post('https://content.dropboxapi.com/2/files/download', JSON.stringify(data),
		  headers: new HttpHeaders().);
          ;
  }

  */
  /*

  this.http.post(this.apiUrl+'/users', JSON.stringify(data), {
    headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    params: new HttpParams().set('id', '3'),
  })
  .subscribe(res => {
    resolve(res);
  }, (err) => {
    reject(err);
  });
   */

  getUserInfo(){
	 let headers = new Headers();
	 
	  headers.append('Authorization', 'Bearer ' + this.accessToken);
	  headers.append('Content-Type', 'application/json');
	 
	  return this.http.post('https://api.dropboxapi.com/2/users/get_current_account', "null", {headers: headers})
	    .map(res => res.json());
  }
 
  getFolders(path?){
 	  let headers = new Headers();
 
	  headers.append('Authorization', 'Bearer ' + this.accessToken);
	  headers.append('Content-Type', 'application/json');
	 
	  let folderPath;
	 
	  if(typeof(path) == "undefined" || !path){
	 
	    folderPath = {
	      path: ""
	    };   
	 
	  } else {
	 
	    folderPath = {
	      path: path
	    };
	 
	    if(this.folderHistory[this.folderHistory.length - 1] != path){
	      this.folderHistory.push(path);
	    }
	 
  }
 
  return this.http.post('https://api.dropboxapi.com/2/files/list_folder', JSON.stringify(folderPath), {headers: headers})
    .map(res => res.json());
  }
 
  goBackFolder(){
	 	if(this.folderHistory.length > 0){
	 
	    this.folderHistory.pop();
	    let path = this.folderHistory[this.folderHistory.length - 1];
	 
	    return this.getFolders(path);
	  }
	  else {
	    return this.getFolders();
	  }
	  }
 
}