// Estilo
import './ModalConfirm.css';

function ModalConfirm({ showModal, setShowModal, onConfirm, message}) {
    
    // No renderizar si el modal no se muestra
    if (!showModal) return null;

    return (

        // Contenedor grisaceo del modal
        <div className="modal-overlay" onClick={() => setShowModal(false)}>

            {/* Contenido del modal */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>

                {/* Botones de cancelar o confirmacion */}
                <div className="modal-buttons">
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                    <button onClick={() => {onConfirm(); setShowModal(false);}}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;
