import { Component,Injectable, Input, Output, EventEmitter, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;
import {User} from './models/user';
import {UserService} from './services/user/user.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],

})

@Injectable()
export class AppComponent implements OnInit{
  modalActions: any;
  professionOptions = [{value: "ICI", name: "Ingeniero Civil Informatico"}, {value:"II", name: "Ingeniero Informatico"}];
  currentUser: any= {id: Date.now(), name: "", email: "", password: "", profession: ""};


	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		this.logged = true;
    this.modalActions = new EventEmitter<string|MaterializeAction>();
	}else{
		this.logged = false;
		}
	}

	constructor(private router: Router, private userService: UserService){}

	public logged: boolean = false;
	public dir: string;
	public idUser: number;

	setLog(estado: boolean){
		this.logged = estado;
	}


  openModal() {
        var userId = JSON.parse(localStorage.getItem('currentId'));
        this.userService.getUser(userId).subscribe(data => {

        this.currentUser = data;
        this.currentUser = this.currentUser.data;
        console.log(this.currentUser);
        this.modalActions.emit({action:"modal",params:['open']})

      });

  }

  closeModal() {

    this.modalActions.emit({action:"modal",params:['close']});
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

    var userId = JSON.parse(localStorage.getItem('currentId'));

    this.userService.editUser(this.currentUser, userId).subscribe(data => {
        console.log(data);
        console.log(this.currentUser);
        this.modalActions.emit({action:"toast",params:[['Actualizando informacion <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
        this.modalActions.emit({action:"modal",params:['close']});

      });
	}
}
