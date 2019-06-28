# 8 - Autorizando a otros peers :horse: :hamster: :rabbit:

Hasta ahora todo lo que hemos visto ha involucrado pruebas locales con nuestra db pero no hemos interactuado mucho con el resto de nuestros compas.

Es tiempo de cambiar eso.

## Back to hyperdb & hypercore

Recuerdan que estamos usando hypercore y encima de el, hyperdb. Hagamos un breve repaso juntos, hasta ahora sabemos que:

- Dat es _singlewriter_, por ahora.
- `hypercore` es el :heartpulse: de Dat.
- `hypercore` nos permite crear un _feed_ (estructura de datos) donde podemos escribir/leer y que podemos compartir.
- Cada _feed_ nos da una clave pública que nos sirve para identificarnos.
- Un _feed_ puede ser visto como un _append-only log_.
- `hyperdb` es una db que opera sobre un **conjunto** de feeds (hypercores).
- `hyperdb` habilita a Dat a soportar _multiwriters_

## Cómo permitimos a otros peers qué escriban en nuestro feed?

Funciona de la siguiente manera: una operación de escritura en el feed del autor original (el creador de nuestro chat, en nuestro caso), indica que determinado peer puede escribir. La forma de identificar al peer es mediante su clave pública (`PK`), es decir, este peer :horse: debe pasarme su `PK` de alguna forma.

Internamente, hyperdb **escribe** en el feed, como si fuera un mensaje mas (aunque es un mensaje especial), que determinado peer :horse: puede escribir.

## Ejercicio

1. `Saga` debe soportar un nuevo metodo (API) que le permitira autorizar a un peer. Este método `_authorize` recibirá como parámetro una `PK`.
2. Este nuevo método retorna una promesa que cuando resuelve exitosamente entrega un string: `AUTHORIZED`, y cuando hace el reject, devuelve el error.

## Tips

Usaremos dos métodos de la API de hyperdb:

- [`authorize`](/hyperdb#dbauthorizekey-callback), nos sirve para autorizar.
- [`authorized`](/hyperdb#dbauthorizedkey-callback), nos sirve para chequear si ya autorizamos determinada key.

<!-- tabs:start -->
## **Test**

```
$ npm test ./08
```

[test.js](./test.js ':include')

## **Solución**

[solution.js](./solution.js ':include')

<!-- tabs:end -->
