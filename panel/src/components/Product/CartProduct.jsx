// Estilo
import './CartProduct.css'

// Imágenes
import trashSvg from '../../assets/imgs/trash.svg';

// Funcionalidad
import { useEffect, useState } from 'react';
import { addProductCart, deleteProductFromCart, substractProductCart } from '../../services/api_service';

function CartProduct({product, quantity, userName, refreshCart, showModal, modalProcessing, setModalProcessing}) {

    const [realQuantity, setRealQuantity] = useState(quantity)

    useEffect(() => {

        // En caso de que haya cambiado el stock porque otra persona ha comprado el producto
        if (realQuantity > product?.stock){
            setRealQuantity(product?.stock)
        }
        
    }, [])

    // Función que elimina del carrito el producto
    async function deleteProduct() {

        // Proteccion de spam de clics
        if (modalProcessing) return;
        setModalProcessing(true);
        showModal(` ${product?.name} has been deleted from cart succesfully`)  
        setTimeout(() => setModalProcessing(false), 2000);

        // Borramos el producto del carrito
        await deleteProductFromCart(product?.name, userName)

        // Refrescamos en el footer el numero de producos del carrito
        window.dispatchEvent(new CustomEvent("cartUpdated"))

        // Refrescamos el carrito
        refreshCart()
    }

    // Función que resta en 1 la cantidad del producto
    async function addQuantity() {

        // En caso de no sobrepasar el stock del producto
        if (realQuantity + 1 <= product?.stock){
            await addProductCart(product?.name, userName, true)
            setRealQuantity(realQuantity + 1)
            refreshCart()

        // En caso de intentar sobrepasar el stock del producoto mostramos el modal
        }else{

            // Proteccion de spam de clics
            if (modalProcessing) return;
            setModalProcessing(true);
            showModal(` You have reached the maximum stock of ${product?.name}`, 'cross')  
            setTimeout(() => setModalProcessing(false), 2000);
        }
    }

    // Función que suma en 1 la cantidad del producto
    async function substractQuantity() {

        // En caso de sobrepasar el stock minimo del producto
        if (realQuantity - 1 > 0) {
            await substractProductCart(product?.name, userName)
            setRealQuantity(realQuantity - 1)
            refreshCart()
        
        // En caso de intentar sobrepasar el minimo de stock del producto mostramos el modal
        }else{

            // Proteccion de spam de clics
            if (modalProcessing) return;
            setModalProcessing(true);
            showModal(` You have reached the minimum stock of ${product?.name}`, 'cross')  
            setTimeout(() => setModalProcessing(false), 2000);
        }
    }

    return (

        // Contenedor del producto
        <div className='cart-product-container'>

            {/* Card del producto */}
            <div className='cart-product-card'>

                {/* Imágen del producto */}
                <div className='cart-product-img'>
                    <img src={product?.url_image} alt="" />
                </div>

                {/* Datos del producto */}
                <div className='cart-product-data'>
                    <h1 id='product-name'>{product?.name}</h1>
                    <h1 id='product-price'>{product?.price.toFixed(2)}</h1>
                </div>

                {/* Sumatorio o resta de productos en el carrito */}
                <div className='cart-product-control'>
                    <div onClick={substractQuantity} className='cart-product-substract'>-</div>
                    <div className='cart-product-quantity'>{realQuantity}</div>
                    <div onClick={addQuantity} className='cart-product-add'>+</div>
                </div>

            </div>

            {/* Botón de eliminar producto */}
            <div className='cart-product-trash'>
                <img onClick={deleteProduct} id='trash' src={trashSvg} />
            </div>

        </div>
    )
}

export default CartProduct