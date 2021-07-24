import React from 'react'
import { Button }from 'antd';
import 'antd/dist/antd.css';

const Boton = (props) => {
    const { nombre, icon, type, shape, danger, accion, submit } = props;
    return (
        <>
            <Button 
                type={type} 
                shape={shape} 
                icon={icon} 
                danger={danger}  
                onClick={accion}
                htmlType={submit}
            >
            {nombre}
            </Button>
        </>
    )
}

export default Boton
