// Estilo
import './CategoriesManagement.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalConfirm from '../Modal/ModalConfirm';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser, getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api_service';

// Imágenes
import editSvg from '../../assets/imgs/edit.svg';
import trashSvg from '../../assets/imgs/trash.svg';
import categorySvg from '../../assets/imgs/category.svg';

function CategoriesManagement() {

    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState("");
    const [originalName, setOriginalName] = useState("");

    // Modales
    const [processingModal, setProcessingModal] = useState(false)
    const [successEditModal, setSuccessEditModal] = useState(null)
    const [successCreateModal, setSuccessCreateModal] = useState(null)
    const [successDeleteModal, setSuccessDeleteModal] = useState(null)
    const [errorEditModal, setErrorEditModal] = useState(null)
    const [errorCreateModal, setErrorCreateModal] = useState(null)
    const [errorDeleteModal, setErrorDeleteModal] = useState(null)
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);

    useEffect(() => {

        // Datos del usuario actual
        const fetchUser = async () => {
            const user = await getCurrentUser();
            setUser(user);
        };

        // Datos de todas las categorías de la aplicación
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        };

        fetchUser();
        fetchCategories();
    }, []);

    // Función que realiza la acción de crear o editar una categoría
    const handleSubmit = async (e) => {

        // En caso de haber un modal activo
        if (processingModal) return

        // En caso de editar
        if (editMode){

            if (editName){
                
                // Evitamos recargar la pagina
                e.preventDefault()
    
                // Categoria a editar
                const editCategory = {
                    name: originalName,
                    new_name: editName,
                };
                    
                // En caso de editar exitosamente el usuario
                if (await updateCategory(editCategory)){

                    // Refrescamos los usuarios y el formulario
                    refreshCategories()
    
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

            if (editName){
                
                // Evitamos recargar la pagina
                e.preventDefault()
    
                // Categoria a crear
                const editCategory = {
                    name: editName
                }
    
                // En caso de crear exitosamente el usuario
                if (await createCategory(editCategory)){

                    // Refrescamos los usuarios y el formulario
                    refreshCategories()
    
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

    // Función que realiza la acción de borrar una categoría
    const removeCategory = async () => {

        // En caso de borrar exitosamente
        if (await deleteCategory(selectedCategoryToDelete?.name)){

            // Modal de aviso
            setSuccessDeleteModal(true)
            setProcessingModal(true)
            setTimeout( () => {
                setSuccessDeleteModal(false)
                setProcessingModal(false)
            }, 2000)

            // Refrescamos los usuarios
            refreshCategories()

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

        // Limpiamos la categoria a eliminar
        setSelectedCategoryToDelete(null);
    }

    // Función que establece los valores para crear una nueva categoría
    const createNewCategory = () => {
        setEditMode(false);
        setEditName("");
        setOriginalName("");
    }

    // Función que establece los valores para editar una categoría
    const editCategory = (cat) => {
        setEditMode(true);
        setEditName(cat.name);
        setOriginalName(cat.name);
    }

    // Refresca el formulario y las categorías
    const refreshCategories = async () => {
        createNewCategory();
        const cats = await getCategories();
        setCategories(cats);
    }

    return (
        <div>

            {/* Modal de confirmación para eliminar una categoría */}
            <ModalConfirm
                showModal={showDeleteConfirmModal}
                setShowModal={setShowDeleteConfirmModal}
                onConfirm={removeCategory}
                message={`Are you sure you want to delete category "${selectedCategoryToDelete?.name}"?`}
            />

            {/* Header de la aplicación */}
            <ProfileHeader user={user} text={"CATEGORIES MANAGEMENT"} />

            {/* Contenedor del panel de administrador */}
            <div className='admin-category-container'>

                {/* Modales de notificación */}
                {successCreateModal && <Modal text={'The category has been created successfully'} />}
                {successEditModal && <Modal text={'The category has been edited successfully'} />}
                {successDeleteModal && <Modal text={'The category has been deleted successfully'} />}
                {errorCreateModal && <Modal text={'There was an error creating the category'} type={'cross'} />}
                {errorEditModal && <Modal text={'There was an error editing the category'} type={'cross'} />}
                {errorDeleteModal && <Modal text={'There was an error deleting the category'} type={'cross'} />}

                {/* Lista de categorías */}
                <div className='admin-categories'>
                    {categories
                        .filter(cat => !["all", "favourites"].includes(cat.name.toLowerCase()))
                        .map((cat) => (
                            <div className="admin-category" key={cat.id}>
                                <img src={categorySvg} alt="category" />
                                <h1>{cat.name}</h1>
                                <div className='admin-category-actions'>
                                    <img src={editSvg} onClick={() => editCategory(cat)} />
                                    <img src={trashSvg} onClick={() => { setSelectedCategoryToDelete(cat); setShowDeleteConfirmModal(true); }} />
                                </div>
                            </div>
                        ))}
                </div>

                {/* Formulario para editar o crear una categoría */}
                <form className='admin-categories-controller'>
                    <div className='div-input-controller'>
                        <input className='input-controller' value={editName} onChange={(e) => setEditName(e.target.value)} type="text" placeholder='Category name' required />
                    </div>

                    {/* Botón de la acción de crear o editar una categoría */}
                    <Button className={'management-button'} onClick={handleSubmit} width={'34vw'} height={'4.5vh'} text={editMode ? "Edit" : "Create"} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}/>

                    {/* Botón de volver a la creación de categoría si estamos editando una */}
                    {editMode &&
                        <button onClick={createNewCategory} className='create-button'>+</button>
                    }
                </form>
            </div>

            {/* Footer general de la aplicación */}
            <Footer />
        </div>
    )
}

export default CategoriesManagement;
