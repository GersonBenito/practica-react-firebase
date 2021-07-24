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
        let index = 0;

        //hacemos la peticon a la coleccion de la base
        const productos = await db.collection('producto').get();

        //para verificar cuantos registros existen en la coleccion usamos el .size que nos da firebase
        console.log('numeros de registros en la coleccion', productos.size);
        //cuando ya conozcamos el numero de registros, lo podemos retornar en un objeto 

        //verificamos que la coleccion tengan registros
        if(!productos.empty){
            //si la coleccion tiene datos lo recorremos y almacenamos los datos
            productos.forEach(element =>{
                dataProducto.push({
                    id: element.id,
                    index: index++,//index es opcional, solo para ver el numero de registro
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

//al hacer un post a la base de datos, le pasamos la data por parametro, la data se puede construir desde aqui o desde el frontend 
export const addProduct = async(data) =>{
    try {
        await db.collection('producto').add(data);
        return 'Datos agreado correctamente'
    } catch (error) {
        return 'error al agregar nuevo producto'
    }
}

//al hacer un update debemos de mandarle el id del registro y la data a moficar
export const updateProduct = async(uId, data)=>{
    try {

        //en doc indicamo que vaya a buscar un documento con ese id en la coleccion especificado, y posteriormente actualizarlo
        await db.collection('producto').doc(uId).update(data);
        return 'datos actualizados correctamente';
    } catch (error) {
        return 'error al actualizar datos';
    }
}

//para hacer un delete solo de debe de conocer el id del registro y mandarselo por parametro
export const deleteProduct = async(uId) =>{
    try {

        //en doc como se vio en la consulta de arriba, estamos indicandole que vaya y busque un documente con el id especificado 
        await db.collection('producto').doc(uId).delete();
    } catch (error) {
        
    }
}

//asi es como hace un crud basico con firebase y react
//existen consultas con referecias a otras colecciones eso ya es un poco mas complejo, la mejor forma segun lo que he usado es trabjarlo desde el frontend
//y cuando se haga el get de esa coleccion si manejarlo desde el backend la referencia

//las referencias segun lo que he estado viendo es como un camino mas corto para consultar a db de firebase, perfectamente puedes
//guardar el id del registro al que quieres acceder y asi hacer una consulta por id

//ejemplo de cosulta por id
export const getProductById = async(uId) =>{
    try {
        let dataProducto = [];
        const producto = await db.collection('producto').doc(uId).get();

        //verificamos que el registro existe en la coleccion y asi no nos reviente la peticion
        if(producto.exists){
            dataProducto.push({
                id: producto.id,
                ...producto.data()
            })
        }

        return dataProducto;
    } catch (error) {
        return 'errro al obtener producto';
    }
}