import React, { useState, useEffect } from 'react';
import './AdminEliminar.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore/lite';
import OptionList from './OptionList';
import Loader from '../Loader/Loader';

export default function AdminEliminar() {
    
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [values, setValues] = useState('');
    const [alert, setAlert] = useState(false);
    const [eliminado, setEliminado] = useState(false)

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
        setValues(e.target.value)
        console.log(e.target.value)
    }
    
    const handleClick = () => {
        if(values !== ''){
            setAlert(true)
        }
    }

    const handleCancelar = () => {
        setAlert(false)
    }

    const handleAceptar = () => {
        setEliminado(false)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(values !== ''){
            deleteDoc(doc(db, "productos", values))
                .then(() => {
                    setAlert(false)
                    setEliminado(true)
                })
        }
    }

    return (
        <>
        {
            loading ? 
            <Loader /> :
            <>
                <div className='admin'>
                    <h1>Eliminar Producto</h1>
                    <div className='container'>
                        <div className='formulario-eliminar'>
                            <form onSubmit={handleSubmit}>
                                {
                                    !eliminado &&
                                    <div>
                                        <select onChange={handleChangeProd}>
                                            <option value=''>Seleccionar producto</option>
                                            <OptionList items={product} />
                                        </select>
                                        <button type='button' onClick={ handleClick }>Eliminar</button>  
                                    </div>
                                }
                                {
                                    alert &&
                                    <div className='alert'>
                                        <h4>¿Está seguro que desea eliminar este producto?</h4>
                                        <button className='btn-eliminar' type='submit'>Eliminar</button>
                                        <button className='btn-cancelar' type='button' onClick={ handleCancelar }>Cancelar</button>
                                    </div>
                                }
                                {
                                    eliminado &&
                                    <div className='eliminado'>
                                        <h3>El Producto fue eliminado correctamente.</h3>
                                        <h4>¿Desea eliminar otro producto?<button onClick={ handleAceptar } type='button' className='btn-aceptar'>Aceptar</button></h4>
                                         
                                    </div>
                                }             
                            </form>
                            
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}