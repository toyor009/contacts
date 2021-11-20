import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s | Toyosi Olayiwola",
    title: "My Contacts",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/sass/main"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      // themes: {
      //   light: {
      //     rs__primary: "#0f08af",
      //     rs__secondary: "#e4e9f4",
      //     rs__tertiary: "#03032b",
      //     rs__tertiary_dim: "#2b334e",
      //     rs__danger: "#d12c2c",
      //     rs__warning: "#fcb126",
      //     rs__success: "#00b052",
      //     rs__white: "#fafafa",
      //     rs__field_bg: "#f7fafd",
      //     rs__field_border: "#dadeeb"
      //   }
      // }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: { sourceMap: false }
    }
  }
};
