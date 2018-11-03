# 5 - De un log distribuido a una db distribuida

Felicitaciones :tada::fireworks:!!

Si llegaste hasta aquí significa que ya sos una hypercore padawan. Es tiempo de ampliar tu
conocimiento peer-to-peer y convertirte en una gran Jedi.

Vimos que hypercore nos ofrece un log distribuido pero existen situaciones en donde eso
no nos alcanza, por suerte, nada nos limita a crear estructuras mucho mas complejas
arriba de hypercore. Una de ellas es nuestra :star: del workshop: [hyperdb](/hyperdb)

## Hyperdb

Hyperdb nos ofrece una base de datos key-value distribuida sobre un conjunto
de feeds de hypercore.

Una de la features mas importantes es, que agrega la posibilidad de tener `multiple-writters` lo cual
llevaría a Dat al siguiente nivel, en donde múltiples usuarios **previamente autorizados** podrían
modificar el contenido de un recurso Dat. **Ya no existiría un solo owner**.

## Sobre qué vamos a construir

En este workshop estamos aprendiendo cómo usar Dat para escrbir una aplicación web P2P. Nuestro objetivo será construir juntos un chat P2P. El codename del chat será: _Olaf_ :smiley_cat:.

Para construir nuestro chat vamos a usar lo que venimos aprendiendo. En este modulo vamos a introducir una parte fundamental que iremos desarrollando. Les presentamos a _saga_ :heart_eyes_cat:

## Saga

![saga](/../../../assets/saga.jpg)

Hyperdb es lo que necesitamos para poder avanzar en nuestro chat peer-to-peer.

Vamos a definir una API que permita a múltiples usuarios escribir sobre un hyperdb distribuido.

En este caso enfoquemonos en los requerimientos que tiene un chat para
considerarse como tal:

1. Podemos escribir mensajes en el chat.
1. Podemos leer los mensajes en _real-time_.
1. Podemos conectar y desconectar usuarios al canal (_room_).

Entonces, comencemos el desarrollo de nuestra API, aka: **Saga** :heart_eyes_cat:

## Ejercicio

1. En la clase `Saga` agregar un constructor que reciba un `storage`, una `key` y un `username`.
2. Con el `storage` y la `key`, crear una instancia de hyperdb con un valueEncoding **json**.
3. Una instancia de Saga debe permitirnos acceder a:
  * la instancia de hyperdb, bajo la prop: `db`
  * el username, bajo la prop: `username`
  * un [Map](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map)
  de usuarios (inicialmente vació): `users`
  * Un `Map` de mensajes (inicialmente vació): `messages`

## Test

```
$ npm test ./05
```

## Tips

1. Vas a encontrar que hyperdb posee una API muy similar a hypercore. :wink:
2. Sobre `Map`, partes importantes:
  - un map puede contener objetos como claves. :cool:
  - constructor: `new Map([iterable])`
  - métodos:
    - `size()`, para obtener el tamaño.
    - `set(clave, valor)`, para agregar un _clave_ nueva con _valor_.
    - `has(clave)`, para saber si nuestro map contiene determinada clave.
    - `keys()`, para obtener todas las claves del map.
  - Hint: es :cool: usar `for...of` para iterar sobre los elementos del map.
