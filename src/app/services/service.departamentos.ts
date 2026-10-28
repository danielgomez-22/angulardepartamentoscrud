import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Departamento} from '../models/departamento';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DepartamentosService {
    url = environment.ApiDepartamentos;
    constructor(private http: HttpClient) {}

    async getDepartamentos(): Promise<Departamento[]> {
        let request = "api/departamentos";
        return firstValueFrom(this.http.get<Departamento[]>(this.url + request));
    }

    async createDepartamento(dept: Departamento): Promise<any> {
        //convertimos el objeto a json 
        let json = JSON.stringify(dept);
        //objeto header para el type
        let header= new HttpHeaders();
        // incluimos la key de content type
        let request = "api/departamentos";
        header= header.set('Content-Type', 'application/json');
        return firstValueFrom(
            this.http.post(this.url + request, json, {headers: header})
        );

    }

    async findDeparatemntosAsync(id: number): Promise<Departamento> {
        let request = 'api/departamentos/' + id;
        return firstValueFrom(this.http.get<Departamento>(this.url + request));
    }
    async updateDepartamento(departamento: Departamento): Promise<any> {
        let json = JSON.stringify(departamento);
        let header = new HttpHeaders().set('Content-Type', 'application/json');
        let request = 'api/departamentos/';
        return firstValueFrom(
            this.http.put(this.url + request, json, { headers: header })
        )
    }

    async deleteDepartamento(id: number): Promise<any> {
        let request = 'api/departamentos/' + id;
        return firstValueFrom(this.http.delete(this.url + request));
        
    }
}