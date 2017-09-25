import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Softgoal} from '../../models/softgoal';
import {Goal} from '../../models/goal';
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;

@Component({
	selector: 'app-softgoal',
	templateUrl: './softgoal.component.html',
	styleUrls: ['./softgoal.component.css']
})
export class SoftgoalComponent implements OnInit {
	softgoals: Softgoal[] = [];
  modalActions: any;
  actualGoal: Goal = {id: Date.now(), name: "", description: "", relevance: "", stakeholders_id: 0};
  nuevoSoftgoal: Softgoal = {id: Date.now(), name: "", description: "", relevance: "", goals_id: JSON.parse(localStorage.getItem('goalId'))};


	constructor(private router: Router,public projectservice: ProjectService)
  {
    if(localStorage.getItem('goalId')){
          this.projectservice.getGoal(JSON.parse(localStorage.getItem('goalId'))).subscribe(data => {
          var todos: any = data;
          todos = todos.data;

          this.actualGoal = todos;
          });
    }
  }



obtenerSoftgoals(){
    this.softgoals = [];
          this.projectservice.getSoftGoals().subscribe(data => {
            var todos: any = data;
            todos = todos.data;

            var currentGoal = JSON.parse(localStorage.getItem('goalId'));

            for (let x = 0 ; x < todos.length ; x++){


              if(todos[x].goals_id === currentGoal){
                  this.softgoals.push(todos[x]);
              }

            }



            localStorage.setItem('currentSoftgoals', JSON.stringify(this.softgoals));



          });
  }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
      this.modalActions = new EventEmitter<string|MaterializeAction>();
      this.obtenerSoftgoals();
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}



	editarSoftgoal(id){
				localStorage.setItem('softgoalId',JSON.stringify(id));
				this.router.navigate(['project/nfr']);
	}




 editarGoal(){

    var goalId = JSON.parse(localStorage.getItem('goalId'));
    this.modalActions.emit({action:"toast",params:[['Actualizando informacion <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

    this.projectservice.editGoal(this.actualGoal, goalId).subscribe(data => {
    console.log(data);
    if(data.success === true){
      this.modalActions.emit({action:"toast",params:[['Editado exitosamente'],2000]});

    }else{
      this.modalActions.emit({action:"toast",params:[['Error al editar'],2000]});
    }

    });

  }



  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
    }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    }

  crearSoftgoal(){
     this.modalActions.emit({action:"toast",params:[['Agregando Goal <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

     this.projectservice.addSoftGoal(this.nuevoSoftgoal).subscribe(data => {
       if(data.success === true){
         this.modalActions.emit({action:"toast",params:[['Agregado exitosamente'],2000]});
         this.obtenerSoftgoals();
         this.closeModal();
         this.nuevoSoftgoal= {id: Date.now(), name: "", description: "", relevance: "", goals_id: JSON.parse(localStorage.getItem('goalId'))};
       }else{
         this.modalActions.emit({action:"toast",params:[['Error al Agregar'],2000]});
       }
     });
   }


borrarSoftgoal(id)
  {
      this.modalActions.emit({action:"toast",params:[['Borrando Goal <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
          this.projectservice.deleteSoftGoal(id).subscribe(data => {
            if(data.success === true){
             this.modalActions.emit({action:"toast",params:[['Eliminado exitosamente'],2000]});
             this.obtenerSoftgoals();
             this.closeModal();
           }else{
             this.modalActions.emit({action:"toast",params:[['Error al eliminar'],2000]});
           }
          });
    }

}
