export interface MenuItem {
  id: number;
  parentId: number;
  menuName: string;
  menuType: number;
  routePath?: string;
  perms?: string;
  sortNo: number;
  status: number;
}
