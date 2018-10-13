# 10 - Conociendo a Olaf :smiley_cat:

:checkered_flag: Estamos en la recta final de nuestra aplicación. Vamos a conectar todo lo que vimos con una interfaz de usuario que esperemos sea de su agrado :relaxed:.

![el gato olaf](./images/the-olaf.jpg)

**Con todos nuestro nuevos conocimientos vamos a crear un chat P2P.**

> Recuerden que la idea del workshop es conocer mas sobre Dat y todas las partes que lo componen. Luego podemos usar ese conocimiento para crear cualquier tipo de aplicación. Sin embargo pueden haber notado que las arquitecturas de estas apps P2P son un poco diferentes a las web apps tradicionales con las que podemos venir trabajando. De cualquier manera, tu imaginación es el limite.

Pero para ponernos un poco mas prágmaticos, vamos a partir de una app que usaremos como cascarón para nuestro workshop. Esta app se llama `Olaf` y esta construida sobre un stack alternativo:

- [choo](/choo)
- [tachyons](https://tachyons.io/)
- [parceljs](https://parceljs.org/)
- babel7
- webrtc

A `Olaf` le agregaremos lo que venimos construyendo en `Saga`, nuestra propia API sobre hyperdb que nos permite replicar feeds y leer/escribir mensajes. :cool:

## Un vistazo rápido sobre Choo :steam_locomotive:

Choo es un framework minimalista para construir aplicaciones web. Tiene todo lo necesario y nada mas.

Algunos conceptos importantes en el mundo de Choo:
- Tenemos vistas y componentes. Usualmente una vista levanta varios componentes. Una vista seria un [_statefull component_](/choo#components).
- Los componentes son similares a las _stateless functions_ de React.
- En el core de choo hay un sistema de eventos. Por ejemplo, un renderizado se dispara a emitiendo el evento `render`.
- Choo cuenta con un router que mapea regex a vistas.
- Hay algunos [eventos built-in](/choo#events) que que podemos usar cuando creamos apps, pero tambien esta todo bien con agregar nuestros [propios eventos](/choo#stateevents) de acuerdo a la lógica de nuestra app.
- Finalmente, el [estado](/choo#state) es un objeto compartido que puede ser mutado. Un re-renderizar no esta atado a un cambio de estado directamente. Aunque suele ser lo usual, pero no olvidemos que tenemos que emitir el render.

## Ejercicio

1. Primero vamos a familiarizarnos con `Olaf` :cat2:
  - Revisemos las vistas (`main.js`).
  - Luego los componentes.
  - Y finalmente los `stores`. Aquí encontraremos el binding entre `Saga` y `Olaf`. Mas alla de esto, veamos como esta distribuida la lógica de eventos, cuales se disparan y tratemos de entender en que momento deberian ocurrir. En qué momento se conectan los _listeners_ de nuestra app?
1. Ahora pasemos a `chat/olaf/lib` donde vamos a encontrar un _placeholder_ para `Saga`. Copiemos el código de la clase de `Saga` del ejercicio anterior. Esto sumariza el trabajo que venimos haciendo.
1. Volvamos al store principal, `stores/chat.js`. En la función `initRoom` tenemos que terminar el binding entre `Saga` y `Olaf`.

## Test

`npm run olaf`

## Tips

En este ejercicio estamos conectando todo lo que veniamos viendo sobre Dat con una aplicación nueva. Entendemos que hay varios cosas nuevas, por eso no dudes en preguntarnos :smile_cat:

