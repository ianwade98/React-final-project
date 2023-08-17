import React, { useState } from 'react'
import './ItemCount.scss'

export default function ItemCount({ text, onAdd, initial, stock }) {
    
    const [count, setCount] = useState(initial);

    function increment() {
        if (stock > count) {
            setCount(count + 1)
        }
    }

    function decrement() {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div className='count-container'>
            <div className='itemcount'>
                <button className='btn-rest'  onClick={ () => decrement() } disabled={ count === initial } >-</button>
                <h3 className='numberDisplay'>{ count }</h3>
                <button className='btn-add'  onClick={ () => increment() } disabled={ count === stock }>+</button>
            </div>
            <button className='btnAddItem' onClick={ () => onAdd(count) } >{ text }</button> 
        </div>
    )
}