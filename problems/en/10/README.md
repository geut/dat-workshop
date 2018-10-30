# 10 - Getting to know Olaf :smiley_cat:

:checkered_flag: We are in the final round of our app. We are going to connect all that we've seen with a user interface that we hope people like :relaxed:.

![el gato olaf](./images/the-olaf.jpg)

**With all our new knowledge we are going to create a P2P chat.**

> Remember that the workshop idea is to know more about Dat and all of the parts that make it up. Later, we can use that knowledge to create whatever type of application. Nevertheless, note that the architectures of these P2P apps are a little different that traditional webapps with which we are acustomed to working with. Anyway, your imagination is the limit.

But to a bit pragmatic, we are going to start with an app that we will use like
a shell for our workshop. This app is called `Olaf` and it's built on an
alternative stack.

- [choo](/choo)
- [tachyons](https://tachyons.io/)
- [parceljs](https://parceljs.org/)
- babel7
- webrtc

We're going to add to `Olaf` what we have been building in `Saga`, our own API
over hyperdb that allows us to replicate feeds and read/write messages :cool:

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

