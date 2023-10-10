# Naming Node Service & Storage Node Service

Este proyecto incluye dos servicios fundamentales para un sistema distribuido: un servicio de nomenclatura (Naming Node) y un servicio de almacenamiento (Storage Node).

# Autores

- Tomás Duque
- Felipe Ortiz
- David Ruiz

# Características Generales

- Configuración a través de archivos .env y config.json.
- API REST para buscar, crear, actualizar y obtener información sobre nodos y recursos.
- Inicialización del sistema con sincronización con otros nodos de nomenclatura (Naming Node).
- Soporte para subida y actualización de archivos a través de la librería multer.
- Manejo integrado de errores con mensajes personalizados.
- Funcionalidad para evitar sobrescribir archivos existentes.

# Cómo empezar

## Instalar dependencias:

```bash
npm install
```

# Configuración:

Crear o editar el archivo .env en la raíz del proyecto con las siguientes variables:

```env
NAMING_NODE_PORT=3000
NAMING_NODE_HOST=localhost
STORAGE_PORT=3001
STORAGE_HOST=localhost
```

Configurar el archivo config.json con la información relevante de los nodos de almacenamiento y nodos de nomenclatura.

Ejecutar el servicio:

```bash
node main.js
```

## API Endpoints

### Naming Node

- `GET /find`: Endpoint para buscar.

- `GET /resource`: Endpoint para crear un recurso.

- `PUT /resource`: Endpoint para actualizar un recurso.

- `GET /health`: Endpoint para verificar la salud del nodo.

- `GET /hashmap`: Endpoint para obtener el hashmap completo del sistema.

- `GET /ls`: Endpoint para listar todos los nodos.

### Storage Node

- `POST /resource`: Endpoint para subir un nuevo archivo al nodo de almacenamiento.

- `PUT /resource`: Endpoint para actualizar un archivo existente.

Nota: Ambos endpoints requieren la subida de un archivo con el nombre "file".

# Estructura del Proyecto

## Naming Node

- `main.js`: Archivo principal que inicia el servicio, establece la configuración y arranca el servidor.

- `server.js`: Configuración del servidor Express y definición de los endpoints.

- `startup.js`: Lógica para la inicialización y sincronización con otros nodos de nomenclatura al arrancar el servicio.

## Storage Node

- `main.js`: Archivo principal del nodo de almacenamiento.

- `server.js`: Configuración del servidor Express para el nodo de almacenamiento, incluyendo la lógica de manejo de archivos.

- `startup.js`: Lógica inicial del nodo de almacenamiento al arrancar.

# Manejo de Archivos

El sistema utiliza multer para gestionar la subida y actualización de archivos. Estos se almacenan en la carpeta ./files en la raíz del proyecto. Al intentar subir un archivo con un nombre que ya existe, el sistema devolverá un error informando que el archivo ya existe.
