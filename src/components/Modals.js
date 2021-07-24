import React from 'react';
import { Modal, Form, Input, Space }from 'antd';
import styled from 'styled-components';
import { ScissorOutlined, RedoOutlined, ArrowRightOutlined }from '@ant-design/icons';
import Boton from './Boton';

const Modals = (props) => {
    const { visible, closeModal } = props;

    const { TextArea } = Input;
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
                                <Boton nombre='Enviar' type='primary' shape='round' icon={<ArrowRightOutlined />} />
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
