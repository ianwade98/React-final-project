import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'
import CartItem from './CartItem';
import './CartView.scss'


export default function CartView() {

    const { cart, vaciarCarrito, totalCompra } = useContext(CartContext);

    const navigate = useNavigate();
    
    if (cart.length === 0) {
        return  <div className='no-cart-view'>
                    <h1 className='txt'>No hay productos en el carrito</h1>
                    <div>
                        <button className='verProductos' onClick={ () => navigate('/') }>VER PRODUCTOS</button>
                    </div>
                </div>
    }

    return (
        <div className='cart-view'>
            <h1>PRODUCTOS DEL CARRITO</h1>
            <section className='productos'>
            {
                cart.map((producto) => <CartItem key={ producto.id + producto.talle} {...producto}/>)
            }
            </section>
            <div className='total'>
                <h5 className='total-txt'>Total compra: ${totalCompra().toLocaleString()}</h5>
            </div>
            <div className='btn-container'>
                <button className="vaciarCarrito" onClick={ vaciarCarrito }>VACIAR CARRITO</button>
                <button className="terminarCompra" onClick={ () => navigate('/checkout') }>FINALIZAR COMPRA</button>
            </div>
        </div>
    )
}
