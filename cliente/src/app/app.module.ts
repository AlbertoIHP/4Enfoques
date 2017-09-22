//Modulose
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routes/app-routing.module';
import { MaterializeModule } from 'angular2-materialize';


//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


//Servicios 
import { UserService } from './services/user/user.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HighlightDirective } from './directives/highlight/highlight.directive';


@NgModule({
  declarations: [
		AppComponent,
		LoginComponent,
		HighlightDirective,
		HomeComponent
  ],
  imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpModule,
		MaterializeModule
  ],
  providers: [
		UserService,
		AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
