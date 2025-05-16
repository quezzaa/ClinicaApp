import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasServiceService {
  private api = 'http://localhost:3002/citas';
  constructor(private http: HttpClient) { }

  obtenerCitas() {
    return this.http.get(`${this.api}/`);
  }

  obtenerCitasCliente(idCliente: number) {
    return this.http.get(`${this.api}/cliente/${idCliente}`);
  }

  crearCita(cita: any) {
    return this.http.post(`${this.api}/`, cita);
  }

  editarCita(cita: any) {
    return this.http.put(`${this.api}/${cita.idCita}`, cita);
  }

  borrarCita(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
