// Estilo
import './Payment.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import PayProduct from '../Product/PayProduct';

// Funcionalidad
import { useEffect, useState } from 'react';
import { createOrder, deleteProductFromCart, getCartProducts, getCurrentUser, getProductsByCategory, updateUser } from '../../services/api_service';
import { useNavigate } from 'react-router-dom';

function Payment() {

    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(null)
    const [textDiscount, setTextDiscount] = useState('')
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [addressName, setAddressName] = useState(null)
    const [street, setStreet] = useState(null)
    const [floorNumber, setFloorNumber] = useState(null)
    const [postalCode, setPostalCode] = useState(null)
    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)
    const [errorModal, setErrorModal] = useState(null)
    const [successModal, setSuccessModal] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {

            const currentUser = await getCurrentUser()
            setUser(currentUser)

            // Establecemos el texto de descuento si existe
            if (currentUser.discount){
                setTextDiscount("   (- $50)")
            }

            // Revisar si algun producto esta sin stock, eliminarlo del carrito
            const generalProducts = await getProductsByCategory('All')
            for (const product of generalProducts) {
                if (product?.stock == 0){
                    await deleteProductFromCart(product?.name, currentUser?.name)
                }
            }

            const cartProducts = await getCartProducts(currentUser.name);
            setProducts(cartProducts);
        }

        fetchData()  
    }, []);

    // Refresco de total, cantidad
    useEffect(() => {

        let calculatedTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
        calculatedTotal = user?.discount ? calculatedTotal - 50: calculatedTotal
        const calculatedQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
        setTotal(calculatedTotal.toFixed(2));
        setTotalQuantity(calculatedQuantity);

    }, [products]);

    // Lógica de pago
    async function payAction(e) {

        // Campos rellenos
        if (addressName && street && floorNumber && city && country && postalCode){
            
            // Evitar que al pulsar el boton se vacíen los campos
            e.preventDefault()

            const address = `(${addressName}) ${street}, ${floorNumber} (${city}, ${country}, ${postalCode})`
            const date = new Date().toISOString().split("T")[0]
            const { success, data } = await createOrder(address, date, total, user?.name)
            
            // Creamos la órden
            if (success){

                const accumulatedPoints = total / 10
                    
                // Quitamos el descuento activo del usuario y acumulamos los puntos obtenidos por la compra 
                const updatedUser = {
                    name: user?.name,
                    points: user?.points + accumulatedPoints,
                    discount: false
                };
        
                // En caso de fallo
                if (! await updateUser(updatedUser)){
                    return
                }

                // Modal de aviso
                setSuccessModal(true);
                setTimeout(() => {
                    setSuccessModal(false)
                    navigate("")
                }, 2000);

            // En caso de fallo (Usuario compra justo antes un producto que ya no esta en stock)
            }else{

                // Modal de aviso
                setErrorModal(true);
                setTimeout(() => {
                    setErrorModal(false)
                    navigate("/cart")
                }, 2000);
            }
        }
    }

    return (

        <div>
            
            {/* Cabecera del perfil */}
            <ProfileHeader text={"PAYMENT"} user={user}></ProfileHeader>

            {/* Contenedor de la página Pago */}
            <div className='payment-container'>

                {errorModal && <Modal text={"The order could not be placed, the product may be out of stock"} type={'cross'}/>}
                {successModal && <Modal text={"The order has been placed successfully"}/>}

                {/* Cuerpo de los productos a pagar */}
                <div className='payment-body'>
                    
                    <h1>Products ({totalQuantity})</h1>

                    {/* Productos del pago */}
                    <div className='payment-products'>

                        {/* Cada uno de los productos */}
                        {products.length > 0 &&
                            products.map((product) => (
                                <PayProduct 
                                    key={product.id} 
                                    product={product} 
                                    quantity={product.quantity} 
                                />
                            ))
                        }

                    </div>

                    {/* Total del pago */}
                    <div className='payment-total'>
                        Total: ${total}{textDiscount}
                    </div>

                </div>

                {/* Dirección de envío del pago */}
                <form className='payment-address'>

                    <div className='payment-address-row'>
                        <input onChange={ (e) => {setAddressName(e.target.value)}} className='payment-address-input' type="text" name="addres-name" maxLength={50} placeholder='Address Name' required/>
                        <input onChange={ (e) => {setStreet(e.target.value)}} className='payment-address-input' type="text" name="addres-sreet" maxLength={80} placeholder='Street' required/>
                    </div>

                    <div className='payment-address-row'>
                        <input onChange={ (e) => {setFloorNumber(e.target.value)}} className='payment-address-input' type="text" name="addres-name" maxLength={10} placeholder='Floor Number' required/>
                        <input onChange={ (e) => {setPostalCode(e.target.value)}} className='payment-address-input' type="number" name="addres-sreet" maxLength={10} placeholder='Postal Code' required/>
                    </div>

                    <div className='payment-address-row'>
                        <input onChange={ (e) => {setCity(e.target.value)}} className='payment-address-input' type="text" name="addres-name" maxLength={30} placeholder='City' required/>
                        <input onChange={ (e) => {setCountry(e.target.value)}} className='payment-address-input' type="text" name="addres-sreet" maxLength={56} placeholder='Country' required/>
                    </div>

                    {/* Botón de pago */}
                    <Button className={'payment-button'} onClick={payAction} width={'34vw'} height={'4.5vh'} text={'Pay'} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>

                </form>

            </div>

            {/* Footer general */}
            <Footer></Footer>

        </div>
    )
}

export default Payment