import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { User } from '../../models/user';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthenticationService {
	public token: string;
	public base: string = "http://localhost:8000/api/";
  public headers;
  public options;

	constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers });

		console.log("Definiendo usuario actual desde el localstorage");
		// set token if saved in local storage
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));


		console.log("Guardando token para el servicio");
		this.token = currentUser && currentUser.token;

	}

	registerUser(usuario: User): Observable<boolean>
	{



		return this.http.post( this.base+'v1/users', JSON.stringify(usuario), this.options).map(response =>
			{
				if (response.ok) {
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

		console.log(JSON.stringify({ email: username, password: password }));


		return this.http.post( this.base+'login', JSON.stringify({ email: username, password: password }), this.options)
			.map(response =>
			{


        console.log("Guardando token en el localstorage");
				if (response.ok) {

				/**
				 ** Se configura el token
				 **/
						let token = response.json() && response.json().token;
						this.token = token;
				  localStorage.setItem('currentUser', JSON.stringify({ email: username, token: token }));

          console.log("Execucion finalizada ");
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
	localStorage.removeItem('currentId');
	}
}
