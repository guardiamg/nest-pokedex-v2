<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm i
```
3. Tener nest CLI instalado o utilizar npx para proyecto local
```
npm i -g @nestjs/cli
```
4. Levantar base de datos
```
docker-compose up -d
```

5. Clonar archivo
```
.env.template / .env
```

6. Llenar las variables de entorno definidas
```
.env
```

7. Ejecutar la aplicación en dev
```
npm run start:dev
```
```
nest start --watch
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest

# Build de Producción
1. Crear archivo ```.env.prod```
2. Llenar las varialbes de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```
