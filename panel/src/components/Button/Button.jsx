
// Botón genérico para toda la aplicación
function Button ({ onClick, width, height, borderColor, borderWidth, text}){
    
    return (
        <button onClick={onClick} style={{    
            width: width,
            height: height,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: '1vh',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '2.5vh',
            backgroundColor: 'var(--secondary)',
            color: 'var(--tertiary)',
            cursor: 'pointer'
        }}>
            {text} 
        </button>
    )
}

export default Button