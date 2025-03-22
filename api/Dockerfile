FROM python:3.11-slim

WORKDIR /app

# Copiar el script wait-for-it
COPY wait-for-it.sh /app/wait-for-it.sh

# Instalar las dependencias
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de la aplicación
COPY . .

# Hacer que wait-for-it espere a que MySQL esté listo antes de ejecutar la API
CMD ["./wait-for-it.sh", "db:3306","--timeout=40", "--", "python", "app.py"]
