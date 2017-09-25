import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Softgoal} from '../../models/softgoal';
import {Goal} from '../../models/goal';
import {SoftGoalForm} from '../../models/forms';
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;

@Component({
	selector: 'app-softgoal',
	templateUrl: './softgoal.component.html',
	styleUrls: ['./softgoal.component.css']
})
export class SoftgoalComponent implements OnInit {
	softgoals: Softgoal[] = [];
  actualGoal: Goal = {id: Date.now(), name: "", description: "", relevance: "", stakeholders_id: 0};
  nuevoSoftgoal: Softgoal = {id: Date.now(), name: "", description: "", relevance: "", goals_id: JSON.parse(localStorage.getItem('goalId'))};

  nuevoFormulario: SoftGoalForm = 
  {
    id: Date.now(),
    description: ""
  };

  modalActions1: any;
  modalActions2: any;
  forms : any; 

	constructor(private router: Router,public projectservice: ProjectService)
  {
    if(localStorage.getItem('goalId')){
          this.projectservice.getGoal(JSON.parse(localStorage.getItem('goalId'))).subscribe(data => {
          var todos: any = data;
          todos = todos.data;

          this.actualGoal = todos;
          });
          this.modalActions1 = new EventEmitter<string|MaterializeAction>();
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
      this.modalActions2 = new EventEmitter<string|MaterializeAction>();
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
    this.modalActions2.emit({action:"toast",params:[['Actualizando informacion <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

    this.projectservice.editGoal(this.actualGoal, goalId).subscribe(data => {
    console.log(data);
    if(data.success === true){
      this.modalActions2.emit({action:"toast",params:[['Editado exitosamente'],2000]});

    }else{
      this.modalActions2.emit({action:"toast",params:[['Error al editar'],2000]});
    }

    });

  }



  openModal() {
    this.modalActions2.emit({action:"modal",params:['open']});
    }

  closeModal() {
    this.modalActions2.emit({action:"modal",params:['close']});
    }

  crearSoftgoal(){
     this.modalActions2.emit({action:"toast",params:[['Agregando Goal <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

     this.projectservice.addSoftGoal(this.nuevoSoftgoal).subscribe(data => {
       if(data.success === true){
         this.modalActions2.emit({action:"toast",params:[['Agregado exitosamente'],2000]});
         this.obtenerSoftgoals();
         this.closeModal();
         this.nuevoSoftgoal= {id: Date.now(), name: "", description: "", relevance: "", goals_id: JSON.parse(localStorage.getItem('goalId'))};
       }else{
         this.modalActions2.emit({action:"toast",params:[['Error al Agregar'],2000]});
       }
     });
   }


borrarSoftgoal(id)
  {
      this.modalActions2.emit({action:"toast",params:[['Borrando Goal <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
          this.projectservice.deleteSoftGoal(id).subscribe(data => {
            if(data.success === true){
             this.modalActions2.emit({action:"toast",params:[['Eliminado exitosamente'],2000]});
             this.obtenerSoftgoals();
             this.closeModal();
           }else{
             this.modalActions2.emit({action:"toast",params:[['Error al eliminar'],2000]});
           }
          });
    }

  iniciarFormulario(){

    this.abrirFormulario();
  }

  enviarFormulario() {
    console.log(JSON.stringify(this.nuevoFormulario));

    var descripcion = this.nuevoFormulario.description;
    var res = descripcion.split(" ", 3);

    this.nuevoSoftgoal.id = this.nuevoFormulario.id;
    this.nuevoSoftgoal.name = res[0];
    this.nuevoSoftgoal.description = descripcion;
    this.nuevoSoftgoal.relevance = res[1];
    this.nuevoSoftgoal.goals_id = JSON.parse(localStorage.getItem('goalId'));

    this.modalActions1.emit({action:"toast",params:[['Procesando formulario  <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});
    this.cerrarFormulario();

    this.nuevoFormulario =
    {
      id: Date.now(),
      description: "",
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
