// Estilo
import './UserManagement.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalConfirm from '../Modal/ModalConfirm';

// Funcionalidad
import { useEffect, useState } from 'react';
import { deleteUser, getCurrentUser, getUsers, registerUser, updateUser } from '../../services/api_service';

// Imágenes
import eyeSvg from '../../assets/imgs/eye.svg';
import closeEyeSvg from '../../assets/imgs/closeEye.svg';
import userSvg from '../../assets/imgs/user.svg';
import trashSvg from '../../assets/imgs/trash.svg';
import editSvg from '../../assets/imgs/edit.svg';

// Página de login donde el usuario inicia sesión
function UserManagement() {

    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([])
    const [originalName, setOriginalName] = useState("")
    const [editUsername, setEditUsername] = useState("")
    const [editPassword, setEditPassword] = useState("")
    const [editRol, setEditRol] = useState("")
    const [editPoints, setEditPoints] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [seePassword, setSeePassword] = useState(false)

    // Modales
    const [processingModal, setProcessingModal] = useState(false)
    const [successEditModal, setSuccessEditModal] = useState(null)
    const [successCreateModal, setSuccessCreateModal] = useState(null)
    const [successDeleteModal, setSuccessDeleteModal] = useState(null)
    const [errorEditModal, setErrorEditModal] = useState(null)
    const [errorCreateModal, setErrorCreateModal] = useState(null)
    const [errorDeleteModal, setErrorDeleteModal] = useState(null)
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

    // Datos del usuario
    useEffect(() => {

        // Datos del usuario
        const fetchUser = async () => {
            const currentUser = await getCurrentUser()
            setCurrentUser(currentUser)
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
    async function handleSubmit(e) {
        
        // En caso de haber un modal activo
        if (processingModal) return

        // En caso de editar
        if (editMode){

            if (editUsername && editPoints && editRol){
                
                // Evitamos recargar la pagina
                e.preventDefault()
    
                // Usuario a editar, se puede prescindir de contraseña
                const editUser = {
                    name: originalName,
                    new_name: editUsername,
                    points: editPoints,
                    rol: editRol,
                    ...(editPassword && { password: editPassword })
                };
                    
                // En caso de editar exitosamente el usuario
                if (await updateUser(editUser)){

                    // Refrescamos los usuarios y el formulario
                    refreshUsers()
    
                    // Modal de aviso
                    setSuccessEditModal(true)
                    setProcessingModal(true)
                    setTimeout( () => {
                        setSuccessEditModal(false)
                        setProcessingModal(false)
                    }, 2000)

                // Caso de error
                }else{

                    // Modal de aviso
                    setErrorEditModal(true)
                    setProcessingModal(true)
                    setTimeout( () => {
                        setErrorEditModal(false)
                        setProcessingModal(false)
                    }, 2000)
                    
                }
            }
                
        // En caso de crear
        }else{

            if (editUsername && editPassword && editPoints && editRol){
                
                // Evitamos recargar la pagina
                e.preventDefault()
    
                // Usuario a crear o editar
                const editUser = {
                    name: editUsername,
                    password: editPassword,
                    points: editPoints,
                    rol: editRol
                }
    
                // En caso de crear exitosamente el usuario
                if (await registerUser(editUser)){

                    // Refrescamos los usuarios y el formulario
                    refreshUsers()
    
                    // Modal de aviso
                    setSuccessCreateModal(true)
                    setProcessingModal(true)
                    setTimeout( () => {
                        setSuccessCreateModal(false)
                        setProcessingModal(false)
                    }, 2000)

                // Caso de error
                }else{

                    // Modal de aviso
                    setErrorCreateModal(true)
                    setProcessingModal(true)
                    setTimeout( () => {
                        setErrorCreateModal(false)
                        setProcessingModal(false)
                    }, 2000)

                }
            }
        }
    }

    // Función que realiza la accion de borrar un usuario
    async function removeUser() {
        
        // En caso de borrar exitosamente
        if (await deleteUser(selectedUserToDelete?.name)){

            // Modal de aviso
            setSuccessDeleteModal(true)
            setProcessingModal(true)
            setTimeout( () => {
                setSuccessDeleteModal(false)
                setProcessingModal(false)
            }, 2000)

            // Refrescamos los usuarios
            refreshUsers()

        // Caso de error al borrar usuario
        }else{

            // Modal de aviso
            setErrorDeleteModal(true)
            setProcessingModal(true)
            setTimeout( () => {
                setErrorDeleteModal(false)
                setProcessingModal(false)
            }, 2000)

        }

        // Limpiamos el usuario a eliminar
        setSelectedUserToDelete(null);
    }

    // Función que establece los valores a crear de un usuario
    async function createUser() {
        setEditMode(false)
        setEditUsername("")
        setEditPassword("")
        setEditPoints("")
        setEditRol("")
    }

    // Función que establece los valores a editar de un usuario
    async function editUser(user) {
        setEditMode(true)
        setOriginalName(user.name)
        setEditUsername(user.name)
        setEditPassword("")
        setEditPoints(user.points)
        setEditRol(user.rol)
    }

    // Refresca el formulario y los usuarios
    const refreshUsers = async () => {
        createUser()
        const allUsers = await getUsers();
        setUsers(allUsers);
    };

    return (
        <div>

            {/* Modal de confirmacion para eliminar un usuario */}
            <ModalConfirm
                showModal={showDeleteConfirmModal}
                setShowModal={setShowDeleteConfirmModal}
                onConfirm={removeUser}
                message={`Are you sure you want to delete user "${selectedUserToDelete?.name}"?`}
            />

            {/* Header de la aplicación */}
            <ProfileHeader user={currentUser} text={"USER MANAGEMENT"}></ProfileHeader>

            {/* Contenedor del panel de administrador */}
            <div className='admin-user-container'>

                { successCreateModal && <Modal text={'The user has been created successfully'}></Modal>}
                { successEditModal && <Modal text={'The user has been edited successfully'}></Modal>}
                { successDeleteModal && <Modal text={'The user has been deleted successfully'}></Modal>}
                { errorCreateModal && <Modal text={'There has been a problem creating a user'} type={'cross'}></Modal>}
                { errorEditModal && <Modal text={'There has been a problem editing a user'} type={'cross'}></Modal>}
                { errorDeleteModal && <Modal text={'There has been a problem deleting a user'} type={'cross'}></Modal>}

                {/* Todos los usuarios de la aplicación */}
                <div className='admin-users'>

                    {users.map((u) => (
                        <div className="admin-user" key={u.id}>
                            <img src={userSvg} alt="user" />
                            <h1>{u.name}</h1>
                            <img src={editSvg} onClick={() => editUser(u)} />
                            <img src={trashSvg} onClick={() => {setSelectedUserToDelete(u); setShowDeleteConfirmModal(true);}} />
                        </div>
                    ))}

                </div>
                
                {/* Formulario para editar o crear un usuario */}
                <form className='admin-users-controller'>

                    <div className='div-input-controller'>
                        <input className='input-controller' value={editUsername} onChange={(e) => setEditUsername(e.target.value)} type="text" placeholder='Username' required/>
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' value={editPassword} onChange={(e) => setEditPassword(e.target.value)} type={seePassword ? "text" : "password"} placeholder='Password' {...(!editMode ? { required: true } : {})}/>
                        <img onClick={() => setSeePassword(!seePassword)} src={seePassword ? eyeSvg : closeEyeSvg}/>
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' value={editPoints} onChange={(e) => setEditPoints(e.target.value)} type="number" placeholder='Points' required/>
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' value={editRol} onChange={(e) => setEditRol(e.target.value)} type="text" placeholder='Rol' required/>
                    </div>

                    {/* Botón de la acción de crear o editar un usuario */}
                    <Button className={'management-button'} onClick={handleSubmit} width={'34vw'} height={'4.5vh'} text={editMode ? "Edit" : "Create"} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>
                    
                    {/* Botón de volver a la creación de usuario si estamos editando un usuario */}
                    {editMode && 
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