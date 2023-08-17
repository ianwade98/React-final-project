import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Item({ id, name, price, img, model}) {

    const navigate = useNavigate();

    return (
        <li className={ model }>
            <div className='producto' id={ id }>
                <h3 className='title'>{ name }</h3>
                <div>
                   <img src={ img } alt='foto del producto' />
                </div>
                <h5 className='price'>Precio: ${ price.toLocaleString() }</h5>
            </div>
            <button onClick={ () => navigate(`/prod/${id}`) }>VER DETALLE</button>
        </li>

    )
}
