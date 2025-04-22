import Login from '../components/Login/Login'


// Página de login donde el usuario registra la sesión
function SignUp() {
    return (
        <Login signIn={false}></Login>
    )
}

export default SignUp