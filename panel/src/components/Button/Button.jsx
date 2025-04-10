
function Button ({width, height, borderColor, borderWidth, text}){
    return (
        <button style={{    
            width: width,
            height: height,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: 5
        }}>
            {text} 
        </button>
    )
}

export default Button