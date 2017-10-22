import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { User } from '../../models/user';
import { Project } from '../../models/project';


@Injectable()
export class UserService {
	public base: string = "http://localhost:8000/api/v1/";
	public options: RequestOptions;
	public headers: Headers;

	//Se construyen aquellos atributos utilizados por la clase
	constructor(
		private http: Http,
		private authenticationService: AuthenticationService) {
		console.log("Construyendo la cabezera con el token necesario");
		console.log(this.authenticationService.token);

		this.headers = new Headers({

			'Authorization': 'Bearer ' + this.authenticationService.token,
			'Content-Type': 'application/json'
		});

		this.options = new RequestOptions({ headers: this.headers });


	}

	editUser(user: User, id: number){
	 return this.http.put(this.base+'users/'+id, JSON.stringify(user), this.options).map((res: Response) => res.json());
	}

	getUser(id) : Observable<User> {
	return this.http.get(this.base+'users/'+id, this.options).map((res: Response) => res.json());
	}


	//Este metodo obtiene los usuarios y utiliza la cabezera para el token
	getUsers(): Observable<User[]> {
	console.log("Haciendo peticion para obtener todos los usuarios");
	console.log("el token es: "+this.authenticationService.token);
		return this.http.get(this.base+'users', this.options).map((res: Response) => res.json());
	}

	//Este metodo obtiene los usuarios y utiliza la cabezera para el token
	getProjects() : Observable<Project[]>{
	console.log("Haciendo peticion para obtener todos los proyectos");
	console.log("el token es: "+this.authenticationService.token);
		return this.http.get(this.base+'projects', this.options).map((res: Response) => res.json());
	}


	deleteProject(id){
		return this.http.delete(this.base+'projects/'+id, this.options).map((res: Response) => res.json());
	}

	addProject(project: Project): Observable<boolean> {



		return this.http.post(this.base+'projects',JSON.stringify(project), this.options).map
		(response =>
			{
				if (response.ok) {
						return true;
				}else{
						return false;
				}

			}
			);

	}





}
