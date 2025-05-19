// Estilo
import './Order.css'

// Funcionalidad
import { useState } from 'react'

// Imágenes
import downArrowSvg from '../../assets/imgs/downArrow.svg';
import upArrowSvg from '../../assets/imgs/upArrow.svg';
import PayProduct from '../Product/PayProduct';

function Order({order}) {

    const [show, setShow] = useState(false)
    const showSvg = show ? upArrowSvg : downArrowSvg 

    // Función que muestra o desmuestra más información del pedido
    function showInfo() {
        setShow(!show)
    }

    return (

        // Card del pedido
        <div className='order-card'>
            
            {/* Header del pedido */}
            <div className='order-header'>
                <div className='order-tittle'>
                    <h1>Pedido {order?.date}</h1>
                    <h2>{order?.address}</h2>
                </div>
                <div className='order-ref'>
                    {order?.reference}
                </div>
            </div>

            {/* Más información sobre el pedido (los artículos) */}
            { show && 
                <div className='order-body'>
                 
                    {/* Cabecera de los productos */}
                    <div className='order-body-products-header'>
                        <div>Artículos ({order?.products.length})</div>
                        <div>$ {order?.total}</div>
                    </div>

                    {/* Productos del pedido */}
                    <div className='order-body-products'>
                        {
                            order?.products.length > 0 && order?.products.map( (product, i) => (
                                <PayProduct key={i} product={product} quantity={product?.quantity}></PayProduct>
                            ))
                        }
                    </div>
                </div>
            }

            <button onClick={showInfo} className='show-more-info'>
                <img src={showSvg} />
            </button>
        </div>
    )

}

export default Order