import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
 
   headers = new HttpHeaders({
       'Access-Control-Allow-Origin': '*' 
        });
   options = { headers: this.headers };


constructor(private http: HttpClient) {
}

 public getCustomers():Observable<any> {
 return this.http.get<any>('http://localhost:63281/Customer/customers',this.options) 
 .pipe(
   map((res: Customer) => res )
 )
 }

public getCustomerDetails(id:string):Observable<any> {
  return this.http.get<Customer>(`http://localhost:63281/Customer/GetCustomerDetails?id=${id}`,this.options)
  .pipe(
    map((res: Customer) => res )
  )
  }

  
   public updateCustomerDetails(request: Customer):Observable<any> {
     return this.http.put<any>('http://localhost:63281/Customer/updateCustomerDetails',request,this.options)
     .pipe(
       map((res: any) => res )
     )     
}

  // public getProducts(customerId?:string):Observable<any> {
  //   return this.http.get<Product>(`http://localhost:63281/Customer/products?customerId=${customerId}`,this.options)
  //   .pipe(
  //     map((res: Product) => res )
  //   )
  //   }
   

}
