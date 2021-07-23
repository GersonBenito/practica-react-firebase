import React, { useEffect } from 'react';

//importamos las consultas creados
import { getAllProducts, }from '../db/Producto';

const Productos = () => {

    //para poder la consulta creado, creamos un nuevo metodo asincrono 
    const obtenerProductos = async() =>{
        const productos = await getAllProducts();
        console.log(productos);
    }

    //para verificar los datos obtenidos usamos useEffect
    useEffect(() =>{
        obtenerProductos();
    },[])//en corchetes vacios para que solo se ejecute una vez, ahi se le pueden pasar variables para verificar sus cambios

    return (
        <div>
            <h1>hola react</h1>
        </div>
    )
}

export default Productos
