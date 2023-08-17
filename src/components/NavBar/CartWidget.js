import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import cartimg from '../../assets/img/cart.png';
import './CartWidget.scss';

export default function CartWidget({ handlePush }) {

    const {cantidadCarrito} = useContext(CartContext);
    
    return (
        <>
            <img className='cartImg' src={ cartimg } alt='foto del carrito de compras' onClick={ handlePush } ></img>
            <span className='counter' >{ cantidadCarrito() }</span>
        </>
    )
}
