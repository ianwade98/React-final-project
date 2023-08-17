import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartItem.scss'

export default function CartItem({id, model, name, price, img, cantidad, talle}) {

    const { removerDelCarrito } = useContext(CartContext);

    return (
        <div className='product'>
            <div className='img-container'>
                <img src={ img } alt='foto del producto'/>
            </div>
            <div className='txt-container'>
                <h2 className='name'>{name}</h2>
                <div className='mod-talle'>
                    <p className='modelo'>{model}</p>
                    <p className='talle'>Talle: (<span>{talle}</span>)</p>
                </div>
                <div className='pre-cant'>
                    <p className='precio'>Precio: ${price.toLocaleString()}</p>
                    <p className='cantidad'>Cantidad: {cantidad}</p>
                </div>
                <p className='precioTotal'>Total: ${(price * cantidad).toLocaleString()}</p>
                <button onClick={ () => { removerDelCarrito(id, talle, cantidad) } }>
                    ELIMINAR PRODUCTO
                </button>
            </div>
        </div>
    )
}
