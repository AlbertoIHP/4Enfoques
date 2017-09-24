import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
		if(localStorage.getItem('currentUser')){
		}else{
			console.log("Acceso denegado");
			this.router.navigate(['']);
		}
	}

}
