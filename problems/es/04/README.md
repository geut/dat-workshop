# 4 - Todo se trata de streams

## Introducción a streams

Si has programado en Node.js es muy probable que hayas usado [streams](https://nodejs.org/api/stream.html)
sin siquiera saberlo.

De hecho, son tan importantes que forman parte del core de Node. Cada _request_ o _response_ de tu
servidor, cada `console.log` u operación sobre el filesystem involucra algún tipo de stream. :boom:

Un stream es una interfaz que representa una secuencia de datos `a---b---c` en el tiempo y en donde
la información fluye desde una _fuente_ hacia un _destino_.

Los streams nos permiten por ejemplo leer un archivo por partes (chunks) a través de un `ReadableStream`,
aplicarle algún tipo de transformación por medio de un `TransformStream` y escribir cada chunk modificado
en un destino particular con un `WritableStream`.

Los streams pueden operar en un solo sentido como un ReadableStream que solo lee de una fuente
y envía sus datos al siguiente stream:

```
ReadableStream ---> ( DuplexStream | TransformStream ) ---> WriteableStream
```

Pero también existen los `DuplexStream` que permiten operaciones tanto de lectura como escritura.
Un ejemplo seria un [Socket](https://nodejs.org/api/net.html#net_new_net_socket_options)

!> Lo importante es tener en cuenta que dichas interfaces existen para definir una única forma de operar
sobre datos de forma eficiente y escalable. No importa si los datos se leen o escriben desde el disco o de una
conexión de red, **los streams hablan un solo lenguaje** y eso nos permite combinarlos como necesitemos.

:link: No es parte del workshop avanzar demasiado en este tema pero si querés aprender mas te recomendamos el
[stream-handbook](https://github.com/substack/stream-handbook).

## Streams en Hypercore

Internamente `hypercore` utiliza streams para cumplir sus objetivos.

### Leyendo nuestros logs

Podemos leer los datos de nuestro `feed` utilizando `feed.createReadStream` y mostrar los datos en pantalla:

```javascript
feed.createReadStream().pipe(process.stdout)
```

Como veras, `console.log` es un `WritableStream` en donde el destino es escribir en pantalla.

Utilizamos el método `pipe` para conectar y definir el flujo de datos de nuestros streams.

```javascript
// a --> b --> c
// unix like: a | b | c
a.pipe(b).pipe(c)
```

### Replicar

Supongamos que tenemos un feed local que utiliza la key pública de un feed remoto. En algún momento vamos
a querer leer sus datos, tenemos su key por lo que podemos desencriptarlos.

Pero antes de desencriptar los datos deberíamos poder obtenerlos, traerlos a nuestro feed local y unificarlos
con los datos que ya tenemos. A este proceso lo llamamos `replicacion`.

![replicant scene from blade runner](https://media.giphy.com/media/xtpNfxNz7rTSo/giphy.gif)

Queremos _replicar_ los datos del feed remoto en nuestro feed local.

Para poder lograrlo, volvemos a utilizar streams. Hypercore API ofrece un `feed.replicate()` que retorna un
_replication stream_ el cual lee la data de un feed remoto, la incorpora a su feed local y finalmente pasa el resultado
al siguiente stream, es decir se comporta como un `DuplexStream`.

![replicate](images/replicate.png)

### Sincronizar

Con `replicate()` podemos replicar los datos de un _feed remoto_ en nuestro _feed local_ pero tambien debemos
pensar que el feed remoto puede estar _desactualizado_.

!> Todos los peers deberían tener, eventualmente, la última versión de los datos.

Si tomamos en cuenta que la conexión entre dos peers es **bidireccional** podríamos hacer lo siguiente:
```javascript
//                (1)                      (2)
remoteFeed.pipe(localFeed.replicate()).pipe(remoteFeed)
```
1. Primero recibimos los datos de un feed remoto y los replicamos en nuestro feed local.
2. Una vez que tenemos nuestro feed actualizado, enviamos los datos nuevamente al feed remoto
para que se actualice en caso de tener data inconsistente.
3. Al final, ambos feed tienen la misma versión de los datos.

## Ejercicio

Vamos a simular leer mensajes que otro peer escribio. Para eso:

1. Vamos a sincronizar el feed local (con el del peer).
2. Una vez finalizada la sincronización, leeremos los datos del feed y cargaremos
cada mensaje en un array.
3. Una vez finalizada la lectura del feed, retornar el listado de mensajes.

## Test

```
$ npm test ./04
```

## Tips

### 1 - Pump

Por implementación de Node, si tenemos streams conectados por `.pipe` y uno de ellos
se destruye, el resto sigue funcionando.

Nosotros queremos que si algún stream se destruye (intencionalmente o por error) que todos
los streams conectados también lo hagan. Por eso vamos a utilizar el modulo [pump](/pump)
para remplazar a pipe.

Pump nos permite _pipear_ nuestros streams y asegurarnos que en caso de que uno se destruya, todos lo hagan. :cool:

> Como feature extra, el último argumento de pump puede ser una función que se ejecuta
cuando finalizan todos los streams.

```javascript
a.pipe(b).pipe(c)

// to

pump(a, b, c, err => {
  console.log('all streams have finished')
})
```

### 2 - Lectura/Escritura de datos

Un WritableStream nos permite iterar sobre los _chunks_ que fluyen en los streams y
escribirlos en donde queramos: disco, network, screen o inclusive en nuestra memoria.

Sabiendo esto, podemos definir un WritableStream que itere sobre los _chunks_ de forma similar a un `[].forEach`
y guardarlos en la estructura (un `Map` por ejemplo) que necesitemos.

Les recomendamos que investiguen `forEachChunk`, una función que armamos para ayudarlos a cumplir su objetivo.
