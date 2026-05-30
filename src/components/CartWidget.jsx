import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
  const { getCartQuantity } = useContext(CartContext);
  const totalQty = getCartQuantity();

  return (
    <Link to="/carrito" className="cart-widget-btn" aria-label="Ver Carrito">
      <ShoppingCart size={20} />
      {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
    </Link>
  );
};

export default CartWidget;
// Clickable link to file: [CartWidget.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/components/CartWidget.jsx)
