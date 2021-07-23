import React from 'react'
import { Button }from 'antd';
import 'antd/dist/antd.css';

const Boton = (props) => {
    const { nombre, icon, type, shape } = props;
    return (
        <>
            <Button type={type} shape={shape} icon={icon}>{nombre}</Button>
        </>
    )
}

export default Boton
