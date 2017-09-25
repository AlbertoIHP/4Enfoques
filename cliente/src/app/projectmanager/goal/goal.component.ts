import { Component,Injectable, Input, Output, EventEmitter, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Goal} from '../../models/goal';
import {Stakeholder} from '../../models/stakeholder';
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;



@Component({
	selector: 'app-goal',
	templateUrl: './goal.component.html',
	styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
	goals: Goal[] = [];
  actualStakeholder: Stakeholder = {id: Date.now(), name: "", decription: "", function: "", profession: "", projects_id: 0};
  modalActions: any;
  nuevoGoal: Goal = {id: Date.now(), name: "", description: "", relevance: "", stakeholders_id: JSON.parse(localStorage.getItem('stakeholderId'))};

	constructor(private router: Router, public projectservice: ProjectService)
  {
  	if(localStorage.getItem('stakeholderId')){
  			  this.projectservice.getStakeholder(JSON.parse(localStorage.getItem('stakeholderId'))).subscribe(data => {
  				var todos: any = data;
  				todos = todos.data;

  				this.actualStakeholder = todos;
  			  });
  	}
  }

  obtenerGoals(){
    this.goals = [];
          this.projectservice.getGoals().subscribe(data => {
            var todos: any = data;
            todos = todos.data;

            var currentStake = JSON.parse(localStorage.getItem('stakeholderId'));

            for (let x = 0 ; x < todos.length ; x++){


              if(todos[x].stakeholders_id === currentStake){
                  this.goals.push(todos[x]);
              }

            }

            localStorage.setItem('currentGoals', JSON.stringify(this.goals));
          });
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
    }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		this.modalActions = new EventEmitter<string|MaterializeAction>();
    this.obtenerGoals();




		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}




	borrarGoal(id)
  {
      this.modalActions.emit({action:"toast",params:[['Borrando Goal <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
  				this.projectservice.deleteGoal(id).subscribe(data => {
            if(data.success === true){
             this.modalActions.emit({action:"toast",params:[['Eliminado exitosamente'],2000]});
             this.obtenerGoals();
             this.closeModal();
           }else{
             this.modalActions.emit({action:"toast",params:[['Error al eliminar'],2000]});
           }
          });
		}

	editarGoal(id){
				localStorage.setItem('goalId',JSON.stringify(id));
				this.router.navigate(['project/softgoal']);
	 }

   crearGoal(){
     this.modalActions.emit({action:"toast",params:[['Agregando Goal <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
     this.projectservice.addGoal(this.nuevoGoal).subscribe(data => {
       if(data.success === true){
         this.modalActions.emit({action:"toast",params:[['Agregado exitosamente'],2000]});
         this.obtenerGoals();
         this.closeModal();
         this.nuevoGoal= {id: Date.now(), name: "", description: "", relevance: "", stakeholders_id: JSON.parse(localStorage.getItem('stakeholderId'))};
       }else{
         this.modalActions.emit({action:"toast",params:[['Error al Agregar'],2000]});
       }
     });
   }

  editarStakeholder(){

    var stakeholderId = JSON.parse(localStorage.getItem('stakeholderId'));
    this.modalActions.emit({action:"toast",params:[['Actualizando informacion <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

    this.projectservice.editStakeholder(this.actualStakeholder, stakeholderId).subscribe(data => {
  	console.log(data);
  	if(data.success === true){
  	  this.modalActions.emit({action:"toast",params:[['Editado exitosamente'],2000]});

  	}else{
  	  this.modalActions.emit({action:"toast",params:[['Error al editar'],2000]});
  	}

  	});

  }

}
