export interface UserPageResult {
    TotalRow: number;
    users: UserInformation[];
}

export interface UserInformation {
    UserId: string;
    RoleId: string;
    UserName: string;
    Email: string;
    RoleName: string;
    CreateDate?: string;
    LastloginDate?: string;
}

export interface UserFilterModel {
    userName: string;
    email: string;
    roleName: string;
    createDate: string;
    lastloginDate: string;
    pageIndex: number;
    pageSize: number;
    orderBy: string;
}

export interface RoleModel {
    RoleId: string;
    RoleName: string;
}


export interface UpdateRoleRequestModel {
    RoleId: string;
    UserId: string;
}