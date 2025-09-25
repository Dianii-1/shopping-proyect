# Descripción


## Correr en DEV

1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Ejecutar el seed ```npm run seed```
7. Limpiar el localstorage del navegador
8. Correr el proyecto ```npm run dev```

## Comandos importantes

```npx prisma init --datasource-provider postgresql``` crea el prisma en mi proyecto, conectandose a una base de datos
```npx prisma migrate dev --name migrateName``` para generar una migracion
```npx prisma db pull``` para cuando tengo una tabla en la base de datos y quiero que esta se cree en mi schema
```npm i -D ts-node``` comando para instalar una dependencia para que node me permita ejecutar codigo de typescript
npx prisma generate generar el cliente de prisma

"scripts": {
  // otros scripts...
  "clean": "rimraf node_modules package-lock.json .next && npm cache clean --force && npm install"
}
npm install --save-dev rimraf
Esto hará:

Borrar las carpetas y archivos: node_modules, package-lock.json y .next

Limpiar la caché de npm

Instalar de nuevo todas las dependencias


