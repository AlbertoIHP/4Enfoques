import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-goal',
	templateUrl: './goal.component.html',
	styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

}
