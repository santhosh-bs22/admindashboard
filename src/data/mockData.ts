export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  access: 'admin' | 'manager' | 'user';
}

export interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

export const mockUsers: User[] = [
  { id: 1, name: 'Jon Snow', email: 'jonsnow@gmail.com', age: 35, phone: '(665)121-5454', access: 'admin' },
  { id: 2, name: 'Cersei Lannister', email: 'cerseilannister@gmail.com', age: 42, phone: '(421)314-2288', access: 'manager' },
  { id: 3, name: 'Jaime Lannister', email: 'jaimelannister@gmail.com', age: 45, phone: '(422)982-6739', access: 'user' },
  { id: 4, name: 'Anya Stark', email: 'anyastark@gmail.com', age: 16, phone: '(921)425-6742', access: 'user' },
  { id: 5, name: 'Daenerys Targaryen', email: 'daenerystargaryen@gmail.com', age: 31, phone: '(421)445-1189', access: 'admin' },
  { id: 6, name: 'Ever Melisandre', email: 'evermelisandre@gmail.com', age: 150, phone: '(232)545-6483', access: 'manager' },
  { id: 7, name: 'Ferrara Clifford', email: 'ferraraclifford@gmail.com', age: 44, phone: '(543)124-0123', access: 'user' },
  { id: 8, name: 'Rossini Frances', email: 'rossinifrances@gmail.com', age: 36, phone: '(222)444-5555', access: 'user' },
];

export const mockTransactions: Transaction[] = [
  { id: 1, name: 'John Doe', date: '2024-01-01', amount: 2500, status: 'completed' },
  { id: 2, name: 'Jane Smith', date: '2024-01-02', amount: 1500, status: 'pending' },
  { id: 3, name: 'Bob Johnson', date: '2024-01-03', amount: 3500, status: 'completed' },
  { id: 4, name: 'Alice Brown', date: '2024-01-04', amount: 500, status: 'failed' },
  { id: 5, name: 'Charlie Wilson', date: '2024-01-05', amount: 1800, status: 'completed' },
];

export const barChartData = [
  { country: 'USA', value: 400 },
  { country: 'Canada', value: 300 },
  { country: 'Germany', value: 300 },
  { country: 'France', value: 200 },
  { country: 'Japan', value: 278 },
  { country: 'China', value: 189 },
];

export const pieChartData = [
  { id: 'React', label: 'React', value: 35 },
  { id: 'Vue', label: 'Vue', value: 25 },
  { id: 'Angular', label: 'Angular', value: 20 },
  { id: 'Svelte', label: 'Svelte', value: 15 },
  { id: 'Other', label: 'Other', value: 5 },
];

export const lineChartData = [
  {
    id: 'revenue',
    color: 'hsl(221, 83%, 53%)',
    data: [
      { x: 'Jan', y: 4000 },
      { x: 'Feb', y: 3000 },
      { x: 'Mar', y: 2000 },
      { x: 'Apr', y: 2780 },
      { x: 'May', y: 1890 },
      { x: 'Jun', y: 2390 },
      { x: 'Jul', y: 3490 },
    ],
  },
  {
    id: 'profit',
    color: 'hsl(142, 76%, 36%)',
    data: [
      { x: 'Jan', y: 2400 },
      { x: 'Feb', y: 1398 },
      { x: 'Mar', y: 9800 },
      { x: 'Apr', y: 3908 },
      { x: 'May', y: 4800 },
      { x: 'Jun', y: 3800 },
      { x: 'Jul', y: 4300 },
    ],
  },
];

export const geographyData = [
  { id: 'USA', value: 1234567 },
  { id: 'CAN', value: 987654 },
  { id: 'MEX', value: 456789 },
  { id: 'BRA', value: 234567 },
  { id: 'ARG', value: 123456 },
  { id: 'GBR', value: 876543 },
  { id: 'FRA', value: 765432 },
  { id: 'DEU', value: 654321 },
  { id: 'CHN', value: 543210 },
  { id: 'IND', value: 432109 },
];