import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreService } from 'src/app/services/store.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LogoutModalComponent } from '../../Modals/logout-modal/logout-modal.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService, private router: Router,public matDialog: MatDialog) {}

  logOutPopUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "logout-modal";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(LogoutModalComponent, dialogConfig);

  }
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

}
