import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Package, ShoppingBag, Users } from 'lucide-react';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inventory: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        inventory: parseInt(formData.inventory),
        updatedAt: serverTimestamp()
      };

      if (isEditing && currentProduct) {
        await updateDoc(doc(db, 'products', currentProduct.id), productData);
      } else {
        const newDocRef = doc(collection(db, 'products'));
        await setDoc(newDocRef, {
          ...productData,
          id: newDocRef.id,
          createdAt: serverTimestamp()
        });
      }
      
      setFormData({ name: '', description: '', price: '', image: '', category: '', inventory: '' });
      setIsEditing(false);
      setCurrentProduct(null);
      fetchData();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product: any) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      inventory: product.inventory.toString()
    });
    setIsEditing(true);
    setActiveTab('add-product');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      fetchData();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-black uppercase tracking-tighter mb-8">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Total Products</p>
              <p className="text-2xl font-extrabold text-black">{products.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Total Orders</p>
              <p className="text-2xl font-extrabold text-black">{orders.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Revenue</p>
              <p className="text-2xl font-extrabold text-black">
                ৳{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'products' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-black'
            }`}
          >
            Manage Products
          </button>
          <button
            onClick={() => {
              setActiveTab('add-product');
              setIsEditing(false);
              setFormData({ name: '', description: '', price: '', image: '', category: '', inventory: '' });
            }}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'add-product' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-black'
            }`}
          >
            {isEditing ? 'Edit Product' : 'Add Product'}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'orders' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-black'
            }`}
          >
            Manage Orders
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'products' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Inventory</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" referrerPolicy="no-referrer" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ৳{product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.inventory}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'add-product' && (
              <div className="p-8">
                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Price (৳)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Inventory</label>
                      <input
                        type="number"
                        name="inventory"
                        value={formData.inventory}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Product Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-red-600 transition-colors">
                      <div className="space-y-1 text-center">
                        {formData.image ? (
                          <img src={formData.image} alt="Preview" className="mx-auto h-32 object-cover rounded" />
                        ) : (
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600 justify-center mt-4">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-600">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-colors"
                    >
                      {isEditing ? 'Update Product' : 'Save Product'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ৳{order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
