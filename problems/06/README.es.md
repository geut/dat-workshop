# 6 - Escribiendo mensajes

Una parte esencial en la API de Saga es la posibilidad de escribir mensajes en la db.

Hyperdb provee diferentes métodos para escribir data en la db, uno de ellos es:

```javascript
  db.put(key, value, cb)
```

Como dijimos anteriormente hyperdb es una base de datos key-value, esto quiere decir que si
ejecutamos: `.put('/test', 'hi!')` el valor quedara guardado en la key `/test`.

:microscope: Vieron la `/` que agregamos a la key? `Hyperdb tiene soporte para namespaces`, similar a _redis_.

Podemos, a modo de ejemplo, leer todos los valores relacionados a un _namespace_ particular y sus _subfolders_:

```javascript
db.put('/test/1', 'hi')
db.put('/test/2', 'how are you?', () => {
  db.createReadStream('/test').pipe(printInConsole)
})

// console:
// [ Node(key=test/1, value='hi', seq=1, feed=0)) ]
// [ Node(key=test/2, value='how are you?', seq=2, feed=0)) ]
```

## Ejercicio

Definir dos nuevos métodos de instancia para Saga.

1. `ready -> Promise`
Método que retorne una promesa y que se resuelve cuando la db esta `ready`.
2. `writeMessage(message: string) -> Promise`
Método que recibe como parámetro un `string` y retorna una **Promise**.

Pero debemos tener en cuenta algunas cosas mas:
  - La **promise** se resuelve cuando se termina la operación de escritura y debe retornar la key del mensaje.
  Si la escritura falla, debería hacer un `reject` con el error.
  - No solo debemos guardar el mensaje sino también información adicional sobre el mismo:
  `{ key, message, username, timestamp }`
  - Los mensajes se deben guardar bajo el namespace: `/messages/<messageKey>`.
  - Las key deben ser únicas.

## Tips

- La mejor forma de definir una key única es utilizar algún generador de IDs. Te recomendamos
que investigues: [hyperid](hyperid)

<!-- tabs:start -->
## **Test**

```
$ npm test ./06
```

[test.js](./test.js ':include')

## **Solución**

[solution.js](./solution.js ':include')

<!-- tabs:end -->
