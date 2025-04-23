import Login from '../components/Login/Login'


// Página de login donde el usuario registra la sesión
function SignUpPage() {
    return (
        <Login signIn={false}></Login>
    )
}

export default SignUpPage