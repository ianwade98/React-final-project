import React, { useState, useEffect } from 'react';
import './Admin.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import OptionList from './OptionList';
import Loader from '../Loader/Loader';

export default function AdminPrecio() {
    
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [values, setValues] = useState({id: '', precio: ''});

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
    const handleInputChange = (e) => {
        setValues({
            ...values,
            precio: e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if((values.id !== '') && (values.precio !== '')) {
            //1.= armar la referencia a mi coleccion
            const docRef = doc(db, 'productos', values.id);
            //2.- peticion a esa referencia
            setLoading(true)
            getDoc(docRef)
                .then((doc) => {
                    updateDoc(docRef, {
                        price: Number(values.precio)
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
                    <h1>Modificar precio</h1>
                    <div className='container'>
                        <div className='formulario'>
                            <form onSubmit={handleSubmit}>
                                <select onChange={handleChangeProd}>
                                    <option value='undefined'>Seleccionar producto</option>
                                    <OptionList items={product} />
                                </select>
                                <input 
                                    className='form-control my-2'
                                    onChange={handleInputChange}
                                    value={values.precio}
                                    type='number'
                                    placeholder='nuevo precio'
                                    name='precio'
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