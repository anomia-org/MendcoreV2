// フレームワーク
import "./bootstrap";
import "vue-skeletor/dist/vue-skeletor.css";

// アプリの作成
import { createSSRApp, h } from "vue";
import { trail } from "momentum-trail";
import { Skeletor } from "vue-skeletor";
import type { DefineComponent } from "vue";
import AppHead from "./Components/AppHead.vue";
import routes from "../routes/js/routing.json";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import Pagination from "./Components/Pagination.vue";
import { createInertiaApp, Head, Link } from "@inertiajs/vue3";

if (import.meta.hot) {
  import.meta.hot.accept();
}

// エクストラ
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy-bundle.umd.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env?.['VITE_APP_NAME'] || "Laravel";
createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    progress: { includeCSS: true, showSpinner: false },
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.vue`,
        import.meta.glob<DefineComponent>("./Pages/**/*.vue")
      ),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .use(trail, {
          routes,
          url: props.initialPage.url,
        })
        .use(VueTippy)
        .component('Skeletor', Skeletor)
        .component('Pagination', Pagination)
        .component('AppHead', AppHead)
        .component('Head', Head)
        .component('Link', Link);
    },
  }).then((app) => {
    const appRender = app;
    appRender.body = appRender.body.replace(/data-page=".*?"/, '');
    return appRender;
})
);
