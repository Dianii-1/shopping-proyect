# Descripción


## Correr en DEV

1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Correr el proyecto ```npm run dev```

## Comandos importantes

```npx prisma init --datasource-provider postgresql``` crea el prisma en mi proyecto, conectandose a una base de datos
```npx prisma migrate dev --name migrateName``` para generar una migracion
```npx prisma db pull``` para cuando tengo una tabla en la base de datos y quiero que esta se cree en mi schema
