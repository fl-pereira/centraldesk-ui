import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private api = 'http://localhost:8080/chamados';

  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 5, status?: string) {
    let url = `${this.api}?page=${page}&size=${size}&sort=id,asc`;

    if (status) {
      url += `&status=${status}`;
    }

    return this.http.get<any>(url);
  }

  criar(dados: any) {
    return this.http.post(this.api, dados);
  }

  atualizar(id: number, dados: any) {
    return this.http.put(`${this.api}/${id}`, dados);
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}