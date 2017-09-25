import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { Stakeholder } from '../../models/stakeholder';
import { Goal } from '../../models/goal';
import { Softgoal } from '../../models/softgoal';
import { Nfr } from '../../models/nfr';


@Injectable()
export class ProjectService {

	public base: string = "http://localhost:8000/api/v1/";
	public options: RequestOptions;
	public headers: Headers;

	//Se construyen aquellos atributos utilizados por la clase
	constructor(
		private http: Http,
		private authenticationService: AuthenticationService)
	{
		console.log("Construyendo la cabezera con el token necesario");
		this.headers = new Headers({
			'Authorization': 'Bearer ' + this.authenticationService.token,
			'Content-Type': 'application/json'
		});

		this.options = new RequestOptions({ headers: this.headers });


	}

	getProject(id): Observable<Project>
	{
		return this.http.get(this.base+'projects/'+id, this.options).map((res: Response) => res.json());
	}


/**
	**FUNCIONES DE STAKEHOLDERS--------------------------------------------------------
**/
	getStakeholders(): Observable<Stakeholder[]>
	{
	return this.http.get(this.base+'stakeholders', this.options).map((res: Response) => res.json());
	}

	getStakeholder(id): Observable<Stakeholder>
	{
	return this.http.get(this.base+'stakeholders/'+id, this.options).map((res: Response) => res.json());
	}

	addStakeholder(stakeholder: Stakeholder){
		 return this.http.post(this.base+'stakeholders', JSON.stringify(stakeholder), this.options).map((res: Response) => res.json());

	}



	editStakeholder(stakeholder: Stakeholder, id: number){
	 return this.http.put(this.base+'stakeholders/'+id, JSON.stringify(stakeholder), this.options).map((res: Response) => res.json());
	}

	deleteStakeholder(id){
		return this.http.delete(this.base+'stakeholders/'+id, this.options).map((res: Response) => res.json());
	}

/**
	**--------------------------------------------------------------------------------
**/

/**
	**FUNCIONES DE GOALS--------------------------------------------------------
**/

	getGoals(): Observable<Goal[]>
	{
	return this.http.get(this.base+'goals', this.options).map((res: Response) => res.json());
	}

	getGoal(id): Observable<Goal>
	{
	return this.http.get(this.base+'goals/'+id, this.options).map((res: Response) => res.json());
	}

	addGoal(goal: Goal){
		 return this.http.post(this.base+'goals', JSON.stringify(goal), this.options).map((res: Response) => res.json());

	}



	editGoal(goal: Goal, id: number){
	 return this.http.put(this.base+'goals/'+id, JSON.stringify(goal), this.options).map((res: Response) => res.json());
	}

	deleteGoal(id){
		return this.http.delete(this.base+'goals/'+id, this.options).map((res: Response) => res.json());
	}


/**
	**--------------------------------------------------------------------------------
**/



/**
	**FUNCIONES DE SOFTGOALS--------------------------------------------------------
**/


	getSoftGoals(): Observable<Softgoal[]>
	{
	return this.http.get(this.base+'softgoals', this.options).map((res: Response) => res.json());
	}

	getSoftGoal(id): Observable<Softgoal>
	{
	return this.http.get(this.base+'softgoals/'+id, this.options).map((res: Response) => res.json());
	}

	addSoftGoal(softgoal: Softgoal){
		 return this.http.post(this.base+'softgoals', JSON.stringify(softgoal), this.options).map((res: Response) => res.json());

	}



	editSoftGoal(softgoal: Softgoal, id: number){
	 return this.http.put(this.base+'softgoals/'+id, JSON.stringify(softgoal), this.options).map((res: Response) => res.json());
	}

	deleteSoftGoal(id){
		return this.http.delete(this.base+'softgoals/'+id, this.options).map((res: Response) => res.json());
	}


/**
	**--------------------------------------------------------------------------------
**/





/**
	**FUNCIONES DE NFRS--------------------------------------------------------
**/
	getNfrs(): Observable<Nfr[]>
	{
	return this.http.get(this.base+'nfrs', this.options).map((res: Response) => res.json());
	}


	getSoftgoalsNfrs(){
	return this.http.get(this.base+'softgoalNfrs', this.options).map((res: Response) => res.json());
	}

  addNfrs(nuevo)
  {
   return this.http.post(this.base+'softgoalNfrs', JSON.stringify(nuevo), this.options).map((res: Response) => res.json());
  }


//ESTO ES IMPROVISACION ESTO DEBE CORREGIRSE !!! SE USA DELETE XD
  deleteSoftgoalNfr(borrar){
    return this.http.put(this.base+'softgoalNfrs', JSON.stringify(borrar), this.options).map((res: Response) => res.json());
  }


/**
	**--------------------------------------------------------------------------------
**/















}
