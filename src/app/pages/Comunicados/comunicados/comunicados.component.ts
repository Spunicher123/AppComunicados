import { Component, OnInit } from '@angular/core';
import { comunicados, comunicadosGA } from '../Entity/comunicados';
import { cliente, clienteGA } from '../Entity/cliente';
import { ComunicadosService } from '../Services/comunicados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { detalles } from '../Entity/detalles';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.scss']
})
export class ComunicadosComponent implements OnInit {

  lstComunicados: comunicados[] = [];
  selectcomunicados: any;

  lstClientes: cliente[] = [];
  selectClientes: any;

  lstDetalles: comunicados[] = [];
  selectDetalles: any;

  visibleSidebar1: any;
  visibleSidebar2: any;

  cliente: FormGroup;
  clientes: clienteGA;
  idCliente: any;

  comunicado: FormGroup;
  comunicadoA: FormGroup;
  comunicados: comunicadosGA;

  constructor(private comunicadoService: ComunicadosService, private builder: FormBuilder) {
    this.cliente = this.builder.group({
      id: [],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
    })

    this.comunicado = this.builder.group({
      id: [],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      link: ['', Validators.required]
    })

    this.comunicadoA = this.builder.group({
      idA: ['', Validators.required],
      tituloA: ['', Validators.required],
      descripcionA: ['', Validators.required],
      linkA: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarCliente();
    this.cargarComunicados();
  }

  cargarCliente() {
    this.comunicadoService.mostrarTodosCliente().subscribe(data => {
      this.lstClientes = data;
    })
  }

  cargarComunicados() {
    this.comunicadoService.mostrarTodosComunicados().subscribe(data => {
      this.lstComunicados = data;
    })
  }

  guardarClientes() {
    this.clientes = {
      nombre: this.cliente.value.nombre,
      telefono: this.cliente.value.telefono,
      email: this.cliente.value.email,
    }
    this.comunicadoService.guardarCliente(this.clientes).subscribe(data => {
      this.cargarCliente();
      this.vaciarDatosClientes();
    })
  }

  guardarComunicados() {
    this.comunicados = {
      titulo: this.comunicado.value.titulo,
      descripcion: this.comunicado.value.descripcion,
      link: this.comunicado.value.link,
    };
    if (this.selectClientes == null || undefined) {
      alert("Selecciona un cliente")
    } else {
      if (this.comunicado.get('id').value == null) {
        this.comunicadoService.guardarComunicado(this.comunicados).subscribe(data => {
          this.selectClientes.forEach(element => {
            const comud: detalles = {
              comunicado: parseInt(data.id, 10),
              cliente: parseInt(element.id, 10),
            };
            this.comunicadoService.guardarDetalle(comud).subscribe(data => {
              this.obtenerDetallesComunicado(data.comunicado);
            });
          });
          this.cargarComunicados();
          this.selectClientes = [];
        });
      } else {
        this.selectClientes.map(e => {
          const comud: detalles = {
            comunicado: this.comunicado.get('id').value,
            cliente: parseInt(e.id, 10),
          };
          this.comunicadoService.guardarDetalle(comud).subscribe(data => {
            this.obtenerDetallesComunicado(data.comunicado);
          });
        });
        this.selectClientes = [];
      }
      this.visibleSidebar1 = false;
    }
  }

  vaciarDatosClientes() {
    this.cliente.reset();
    this.idCliente = null;
    this.cargarCliente();
  }

  vaciarComunicados() {
    this.comunicado.reset();
    this.lstDetalles = [];
    this.cargarComunicados();
  }

  vaciarComunicadosA() {
    this.comunicadoA.reset();
    this.cargarComunicados();
  }

  obtenerDetallesComunicado(id) {
    this.comunicadoService.obtenerUnComunicado(id).subscribe(data => {
      this.comunicado.patchValue({
        titulo: data.titulo,
        descripcion: data.descripcion,
        link: data.link,
        id: data.id,
      });
      this.comunicadoService.obtenerUnDetalle(parseInt(data.id, 10)).subscribe(data => {
        const detalles = [];
        data.forEach(element => {
          this.comunicadoService.obtenerUnCliente(element.cliente).subscribe(data => {
            detalles.push({ id: element.id, nombre: data.nombre, telefono: data.telefono, email: data.email });
          });
        });
        this.lstDetalles = detalles;
      });
      this.visibleSidebar2 = false;
    })
  }

  eliminarCliente(id: number) {
    this.comunicadoService.eliminarCliente(id).subscribe(data => {
      this.cargarCliente();
    })
  }

  obtenerCliente(id: number) {
    this.comunicadoService.obtenerUnCliente(id).subscribe(data => {
      this.idCliente = data.id;
      this.cliente.patchValue({
        id: data.id,
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email
      })
    })
  }

  actualizarClientes() {
    this.clientes = {
      id: this.cliente.value.id,
      nombre: this.cliente.value.nombre,
      telefono: this.cliente.value.telefono,
      email: this.cliente.value.email,
    }
    this.comunicadoService.actualizarCliente(this.clientes.id, this.clientes).subscribe(data => {
      this.cargarCliente();
      this.vaciarDatosClientes();
    })
  }

  buscarClientes() {
    let buscar;
    if (this.cliente.get('nombre')?.value)
      buscar = this.cliente.get('nombre').value

    if (this.cliente.get('telefono')?.value)
      buscar = this.cliente.get('telefono').value

    if (this.cliente.get('email')?.value)
      buscar = this.cliente.get('email').value

    this.comunicadoService.flitrosCliente(buscar).subscribe(data => {
      this.lstClientes = data;
    })
  }

  eliminarComunicados(id: number) {
    this.comunicadoService.eliminarComunicado(id).subscribe(data => {
      this.cargarComunicados();
    })
  }

  obtenerComunicado(id: string) {
    this.comunicadoService.obtenerUnComunicado(id).subscribe(data => {
      this.comunicadoA.patchValue({
        idA: data.id,
        tituloA: data.titulo,
        descripcionA: data.descripcion,
        linkA: data.link,
      })
    })
  }

  actualizarComunicados() {
    this.comunicados = {
      id: this.comunicadoA.value.idA,
      titulo: this.comunicadoA.value.tituloA,
      descripcion: this.comunicadoA.value.descripcionA,
      link: this.comunicadoA.value.linkA,
    }
    this.comunicadoService.actualizarComunicado(this.comunicados.id, this.comunicados).subscribe(data => {
      this.cargarComunicados();
      this.vaciarComunicados();
    })
  }

  buscarComunicados() {
    let buscar;
    if (this.comunicadoA.get('tituloA')?.value)
      buscar = this.comunicadoA.get('tituloA').value

    if (this.comunicadoA.get('descripcionA')?.value)
      buscar = this.comunicadoA.get('descripcionA').value

    if (this.comunicadoA.get('linkA')?.value)
      buscar = this.comunicadoA.get('linkA').value

    this.comunicadoService.filtrosComunicado(buscar).subscribe(data => {
      this.lstComunicados = data;
    })
  }

  eliminarDetalle(id: number) {
    this.comunicadoService.eliminarDetalle(id).subscribe(data => {
      this.cargarComunicados();
      this.obtenerDetallesComunicado(this.comunicado.get('id').value);
    })
  }

}
