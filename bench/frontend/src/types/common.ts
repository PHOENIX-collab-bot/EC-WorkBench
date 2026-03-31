export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResult<T> {
  total: number;
  pageNo: number;
  pageSize: number;
  list: T[];
}
