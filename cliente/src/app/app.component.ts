import { Component,Injectable, Input, Output, EventEmitter, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],

})

@Injectable()
export class AppComponent implements OnInit{

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		this.logged = true;
	}else{
		this.logged = true;
		}
	}

	constructor(private router: Router){}

	public logged: boolean = false;
	public dir: string;
	public idUser: number;

	setLog(estado: boolean){
		this.logged = estado;
	}

	setDir(dir: string){
		this.dir = dir;
	}

	setIdUser(id: number){
		this.idUser = id;
	}



	getIdUser(): number{
		return this.idUser;
	}


	clickear(){
		console.log("Redirigiendo a home...");
		this.router.navigate(['home']);
	}


	cerrarSesion(){
		console.log("Cerrando sesion...");
		this.router.navigate(['']);
	}

	editarPerfil(){
		if(this.idUser){
			alert("El usuario logeado tiene id "+this.idUser);
		}
	}
}
