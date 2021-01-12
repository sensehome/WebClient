import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { APIService } from 'src/app/services/api.service';
import { UsersDto } from '../models/UsersDto';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['Name', 'Role','Subscription', 'Status'];
  subscriptionHeadElements = ['Name','Edit'];
  usersTable: any = [];
  UserForm: FormGroup;
  headingMessage: string = "";
  checkError = false;
  constructor(private apiService: APIService, private cdRef: ChangeDetectorRef,private router: Router, private modal: ModalModule) {

  }


  ngOnInit() {
    this.UserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      isActive: new FormControl(true),
    });
    this.apiService.getAllUsers().subscribe(data => {
      this.usersTable = data;
      this.mdbTable.setDataSource(this.usersTable);
    })
    this.usersTable = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onSubmit(){
    const value = { ...this.UserForm.value, type: +this.UserForm.value.type } as UsersDto;
    this.apiService.createUser(value).subscribe(
      (response) => window.location.reload(),
      (error) => this.headingMessage = error.message
    )
  }

  Subscription(id?: string){
    console.log(id);
  }


}
