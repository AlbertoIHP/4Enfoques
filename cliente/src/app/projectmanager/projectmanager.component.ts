import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MaterializeAction} from "angular2-materialize";
declare var Materialize:any;
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../services/project/project.service';


@Component({
	selector: 'app-projectmanager',
	templateUrl: './projectmanager.component.html',
	styleUrls: ['./projectmanager.component.css']
})
export class ProjectmanagerComponent implements OnInit {


	private id;
	sub: any;
	proyecto: Project;
	email: string = "";

	constructor(private router: Router, private route: ActivatedRoute, public projectService: ProjectService) {


	}

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
			this.sub = this.route.params.subscribe(params => {
					 this.id = +params['id']; // (+) converts string 'id' to a number
				});

			this.email = JSON.parse(localStorage.getItem('currentUser')).email;

			this.projectService.getProject(JSON.parse(localStorage.getItem('projectId'))).subscribe(data => {

						var info: any = data;
						console.log(info);
						this.proyecto = info.data;


					});
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}



	}

	private ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
