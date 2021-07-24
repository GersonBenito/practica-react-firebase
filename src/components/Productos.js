import React, { useEffect, useState } from 'react';

//importamos las consultas creados
import { getAllProducts, }from '../db/Producto';
import Boton from './Boton';
import { PlusOutlined, EditOutlined, DeleteOutlined }from '@ant-design/icons'
import styled from 'styled-components';
import { Table, Space }from 'antd';
import Modals from './Modals';

const Productos = () => {
    const [datos, setDatos] = useState([]);
    const [visible, setVisible] = useState(false);

    //para poder la consulta creado, creamos un nuevo metodo asincrono 
    const obtenerProductos = async() =>{
        const productos = await getAllProducts();
        console.log(productos);
        setDatos(productos);
    }

    //para verificar los datos obtenidos usamos useEffect
    useEffect(() =>{
        obtenerProductos();
    },[])//en corchetes vacios para que solo se ejecute una vez, ahi se le pueden pasar variables para verificar sus cambios

    const colums = [
        {
            title:'Nombre',
            dataIndex:'nombre',
            key:'nombre',
            render:(_, record) =>(
                <p>{record.nombre}</p>
            )
        },
        {
            title:'precio',
            dataIndex:'precio',
            key:'precio',
            align:'center',
            render:(_, record) =>(
                <p>{record.precio}</p>
            )
        },
        {
            title:'Descripcion',
            dataIndex:'decripcion',
            key:'decripcion',
            render:(_, record) =>(
                <p>{record.descripcion}</p>
            )
        },
        {
            title:'Acciones',
            dataIndex:'acciones',
            key:'acciones',
            align:'center',
            render:(_, record) =>{
                return(
                    <Space>
                        <Boton nombre='Actualizar' type='primary' shape='round' icon={<EditOutlined />} />
                        <Boton nombre='Borrar' type='primary' danger='danger' shape='round' icon={<DeleteOutlined />} />
                    </Space>
                )
            }
        },
    ]

    //modal
    const openModal = () =>{
        setVisible(true);
    }

    const closeModal = () =>{
        setVisible(false);
    }


    return (
        <Container>
            <Boton type='primary' nombre='Agregar' icon={<PlusOutlined />} shape='round' accion={openModal} />
            <Table columns={colums} dataSource={datos} />
            <Modals visible={visible} closeModal={closeModal} obtenerProductos={obtenerProductos} />
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;

`;

export default Productos
