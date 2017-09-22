
import { AppComponent } from '../app.component';
import { Component, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;
import { Project } from '../models/project';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
	tapTargetActions :any;
	openAdvise: boolean ;
	nuevoProyecto: Project;
	modalActions :any;
	areaOptions : any;


	constructor(public mainScreen: AppComponent, private router: Router) { 
			this.tapTargetActions = new EventEmitter<MaterializeAction>();	
			this.modalActions = new EventEmitter<string|MaterializeAction>();	
	}

	ngOnInit() {
		console.log("Comprobando inicio de sesion..");

		if(localStorage.getItem('currentUser')){
			console.log(JSON.stringify(localStorage.getItem('currentUser')));
			console.log("Usted esta logeado!");

			this.openAdvise= false;
			this.nuevoProyecto={id: Date.now(), name: "", text: "", area: "", date: "", users_id: 0};

			this.areaOptions = [{value: "Salud", name: "Hospitales"}, {value:"Educacion", name: "Colegio particular"}];

		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

	  openModal() {
		this.modalActions.emit({action:"modal",params:['open']});
	  }
	  closeModal() {
		this.modalActions.emit({action:"modal",params:['close']});
	  }

	ngAfterViewInit() {
		this.tapTargetActions.emit({action:"tapTarget",params:["open"]})
		setTimeout(() => {this.tapTargetActions.emit({action:"tapTarget",params:["close"]})}, 3000);
	}

	crearProyecto(){
		
		this.openModal();
	}

	agregarProyecto(){
		alert("aun en desarrollo");
	}


}
