import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutModalComponent>,private router: Router) { }

  ngOnInit() {
  }

  actionFunction() {
    StoreService.removeBearerToken();
    this.router.navigate(["/login"])
    this.closeModal();
  }
  closeModal() {
    this.dialogRef.close();
  }


}
