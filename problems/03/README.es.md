# 3 - La clave es la clave

En el problema anterior vimos cómo instanciar un `feed` de Hypercore y
mencionamos la palabra `seguridad`.

Tanto Hypercore como todo el ecosistema de Dat trabajan con el concepto de
clave asimétrica para la firma y encriptación de datos.

Esto nos permite asegurar la protección de nuestros datos al momento de
compartirlos con otros [peers](/docsify/terms).

Existen 3 keys para tener en cuenta:

### Public Key :key:

Es una clave única.

Es la clave que reconocemos de los links de Dat `dat://<public-key>`.

La utilizamos para encriptar/desencriptar nuestros mensajes, de forma que solo quienes tengan la Public Key podrán leer nuestro feed.

Es nuestra responsabilidad compartirla de forma segura con nuestros `peers` de confianza.

### Secret Key :closed_lock_with_key:

Dat actualmente maneja una arquitectura de single-writer / multiple-readers. Solo el `owner` del `feed` es
decir, el dueño de la Secret Key podrá escribir sobre el log.

> Hablamos de single-writer, pero eso pronto va a cambiar en Dat a multiple-writer. Nosotros no te queremos
hacer esperar, así que mas adelante veremos como utilizar el futuro de Dat, hoy :rocket:.

### Discovery Key :earth_americas:

Mas adelante veremos mejor el concepto de `discovery` pero en este momento consideremos que los peers son
computadoras aisladas que quieren encontrarse y compartir un recurso, en este caso nuestro `feed`.

Podríamos reconocer a nuestro `feed` por su clave única `public key` y que nuestros peers intercambien información sobre quien
tiene dicha clave.

Pero podría suceder que algún peer "maligno" se apodere de nuestra key y acceda a nuestros datos.

Para evitar compartir la public key, Dat ideo una tercera key que permite a los peers utilizarla para descubrirse
entre ellos sin poner en riesgo nuestros datos encriptados.

## Hypercore y la Public Key

Como dijimos anteriormente, la public key sirve para encriptar/desencriptar los mensajes de nuestro feed. Eso quiere decir que
si tenemos la key de un `feed remoto` (el feed de un peer de confianza) podríamos desencriptar los mensajes de su feed y
leerlos.

Para lograrlo, hypercore acepta un segundo parámetro en su construcción:
```javascript
hypercore(<storage>,<public key>,<options>)
```

> Mas adelante veremos como es el proceso de sincronizar nuestro feed local con un feed remoto.

## Ejercicio

1. Instanciar un feed usando la key remota.
2. Retornar una [Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise#S%C3%BAper_simple_(%C2%A110_l%C3%ADneas!)
con el objeto: `{ publicKey, discoveryKey }`.
  * Cada key debe ser retornada en base hexadecimal (`hex`).

### Si te queda tiempo

Que pasaría si intentas acceder al `secretKey`? :speak_no_evil:

## Test

```
$ npm test ./03
```

## Tips

1. Una vez que nuestro feed esta `ready`, podremos acceder a nuestras keys.
1. Podemos saber si nuestro `feed` esta `ready` utilizando el evento `feed.on('ready', ...)`.
Como podemos ver, tanto `hypercore` como muchos otros módulos
heredan la interfaz de [EventEmitter](https://nodejs.org/api/events.html).
1. Las keys son Node [Buffers](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end),
podemos utilizar `toString` para convertirlos a lo que necesitemos.


