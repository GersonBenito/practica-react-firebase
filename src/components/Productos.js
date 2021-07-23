import React, { useEffect } from 'react';

//importamos las consultas creados
import { getAllProducts, }from '../db/Producto';
import Boton from './Boton';
import { PlusOutlined }from '@ant-design/icons'
import styled from 'styled-components';

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
        <Container>
            <Boton type='primary' nombre='Agregar' icon={<PlusOutlined />} shape='round' />
            <h1>hola react</h1>
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;
`;

export default Productos
