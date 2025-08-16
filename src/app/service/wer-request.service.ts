import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WerRequestService {

  readonly ROOT_URI;

  constructor(private _http:HttpClient) {
    this.ROOT_URI = "https://mean-task-manager-backend.onrender.com"
   }

   get(uri:string) {
    return this._http.get(`${this.ROOT_URI}/${uri}`);
   }
   
   post(uri:string, payload:Object) {
    return this._http.post(`${this.ROOT_URI}/${uri}`, payload);
   }

   put(uri:string , payload:Object) {
    return this._http.put(`${this.ROOT_URI}/${uri}`, payload);
   }

   delete(uri:string) {
    return this._http.delete(`${this.ROOT_URI}/${uri}`);
   }

}
