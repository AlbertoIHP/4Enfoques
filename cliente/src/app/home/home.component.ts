
import { AppComponent } from '../app.component';
import { Component, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;
import { Project } from '../models/project';
import { UserService } from '../services/user/user.service';

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

	modalActions :any;
	areaOptions : any;
	users: any = {};
	projects: any = {};
	userProjects: any = [];


	constructor(public mainScreen: AppComponent, private router: Router, private userService: UserService) {
			this.tapTargetActions = new EventEmitter<MaterializeAction>();
			this.modalActions = new EventEmitter<string|MaterializeAction>();
	}

	obtenerProyectos(id){

		this.userService.getProjects().subscribe(data => {

							this.projects = data;
							this.projects = this.projects.data;

							var totalProyectos = [];


							for (let x = 0 ; x < this.projects.length ; x++){
								if(this.projects[x].users_id === id){
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


			this.userService.getUsers().subscribe(data => {

				this.users = data;
				this.users = this.users.data;
				var currentUser = JSON.parse(localStorage.getItem('currentUser'));
				currentUser = currentUser.email;

				for (let x = 0 ; x < this.users.length ; x++){


					if(this.users[x].email === currentUser){
						var idUsuario = this.users[x].id;
						localStorage.setItem('currentId', JSON.stringify(idUsuario));

						this.obtenerProyectos(idUsuario);


					}

				}

			});



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
		this.nuevoProyecto.users_id = JSON.parse(localStorage.getItem('currentId'));
		this.nuevoProyecto.date = this.nuevoProyecto.date+" 01:02:00";
		console.log(JSON.stringify(this.nuevoProyecto));

		this.userService.addProject(this.nuevoProyecto).subscribe(data => {

	   console.log(data);

			 this.obtenerProyectos(JSON.parse(localStorage.getItem('currentId')));

			});

	 this.modalActions.emit({action:"toast",params:[['Agregando proyecto  <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
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


}
