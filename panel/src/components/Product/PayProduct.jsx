// Estilo
import './PayProduct.css'

// Funcionalidad
import { useEffect, useState } from 'react';

function PayProduct({product, quantity}) {

    const [realQuantity, setRealQuantity] = useState(quantity)

    useEffect(() => {

        // En caso de que haya cambiado el stock porque otra persona ha comprado el producto
        if (realQuantity > product?.stock){
            setRealQuantity(product?.stock)
        }
        
    }, [quantity])

    return (

        // Contenedor del producto
        <div className='pay-product-container'>

            {/* Card del producto */}
            <div className='pay-product-card'>

                {/* Imágen del producto */}
                <div className='pay-product-img'>
                    <img src={product?.url_image} alt="" />
                </div>

                {/* Datos del producto */}
                <div className='pay-product-data'>
                    <h1 id='product-name'>{product?.name}</h1>
                    <h1 id='product-price'>{product?.price.toFixed(2)}</h1>
                </div>

                {/* Sumatorio o resta de productos en el carrito */}
                <div className='pay-product-control'>
                    <div className='pay-product-quantity'>{realQuantity}</div>
                </div>

            </div>

        </div>
    )
}

export default PayProduct