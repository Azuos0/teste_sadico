import Pokerface from "@/views/Pokerface.vue";

export const routes = [
  {
    path: "/",
    name: "pokerface",
    component: Pokerface
  },
  {
    path: "/sad",
    name: "sad",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Sad.vue")
  },
  {
    path: "/joke",
    name: "joke",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Joke.vue")
  }
];