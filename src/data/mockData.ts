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
  address?: string; // Added for e-commerce context
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  sales: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: number;
  paymentMethod: string;
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

// --- Dashboard Overview Data (Revenue & Profit) ---
export const revenueData = [
  { name: 'Jan', revenue: 140000, profit: 80000, orders: 120 },
  { name: 'Feb', revenue: 210000, profit: 120000, orders: 180 },
  { name: 'Mar', revenue: 180000, profit: 95000, orders: 150 },
  { name: 'Apr', revenue: 290000, profit: 160000, orders: 240 },
  { name: 'May', revenue: 340000, profit: 210000, orders: 290 },
  { name: 'Jun', revenue: 410000, profit: 240000, orders: 350 },
  { name: 'Jul', revenue: 450000, profit: 280000, orders: 400 },
  { name: 'Aug', revenue: 380000, profit: 200000, orders: 320 },
  { name: 'Sep', revenue: 490000, profit: 310000, orders: 420 },
  { name: 'Oct', revenue: 520000, profit: 350000, orders: 460 },
  { name: 'Nov', revenue: 580000, profit: 410000, orders: 510 },
  { name: 'Dec', revenue: 650000, profit: 480000, orders: 600 },
];

// --- Mock Products (New for E-commerce) ---
export const mockProducts: Product[] = [
  { id: 1, name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 14999, stock: 45, rating: 4.8, sales: 1200 },
  { id: 2, name: "Smart Fitness Watch Gen 5", category: "Electronics", price: 4999, stock: 120, rating: 4.5, sales: 3400 },
  { id: 3, name: "Ergonomic Office Chair", category: "Furniture", price: 12500, stock: 15, rating: 4.7, sales: 230 },
  { id: 4, name: "Organic Green Tea Pack", category: "Groceries", price: 450, stock: 500, rating: 4.9, sales: 5600 },
  { id: 5, name: "Leather Laptop Bag", category: "Fashion", price: 3200, stock: 60, rating: 4.6, sales: 890 },
  { id: 6, name: "4K Ultra HD Smart TV 55\"", category: "Electronics", price: 45000, stock: 25, rating: 4.7, sales: 450 },
  { id: 7, name: "Running Shoes - Pro Series", category: "Fashion", price: 2800, stock: 85, rating: 4.4, sales: 1100 },
  { id: 8, name: "Ceramic Coffee Mug Set", category: "Home & Decor", price: 899, stock: 150, rating: 4.8, sales: 900 },
  { id: 9, name: "Gaming Keyboard RGB", category: "Electronics", price: 3500, stock: 40, rating: 4.6, sales: 780 },
  { id: 10, name: "Aloe Vera Skincare Gel", category: "Beauty", price: 399, stock: 200, rating: 4.5, sales: 2100 },
];

// --- Mock Orders (New for E-commerce) ---
export const mockOrders: Order[] = [
  { id: "ORD-7821", customerName: "Arjun Mehta", date: "2024-03-28", totalAmount: 14999, status: "Delivered", items: 1, paymentMethod: "Credit Card" },
  { id: "ORD-7822", customerName: "Priya Sharma", date: "2024-03-28", totalAmount: 850, status: "Processing", items: 3, paymentMethod: "UPI" },
  { id: "ORD-7823", customerName: "Rohan Joshi", date: "2024-03-27", totalAmount: 45000, status: "Shipped", items: 1, paymentMethod: "EMI" },
  { id: "ORD-7824", customerName: "Zara Khan", date: "2024-03-27", totalAmount: 2800, status: "Delivered", items: 1, paymentMethod: "COD" },
  { id: "ORD-7825", customerName: "Amit Patel", date: "2024-03-26", totalAmount: 12500, status: "Cancelled", items: 1, paymentMethod: "Debit Card" },
  { id: "ORD-7826", customerName: "Sneha Reddy", date: "2024-03-26", totalAmount: 399, status: "Delivered", items: 1, paymentMethod: "Wallet" },
  { id: "ORD-7827", customerName: "Vikram Malhotra", date: "2024-03-25", totalAmount: 6700, status: "Shipped", items: 2, paymentMethod: "Credit Card" },
  { id: "ORD-7828", customerName: "Ananya Das", date: "2024-03-25", totalAmount: 4999, status: "Processing", items: 1, paymentMethod: "UPI" },
];

