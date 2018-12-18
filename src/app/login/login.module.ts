import { AuthLoginService } from './../auth/auth-login.service';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [    
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthLoginService
  ],
  declarations: [      
    LoginComponent
  ],
})
export class LoginModule { }
