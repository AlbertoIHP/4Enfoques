import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nfr',
	templateUrl: './nfr.component.html',
	styleUrls: ['./nfr.component.css']
})
export class NfrComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

}
