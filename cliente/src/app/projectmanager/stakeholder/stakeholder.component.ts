import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Stakeholder} from '../../models/stakeholder';
import {StakeholderForm} from '../../models/forms';
import { MaterializeAction } from 'angular2-materialize';

@Component({
	selector: 'app-stakeholder',
	templateUrl: './stakeholder.component.html',
	styleUrls: ['./stakeholder.component.css']
})
export class StakeholderComponent implements OnInit {
	stakeholders: Stakeholder[] = [];
 
  nuevoStakeholder: Stakeholder = {id: Date.now(), name: "", decription: "", function: "", profession: "", projects_id: JSON.parse(localStorage.getItem('projectId'))};

  nuevoFormulario: StakeholderForm = 
  {
    id: Date.now(),
    description: ""
  };

  modalActions1: any;
  modalActions2: any;
  forms : any;

	constructor(private router: Router,public projectservice: ProjectService) {
    this.modalActions1 = new EventEmitter<string|MaterializeAction>();
    this.modalActions2 = new EventEmitter<string|MaterializeAction>();
  }

  obtenerProyectos(){
      this.stakeholders = [];
      this.projectservice.getStakeholders().subscribe(data => {
      var todos: any = data;
      todos = todos.data;
      var currentProject = JSON.parse(localStorage.getItem('projectId'));

      for (let x = 0 ; x < todos.length ; x++){


        if(todos[x].projects_id === currentProject){
      console.log(JSON.stringify(todos[x]));
          this.stakeholders.push(todos[x]);
        }

      }



      localStorage.setItem('currentStakeholders', JSON.stringify(this.stakeholders));



      });
  }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
      this.obtenerProyectos();


		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

  crearStakeholder(){
  console.log(JSON.stringify(this.nuevoStakeholder));
  this.modalActions2.emit({action:"toast",params:[['Agregando Stakeholder <img style="width: 60px; height: 60px; max-width: 60px; max-height: 60px;  " src="../assets/loading.gif">'],1000]});

  this.projectservice.addStakeholder(this.nuevoStakeholder).subscribe(data => {
  if(data.success === true){
    this.modalActions2.emit({action:"toast",params:[['Agregado exitosamente'],2000]});
    this.nuevoStakeholder = {id: Date.now(), name: "", decription: "", function: "", profession: "", projects_id: JSON.parse(localStorage.getItem('projectId'))};
    this.obtenerProyectos();
    this.closeModal();

  }else{
    this.modalActions2.emit({action:"toast",params:[['Agregado exitosamente'],2000]});
    this.closeModal();
  }

  });

  }

	borrarStake(id){

    this.projectservice.deleteStakeholder(id).subscribe(data => {
      if(data.success === true){
        this.modalActions2.emit({action:"toast",params:[['Borrado exitosamente'],2000]});
        this.obtenerProyectos();
      }else{
        this.modalActions2.emit({action:"toast",params:[['Error al borrar'],2000]});
      }


    });
	}

	editarStake(id){
		localStorage.setItem('stakeholderId',JSON.stringify(id));
		this.router.navigate(['project/goal']);
   }


  openModal() {
  this.modalActions2.emit({action:"modal",params:['open']});
  }
  closeModal() {
  this.modalActions2.emit({action:"modal",params:['close']});
  }

  iniciarFormulario(){

    this.abrirFormulario();
  }

  enviarFormulario() {
    console.log(JSON.stringify(this.nuevoFormulario));

    var descripcion = this.nuevoFormulario.description;
    var res = descripcion.split(" ", 3);

    this.nuevoStakeholder.id = this.nuevoFormulario.id;
    this.nuevoStakeholder.name = res[0];
    this.nuevoStakeholder.decription = descripcion;
    this.nuevoStakeholder.function = res[1];
    this.nuevoStakeholder.profession = res[2];
    this.nuevoStakeholder.projects_id = JSON.parse(localStorage.getItem('projectId'));


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
