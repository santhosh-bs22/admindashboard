// src/types/index.ts
export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  method: string;
}

export interface MenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
  roles?: string[]; // Future proofing for RBAC
}