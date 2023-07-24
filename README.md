### Prueba técnica de react-php

Proyecto de un ecommerce básico con Front: React - Back: php y mysql

### Instrucciones de instalación y ejecución

Recomendación: Usar xampp y phpMyAdmin para crear y ejecutar el back
1. Dentro del proyecto se encuentra el archivo sql llamado 'create-bd-and-tb-users.sql' para crear la base de datos 'jacobs_shop' y la tabla 'users' apropiadamente.
2. Dentro del proyecto se encuentra la carpeta llamada 'api' la cual contiene todo el código back. Copie y pegue esta carpeta donde su motor le permita ejecutar el código. (Si está usando xampp y phpMyAdmin pegue la carpeta en la carpeta htdocs de xampp)
3. ejecute el comando 'npm install' en su consola preferida estando ubicado dentro del proyecto para bajar todos los paquetes necesarios para el correcto funcionamiento de la aplicación web.
4. ejecute el comando 'npm run dev' en su consola preferida estando ubicado dentro del proyecto para ejecutarlo, debe ser con este comando ya que el proyecto está construido con Vite. 

## IMPORTANTE 
Se uso Xampp y phpMyAdmin para crear el proyecto, por lo cual el puerto para conectarse a la base de datos es el 80. Si desea usar un motor de base de datos diferente y/o que use un puerto distinto al 80; debera cambiar el puerto especificado (80) en todos los componentes del proyecto que hace referencia por el puerto que use el motor de base de datos que se utilizara.