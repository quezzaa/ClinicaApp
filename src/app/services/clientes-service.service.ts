import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClientesServiceService {
  private apiUrl = 'http://localhost:3002/clientes';

  constructor(private http: HttpClient) {}

  getClientes(){
    return this.http.get(`${this.apiUrl}/`);
  }

  insertCliente(data: any){
    return this.http.post(`${this.apiUrl}/`, data);
  }

  updateCliente(id: number, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCliente(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
