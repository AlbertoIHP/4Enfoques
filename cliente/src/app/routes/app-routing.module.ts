import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



//Se importan todos los modulos a rutear
import { LoginComponent }   from '../login/login.component';
import { HomeComponent }   from '../home/home.component';
import { ProjectmanagerComponent }   from '../projectmanager/projectmanager.component';
import { PreviewComponent } from '../projectmanager/preview/preview.component';
import { StakeholderComponent } from '../projectmanager/stakeholder/stakeholder.component';
import { NfrComponent } from '../projectmanager/nfr/nfr.component';
import { GoalComponent } from '../projectmanager/goal/goal.component';
import { SoftgoalComponent } from '../projectmanager/softgoal/softgoal.component';

//Se declaran como constantes todas las rutas con sus respectivos nombres
const routes: Routes = [
	{ path: '',  component: LoginComponent },
	{ path: 'home',  component: HomeComponent },
  { path: 'project',  component: ProjectmanagerComponent,
	children: [
	  { path: '', component: PreviewComponent},
	  { path: 'stakeholder', component: StakeholderComponent },
	{ path: 'goal', component: GoalComponent },
	{ path: 'softgoal', component: SoftgoalComponent },
	{ path: 'nfr', component: NfrComponent },
	{ path: 'preview', component: PreviewComponent }
	]
   }


];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
