import React, { useState, useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export default function ItemDetail({ product }) {
    
    const [quantity, setQuantity] = useState();
    const [talle, setTalle] = useState()
    const [hayStock, setHayStock] = useState(false);
    const [inStock, setInStock] = useState();
    const navigate = useNavigate();

    const {addItem} = useContext(CartContext);

    function onAdd(count) {
        setQuantity(count);

    }

    function purchase(product, quantity) {
        const isTalle = talle;
        addItem(product, quantity, isTalle)

        const redirect = () => navigate('/cart');
        redirect()
    }

    const handlerSetStock = (e) => {
        var opcion = e.target.value;
        if (product.stock[opcion] > 0){
            setHayStock(true);
            setTalle(opcion);
            setInStock(product.stock[opcion]);
        } else {
            setHayStock(false);
            setInStock(product.stock[opcion]);
        }
        
    }

    return (
        <div className='itemDetailContainer'>
            <div className='container'>
                <div className='contenedor-img'>
                    <img src={product.img} alt='foto del producto'/>
                </div>
                <div className='contenedor-det'>
                    <h1 className='titulo'>{ product.name }</h1>
                    <div className='contenedor-model-price'>
                        <h4 className='modelo'>{ product.model }</h4>
                        <h4 className='precio'>Precio: ${ product.price.toLocaleString() }</h4>
                    </div>
                    <p className='description'>{ product.description }</p>
                    <div className='items'>
                    {
                        !quantity &&
                        <select onClick={ handlerSetStock } id='selTalles' className="form-select" name='talles' aria-label="Default select example">
                            <option value='selected'>Elige un talle</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                        </select>
                    }
                        {
                        (inStock) && (inStock !== 0) && (quantity === undefined)? 
                        <p className='enStock'>Stock:{inStock}</p>
                        :null
                        }
                    {
                        inStock === 0 && 
                        <div className="alert alert-danger d-flex align-items-center" role="alert" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <div>
                                NO hay Stock
                            </div>
                        </div>
                    }
                    {
                        hayStock && quantity === undefined && <ItemCount key={ 'agregarAlCarrito' } text='AGREGAR AL CARRITO' initial={1} stock={ inStock } onAdd={ onAdd }/>
                    }
                    </div>
                    {
                        quantity >= 1 && <button className='btnAddCart' onClick={ () => purchase(product, quantity) } >TERMINAR COMPRA</button>
                    }
                </div>       
            </div>
        </div>
    )
}
