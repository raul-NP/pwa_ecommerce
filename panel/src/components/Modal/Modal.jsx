// Estilo
import './Modal.css'
import cross from '../../assets/imgs/cross.svg';
import check from '../../assets/imgs/check.svg';


// Modal genércio de información
function Modal ({ text, type}){

    const src = type == 'cross' ? cross : check; 
    
    return (
        <div className='container'>
            <h1>{text}</h1>
            <img src={src}/>
        </div>
    )
}

export default Modal