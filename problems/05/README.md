# 5 - De un log distribuido a una db distribuida

Felicitaciones :tada::fireworks:!!

Si llegaste hasta aquí significa que ya sos un hypercore padawan. Es tiempo de ampliar tu
conocimiento peer-to-peer y convertirte en una gran Jedi.

Vimos que hypercore nos ofrece un log distribuido pero existen situaciones en donde eso
no nos alcanza, por suerte, nada nos limita a crear estructuras mucho mas complejas
arriba de hypercore. Una de ellas es nuestra :star: del workshop: [hyperdb](/hyperdb)

## Hyperdb

Hyperdb nos ofrece una base de datos key-value distribuida desarrollada arriba de un conjunto
de feeds de hypercore.

Una de la features mas importantes es que agrega la posibilidad de tener `multiple-writters` lo cual
llevaria a Dat al siguiente nivel, en donde multiples usuarios **previamente autorizados** podrian
modificar el contenido de un recurso Dat. Ya no existiria un solo owner.

Esto es lo que necesitamos para poder avanzar en nuestro chat peer-to-peer.

Necesitamos definir una API que permita a multiples usuarios escribir sobre un hyperdb distribuido.

Que escribiriamos? Lo que quisieramos pero en este caso enfoquemonos en lo que necesita un chat para
considerarse como tal: `los mensajes de cada usuarios`

!> Van a encontrar que hyperdb posee una API muy similar a hypercore.


