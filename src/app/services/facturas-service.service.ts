import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasServiceService {
  private apiUrl = 'http://localhost:3002/facturas';
  constructor(private http: HttpClient) { }

  getFacturas() {
    return this.http.get(`${this.apiUrl}/`);
  }

  getFacturasCliente(idCliente: number) {
    return this.http.get(`${this.apiUrl}/cliente/${idCliente}`);
  }

  insertFactura(data: any) {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  updateFactura(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteFactura(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
