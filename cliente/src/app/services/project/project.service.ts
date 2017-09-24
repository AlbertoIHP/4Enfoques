import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { Stakeholder } from '../../models/stakeholder';
import { Goal } from '../../models/goal';
import { Softgoal } from '../../models/softgoal';
import { Nfr } from '../../models/nfr';


@Injectable()
export class ProjectService {

  public base: string = "http://localhost:8000/api/v1/";
  public options: RequestOptions;
  public headers: Headers;

  //Se construyen aquellos atributos utilizados por la clase
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService)
  {
    console.log("Construyendo la cabezera con el token necesario");
    this.headers = new Headers({
      'Authorization': 'Bearer ' + this.authenticationService.token,
      'Content-Type': 'application/json'
    });

    this.options = new RequestOptions({ headers: this.headers });


  }

  getProject(id): Observable<Project>
  {
    return this.http.get(this.base+'projects/'+id, this.options).map((res: Response) => res.json());
  }


}
