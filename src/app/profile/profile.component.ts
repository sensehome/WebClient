import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { APIService } from 'src/app/services/api.service';

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
  headElements = ['Name', 'Role', 'Status'];
  usersTable: any = [];
  constructor(private apiService: APIService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe(data => {
      this.usersTable = data;
      console.log(this.usersTable);
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

}
