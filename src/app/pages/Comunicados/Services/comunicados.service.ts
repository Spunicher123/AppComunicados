import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cliente, clienteGA } from '../Entity/cliente';
import { comunicados, comunicadosGA } from '../Entity/comunicados';
import { detalles } from '../Entity/detalles';

@Injectable({
  providedIn: 'root'
})
export class ComunicadosService {

  private url = environment.api_comunicados;
  constructor(private Http: HttpClient) { }


  guardarCliente(cliente: clienteGA) {
    return this.Http.post(this.url + "/clientes", cliente);
  }

  actualizarCliente(id: string, cliente: clienteGA) {
    return this.Http.put(this.url + "/clientes/" + id, cliente);
  }

  obtenerUnCliente(id: number) {
    return this.Http.get<cliente>(this.url + "/clientes/" + id)
  }

  mostrarTodosCliente() {
    return this.Http.get<cliente[]>(this.url + "/clientes")
  }

  eliminarCliente(id: number) {
    return this.Http.delete(this.url + "/clientes/" + id)
  }

  flitrosCliente(buscar: string) {
    return this.Http.get<cliente[]>(this.url + "/clientes/buscar/" + buscar)
  }


  guardarComunicado(comunicado: comunicadosGA) {
    return this.Http.post<comunicadosGA>(this.url + "/comunicados", comunicado);

  }

  eliminarComunicado(id: number) {
    return this.Http.delete(this.url + "/comunicados/" + id)
  }


  obtenerUnComunicado(idComunicado: string) {
    return this.Http.get<comunicados>(this.url + "/comunicados/" + idComunicado)

  }

  mostrarTodosComunicados() {
    return this.Http.get<comunicados[]>(this.url + "/comunicados")
  }

  actualizarComunicado(id: string, comunicado: comunicadosGA) {
    return this.Http.put(this.url + "/comunicados/" + id, comunicado);
  }

  filtrosComunicado(buscar: string) {
    return this.Http.get<comunicados[]>(this.url + "/comunicados/buscar/" + buscar)
  }

  guardarDetalle(detalles: detalles) {
    return this.Http.post<detalles>(this.url + "/detalles", detalles);
  }

  eliminarDetalle(id: number) {
    return this.Http.delete(this.url + "/detalles/" + id)
  }

  obtenerUnDetalle(idComunicado: number) {
    return this.Http.get<detalles[]>(this.url + "/detalles/" + idComunicado)
  }

}
