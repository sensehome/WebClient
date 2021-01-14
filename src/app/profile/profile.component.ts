import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { APIService } from 'src/app/services/api.service';
import { UsersDto } from '../models/UsersDto';
import { ModalModule } from 'angular-bootstrap-md'
import { SubscriptionDto } from '../models/SubscriptionDto';
import { Observable } from 'rxjs/internal/Observable';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef} from '@angular/core';

import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';


import {map, startWith} from 'rxjs/operators';

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
  subscriptionTable: string[] = [];
  UserForm: FormGroup;
  headingMessage: string = "";
  checkError = false;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['home/temperature', 'home/humidity', 'home/motion', 'home/light', 'home/fan'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private apiService: APIService, private cdRef: ChangeDetectorRef,private router: Router, private modal: ModalModule) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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
    this.apiService.getSubscriptionsByUserId(id).subscribe(data => {
      let sub = data as SubscriptionDto;
      this.fruits = [];
      if(id === sub.userId){
        console.log(sub);
      }

    })

  }



}
