import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
socket : any;
// baseUri : string  = "ws://localhost:8000";

  constructor() {
    // this.socket = io(this.baseUri);
   }

  // listen(eventName: string){
  //   return new Observable((sub)=> {
  //     this.socket.on(eventName, (data)=> {
  //       sub.next();
  //     })
  //   })
  // }

  // emit(eventName: string, data: any){
  //   this.socket.emit(eventName, data);
  // }
 

}


