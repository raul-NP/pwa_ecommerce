// Estilo
import './CartProduct.css'

// Imágenes
import trashSvg from '../../assets/imgs/trash.svg';

// Funcionalidad
import { useState } from 'react';
import { addProductCart, substractProductCart } from '../../services/api_service';

function CartProduct({product, quantity, userName, refreshCart}) {

    const [realQuantity, setRealQuantity] = useState(quantity)

    // Función que elimina del carrito el producto
    async function deleteProduct() {
        await deleteProductFromCart(product?.name, userName)
        refreshCart?.()
    }

    // Función que resta en 1 la cantidad del producto
    async function addQuantity() {
        if (realQuantity + 1 <= product?.stock){
            await addProductCart(product?.name, userName, true)
            setRealQuantity(realQuantity + 1)
            refreshCart?.()
        }
    }

    // Función que suma en 1 la cantidad del producto
    async function substractQuantity() {
        if (realQuantity - 1 > 0) {
            await substractProductCart(product?.name, userName)
            setRealQuantity(realQuantity - 1)
            refreshCart?.()
        }
    }

    return (

        // Contenedor del producto
        <div className='cart-product-container'>

            {/* Card del producto */}
            <div className='cart-product-card'>

                {/* Imágen del producto */}
                <div className='cart-product-img'>
                    <img src="https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png" alt="" />
                </div>

                {/* Datos del producto */}
                <div className='cart-product-data'>
                    <h1 id='product-name'>Rolex Deepsea</h1>
                    <h1 id='product-price'>$ 499.99</h1>
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