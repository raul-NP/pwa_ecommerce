// Componente
import Modal from '../Modal/Modal';

// Estilo
import './InitProduct.css'

// Imágenes
import like from '../../assets/imgs/like.svg';
import likeStuffed from '../../assets/imgs/likeStuffed.svg';
import cart from '../../assets/imgs/cart.svg';
import check from '../../assets/imgs/check_2.svg';

// Funcionalidad
import { useEffect, useState } from 'react';
import { addProductCart, assignProductToCategory, removeProductFromCategory } from '../../services/api_service';

function InitProduct({product, userName, showModal, modalProcessing, setModalProcessing, refreshProducts }) {

    const [liked, setLiked] = useState(false)
    const [added, setAdded] = useState(false)
    const likeSvg = liked ? likeStuffed : like;
    const addSvg = added ? check : cart;

    useEffect(() => {

        // Observamos si el producto ya estaba en favoritos, para cambiar el estado de favorito
        const checkLiked = async () => {
            const response = await assignProductToCategory(product?.id, 'Favourites')
            
            // Caso en el que ya esta en favoritos el producto
            if (!response){
                setLiked(true)

            // Caso contrario
            }else{
                await removeProductFromCategory(product?.id, 'Favourites')
                setLiked(false)
            }
        };
        
        checkLiked()
    }, []);
    
    // Función que añade un producto a la categoría de favoritos
    async function likeAction() {
        
        // Proteccion de spam de clics
        if (modalProcessing) return;
        setModalProcessing(true);

        // Petición de insercción de un producto en categoria favoritos
        if (!liked){
            
            // Añadimos el producto de favoritos
            await assignProductToCategory(product?.id, 'Favourites')

            // Cambiamos el estado del like y mandamos el modal de aviso
            setLiked(true)
            showModal(`${product?.name} has been added to favourites`)
             
        // Petición de eliminación de un producto de categoría favoritos
        }else{
            
            // Eliminamos el producto de favoritos
            await removeProductFromCategory(product?.id, 'Favourites')

            // Si estamos viendo favoritos, actualizamos la lista
            if (refreshProducts) {
                await refreshProducts();
            }

            // Cambiamos el estado del like y mandamos el modal de aviso
            setLiked(false)
            showModal(`${product?.name} has been removed from favourites`)  
        }

        setTimeout(() => setModalProcessing(false), 2000);
    }

    // Función que añade al carito un producto
    async function addAction() {
        
        // Proteccion de spam de clics
        if (modalProcessing) return;
        setModalProcessing(true);

        // En caso de que no esté, petición de añadir el producto al carrito
        await addProductCart(product?.name, userName)

        // Modal de producto añadido
        setAdded(true)
        showModal(`${product?.name} has been added to the cart`)
        setTimeout(() => {
            setAdded(false)
            setModalProcessing(false);
        }, 2000)
    }

    return (

        // Card del producto
        <div className='product'>

            {/* Imágen del producto */}
            <div className='product-image'>
                <img className='product-image-svg' src={product?.url_image}/>
            </div>

            {/* Nombre del producto */}
            <h1 className='product-name'>{product?.name}</h1>

            {/* Precio del producto */}
            <h2 className='product-price'>{product?.price.toFixed(2)} $</h2>

            {/* Botones de los productos */}
            <div className='product-buttons'>

                {/* Botón de añadir al carrito un producto */}
                <div onClick={addAction} className='product-add'>
                    <h1>Add</h1>
                    <img className='product-add-svg' src={addSvg}/>
                </div>

                {/* Botón de añadir un producto a favoritos */}
                <div onClick={likeAction} className='product-like'>
                    <img className='product-like-svg' src={likeSvg} />
                </div>
            </div>
        </div>
    )
    
}

export default InitProduct