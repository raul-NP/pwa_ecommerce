// Estilo
import './ProductsManagement.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalConfirm from '../Modal/ModalConfirm';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser, getAllProducts, createProduct, updateProduct, deleteProduct, getCategories } from '../../services/api_service';
import { useNavigate } from 'react-router-dom';

// Imágenes
import editSvg from '../../assets/imgs/edit.svg';
import trashSvg from '../../assets/imgs/trash.svg';
import productSvg from '../../assets/imgs/product.svg';
import setingsSvg from '../../assets/imgs/settings.svg';

function ProductsManagement() {

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [originalProductId, setOriginalProductId] = useState(null);
    const navigate = useNavigate()

    // Campos del formulario
    const [form, setForm] = useState({ name: '', price: '', stock: '', url_image: '', description: '', categories: []});

    // Modales
    const [processingModal, setProcessingModal] = useState(false)
    const [successCreateModal, setSuccessCreateModal] = useState(null)
    const [successEditModal, setSuccessEditModal] = useState(null)
    const [successDeleteModal, setSuccessDeleteModal] = useState(null)
    const [errorCreateModal, setErrorCreateModal] = useState(null)
    const [errorEditModal, setErrorEditModal] = useState(null)
    const [errorDeleteModal, setErrorDeleteModal] = useState(null)
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [selectedProductToDelete, setSelectedProductToDelete] = useState(null);

    // Datos del usuario, productos y categorias
    useEffect(() => {

        const fetchData = async () => {
            const user = await getCurrentUser();
            const products = await getAllProducts();
            const categories = await getCategories();
            setUser(user);
            setProducts(products);
            setCategories(categories);
        };

        fetchData();
    }, []);

    // Al cambiar alguno de los datos del form
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Función que realiza la acción de crear o editar un producto de la aplicación
    async function handleSubmit(e) {

        // En caso de haber un modal activo
        if (processingModal) return;

        // En caso de editar
        if (editMode) {

            // Verificamos que todos los campos estén presentes
            if (form.name && form.price && form.stock && form.url_image && form.description && form.categories.length > 0) {

                // Evitamos recargar la página
                e.preventDefault();

                // Obtener el nombre de la categoría (excluyendo "all" y "favourites")
                const selectedCategoryId = form.categories[0];
                const selectedCategoryObj = categories.find(c => c.id === selectedCategoryId);
                const selectedCategoryName = selectedCategoryObj?.name;

                // Producto a editar
                const updatedProduct = {
                    id: originalProductId,
                    name: form.name,
                    price: form.price,
                    stock: form.stock,
                    url_image: form.url_image,
                    description: form.description,
                    category: selectedCategoryName // <- esto es clave
                };

                // En caso de editar exitosamente el producto
                if (await updateProduct(updatedProduct.id, updatedProduct)) {

                    // Refrescamos los productos
                    refreshProducts();

                    // Modal de aviso
                    setSuccessEditModal(true);
                    setProcessingModal(true);
                    setTimeout(() => {
                        setSuccessEditModal(false);
                        setProcessingModal(false);
                    }, 2000);

                // Caso de error
                } else {

                    // Modal de aviso
                    setErrorEditModal(true);
                    setProcessingModal(true);
                    setTimeout(() => {
                        setErrorEditModal(false);
                        setProcessingModal(false);
                    }, 2000);
                }
            }

        // En caso de crear
        } else {

            // Verificamos que todos los campos estén presentes
            if (form.name && form.price && form.stock && form.url_image && form.description && form.categories.length > 0) {

                // Evitamos recargar la página
                e.preventDefault();

                // Producto a crear
                const newProduct = {
                    ...form
                };

                // En caso de crear exitosamente el producto
                if (await createProduct(newProduct)) {

                    // Refrescamos los productos
                    refreshProducts();

                    // Modal de aviso
                    setSuccessCreateModal(true);
                    setProcessingModal(true);
                    setTimeout(() => {
                        setSuccessCreateModal(false);
                        setProcessingModal(false);
                    }, 2000);

                // Caso de error
                } else {

                    // Modal de aviso
                    setErrorCreateModal(true);
                    setProcessingModal(true);
                    setTimeout(() => {
                        setErrorCreateModal(false);
                        setProcessingModal(false);
                    }, 2000);
                }
            }
        }
    }

    // Función que realiza la accion de borrar un producto
    const removeProduct = async () => {

        // En caso de borrar exitosamente
        if (await deleteProduct(selectedProductToDelete?.id)){

            // Modal de aviso
            setSuccessDeleteModal(true)
            setProcessingModal(true)
            setTimeout( () => {
                setSuccessDeleteModal(false)
                setProcessingModal(false)
            }, 2000)

            // Refrescamos los productos
            refreshProducts()

        // Caso de error al borrar un producto
        }else{

            // Modal de aviso
            setErrorDeleteModal(true)
            setProcessingModal(true)
            setTimeout( () => {
                setErrorDeleteModal(false)
                setProcessingModal(false)
            }, 2000)

        }

        // Limpiamos el producto a eliminar
        setSelectedProductToDelete(null);
    };

    // Función que establece los valores a crear de un producto
    const createNewProduct = () => {
        setEditMode(false);
        setOriginalProductId(null);
        setForm({ name: '', price: '',  stock: '', url_image: '', description: '', categories: [] });
    };

    // Función que establece los valores a editar de un producto
    const editProduct = (prod) => {
        
        // Extrae solo la primera categoría válida del producto que no se ni all ni favourites
        const validCategories = (prod.categories || []).filter(cat => !["all", "favourites"].includes(cat.name.toLowerCase()));
        const selectedCategoryId = validCategories.length > 0 ? validCategories[0].id : '';
        
        setEditMode(true);
        setOriginalProductId(prod.id);
        setForm({
            name: prod.name,
            price: prod.price,
            stock: prod.stock,
            url_image: prod.url_image,
            description: prod.description,
            categories: selectedCategoryId ? [selectedCategoryId] : []
        });
    };

    // Refresca el formulario y los productos
    const refreshProducts = async () => {
        createNewProduct();
        const prods = await getAllProducts();
        setProducts(prods);
    };

    return (
        <div>

            {/* Modal de confirmación para eliminar un producto */}
            <ModalConfirm
                showModal={showDeleteConfirmModal}
                setShowModal={setShowDeleteConfirmModal}
                onConfirm={removeProduct}
                message={`Are you sure you want to delete product "${selectedProductToDelete?.name}"?`}
            />

            {/* Header de la aplicación */}
            <ProfileHeader user={user} text={"PRODUCTS MANAGEMENT"} />

            {/* Contenedor del panel de administrador */}
            <div className='admin-product-container'>

                {successCreateModal && <Modal text={'The product has been created successfully'} />}
                {successEditModal && <Modal text={'The product has been edited successfully'} />}
                {successDeleteModal && <Modal text={'The product has been deleted successfully'} />}
                {errorCreateModal && <Modal text={'There was an error creating the product'} type={'cross'} />}
                {errorEditModal && <Modal text={'There was an error editing the product'} type={'cross'} />}
                {errorDeleteModal && <Modal text={'There was an error deleting the product'} type={'cross'} />}

                {/* Todos los productos de la aplicación */}
                <div className='admin-products'>
                    {products.map((prod) => (
                        <div className="admin-product" key={prod.id}>
                            <img src={productSvg} alt="product" />
                            <h1>{prod.name}</h1>
                            <div className='admin-product-actions'>
                                <img src={editSvg} onClick={() => editProduct(prod)} />
                                <img src={trashSvg} onClick={() => { setSelectedProductToDelete(prod); setShowDeleteConfirmModal(true); }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Formulario para editar o crear un producto */}
                <form className='admin-products-controller'>

                    <div className='div-input-controller'>
                        <input className='input-controller' name="name" value={form.name} onChange={handleInputChange} type="text" placeholder="Product name" required />
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' name="price" value={form.price} onChange={handleInputChange} type="number" placeholder="Price" required />
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' name="stock" value={form.stock} onChange={handleInputChange} type="number" placeholder="Stock" required />
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' name="url_image" value={form.url_image} onChange={handleInputChange} type="text" placeholder="Image URL" />
                        <img id='product-image' src={form.url_image}/>
                    </div>
                    <div className='div-input-controller'>
                        <input className='input-controller' name="description" value={form.description} onChange={handleInputChange} type="text" placeholder="Description" />
                    </div>
                    <div className='div-input-controller'>
                        <select className='input-controller' name="category" value={form.categories[0] || ''} onChange={(e) => setForm({ ...form, categories: [parseInt(e.target.value)]}) } required>
                            <option value="">Select category</option>
                            {categories
                                .filter(cat => !["all", "favourites"].includes(cat.name.toLowerCase()))
                                .map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                        </select>
                    </div>

                    {/* Botón de la acción de crear o editar un producto */}
                    <Button className={'management-button'} onClick={handleSubmit} width={'34vw'} height={'4.5vh'} text={editMode ? "Edit" : "Create"} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}/>

                    {/* Botón de volver a la creación de producto si estamos editando un producto */}
                    {editMode &&
                        <button onClick={createNewProduct} className='create-button'>+</button>
                    }

                    {/* Botón para volver al panel de administrador */}
                    <button onClick={() => navigate("/profile/admin")} className='back-button'>
                        <img src={setingsSvg}/>
                    </button>

                </form>
            </div>

            {/* Footer general de la aplicación */}
            <Footer />
        </div>
    );
}

export default ProductsManagement;
