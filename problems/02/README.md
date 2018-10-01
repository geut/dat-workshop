# 2 - Hypercore

[Hypercore](hypercore) es un modulo fundamental en la arquitectura de Dat.

Es un [append-only log](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)
que provee los mecanismos necesarios para trabajar y compartir grandes volumenes de datos de forma segura y distribuida.

Vamos a conocer algunas `funciones` especificas del modulo para poder avanzar en el desarrollo de nuestro backend peer-to-peer.

```javascript
const hypercore = require('hypercore')
const feed = hypercore('./my-first-dataset', {valueEncoding: 'utf-8'})
```

## Ejercicio

1. Crear una funcion que retorne un `feed` de hypercore utilizando un `storage` en memoria.
1. Configurar la instancia para que sus datos se codifiquen y decodifiquen en `json`.
1. Antes de retornar el `feed` agregar al log el objeto: `{ title: 'dat-is-freedom' }`.

## Test

```
$ npm test 02
```

## Tips

1. Hypercore requiere que se especifique como primer parametro un `storage` que respete la interfaz de [random-access-storage](/random-access-storage).
1. Si en vez de pasarle un `storage` le definimos un path, utilizara intermente el modulo [random-access-file](/random-access-file).
1. Entre las opciones de Hypercore podemos definirle que tipo de [codec](/codecs) vamos a utilizar para serializar/deserializar nuestra data.
