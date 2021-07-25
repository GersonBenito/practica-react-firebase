import React, { useEffect } from 'react';
import { Modal, Form, Input, Space, notification }from 'antd';
import styled from 'styled-components';
import { ScissorOutlined, RedoOutlined, ArrowRightOutlined }from '@ant-design/icons';
import Boton from './Boton';
import { addProduct, updateProduct }from '../db/Producto';

const Modals = (props) => {

    const { visible, closeModal, obtenerProductos, accion, data } = props;
    const { TextArea } = Input;
    console.log('tipo de accion',accion, data);

    const [form] = Form.useForm();

    useEffect(() =>{
        if(accion === 'edit'){
            form.setFieldsValue({
                nombre:data.nombre,
                precio:data.precio,
                descripcion:data.descripcion
            })
        }else{
            form.resetFields();
        }
    },[accion])

    const onFinish = async(values) =>{
        console.log(values);
       try {
        //await addProduct(values); 
        if(accion === 'edit'){
            await updateProduct(data.id, values);
            notification['success']({
                message:'Producto actualizado',
                description:'Producto fue actualizado correctamente'
            })
            closeModal();
            obtenerProductos();
            form.resetFields();
        }else{
            await addProduct(values);
            notification['success']({
                message:'Producto agregado',
                description:'Producto fue agregado correctamente'
            })
            closeModal();
            obtenerProductos();
            form.resetFields();
        }
        
        
       } catch (error) {
            notification['error']({
            message:'Error al guardar',
            description:'Ocurrio un error al guardar, intentelo de nuevo en unos minutos '
        })
       }
    }

    return (
        <Contenedor>
            <Modal
                visible={visible}
                closeIcon={<ScissorOutlined />}
                footer={false}
                onCancel={closeModal}
                title={accion === 'edit' ? 'Actualizar prouducto' : 'Agregar produdcto'}
            >
                <Form
                    layout='vertical'
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item label='Nombre' name='nombre'>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Precio' name='precio'>
                        <Input />
                    </Form.Item>

                    <Form.Item label='descripcion' name='descripcion'>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <ContenedorBotones>
                            <Space>
                                <Boton nombre='Caneclar' shape='round' icon={<RedoOutlined />} accion={closeModal} />
                                <Boton 
                                    nombre={ accion === 'edit'?'Actualizar':'Agregar' } 
                                    type='primary' 
                                    shape='round' 
                                    icon={<ArrowRightOutlined />} 
                                    submit='submit' 
                                />
                            </Space>
                        </ContenedorBotones>
                    </Form.Item>
                </Form>
            </Modal>
        </Contenedor>
    )
}

const Contenedor = styled.div`
`;

const ContenedorBotones = styled.div`
    display: flex;
    justify-content: center;
`;

export default Modals
