# 7 - Mensajes

Ok, ya hemos conseguido que nuestra API puede escribir mensajes. En algún momento estos mensajes se replicaran y llegaran
a cada peer conectado.

Pero también deberíamos poder leer los mensajes de nuestra db, no solo eso, deberíamos poder leer los mensajes de forma `realtime`.
Queremos que Saga detecte cuando un usuario envía/escribe un mensaje en el chat.

El siguiente ejercicio consiste en lograr ese objetivo: `leer mensajes en realtime`.

## Ejercicio

1. Existe un método llamado `initialize`, necesitamos que una vez este `ready` nuestra db haga un update de los mensajes. Esto quiere decir,
leer de hyperdb cuales fueron los últimos mensajes y agregarlos a nuestro Map de mensajes.
1. Una vez que tenemos el listado, deberíamos llamar una función que se encargue de escuchar por nuevos cambios
en nuestra db y ante un cambio llame nuevamente al update de mensajes. De esta forma resolveríamos el problema de realtime.
1. Cada mensaje nuevo que Saga encuentre debería emitir un evento `message` junto al mensaje y la key como argumentos.
1. Deberás encontrar una forma de ser eficientes en el update de mensajes, finalizar el update cuando sea necesario, no queremos recorrer el
stream entero cada vez que hay un cambio.

## Test

```
$ npm test 07
```

## Tips

1. Para leer de hyperdb te recomendamos utilizar `createHistoryStream` y probablemente de forma iterar sobre los mensajes de forma `reversa`.
1. Ahora Saga extiende de EventEmitter, eso quiere decir que tienen a su disposición toda la funcionalidad para emitir eventos.
1. Cuando queremos finalizar un stream podemos llamar a: `.destroy()`. Si el stream forma parte de una cadena de streams conectados
con `pump`, llamar a un `destroy` provocaría finalizar cada stream conectado.
1. Recordé que `pump` acepta como ultimo parámetro una función que se ejecuta cuando finalizan los streams.
1. Podes preguntarnos lo que necesites! :rainbow:

