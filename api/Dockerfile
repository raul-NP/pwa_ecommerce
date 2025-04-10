FROM python:3.11-slim

WORKDIR /app

# Copiar primero todo excepto el script (evitamos sobreescribirlo luego)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de la aplicación
COPY . .

# Hacer ejecutable el script DESPUÉS de copiar todo
RUN chmod +x /app/wait-for-it.sh

# Ejecutar API solo cuando MySQL esté listo
CMD ["/bin/sh", "-c", "./wait-for-it.sh db:3306 --timeout=40 -- python app.py"]
