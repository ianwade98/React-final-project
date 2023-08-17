import React from 'react';
import Item from './Item';


export default function ItemList({ items }) {

    return (
        <>
            {
               items.map((product) => <Item key={product.id} { ...product }/>)   
            }
        </>
    )
}
