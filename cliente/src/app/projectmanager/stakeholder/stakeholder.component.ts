import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-stakeholder',
	templateUrl: './stakeholder.component.html',
	styleUrls: ['./stakeholder.component.css']
})
export class StakeholderComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

}
