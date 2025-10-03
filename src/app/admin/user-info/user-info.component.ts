import { Component, OnInit } from '@angular/core';
import { RoleModel, UpdateRoleRequestModel, UserFilterModel, UserInformation, UserPageResult } from 'src/app/core/models/user-info.model';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public tableData: any[] = [];
  public isLoading: boolean;

  searchStringUserName: string = '';
  searchStringEmail: string = '';
  searchStringRole: string = '';
  page: number = 1;
  count: number = 25;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  userList: UserInformation[] = [];
  userCopyList: UserInformation[] = [];
  roles: RoleModel[] = [];
  data: UserPageResult = {} as UserPageResult;
  orderByTemp: string = ''
  sortDirection: string = ''
  filer: UserFilterModel = {
    pageIndex: this.page,
    pageSize: this.tableSize,
    userName: null,
    email: null,
    roleName: null,
    createDate: null,
    lastloginDate: null,
    orderBy: null
  }
  constructor(private service: UserService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getUserInfo();
  }

  getRoles() {
    this.isLoading = true;
    this.service.getRoles().subscribe(data => {
      if (data) {
        this.roles = data;
      } else {
        this.roles = [];
      }
      this.isLoading = false;
    });
  }

  getUserInfo() {
    this.isLoading = true;
    this.service.getUserInfo(this.filer).subscribe(data => {
      if (data) {
        this.userList = data.users;
        this.userCopyList = [...data.users];
        this.count = data.TotalRow;
      } else {
        this.userList = [];
        this.count = 0;
      }
      this.isLoading = false;
    });
  }

  pageChanged(event: any) {
    this.page = event;
    this.filer.pageIndex = event;
    this.getUserInfo();
  }

  handleFilterUserName() {
    this.filer.userName = this.searchStringUserName;
    this.getUserInfo();
  }

  handleFilterEmail() {
    this.filer.email = this.searchStringEmail;
    this.getUserInfo();
  }

  handleFilterRoleName(event: any) {
    this.filer.roleName = event.target.value;
    this.getUserInfo();
  }

  orderBy(col: string) {
    if (this.orderByTemp == col && this.sortDirection == 'asc') {
      this.filer.orderBy = `${col} desc`;
      this.sortDirection = 'desc';
    }
    else {
      this.filer.orderBy = `${col} asc`;
      this.sortDirection = 'asc';
    }
    this.orderByTemp = col;
    this.getUserInfo();
  }

  updateRole(user: UserInformation) {
    const question = `Are you want to Change Role?`;
    Swal.fire({
      title: 'Are you sure?',
      text: question,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveRole(user);
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getUserInfo();
      }
    });
  }

  saveRole(user: UserInformation) {
    this.isLoading = true;
    let param: UpdateRoleRequestModel = {
      RoleId: user.RoleId,
      UserId: user.UserId
    };
    this.service.updateRole(param).subscribe(data => {
      this.isLoading = false;
      Swal.fire({
        title: 'Success',
        text: 'Role has been updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then();
    });
  }
}

