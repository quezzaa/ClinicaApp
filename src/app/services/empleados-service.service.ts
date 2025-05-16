import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosServiceService {

  private apiUrl = 'http://localhost:3002/';
    
      constructor(private http: HttpClient) {}
    
      getConsultores(){
        return this.http.get(`${this.apiUrl}consultores/`);
      }
    
      insertConsultor(data: any){
        return this.http.post(`${this.apiUrl}consultores/`, data);
      }
    
      updateConsultor(id: number, data: any){
        return this.http.put(`${this.apiUrl}consultores/${id}`, data);
      }
    
      deleteConsultor(id: number){
        return this.http.delete(`${this.apiUrl}consultores/${id}`);
      }

      getProgramadores(){
        return this.http.get(`${this.apiUrl}programadores/`);
      }
    
      insertProgramador(data: any){
        return this.http.post(`${this.apiUrl}programadores/`, data);
      }
    
      updateProgramador(id: number, data: any){
        return this.http.put(`${this.apiUrl}programadores/${id}`, data);
      }
    
      deleteProgramador(id: number){
        return this.http.delete(`${this.apiUrl}programadores/${id}`);
      }

      getEspecialistas(){
        return this.http.get(`${this.apiUrl}especialistas/`);
      }
    
      insertEspecialista(data: any){
        return this.http.post(`${this.apiUrl}/especialistas/`, data);
      }
    
      updateEspecialista(id: number, data: any){
        return this.http.put(`${this.apiUrl}especialistas/${id}`, data);
      }
    
      deleteEspecialista(id: number){
        return this.http.delete(`${this.apiUrl}especialistas/${id}`);
      }
}
