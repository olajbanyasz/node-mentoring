export interface User {
    id: string | number;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
};

export interface Group {
  id: string;
  name: string;
  permissions: Array<Permission>
};

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';