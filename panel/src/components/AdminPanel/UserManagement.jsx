// Estilo
import './UserManagement.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api_service';

// Imágenes
import eyeSvg from '../../assets/imgs/eye.svg';
import closeEyeSvg from '../../assets/imgs/closeEye.svg';
import userSvg from '../../assets/imgs/user.svg';
import trashSvg from '../../assets/imgs/trash.svg';
import editSvg from '../../assets/imgs/edit.svg';

// Página de login donde el usuario inicia sesión
function UserManagement() {

    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [editUsername, setEditUsername] = useState(null)
    const [editPassword, setEditPassword] = useState(null)
    const [newUser, setNewUser] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [edit, setEdit] = useState(false)
    const [seePassword, setSeePassword] = useState(false)

    // Datos del usuario
    useEffect(() => {

        // Datos del usuario
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
        };

        // Datos de todos los usuarios de la aplicación
        const fetchUsers = async () => {
            const users = await getUsers()
            setUsers(users)
        }

        fetchUser()
        fetchUsers()

    }, []);
    
    // Función que realiza la accion de crear o editar un usuario de la aplicación
    async function handleClick(e) {
        
        if (newUser && newPassword){

            e.preventDefault()

        }
    }

    // Función que establece los valores a crear de un usuario
    async function createUser() {
        setEdit(false)
        setEditUsername("")
        setEditPassword("")
    }

    // Función que establece los valores a editar de un usuario
    async function editUser(userName) {
        setEdit(true)
        setEditUsername(userName)
        setEditPassword(userName)
    }

    // Función que borra un usuario
    async function deleteUser(userName) {
        
    }

    return (
        <div>

            {/* Header de la aplicación */}
            <ProfileHeader user={user} text={"USER MANAGEMENT"}></ProfileHeader>

            {/* Contenedor del panel de administrador */}
            <div className='admin-user-container'>

                {/* Todos los usuarios de la aplicación */}
                <div className='admin-users'>

                    <div className='admin-user'>
                        <img src={userSvg} />
                        <h1>Rnavajas</h1>
                        <img onClick={() => editUser("ola")} src={editSvg} />
                        <img onClick={() => deleteUser(actualUser?.name)} src={trashSvg} />
                    </div>

                </div>
                
                {/* Formulario para editar o crear un usuario */}
                <form className='admin-users-controller'>

                    <div className='div-input-controller'>
                        <input className='input-controller' value={editUsername} type="text" placeholder='Username' required/>
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' value={editPassword} type={seePassword ? "text" : "password"} placeholder='Password' required/>
                        <img onClick={() => setSeePassword(!seePassword)} src={seePassword ? eyeSvg : closeEyeSvg}/>
                    </div>

                    {/* Botón de la acción de crear o editar un usuario */}
                    <Button className={'management-button'} onClick={handleClick} width={'34vw'} height={'4.5vh'} text={edit ? "Edit" : "Create"} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>
                    
                    {/* Botón de volver a la creación de usuario si estamos editando un usuario */}
                    {edit && 
                        <button onClick={createUser} className='create-button'>+</button>
                    }

                </form>
            </div>

            {/* Footer general de la aplicación */}
            <Footer ></Footer>
        </div>
    )
}

export default UserManagement