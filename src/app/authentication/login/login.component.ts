import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { LoginDto, TokenDto } from 'src/app/models/AuthenticationDto';
import { APIService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(private router: Router, private apiService: APIService) { }

  login(form: NgForm) {
    let loginData = form.value as LoginDto
    this.apiService.login(loginData).subscribe(res => {
      let token = res as TokenDto
      StoreService.setBearerToken(token.bearer);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    })
  }
}


