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
import { useState } from 'react';

function InitProduct({productImage, productName, productPrice}) {

    const [liked, setLiked] = useState(false)
    const [added, setAdded] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const likeSvg = liked ? likeStuffed : like;
    const addSvg = added ? check : cart;

    // Función que añade un producto a la categoría de favoritos
    function likeAction() {
        
        // Petición de insercción de un producto en categoria favoritos
        if (liked){

        // Petición de eliminación de un producto de categoría favoritos
        }else{

        }

        // Cambiamos el estado de like
        setLiked(!liked)
    }

    // Función que añade al carito un producto
    function addAction() {
        
        // Petición que busca el producto añadido en el carrito
        
        // En caso de que no esté, petición de añadir el producto al carrito

        // Modal de producto añadido
        setAddModal(true)
        setAdded(true)
        setTimeout( () => {
            setAddModal(false)
            setAdded(false)
        }, 3000)

    }

    return (

        // Card del producto
        
        <div className='product'>
            { added && <Modal text={'El nombre de usuario debe contener únicamente letras'} type={'cross'}></Modal>}

            {/* Imágen del producto */}
            <div className='product-image'>
                <img className='product-image-svg' src={productImage}/>
            </div>

            {/* Nombre del producto */}
            <h1 className='product-name'>{productName}</h1>

            {/* Precio del producto */}
            <h2 className='product-price'>{productPrice} $</h2>

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