
export interface UserVO {
  id: number;
  username: string;
  nickname: string;
  mobile: string;
  status: number;
  createdAt: string;
  roleCodes?: string[];
}

export interface RoleVO {
  id: number;
  roleName: string;
  roleCode: string;
  status: number;
}

export interface MenuVO {
  id: number;
  parentId: number;
  menuName: string;
  menuType: number;
  routePath?: string;
  perms?: string;
  sortNo: number;
  status: number;
}
