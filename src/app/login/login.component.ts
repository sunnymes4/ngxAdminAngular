import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../auth/auth-login.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthLoginService]
})
export class LoginComponent implements OnInit {  
  private isLoginError = false;
  private loginFormGroup: FormGroup;
  constructor(
    private router: Router,
    private _authLoginService: AuthLoginService,
    private formBuilder: FormBuilder,){}
 
  ngOnInit() {
    this.intializedashboardForm();
  }

  private intializedashboardForm() {
    this.loginFormGroup = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
      // rememberMe: new FormControl(''),
    });
  }

  public login() {
    const param = {
      username: this.loginFormGroup.value.username.toLowerCase(),
      password: this.loginFormGroup.value.password,
      rememberMe: this.loginFormGroup.value.rememberMe,
    }
    this._authLoginService.login(param)   
      .subscribe((data:any)  => {
        if (data) {
          sessionStorage.setItem('Token', JSON.parse(data._body).access_token);
          sessionStorage.setItem('UserName', param.username);
          this.router.navigate(['/pages/dashboard'], { replaceUrl: true });   
        } else {
          alert('Incorrect UserName & password');
        }
      },
      (err) => {
        this.isLoginError = err;
      },
    );
  }



}


