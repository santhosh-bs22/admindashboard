import { formatINR } from "../lib/utils";

// --- Interfaces ---
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  access: 'admin' | 'manager' | 'user';
  status: 'Active' | 'Inactive';
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: 'Processing' | 'Success' | 'Failed';
  method: string;
}

export interface Invoice {
  id: string;
  client: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

// --- Dashboard Overview Data ---
export const revenueData = [
  { name: 'Jan', revenue: 140000, profit: 80000 },
  { name: 'Feb', revenue: 210000, profit: 120000 },
  { name: 'Mar', revenue: 180000, profit: 95000 },
  { name: 'Apr', revenue: 290000, profit: 160000 },
  { name: 'May', revenue: 340000, profit: 210000 },
  { name: 'Jun', revenue: 410000, profit: 240000 },
  { name: 'Jul', revenue: 450000, profit: 280000 },
  { name: 'Aug', revenue: 380000, profit: 200000 },
  { name: 'Sep', revenue: 490000, profit: 310000 },
  { name: 'Oct', revenue: 520000, profit: 350000 },
  { name: 'Nov', revenue: 580000, profit: 410000 },
  { name: 'Dec', revenue: 650000, profit: 480000 },
];

// --- Mock Users (Expanded) ---
export const mockUsers: User[] = [
  { id: 1, name: 'Arjun Mehta', email: 'arjun.m@example.com', age: 35, phone: '+91 98765 43210', access: 'admin', status: 'Active' },
  { id: 2, name: 'Zara Khan', email: 'zara.k@example.com', age: 28, phone: '+91 98765 12345', access: 'manager', status: 'Active' },
  { id: 3, name: 'Vihaan Reddy', email: 'vihaan.r@example.com', age: 45, phone: '+91 98765 67890', access: 'user', status: 'Inactive' },
  { id: 4, name: 'Ananya Das', email: 'ananya.d@example.com', age: 24, phone: '+91 98765 54321', access: 'user', status: 'Active' },
  { id: 5, name: 'Kabir Singh', email: 'kabir.s@example.com', age: 31, phone: '+91 98765 98765', access: 'manager', status: 'Active' },
  { id: 6, name: 'Meera Iyer', email: 'meera.i@example.com', age: 29, phone: '+91 98765 11223', access: 'user', status: 'Active' },
  { id: 7, name: 'Rohan Joshi', email: 'rohan.j@example.com', age: 40, phone: '+91 98765 33445', access: 'admin', status: 'Active' },
  { id: 8, name: 'Ishaan Verma', email: 'ishaan.v@example.com', age: 26, phone: '+91 98765 55667', access: 'user', status: 'Inactive' },
  { id: 9, name: 'Priya Sharma', email: 'priya.s@example.com', age: 33, phone: '+91 98765 77889', access: 'manager', status: 'Active' },
  { id: 10, name: 'Amit Patel', email: 'amit.p@example.com', age: 27, phone: '+91 98765 99001', access: 'user', status: 'Active' },
  { id: 11, name: 'Sanya Gupta', email: 'sanya.g@example.com', age: 22, phone: '+91 98765 22334', access: 'user', status: 'Active' },
  { id: 12, name: 'Vikram Malhotra', email: 'vikram.m@example.com', age: 50, phone: '+91 98765 44556', access: 'admin', status: 'Active' },
  { id: 13, name: 'Neha Kapoor', email: 'neha.k@example.com', age: 30, phone: '+91 98765 66778', access: 'manager', status: 'Inactive' },
  { id: 14, name: 'Rajesh Kumar', email: 'rajesh.k@example.com', age: 38, phone: '+91 98765 88990', access: 'user', status: 'Active' },
  { id: 15, name: 'Simran Kaur', email: 'simran.k@example.com', age: 25, phone: '+91 98765 11122', access: 'user', status: 'Active' },
  { id: 16, name: 'Aditya Roy', email: 'aditya.r@example.com', age: 34, phone: '+91 98765 33344', access: 'user', status: 'Active' },
  { id: 17, name: 'Tanvi Shah', email: 'tanvi.s@example.com', age: 29, phone: '+91 98765 55566', access: 'manager', status: 'Active' },
  { id: 18, name: 'Kunal Deshmukh', email: 'kunal.d@example.com', age: 41, phone: '+91 98765 77788', access: 'admin', status: 'Inactive' },
  { id: 19, name: 'Riya Sen', email: 'riya.s@example.com', age: 23, phone: '+91 98765 99900', access: 'user', status: 'Active' },
  { id: 20, name: 'Farhan Akhtar', email: 'farhan.a@example.com', age: 36, phone: '+91 98765 22211', access: 'user', status: 'Active' },
];

// --- Mock Invoices (Expanded) ---
export const mockInvoices: Invoice[] = [
  { id: 'INV-001', client: 'Tata Consultancy Services', date: '2024-03-01', amount: 250000, status: 'paid' },
  { id: 'INV-002', client: 'Infosys Ltd', date: '2024-03-05', amount: 150000, status: 'pending' },
  { id: 'INV-003', client: 'Wipro Technologies', date: '2024-03-08', amount: 350000, status: 'overdue' },
  { id: 'INV-004', client: 'Reliance Jio', date: '2024-03-10', amount: 50000, status: 'paid' },
  { id: 'INV-005', client: 'HDFC Bank', date: '2024-03-12', amount: 180000, status: 'pending' },
  { id: 'INV-006', client: 'Bharti Airtel', date: '2024-03-15', amount: 220000, status: 'paid' },
  { id: 'INV-007', client: 'ICICI Bank', date: '2024-03-18', amount: 125000, status: 'paid' },
  { id: 'INV-008', client: 'State Bank of India', date: '2024-03-20', amount: 400000, status: 'overdue' },
  { id: 'INV-009', client: 'Mahindra & Mahindra', date: '2024-03-22', amount: 95000, status: 'pending' },
  { id: 'INV-010', client: 'Sun Pharma', date: '2024-03-25', amount: 310000, status: 'paid' },
  { id: 'INV-011', client: 'Asian Paints', date: '2024-03-26', amount: 75000, status: 'pending' },
  { id: 'INV-012', client: 'Bajaj Finance', date: '2024-03-28', amount: 260000, status: 'paid' },
  { id: 'INV-013', client: 'HCL Technologies', date: '2024-03-29', amount: 190000, status: 'overdue' },
  { id: 'INV-014', client: 'Larsen & Toubro', date: '2024-03-30', amount: 550000, status: 'paid' },
  { id: 'INV-015', client: 'Maruti Suzuki', date: '2024-03-31', amount: 145000, status: 'pending' },
];

// --- Mock Transactions (Expanded) ---
export const mockTransactions: Transaction[] = [
  { id: 'TXN_001', name: 'Rohan Sharma', date: '2024-03-20', amount: 45000, status: 'Success', method: 'UPI' },
  { id: 'TXN_002', name: 'Priya Verma', date: '2024-03-20', amount: 12500, status: 'Processing', method: 'Credit Card' },
  { id: 'TXN_003', name: 'Amit Patel', date: '2024-03-19', amount: 8900, status: 'Success', method: 'Net Banking' },
  { id: 'TXN_004', name: 'Sneha Reddy', date: '2024-03-19', amount: 2400, status: 'Failed', method: 'UPI' },
  { id: 'TXN_005', name: 'Vikram Singh', date: '2024-03-18', amount: 150000, status: 'Success', method: 'Direct Transfer' },
  { id: 'TXN_006', name: 'Anjali Gupta', date: '2024-03-18', amount: 6700, status: 'Success', method: 'Debit Card' },
  { id: 'TXN_007', name: 'Rahul Kumar', date: '2024-03-17', amount: 32000, status: 'Processing', method: 'UPI' },
  { id: 'TXN_008', name: 'Kavita Singh', date: '2024-03-17', amount: 5500, status: 'Success', method: 'Wallet' },
  { id: 'TXN_009', name: 'Deepak Chopra', date: '2024-03-16', amount: 21000, status: 'Success', method: 'Credit Card' },
  { id: 'TXN_010', name: 'Manish Malhotra', date: '2024-03-16', amount: 1800, status: 'Failed', method: 'Net Banking' },
  { id: 'TXN_011', name: 'Swati Rao', date: '2024-03-15', amount: 75000, status: 'Success', method: 'Direct Transfer' },
  { id: 'TXN_012', name: 'Arun Jha', date: '2024-03-15', amount: 4200, status: 'Processing', method: 'UPI' },
];

// --- Chart Data ---
export const barChartData = [
  { country: 'India', value: 950 },
  { country: 'USA', value: 400 },
  { country: 'UK', value: 300 },
  { country: 'UAE', value: 250 },
  { country: 'Singapore', value: 200 },
  { country: 'Canada', value: 180 },
  { country: 'Australia', value: 150 },
];

export const pieChartData = [
  { id: 'Electronics', label: 'Electronics', value: 350 },
  { id: 'Fashion', label: 'Fashion', value: 250 },
  { id: 'Groceries', label: 'Groceries', value: 200 },
  { id: 'Home', label: 'Home & Decor', value: 150 },
  { id: 'Beauty', label: 'Beauty', value: 100 },
  { id: 'Books', label: 'Books', value: 50 },
];

export const lineChartData = [
  {
    id: 'Revenue',
    color: 'hsl(221, 83%, 53%)',
    data: [
      { x: 'Jan', y: 40000 },
      { x: 'Feb', y: 30000 },
      { x: 'Mar', y: 45000 },
      { x: 'Apr', y: 52000 },
      { x: 'May', y: 48000 },
      { x: 'Jun', y: 61000 },
      { x: 'Jul', y: 55000 },
      { x: 'Aug', y: 67000 },
      { x: 'Sep', y: 62000 },
      { x: 'Oct', y: 72000 },
      { x: 'Nov', y: 68000 },
      { x: 'Dec', y: 80000 },
    ],
  },
  {
    id: 'Expenses',
    color: 'hsl(0, 84%, 60%)',
    data: [
      { x: 'Jan', y: 20000 },
      { x: 'Feb', y: 18000 },
      { x: 'Mar', y: 22000 },
      { x: 'Apr', y: 25000 },
      { x: 'May', y: 23000 },
      { x: 'Jun', y: 28000 },
      { x: 'Jul', y: 26000 },
      { x: 'Aug', y: 30000 },
      { x: 'Sep', y: 28000 },
      { x: 'Oct', y: 32000 },
      { x: 'Nov', y: 29000 },
      { x: 'Dec', y: 35000 },
    ],
  },
  {
    id: 'Profit',
    color: 'hsl(142, 71%, 45%)',
    data: [
      { x: 'Jan', y: 20000 },
      { x: 'Feb', y: 12000 },
      { x: 'Mar', y: 23000 },
      { x: 'Apr', y: 27000 },
      { x: 'May', y: 25000 },
      { x: 'Jun', y: 33000 },
      { x: 'Jul', y: 29000 },
      { x: 'Aug', y: 37000 },
      { x: 'Sep', y: 34000 },
      { x: 'Oct', y: 40000 },
      { x: 'Nov', y: 39000 },
      { x: 'Dec', y: 45000 },
    ],
  },
];

export const geographyData = [
  { id: 'IND', value: 1000000 },
  { id: 'USA', value: 500000 },
  { id: 'CHN', value: 450000 },
  { id: 'GBR', value: 250000 },
  { id: 'ARE', value: 200000 }, // UAE
  { id: 'CAN', value: 150000 },
  { id: 'AUS', value: 100000 },
  { id: 'DEU', value: 120000 }, // Germany
  { id: 'FRA', value: 110000 }, // France
];