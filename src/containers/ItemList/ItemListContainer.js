import React, { useState, useEffect } from 'react';
import './ItemListContainer.scss';
import ItemList from '../../components/ItemList/ItemList';
import { useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '../../firebase/config';

export default function ItemListContainer() {

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([]);
    const { modelId } = useParams()

    useEffect(() => {
        setLoading(true)
        //1.= armar la referencia a mi coleccion
        const productosRef = collection(db, 'productos');
        const q = modelId ? query(productosRef, where('model', '==', modelId)) : productosRef
        //2.- peticion a esa referencia
        getDocs(q)  
            .then((resp) => {
                const prods = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setProduct(prods)
            })
            .finally( () => {
                setLoading(false)
            } )
    }, [modelId])

    return (
        <>
            {
                loading
                ? <Loader />
                : <ul className='itemListContainer'>
                    <ItemList items={product} />
                </ul>
            }
        </>
    )
}
