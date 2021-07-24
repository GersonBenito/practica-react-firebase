import React from 'react';
import { Modal, Form, Input, Space, notification }from 'antd';
import styled from 'styled-components';
import { ScissorOutlined, RedoOutlined, ArrowRightOutlined }from '@ant-design/icons';
import Boton from './Boton';
import { addProduct }from '../db/Producto';

const Modals = (props) => {
    const { visible, closeModal } = props;

    const { TextArea } = Input;

    const onFinish = async(values) =>{
        console.log(values);
       try {
        await addProduct(values);  
        notification['success']({
            message:'Producto agregado',
            description:'Producto fue agregado correctamente'
        })
        closeModal();

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
                title='Agregar producto'
            >
                <Form
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Form.Item label='Nombre' name='nombre'>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Precio' name='precio'>
                        <Input />
                    </Form.Item>

                    <Form.Item label='descripcion' name='decripcion'>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <ContenedorBotones>
                            <Space>
                                <Boton nombre='Caneclar' shape='round' icon={<RedoOutlined />} accion={closeModal} />
                                <Boton nombre='Enviar' type='primary' shape='round' icon={<ArrowRightOutlined />} submit='submit' />
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
