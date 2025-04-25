// Componentes
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

// Imagenes


// Fuentes y estilos
import '../../styles/fonts.css'
import '../../styles/colors.css'
import './Home.css'

// Funcionalidades
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// Componente general Login
function Home ({categories}) {

    const navigate = useNavigate()

    function handleClick(){
        localStorage.setItem("token", "")
        navigate("/")
    }

    return (

        // Pantalla completa
        <div className='init-card'>

            {/* Header del incio */}
            <Header categories={categories}></Header>

            <button onClick={handleClick}>cerrar sesion</button>

            {/* Footer de la aplicación */}
            <Footer></Footer>
        </div>
    )
}

export default Home