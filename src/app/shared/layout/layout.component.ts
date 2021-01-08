import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  ngOnInit(){}

  isUserAuthenticated() {
    const token: string = StoreService.getBearerToken();
    if (token !== "" && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut(){
    StoreService.removeBearerToken();
    this.router.navigate(["/login"])
  }

}
