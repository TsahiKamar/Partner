import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ShareService {

    private _value: string = '';
 
    sendValue(value: string) {
        this._value = value;
    }
 
    getValue(): string {
        return this._value;
    }

}