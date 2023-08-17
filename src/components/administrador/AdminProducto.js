import React, { useState } from 'react';
import './AdminProducto.scss';
import { db } from '../../firebase/config'
import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL,  } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore/lite';
import Loader from '../Loader/Loader';

export default function AdminProducto() {
    
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        nombre: '',
        modelo: '', 
        precio: '', 
        descripcion: '', 
        stock: {'s': '', 'm': '', 'l': ''},
        img: ''
    });

    async function handleFileChange(e) {
        const file = e.target.files[0];

        const fileRef = ref(storage, `/${file.name}`);
        await uploadBytes(fileRef, file);
        getDownloadURL(fileRef)
            .then((res) => {
                setValues({
                    ...values,
                    img: res
                })
            })    
    }

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e) => {
        setValues({
            ...values,
            modelo: e.target.value
        })
    }

    const handleStockChange = (e) => {
        setValues({
            ...values,
            stock:{
                ...values.stock,
                [e.target.name]: e.target.value
            }
        })
    }

    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if((values.nombre !== '') 
            && (values.modelo !== '') 
            && (values.precio !== '') 
            && (values.descripcion !== '')
            && (values.stock['s'] !== '')
            && (values.stock['m'] !== '')
            && (values.stock['l'] !== '')
            && (values.img !== '')) {
           
            const collectionRef = collection(db, 'productos');
            
            setLoading(true)
            addDoc(collectionRef, {
                name: values.nombre,
                price: Number(values.precio),
                description: values.descripcion,
                model: values.modelo,
                img: values.img,
                stock:{ s: Number(values.stock['s']),
                        m: Number(values.stock['m']),
                        l: Number(values.stock['l'])
                }
            })
                .finally(() => {
                    setLoading(false)
                })
            setValues({
                nombre: '',
                modelo: '', 
                precio: '', 
                descripcion: '', 
                stock: {'s': '', 'm': '', 'l': ''},
                img: ''
            })
            alert('Producto cargado')
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
                    <h1>Cargar producto nuevo</h1>
                    <div className='container'>
                        <div className='formulario-producto'>
                            <form onSubmit={handleSubmit}>
                                <h4>Datos:</h4>
                                <div className='datos'>
                                    <input 
                                        className='form-control my-2'
                                        onChange={handleInputChange}
                                        value={values.nombre}
                                        type='text'
                                        placeholder='Nombre del producto'
                                        name='nombre'
                                    />
                                    <select onChange={handleSelectChange}>
                                        <option value='undefined'>Seleccionar modelo</option>
                                        <option value='enteriza'>Enteriza</option>
                                        <option value='bikini'>Bikini</option>
                                        <option value='infantil'>Infantil</option>
                                    </select>
                                    <input 
                                        className='form-control my-2'
                                        onChange={handleInputChange}
                                        value={values.precio}
                                        type='number'
                                        placeholder='Precio'
                                        name='precio'
                                    />
                                </div>
                                <textarea 
                                    className='form-control my-2'
                                    onChange={handleInputChange}
                                    value={values.descripcion}
                                    type='text'
                                    placeholder='Descripcion'
                                    name='descripcion'
                                />
                                <div className="mb-3 archivo">
                                    <input 
                                        onChange={ handleFileChange }
                                        className="form-control" 
                                        type="file" 
                                        id="formFile"
                                    />
                                </div>
                                <h4>Stock:</h4>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">S</span>
                                    <input 
                                        onChange={ handleStockChange }
                                        name='s'
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </div>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">M</span>
                                    <input 
                                        onChange={ handleStockChange }
                                        name='m'
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                        />
                                </div>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">L</span>
                                    <input
                                        onChange={ handleStockChange }
                                        name='l' 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </div>
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