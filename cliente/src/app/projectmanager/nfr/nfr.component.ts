import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Nfr} from '../../models/nfr';
import {Softgoal} from '../../models/softgoal';
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;

@Component({
	selector: 'app-nfr',
	templateUrl: './nfr.component.html',
	styleUrls: ['./nfr.component.css']
})
export class NfrComponent implements OnInit {
	nfrs: Nfr[] = [];
  modalActions: any;
  actualSoftgoal: Softgoal = {id: Date.now(), name: "", description: "", relevance: "", goals_id: 0};
  nuevoNfr:any = {softgoals_id: JSON.parse(localStorage.getItem('softgoalId')), nfrs_id: 0, remember_token: "asd"};
  allNfrs: Nfr[] = JSON.parse(localStorage.getItem('allNfrs'));


	constructor(private router: Router, public projectservice: ProjectService)
  {
          this.modalActions = new EventEmitter<string|MaterializeAction>();
          this.projectservice.getSoftGoal(JSON.parse(localStorage.getItem('softgoalId'))).subscribe(data => {
          var todos: any = data;
          todos = todos.data;

          this.actualSoftgoal = todos;
          });


   }

	buscarNfr(id,nfrs){
		for (let x = 0 ; x < nfrs.length ; x++){
			if(nfrs[x].id === id){
				return nfrs[x];
			}
		}
	}


  obtenerNfrs(){

    this.nfrs = [];
    this.projectservice.getSoftgoalsNfrs().subscribe(data => {

            console.log("Tabla de claves foraneas conseguida con exito, Mostrando...")
            var todos: any = data;
            todos = todos.data;

            console.log(JSON.stringify(todos));

            console.log("Obteniendo ID del actual softogal, mostrando...")
            var currentSoftgoal = JSON.parse(localStorage.getItem('softgoalId'));

            console.log(currentSoftgoal);


            console.log(JSON.stringify(this.allNfrs));


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
                 this.nfrs.push(this.buscarNfr(nfrsIds[x], this.allNfrs));
            }

            console.log("Logrado, mostrando todos los NFRS para este softgoal "+JSON.stringify(this.nfrs));


            //localStorage.setItem('currentSoftgoals', JSON.stringify(this.softgoals));



          });
  }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){


			console.log("Iniciando peticion para obtener tabla de claves foraneas")
      this.obtenerNfrs();


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



 editarSoftgoal(){

    var softgoalId = JSON.parse(localStorage.getItem('softgoalId'));
    this.modalActions.emit({action:"toast",params:[['Actualizando informacion <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

    this.projectservice.editSoftGoal(this.actualSoftgoal, softgoalId).subscribe(data => {
    console.log(data);
    if(data.success === true){
      this.modalActions.emit({action:"toast",params:[['Editado exitosamente'],2000]});

    }else{
      this.modalActions.emit({action:"toast",params:[['Error al editar'],2000]});
    }

    });

  }

 agregarNfr(){
  this.modalActions.emit({action:"toast",params:[['Agregando Nfr <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
   this.nuevoNfr.nfrs_id = parseInt(this.nuevoNfr.nfrs_id);
   this.projectservice.addNfrs(this.nuevoNfr).subscribe(data => {
    if(data.success === true){
      this.modalActions.emit({action:"toast",params:[['Agregado exitosamente'],2000]});
      this.obtenerNfrs();
      this.closeModal();

    }else{
      this.modalActions.emit({action:"toast",params:[['Error al agregar'],2000]});
    }
   });
   console.log(this.nuevoNfr);
 }


 borrarNfr(id){

   var borrar = {softgoals_id: parseInt(JSON.parse(localStorage.getItem('softgoalId'))), nfrs_id: id, remember_token: "asd"};
   console.log(borrar);

 this.modalActions.emit({action:"toast",params:[['Eliminando Nfr <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

   this.projectservice.deleteSoftgoalNfr(borrar).subscribe(data => {
    if(data.success === true){
      this.modalActions.emit({action:"toast",params:[['Eliminado exitosamente'],2000]});
      this.obtenerNfrs();

    }else{
      this.modalActions.emit({action:"toast",params:[['Error al eliminar'],2000]});
    }
   });
 }

}
