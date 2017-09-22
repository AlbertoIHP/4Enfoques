import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MaterializeAction } from 'angular2-materialize';
import { User } from "../models/user";
import 'rxjs/add/operator/catch';
import { AppComponent } from '../app.component';



//DOminio sobre el DOM


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	professionOptions : any;
	iniciosesion: any;
	nuevoUsuario: User;
	tooltipText: string;
	modalActions: any;


	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		public mainScreen: AppComponent) {

		 }

	ngOnInit() {
		// reset login status
		console.log("Cerrando la sesion de manera inicial");
		this.authenticationService.logout();
		this.mainScreen.setLog(false);
		this.iniciosesion = {email: "", password: ""};
		this.nuevoUsuario = {id: Date.now(), name: "", email: "", password: "", profession: ""};
		this.tooltipText = "¡Rellena este campo!"


		//Se necesita de MaterializeAction y EventEmitter para poder manejar eventos con Angular4
		//Mediante Materialize en suplantacion de Jquery
		this.modalActions = new EventEmitter<string|MaterializeAction>();
		this.professionOptions = [{value: "ICI", name: "Ingeniero Civil Informatico"}, {value:"II", name: "Ingeniero Informatico"}];

	}

	  openModal() {
		this.modalActions.emit({action:"modal",params:['open']});
	  }
	  closeModal() {
		this.modalActions.emit({action:"modal",params:['close']});
	  }

	registrarUsuario()
	{
		if(this.nuevoUsuario.email=="" || this.nuevoUsuario.password=="" || this.nuevoUsuario.name==""|| this.nuevoUsuario.profession=="")
		{

			 this.modalActions.emit({action:"toast",params:[['Ingrese la informacion necesaria para su registro'],2000]}); 



		}
		else
		{
			this.authenticationService.registerUser(this.nuevoUsuario)
				.subscribe(result => {
					
						this.modalActions.emit({action:"toast",params:[['Tu registro ha sido exitoso <img src="../assets/loading.gif">'],1000]}); 
						this.closeModal();
						this.iniciosesion.email=this.nuevoUsuario.email;
						this.iniciosesion.password=this.nuevoUsuario.password;
						this.router.navigate(['home']);
						this.mainScreen.setDir("home");
						this.mainScreen.setLog(true);
					
				}, 
				//Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
				(err) => {
				if (err === 'Unauthorized') {
					this.modalActions.emit({action:"toast",params:[['Tus credenciales no son validas'],2000]}); 
					this.closeModal();
				}else if(err === 'UsedMail'){
					this.modalActions.emit({action:"toast",params:[['Este correo ya se encuentra registrado'],2000]}); 
					this.nuevoUsuario.email = "";
					console.log("Correo en uso");
				}});
	 
		}
	}

	  

	login() {

		if(this.iniciosesion.email=="" || this.iniciosesion.password==""){

			//Esta sera la nueva manera de manejar eventos con Angular4 
			//y esta la sintaxis para avisar de toast, o un modal, o un tooltip, etc
			//Siempre y cuando las directivas materialize [materializeActions]="modalActions"
			//Hayan sido declaradas en el HTML del componente
		this.modalActions.emit({action:"toast",params:[['Ingrese sus datos para iniciar sesion'],2000]});

		}else{ 
		this.authenticationService.login(this.iniciosesion.email, this.iniciosesion.password)
			.subscribe(result => {
					this.modalActions.emit({action:"toast",params:[['Iniciando sesion  <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
					
					this.mainScreen.setLog(true);
					setTimeout(() => {this.router.navigate(['home'])}, 1000);
					
				
			}, 
			//Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
			(err) => {
			if (err === 'Unauthorized') {
				this.modalActions.emit({action:"toast",params:[['Tus credenciales no son correctas'],2000]});
			}});

		}

	}
}
