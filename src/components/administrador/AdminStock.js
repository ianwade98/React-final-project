import React, { useState, useEffect } from 'react';
import './Admin.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import OptionList from './OptionList';
import Loader from '../Loader/Loader';

export default function AdminiStock() {
    
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [values, setValues] = useState({
        id: '', talle: '', cantidad: ''
    });

    useEffect(() => {
        setLoading(true)
        //1.= armar la referencia a mi coleccion
        const productosRef = collection(db, 'productos');
        
        //2.- peticion a esa referencia
        getDocs(productosRef)  
            .then((resp) => {
                const prods = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setProduct(prods)
            })
            .finally( () => {
                setLoading(false)
            } )
    }, [])

    const handleChangeProd = (e) => {
        setValues({
            ...values,
            id: e.target.value
        })
    }
    const handleChangeTalle = (e) => {
        setValues({
            ...values,
            talle: e.target.value
        })
    }
    const handleInputChange = (e) => {
        setValues({
            ...values,
            cantidad: e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if((values.id !== '') &&( values.talle !== '') && (values.cantidad !== '')) {
            //1.= armar la referencia a mi coleccion
            const docRef = doc(db, 'productos', values.id);
            //2.- peticion a esa referencia
            setLoading(true)
            getDoc(docRef)
                .then((doc) => {
                    const refStock = doc.data().stock
                    updateDoc(docRef, {
                        stock: {
                            ...refStock,
                            [values.talle]: refStock[values.talle] + Number(values.cantidad)
                        }
                    })
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            alert('faltan completar campos')
        }
    }

    return (
        <>
        {
            loading ? 
            <Loader /> :
            <>
                <div className='admin'>
                    <h1>Cargar stock</h1>
                    <div className='container'>
                        <div className='formulario'>
                            <form onSubmit={handleSubmit}>
                                <select onChange={handleChangeProd}>
                                    <option value='undefined'>Seleccionar producto</option>
                                    <OptionList items={product} />
                                </select>
                                <select onChange={handleChangeTalle}>
                                    <option value='undefined'>Seleccionar talle</option>
                                    <option value='36'>36</option>
                                    <option value='37'>37</option>
                                    <option value='38'>38</option>
                                    <option value='39'>39</option>
                                    <option value='40'>40</option>
                                    <option value='41'>41</option>
                                </select>
                                <input 
                                    className='form-control my-2'
                                    onChange={handleInputChange}
                                    value={values.cantidad}
                                    type='number'
                                    placeholder='cantidad'
                                    name='cantidad'
                                />
                                <button type='submit'>Cargar</button>                   
                            </form>
                            
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}