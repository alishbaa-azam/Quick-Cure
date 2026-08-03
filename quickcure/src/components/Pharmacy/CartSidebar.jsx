import React from 'react';
import { FiShoppingCart, FiTrash2, FiTruck, FiX, } from 'react-icons/fi';
import { FaMinus, FaPlus, FaStore } from 'react-icons/fa';

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  cartItemCount,
  subtotal,
  deliveryFee,
  freeDeliveryThreshold,
  finalTotal,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  getItemTotalPrice,
  getDisplayQuantity,
  isTabletForm,
  getPharmacySubtotal,
  getDeliveryFeeForPharmacy,
  pharmacyDeliveryCache,
}) => {
  if (!isOpen) return null;

  // Group cart items by pharmacy
  const groupItemsByPharmacy = () => {
    const groups = {};
    cartItems.forEach(item => {
      const pharmacyId = item.pharmacyId || item.selectedPharmacy?._id;
      const pharmacyName = item.pharmacyName || item.selectedPharmacy?.name || 'Unknown Pharmacy';
      
      if (!groups[pharmacyId]) {
        groups[pharmacyId] = {
          id: pharmacyId,
          name: pharmacyName,
          items: [],
          subtotal: 0,
          deliveryFee: 0,
          freeDeliveryThreshold: 500
        };
      }
      groups[pharmacyId].items.push(item);
      groups[pharmacyId].subtotal += getItemTotalPrice(item);
    });

    // Calculate delivery fee for each pharmacy
    Object.keys(groups).forEach(pharmacyId => {
      const group = groups[pharmacyId];
      const deliveryInfo = getDeliveryFeeForPharmacy 
        ? getDeliveryFeeForPharmacy(pharmacyId, group.subtotal, 2.5)
        : { deliveryFee: 0, freeDeliveryThreshold: 500 };
      group.deliveryFee = deliveryInfo.deliveryFee;
      group.freeDeliveryThreshold = deliveryInfo.freeDeliveryThreshold;
    });

    return Object.values(groups);
  };

  const pharmacyGroups = groupItemsByPharmacy();
  const totalDeliveryFee = pharmacyGroups.reduce((sum, group) => sum + group.deliveryFee, 0);
  const grandTotal = pharmacyGroups.reduce((sum, group) => sum + group.subtotal + group.deliveryFee, 0);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slideInRight">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5 text-[#2c6774]" />
            Your Cart
            <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-normal">
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
            </span>
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingCart className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-6 max-h-[50vh] overflow-y-auto pr-1">
                {pharmacyGroups.map((group) => (
                  <div key={group.id} className="border border-gray-200 rounded-xl p-3">
                    {/* Pharmacy Header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <FaStore className="w-4 h-4 text-[#2c6774]" />
                        <h4 className="font-semibold text-sm text-gray-800">{group.name}</h4>
                      </div>
                      <span className="text-xs text-gray-500">{group.items.length} item{group.items.length > 1 ? 's' : ''}</span>
                    </div>

                    {/* Pharmacy Items */}
                    <div className="space-y-3">
                      {group.items.map((item) => {
                        const currentQty = item.quantity || 1;
                        const maxStock = item.maxStock || item.stockQuantity || 0;
                        return (
                          <div key={item._id} className="flex gap-3">
                            <img 
                              src={item.image || 'https://via.placeholder.com/50'} 
                              alt={item.name} 
                              className="w-12 h-12 rounded-lg object-cover bg-gray-50" 
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                              <p className="text-[#2c6774] font-bold text-xs mt-0.5">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
                              {isTabletForm(item.form) && item.totalTablets && (
                                <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
                              )}
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between mt-1.5">
                                <div className="flex items-center gap-1.5 bg-gray-100 rounded-md">
                                  <button
                                    onClick={() => onUpdateQuantity(item, currentQty - 1)}
                                    className="p-1 hover:bg-gray-200 rounded-l-md transition-colors"
                                    disabled={currentQty <= 1}
                                  >
                                    <FaMinus className="w-2.5 h-2.5 text-gray-600" />
                                  </button>
                                  <span className="text-xs font-medium text-gray-700 min-w-[24px] text-center">
                                    {currentQty}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item, currentQty + 1)}
                                    className="p-1 hover:bg-gray-200 rounded-r-md transition-colors"
                                    disabled={currentQty >= maxStock}
                                  >
                                    <FaPlus className="w-2.5 h-2.5 text-gray-600" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => onRemoveFromCart(item._id)}
                                  className="text-rose-400 hover:text-rose-600 p-1 rounded-full hover:bg-rose-50 transition-colors"
                                >
                                  <FiTrash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pharmacy Subtotal & Delivery */}
                    <div className="mt-3 pt-2 border-t border-gray-100 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium text-gray-700">Rs. {group.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Delivery Fee</span>
                        {group.deliveryFee === 0 ? (
                          <span className="text-emerald-600 font-medium">FREE</span>
                        ) : (
                          <span className="font-medium text-gray-700">Rs. {group.deliveryFee.toFixed(2)}</span>
                        )}
                      </div>
                      {group.deliveryFee > 0 && group.freeDeliveryThreshold > group.subtotal && (
                        <div className="bg-blue-50 rounded-md p-1.5 mt-1">
                          <p className="text-xs text-[#2c6774]">
                            Add Rs. {(group.freeDeliveryThreshold - group.subtotal).toFixed(2)} more for FREE delivery
                          </p>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-semibold pt-1 border-t border-gray-200">
                        <span className="text-gray-800">Pharmacy Total</span>
                        <span className="text-[#2c6774]">Rs. {(group.subtotal + group.deliveryFee).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Delivery Fees</span>
                  <span className="font-semibold text-gray-800">Rs. {totalDeliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-800 text-lg">Grand Total</span>
                  <span className="font-bold text-2xl text-[#2c6774]">Rs. {grandTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => { onClose(); onCheckout(); }}
                  className="w-full py-3.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1e4e56] transition-all font-semibold text-center"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;