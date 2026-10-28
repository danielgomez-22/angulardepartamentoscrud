import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { DepartamentosService } from '../../services/service.departamentos';
import { ChangeDetectorRef } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-component',
  standalone: false,
  styleUrl: './update-component.css',
  templateUrl: './update-component.html',
})
export class UpdateComponent implements OnInit {

  public Departamento!: Departamento;
  @ViewChild('cajaid') cajaId!: ElementRef;
  @ViewChild('cajanombre') cajaNombre!: ElementRef
  @ViewChild('cajalocalidad') cajaLocalidad!: ElementRef;

  constructor(
    private _service: DepartamentosService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this._activatedRoute.params.subscribe(async (params: Params) => {
    let id = parseInt(params['id']);
    this.Departamento = await this._service.findDeparatemntosAsync(id);
    this._cdr.detectChanges();  
    })
  }

  async updateDepartamento(): Promise<void> {
    let id = parseInt(this.cajaId.nativeElement.value);
    let nombr = this.cajaNombre.nativeElement.value;
    let localidad = this.cajaLocalidad.nativeElement.value;
    let dept: Departamento = new Departamento(id, nombr, localidad);
    let response = await this._service.updateDepartamento(dept);
    this._router.navigate(["/details", dept.numero, dept.nombre, dept.localidad]);
  }
}
