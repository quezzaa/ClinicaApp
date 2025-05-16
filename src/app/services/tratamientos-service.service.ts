import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TratamientosServiceService {
  private apiUrl = 'http://localhost:3002/tratamientos';
  private apiUrl2 = 'http://localhost:3002/tratamientoscitas';
  
    constructor(private http: HttpClient) {}
  
    getTratamientos(){
      return this.http.get(`${this.apiUrl}/`);
    }

    getTratamientosCliente(id:number){
      return this.http.get(`${this.apiUrl2}/${id}`);
    }
  
    insertTratamiento(data: any){
      return this.http.post(`${this.apiUrl}/`, data);
    }
  
    updateTratamiento(id: number, data: any){
      return this.http.put(`${this.apiUrl}/${id}`, data);
    }
  
    deleteTratamiento(id: number){
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
