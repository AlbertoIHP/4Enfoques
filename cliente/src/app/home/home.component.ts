
import { AppComponent } from '../app.component';
import { Component, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;
import { Project } from '../models/project';
import { ProjectForm } from '../models/forms';
import { UserService } from '../services/user/user.service';
import { ProjectService } from '../services/project/project.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
	tapTargetActions :any;
	openAdvise: boolean ;
	nuevoProyecto: Project =
	{
		id: Date.now(),
		name: "",
		text: "",
		area: "",
		date: "",
		users_id: 0
	};

	nuevoFormulario: ProjectForm = 
	{
		id: Date.now(),
		description: "",
		date: ""
	};

	modalActions1: any;
	modalActions2: any;
	areaOptions : any;
	users: any = {};
	projects: any = {};
	userProjects: any = [];
	forms: any = {};


	constructor(public projectservice: ProjectService, public mainScreen: AppComponent, private router: Router, private userService: UserService) {
			this.tapTargetActions = new EventEmitter<MaterializeAction>();
			this.modalActions1 = new EventEmitter<string|MaterializeAction>();
			this.modalActions2 = new EventEmitter<string|MaterializeAction>();
	}

	obtenerProyectos(id){

	console.log("Obteniendo todos los proyectos")
		this.userService.getProjects().subscribe(data => {

							this.projects = data;
							this.projects = this.projects.data;

							var totalProyectos = [];

			  console.log("Buscando todos los proyectos del usuario registrado");
							for (let x = 0 ; x < this.projects.length ; x++){
								if(this.projects[x].users_id === id){
				  console.log("Se encontraron todos los proyectos del usuario");
									totalProyectos.push(this.projects[x]);

								}
							}

							this.userProjects = totalProyectos;

						});

	}

	ngOnInit() {

		if(localStorage.getItem('currentUser')){

			this.openAdvise= false;
			this.nuevoProyecto={id: Date.now(), name: "", text: "", area: "", date: "", users_id: 0};
			this.areaOptions = [{value: "Salud", name: "Hospitales"}, {value:"Educacion", name: "Colegio particular"}];
      this.projectservice.getNfrs().subscribe(data => {
            var todos: any = data;
            todos = todos.data;
            localStorage.setItem('allNfrs', JSON.stringify(todos));
      });
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

	openModal() {
		this.modalActions2.emit({action:"modal",params:['open']});
	}

	closeModal() {
		this.modalActions2.emit({action:"modal",params:['close']});
	}

	ngAfterViewInit() {
	console.log("Obteniendo todos los usuarios");
	  this.userService.getUsers().subscribe(data => {

		this.users = data;
		this.users = this.users.data;
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		currentUser = currentUser.email;

		for (let x = 0 ; x < this.users.length ; x++){


		  if(this.users[x].email === currentUser){
			var idUsuario = this.users[x].id;
			localStorage.setItem('currentId', JSON.stringify(idUsuario));
	  console.log("Se ha encontrado el id del usuario logeado");
			this.obtenerProyectos(idUsuario);


		  }

		}

	  });

		this.tapTargetActions.emit({action:"tapTarget",params:["open"]})
		setTimeout(() => {this.tapTargetActions.emit({action:"tapTarget",params:["close"]})}, 3000);
	}

	crearProyecto(){

		this.openModal();
	}

	agregarProyecto(){
		this.nuevoProyecto.users_id = JSON.parse(localStorage.getItem('currentId'));
		this.nuevoProyecto.date = this.nuevoProyecto.date+" 01:02:00";
		console.log(JSON.stringify(this.nuevoProyecto));

		this.userService.addProject(this.nuevoProyecto).subscribe(data => {

	   console.log(data);

			 this.obtenerProyectos(JSON.parse(localStorage.getItem('currentId')));

			});

	 this.modalActions2.emit({action:"toast",params:[['Agregando proyecto  <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
		 this.closeModal();

	   this.nuevoProyecto =
		{
		  id: Date.now(),
		  name: "",
		  text: "",
		  area: "",
		  date: "",
		  users_id: 0
		};
	}

	editarProyecto(id){
	localStorage.setItem('projectId', JSON.stringify(id));
		this.router.navigate(['project']);
	}

	borrarProyecto(id){
			this.userService.deleteProject(id).subscribe(data => {
			 console.log(data);
			 this.obtenerProyectos(JSON.parse(localStorage.getItem('currentId')));
			});
	}

	iniciarFormulario(){

		this.abrirFormulario();
	}

	enviarFormulario() {
		console.log(JSON.stringify(this.nuevoFormulario));

		this.nuevoProyecto.id = this.nuevoFormulario.id;
		this.nuevoProyecto.name = this.nuevoFormulario.description;
		this.nuevoProyecto.text = this.nuevoFormulario.description;
		this.nuevoProyecto.date = this.nuevoFormulario.date;
		this.nuevoProyecto.users_id = JSON.parse(localStorage.getItem('currentId'));


	 this.modalActions1.emit({action:"toast",params:[['Procesando formulario  <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
		 this.cerrarFormulario();

	   this.nuevoFormulario =
		{
		  id: Date.now(),
			description: "",
			date: ""
		};


	}

	abrirFormulario() {
		this.modalActions1.emit({action:"modal",params:['open']});
	}
	cerrarFormulario() {
		this.modalActions1.emit({action:"modal",params:['close']});
		this.openModal();
	}


}
