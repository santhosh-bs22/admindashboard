import React, { useState } from 'react';
import Header from '../../components/Header';
import { Card, CardContent } from '../../components/ui/card';
import { mockProducts, Product } from '../../data/mockData';
import { formatINR } from '../../lib/utils';
import { 
  Star, 
  Package, 
  Plus, 
  Search, 
  X, 
  Edit2, 
  Trash2,
  Tag,
  DollarSign
} from 'lucide-react';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);

  // --- Handlers ---

  const handleOpenAdd = () => {
    setCurrentProduct({ rating: 4.5, sales: 0 }); // Default values
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentProduct.id) {
      setProducts(products.map(p => 
        p.id === currentProduct.id ? { ...p, ...currentProduct } as Product : p
      ));
    } else {
      const newProduct: Product = {
        ...currentProduct,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        price: Number(currentProduct.price),
        stock: Number(currentProduct.stock),
      } as Product;
      setProducts([newProduct, ...products]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  // --- Filtering ---
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Header title="Products" subtitle="Manage your inventory" />
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-md relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-all duration-300 group relative">
            
            {/* Action Buttons (Visible on Hover) */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleOpenEdit(product)}
                className="p-2 bg-background/90 rounded-full shadow-sm hover:text-blue-600 transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(product.id)}
                className="p-2 bg-background/90 rounded-full shadow-sm hover:text-red-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg leading-tight line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" />
                    <span>{product.category}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-full shrink-0 ${product.stock < 20 ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                  <Package className="h-5 w-5" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-xl text-primary flex items-center">
                    <span className="text-sm mr-0.5">₹</span>
                    {product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 fill-current mr-1" />
                    <span className="text-xs font-bold">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground pt-3 border-t">
                  <span className={product.stock < 10 ? "text-red-500 font-semibold" : ""}>
                    {product.stock} in stock
                  </span>
                  <span>{product.sales} sold</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md p-6 rounded-lg shadow-xl border relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <input 
                  name="name" 
                  required
                  value={currentProduct.name || ''} 
                  onChange={handleInputChange}
                  placeholder="e.g. Wireless Mouse"
                  className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <select 
                  name="category" 
                  value={currentProduct.category || ''} 
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Decor">Home & Decor</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Price (₹)</label>
                  <input 
                    name="price" 
                    type="number"
                    required
                    value={currentProduct.price || ''} 
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Stock</label>
                  <input 
                    name="stock" 
                    type="number"
                    required
                    value={currentProduct.stock || ''} 
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  {isEditing ? 'Save Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;