// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";

// @Injectable()
// export class ShareService {

//     private _value: string = '';
 
//     sendValue(value: string) {
//         this._value = value;
//     }
 
//     getValue(): string {
//         return this._value;
//     }

// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {

 private messageStream = new BehaviorSubject<any>('');

 currentMessage = this.messageStream.asObservable()

 constructor(){}

 updateMessage(newMessage: any){ 
   this.messageStream.next(newMessage);

 }

 


}