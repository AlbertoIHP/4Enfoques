import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Nfr} from '../../models/nfr';

@Component({
	selector: 'app-nfr',
	templateUrl: './nfr.component.html',
	styleUrls: ['./nfr.component.css']
})
export class NfrComponent implements OnInit {
  nfrs: Nfr[] = [];

	constructor(private router: Router, public projectservice: ProjectService) { }

  buscarNfr(id,nfrs){
    for (let x = 0 ; x < nfrs.length ; x++){
      if(nfrs[x].id === id){
        return nfrs[x];
      }
    }
  }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){


      console.log("Iniciando peticion para obtener tabla de claves foraneas")

      this.projectservice.getSoftgoalsNfrs().subscribe(data => {

            console.log("Tabla de claves foraneas conseguida con exito, Mostrando...")
            var todos: any = data;
            todos = todos.data;

            console.log(JSON.stringify(todos));

            console.log("Obteniendo ID del actual softogal, mostrando...")
            var currentSoftgoal = JSON.parse(localStorage.getItem('softgoalId'));

            console.log(currentSoftgoal);

            console.log("Obteniendo lista completa de NFRS, mostrando");
            var allNfrs = JSON.parse(localStorage.getItem('allNfrs'));
            console.log(JSON.stringify(allNfrs));


            console.log("Buscando registros pertenecientes a la id del softgoal actual ("+currentSoftgoal+")");
            var nfrsIds = [];

            for (let x = 0 ; x < todos.length ; x++){
              if(todos[x].softgoals_id === currentSoftgoal){
                  nfrsIds.push(todos[x].nfrs_id);
              }
            }

            console.log("Logrado se ha encontrado el siguiente arreglo de Ids " +JSON.stringify(nfrsIds));

            console.log("Buscando en el arreglo de todos los nfrs aquellos con los id encontrados para este softgoal");
            for (let x = 0 ; x < nfrsIds.length ; x++){
                 this.nfrs.push(this.buscarNfr(nfrsIds[x], allNfrs));
            }

            console.log("Logrado, mostrando todos los NFRS para este softgoal "+JSON.stringify(this.nfrs));


            //localStorage.setItem('currentSoftgoals', JSON.stringify(this.softgoals));



          });

		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

}
