import { firebase }from '../firebase';

//creamos una con el nombre que desee para poder acceder a las colecciones del proyecto
const db = firebase.firestore();

//importante!!
//cuando sean consultas o metodos externos se debe de poner la palabra "export" antes del metodo a utilizar, asi porder usarlo en otro componente

//importante !!!
//cuando se hagan peticiones a la base de firebase, deben ser metodos asincrinos async await,
//ya sea metodo GET, POST, UPDATE(PUT), DELETE

//creando consulta para obtener todos los productos de la base, si fuera una API se llamaria endpoint
export const getAllProducts = async() =>{
    //cuando se usa async await se usa try catch, al usar las promesas ya no es necesario try catch, ejemplo de promesa then().catch() 
    try {
        let dataProducto = [];

        //hacemos la peticon a la coleccion de la base
        const productos = await db.collection('producto').get();

        //verificamos que la coleccion tengan registros
        if(!productos.empty){
            //si la coleccion tiene datos lo recorremos y almacenamos los datos
            productos.forEach(element =>{
                dataProducto.push({
                    id: element.id,
                    ...element.data()//usamos la propagacion (...) para almacenar todos sus datos accediento con .data()
                })
            })
        }

        //si la consulta fue exitosa retornamos los datos obtenidos
        return dataProducto;

    } catch (error) {
        //si la petion fallo, podemos retornar un mensaje o un log
        return 'error al obtener datos';
    }
}

export const addProduct = async(data) =>{
    try {
        await db.collection('producto').add(data);
        return 'Datos agreado correctamente'
    } catch (error) {
        return 'error al agregar nuevo producto'
    }
}