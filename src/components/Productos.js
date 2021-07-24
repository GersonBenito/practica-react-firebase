import React, { useEffect, useState } from 'react';

//importamos las consultas creados
import { getAllProducts, deleteProduct }from '../db/Producto';
import Boton from './Boton';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined }from '@ant-design/icons'
import styled from 'styled-components';
import { Table, Space, Modal, notification }from 'antd';
import Modals from './Modals';

const Productos = () => {
    const [datos, setDatos] = useState([]);
    const [visible, setVisible] = useState(false);
    const [accion, setAccion] = useState('add');
    const [dataEdit, setDataEdit] = useState([]);

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

      //modal
      const openModal = () =>{
        setVisible(true);
    }

    const closeModal = () =>{
        setVisible(false);
        setAccion('add');
    }

    //actualizar productos
    const actualizarProducto = (record) =>{
        setVisible(true);
        setAccion('edit');
        setDataEdit(record);
    }

    //confirmacion de eliminacion
    const confirmDelete = (record) =>{
        Modal.confirm({
            title:`Esta seguro de elinar ${record.nombre}`,
            icon:<ExclamationCircleOutlined />,
            content:'Una vez que se elimine no se podra recuperar',
            okText:'Confirmar',
            cancelText:'Cancelar',
            onCancel(){
                notification['info']({
                    message:'Se cancelo',
                    description:'Se ha cancelado la operacion por motivos desconocidos'
                })
            },
            onOk(){
                eliminarProducto(record.id, record.nombre);
            }
        })
    }

    const eliminarProducto = async (uId, nombre) =>{
        await deleteProduct(uId);
        notification['success']({
            message:`producto ${nombre} eliminado`,
            description:'Producto fue eliminado correctamente'
        })
        obtenerProductos();
    }

    const colums = [
        {
            title:'Index',
            dataIndex:'index',
            key:'index',
            render:(_, record) =>(
                <p>{record.index + 1}</p>
            )
        },
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
                        <Boton nombre='Actualizar' type='primary' shape='round' icon={<EditOutlined />} accion={()=>actualizarProducto(record)} />
                        <Boton nombre='Borrar' type='primary' danger='danger' shape='round' icon={<DeleteOutlined />} accion={()=>confirmDelete(record)} />
                    </Space>
                )
            }
        },
    ]


    return (
        <Container>
            <Boton type='primary' nombre='Agregar' icon={<PlusOutlined />} shape='round' accion={openModal} />
            <Table columns={colums} dataSource={datos} />
            <Modals 
                visible={visible} 
                closeModal={closeModal} 
                obtenerProductos={obtenerProductos} 
                accion={accion} 
                data={dataEdit} 
            />
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;

`;

export default Productos
