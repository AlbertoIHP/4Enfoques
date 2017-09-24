import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-softgoal',
	templateUrl: './softgoal.component.html',
	styleUrls: ['./softgoal.component.css']
})
export class SoftgoalComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

}
