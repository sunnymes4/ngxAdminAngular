import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
    public httpOption;
    public envURL = environment.apiServerUrl;

    constructor(private _http: Http) { }
   
    login(param) {
      const uri = this.envURL + 'keycloakauth/getToken?username=' + param.username.toLowerCase() + '&password=' + param.password;
      return this._http.get(uri)//.map((res: any) => res.json());
    }

}
