import { Component, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DepartamentosService } from '../../services/service.departamentos';
import { Departamento } from '../../models/departamento';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-component',
  standalone: false,
  styleUrl: './create-component.css',
  templateUrl: './create-component.html',
})
export class CreateComponent {
  public mensaje!: string;
  @ViewChild('cajaid') cajaId!: ElementRef;
  @ViewChild('cajanombre') cajaNombre!: ElementRef;
  @ViewChild('cajalocalidad') cajaLocalidad!: ElementRef;

  constructor(
    private _service: DepartamentosService,
    private _cder: ChangeDetectorRef,
    private _router: Router
  ) {}

  async insertDepartamento(): Promise<void> {
    let id = parseInt(this.cajaId.nativeElement.value);
    let nombre = this.cajaNombre.nativeElement.value;
    let localidad = this.cajaLocalidad.nativeElement.value;
    let dept: Departamento = new Departamento(id, nombre, localidad);
    let response = await this._service.createDepartamento(dept);
    this._router.navigate(["/"]);

  }
}