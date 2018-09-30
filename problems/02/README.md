# 2 - Hypercore

[Hypercore](hypercore) is a secure, distributed append-only log.

Built for sharing large datasets and streams of real time data as part of the Dat project.

```javascript
const hypercore = require('hypercore')
const feed = hypercore('./my-first-dataset', {valueEncoding: 'utf-8'})
```

## Ejercicio

1. Crear una funcion que retorne un `feed` de hypercore utilizando un `storage` en memoria.
2. Configurar la instancia para que sus datos se codifiquen y decodifiquen en `json`.
3. Agregar antes de retornar el `feed` agregar al log el objecto: `{ title: 'dat-is-freedom' }`.

## Test

```
$ npm test 02
```
