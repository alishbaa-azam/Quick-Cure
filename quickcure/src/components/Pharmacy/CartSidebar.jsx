import React from 'react';
import { FiShoppingCart, FiTrash2, FiTruck, FiX, } from 'react-icons/fi';
import { FaMinus, FaPlus } from 'react-icons/fa';

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
}) => {
  if (!isOpen) return null;

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
              <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const currentQty = item.quantity || 1;
                  const maxStock = item.maxStock || item.stockQuantity || 0;
                  return (
                    <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
                      <img 
                        src={item.image || 'https://via.placeholder.com/50'} 
                        alt={item.name} 
                        className="w-14 h-14 rounded-xl object-cover bg-gray-50" 
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                        <p className="text-[#2c6774] font-bold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
                        {isTabletForm(item.form) && item.totalTablets && (
                          <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
                        )}
                        
                        {/* Working Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item, currentQty - 1)}
                              className="p-1.5 hover:bg-gray-200 rounded-l-lg transition-colors"
                              disabled={currentQty <= 1}
                            >
                              <FaMinus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-medium text-gray-700 min-w-[30px] text-center">
                              {currentQty}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item, currentQty + 1)}
                              className="p-1.5 hover:bg-gray-200 rounded-r-lg transition-colors"
                              disabled={currentQty >= maxStock}
                            >
                              <FaPlus className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item._id)}
                            className="text-rose-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {currentQty >= maxStock && maxStock > 0 && (
                          <p className="text-xs text-amber-600 mt-1">Max stock reached</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
                  )}
                </div>
                {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
                  <div className="bg-[#9fbfc5]/20 rounded-lg p-2">
                    <p className="text-xs text-[#2c6774] flex items-center gap-1">
                      <FiTruck className="w-3 h-3" />
                      Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
                    </p>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-xl text-[#2c6774]">Rs. {finalTotal.toFixed(2)}</span>
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