// Estilo
import './ConnectionBanner.css'

// Funcionalidad
import { useEffect, useState } from 'react';

// Banner para avisar al usuario que esta sin conexion
function ConnectionBanner() {
    
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {

    // Función que se ejecuta cuando el navegador recupera la conexión
    const handleOnline = () => setIsOffline(false);
    // Función que se ejecuta cuando el navegador pierde la conexión
    const handleOffline = () => setIsOffline(true);

    // Registramos los eventos de conexión
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Limpiamos los eventos
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Si el usuario está conectado, no se muestra nada
  if (!isOffline) return null;

  // Si está offline, se muestra el banner de advertencia
  return (
    <div className='banner'>
      ⚠️ Estás sin conexión. Algunas funciones pueden no estar disponibles.
    </div>
  );
}

export default ConnectionBanner;