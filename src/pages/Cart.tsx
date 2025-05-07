import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addItem, decreaseItem, removeItem, clearCart } from '../redux/slice';

const Cart = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();
  
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">🛒 My Cart</h2>
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
            <>
          <ul className="space-y-4">
            {items.map(item => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className='mr-2'>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="font-semibold text-black-500">Price: {item.price}</p>
                </div>
                <div className="flex gap-2">
                    <button
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() =>
                      dispatch(
                        decreaseItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: 1
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() =>
                      dispatch(
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: 1
                        })
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <p className="font-semibold text-gray-700">
                Total: {items.reduce((acc, item) => acc + item.price * item.quantity, 0)} EUR
            </p>
          </div>
          </>
        )}
        {items.length > 0 && (
          <div className="mt-6 text-center">
            <button
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
              onClick={() => dispatch(clearCart())}
            >
              Clean all
            </button>
          </div>
        )}
      </div>
    );
  };

export default Cart