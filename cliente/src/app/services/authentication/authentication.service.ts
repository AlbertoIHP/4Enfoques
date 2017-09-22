import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { User } from '../../models/user';


@Injectable()
export class AuthenticationService {
	public token: string;
	public base: string = "http://localhost:8000/api/";

	constructor(private http: Http) {

		console.log("Definiendo usuario actual desde el localstorage");
		// set token if saved in local storage
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));

		
		console.log("Guardando token para el servicio");
		this.token = currentUser && currentUser.token;
		
	}

	registerUser(usuario: User): Observable<boolean>
	{
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });

		
		return this.http.post( this.base+'v1/users', JSON.stringify(usuario), options)
			.map(response => 
			{
				if (response.ok) {
						let token = response.json() && response.json().token;
						
						this.token = token;
						localStorage.setItem('currentUser', JSON.stringify({ email: usuario.email, token: token }));
						return true;
				}else{
						return false;
				}
					
			}).catch(e => {
				console.log(e.status);
			if (e.status === 400) {

				return Observable.throw('Unauthorized');
			}else if(e.status === 500){
				return Observable.throw('UsedMail');
			}
		});
	}

	login(username: string, password: string): Observable<boolean> {

		
		console.log("haciendo peticion a la API...");
		console.log(JSON.stringify({ email: username, password: password }));

		console.log("Generando encabezado de contenido ");
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });

		
		return this.http.post( this.base+'login', JSON.stringify({ email: username, password: password }), options)
			.map(response => 
			{



				if (response.ok) {
						console.log("La consulta fue exitosa, formateando token...")
						let token = response.json() && response.json().token;
						
						// set token property
						this.token = token;

						console.log("Guardando Token en el local storage");
						// store username and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem('currentUser', JSON.stringify({ email: username, token: token }));

						// return true to indicate successful login
						return true;
				}else{
						return false;
				}


					
			}).catch(e => {
			if (e.status === 401) {
				return Observable.throw('Unauthorized');
			}
			// do any other checking for statuses here
		});

	}

	logout(): void {

		console.log("Borrando token del localstorage y del servicio");
		// clear token remove user from local storage to log user out
		this.token = null;
		
		localStorage.removeItem('currentUser');
	}
}