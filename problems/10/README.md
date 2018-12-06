# 10 - Getting to know Olaf :smiley_cat:

:checkered_flag: We are in the final round of our app. We are going to connect all that we've seen with a user interface that we hope people like :relaxed:.

![el gato olaf](/assets/theolaf.jpg)

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

## A quick glance over Choo :steam_locomotive:

Choo is a minimalist framework to construct web applications. It has everything
you need and nothing more.

Some important concepts in the Choo world:
- We have views and components. Usually a view uses various components. A view
  would be a [_stateful component_](/choo#components).
- Components are similar to _stateless functions_ in React.
- In choo core, there is an event system. For example, a rendering dispatches the `render` event.
- Choo comes with a router that maps regex to views.
- There are some [built-in events](/choo#events) that we can use when we create apps, but also it's ok to use our [own events](/choo#stateevents) that conforms to the logic of our own app.
- Finally, the [state](/choo#state) is a shared object that can be mutated.
  A re-renderizer isn't tied to a change in the state directly. Even though
usually it's usual, but don't forget we have to emit render.

## Exercise

1. First let's familiarize ourselves with `Olaf` :cat2:
  - Review the views (`main.js`).
  - Then the components.
  - And then the `stores`. Here we find the connection between `Saga` and `Olaf`. We can also see how the event logic is distributed and which ones will be called. Try to understand when they will occur. When do the _listeners_ connect to the app?
1. Now let's go over `chat/olaf/lib` where we will find a _placeholder_ for
   `Saga.` Let's copy the code of the `Saga` class from the last exercise.
1. Return to the store, `stores/chat.js`. In the `initRoom` function we have to finish the binding between `Saga` and `Olaf`.

## Test

`npm run olaf`

## Tips

In this exercise we are connecting all that we have learned about dat in
a new application. We understand that there are many new things, so don't
hesitate to ask questions :smile_cat:
