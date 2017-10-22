//Modulose
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './routes/app-routing.module';
import { MaterializeModule } from 'angular2-materialize';


//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjectmanagerComponent } from './projectmanager/projectmanager.component';
import { PreviewComponent } from './projectmanager/preview/preview.component';
import { StakeholderComponent } from './projectmanager/stakeholder/stakeholder.component';
import { NfrComponent } from './projectmanager/nfr/nfr.component';
import { GoalComponent } from './projectmanager/goal/goal.component';
import { SoftgoalComponent } from './projectmanager/softgoal/softgoal.component';

//Servicios
import { UserService } from './services/user/user.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ProjectService } from './services/project/project.service';
import { HighlightDirective } from './directives/highlight/highlight.directive';



@NgModule({
  declarations: [
		AppComponent,
		LoginComponent,
		HighlightDirective,
		HomeComponent,
		ProjectmanagerComponent,
		PreviewComponent,
		StakeholderComponent,
		NfrComponent,
		GoalComponent,
		SoftgoalComponent
  ],
  imports: [
		BrowserModule,
		routing,
		FormsModule,
		HttpModule,
		MaterializeModule
  ],
  providers: [
		UserService,
		AuthenticationService,
	  appRoutingProviders,
	  ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
