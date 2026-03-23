import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-black uppercase tracking-tighter mb-8">
          Order History
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">No orders yet</h2>
            <p className="text-gray-500 font-light">You haven't placed any orders with us.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm font-medium text-black">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Recent'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-700">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-lg font-extrabold text-black">৳{order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-100">
                      {order.items.map((item: any, index: number) => (
                        <li key={index} className="py-6 flex">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" referrerPolicy="no-referrer" />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">৳{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty {item.quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