// --- Mock Users (Admin/Staff/Customers) ---
export const mockUsers: User[] = [
  { id: 1, name: 'Arjun Mehta', email: 'arjun.m@example.com', age: 35, phone: '+91 98765 43210', access: 'admin', status: 'Active', address: 'Mumbai, MH' },
  { id: 2, name: 'Zara Khan', email: 'zara.k@example.com', age: 28, phone: '+91 98765 12345', access: 'manager', status: 'Active', address: 'Delhi, DL' },
  { id: 3, name: 'Vihaan Reddy', email: 'vihaan.r@example.com', age: 45, phone: '+91 98765 67890', access: 'user', status: 'Inactive', address: 'Bangalore, KA' },
  { id: 4, name: 'Ananya Das', email: 'ananya.d@example.com', age: 24, phone: '+91 98765 54321', access: 'user', status: 'Active', address: 'Kolkata, WB' },
  { id: 5, name: 'Kabir Singh', email: 'kabir.s@example.com', age: 31, phone: '+91 98765 98765', access: 'manager', status: 'Active', address: 'Pune, MH' },
  { id: 6, name: 'Meera Iyer', email: 'meera.i@example.com', age: 29, phone: '+91 98765 11223', access: 'user', status: 'Active', address: 'Chennai, TN' },
  { id: 7, name: 'Rohan Joshi', email: 'rohan.j@example.com', age: 40, phone: '+91 98765 33445', access: 'admin', status: 'Active', address: 'Hyderabad, TS' },
  { id: 8, name: 'Ishaan Verma', email: 'ishaan.v@example.com', age: 26, phone: '+91 98765 55667', access: 'user', status: 'Inactive', address: 'Noida, UP' },
  { id: 9, name: 'Priya Sharma', email: 'priya.s@example.com', age: 33, phone: '+91 98765 77889', access: 'manager', status: 'Active', address: 'Jaipur, RJ' },
  { id: 10, name: 'Amit Patel', email: 'amit.p@example.com', age: 27, phone: '+91 98765 99001', access: 'user', status: 'Active', address: 'Ahmedabad, GJ' },
  { id: 11, name: 'Sanya Gupta', email: 'sanya.g@example.com', age: 22, phone: '+91 98765 22334', access: 'user', status: 'Active', address: 'Lucknow, UP' },
  { id: 12, name: 'Vikram Malhotra', email: 'vikram.m@example.com', age: 50, phone: '+91 98765 44556', access: 'admin', status: 'Active', address: 'Chandigarh, PB' },
];

// --- Mock Invoices (B2B / Corporate) ---
export const mockInvoices: Invoice[] = [
  { id: 'INV-001', client: 'Tata Consultancy Services', date: '2024-03-01', amount: 250000, status: 'paid' },
  { id: 'INV-002', client: 'Infosys Ltd', date: '2024-03-05', amount: 150000, status: 'pending' },
  { id: 'INV-003', client: 'Wipro Technologies', date: '2024-03-08', amount: 350000, status: 'overdue' },
  { id: 'INV-004', client: 'Reliance Jio', date: '2024-03-10', amount: 50000, status: 'paid' },
  { id: 'INV-005', client: 'HDFC Bank', date: '2024-03-12', amount: 180000, status: 'pending' },
  { id: 'INV-006', client: 'Bharti Airtel', date: '2024-03-15', amount: 220000, status: 'paid' },
  { id: 'INV-007', client: 'ICICI Bank', date: '2024-03-18', amount: 125000, status: 'paid' },
];

// --- Mock Transactions (Recent Payments) ---
export const mockTransactions: Transaction[] = [
  { id: 'TXN_001', name: 'Rohan Sharma', date: '2024-03-20', amount: 45000, status: 'Success', method: 'UPI' },
  { id: 'TXN_002', name: 'Priya Verma', date: '2024-03-20', amount: 12500, status: 'Processing', method: 'Credit Card' },
  { id: 'TXN_003', name: 'Amit Patel', date: '2024-03-19', amount: 8900, status: 'Success', method: 'Net Banking' },
  { id: 'TXN_004', name: 'Sneha Reddy', date: '2024-03-19', amount: 2400, status: 'Failed', method: 'UPI' },
  { id: 'TXN_005', name: 'Vikram Singh', date: '2024-03-18', amount: 150000, status: 'Success', method: 'Direct Transfer' },
  { id: 'TXN_006', name: 'Anjali Gupta', date: '2024-03-18', amount: 6700, status: 'Success', method: 'Debit Card' },
  { id: 'TXN_007', name: 'Rahul Kumar', date: '2024-03-17', amount: 32000, status: 'Processing', method: 'UPI' },
  { id: 'TXN_008', name: 'Kavita Singh', date: '2024-03-17', amount: 5500, status: 'Success', method: 'Wallet' },
];

// --- Chart Data ---
export const barChartData = [
  { country: 'India', value: 950, color: "hsl(221, 83%, 53%)" },
  { country: 'USA', value: 400, color: "hsl(142, 71%, 45%)" },
  { country: 'UK', value: 300, color: "hsl(0, 84%, 60%)" },
  { country: 'UAE', value: 250, color: "hsl(35, 90%, 55%)" },
  { country: 'Singapore', value: 200, color: "hsl(280, 70%, 50%)" },
];

export const pieChartData = [
  { id: 'Electronics', label: 'Electronics', value: 350, color: "hsl(221, 70%, 50%)" },
  { id: 'Fashion', label: 'Fashion', value: 250, color: "hsl(142, 70%, 50%)" },
  { id: 'Groceries', label: 'Groceries', value: 200, color: "hsl(0, 70%, 50%)" },
  { id: 'Home', label: 'Home & Decor', value: 150, color: "hsl(35, 70%, 50%)" },
  { id: 'Beauty', label: 'Beauty', value: 100, color: "hsl(280, 70%, 50%)" },
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
  { id: 'ARE', value: 200000 },
  { id: 'CAN', value: 150000 },
  { id: 'AUS', value: 100000 },
  { id: 'DEU', value: 120000 },
  { id: 'FRA', value: 110000 },
];