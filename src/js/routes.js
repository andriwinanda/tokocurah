
import HomePage from '../pages/home.vue';
import Product from '../pages/product.vue';
import Search from '../pages/search.vue';
import AboutPage from '../pages/about.vue';
import FormPage from '../pages/form.vue';


import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';

function securedRoute(path, component) {
  return {
    path,
    reloadCurrent: true,
    async(to, from, resolve) {
      let baseUrl = localStorage.getItem("baseUrl");
      let token = localStorage.getItem("glmobile-token");

      if (to.path !== '/login' && to.path != '/get_url') {
        if (!baseUrl) {
          store.dispatch("login/logout")
          resolve({ path: '/get_url' })
        } else if (!token) {
          store.dispatch("login/logout")
          resolve({ path: '/login' })
        } else {
          resolve(component)
        }
      }
    }
  }
}

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/product/:id',
    component: Product,
  },
  {
    path: '/search/:keyword',
    component: Search,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },


  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
routes.reloadCurrent = true
routes.mode = 'history'

export default routes;
