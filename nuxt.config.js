
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'vuesax/dist/vuesax.css'
  ],

  loading: { color: '#46c93a' },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/vuesax',
    { src: '~/plugins/vue-flag-icon', ssr: false },
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/vuelidate', ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  fontawesome: { 
    icons: {
      solid: true,
      brands: true
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Beautifull notifications
    'nuxt-sweetalert2',

    // Beaitifull select
    'nuxt-vue-select',

    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    
    // Localization (site language)
    ['nuxt-i18n', {
      lazy: true,
      vueI18nLoader: true,
      langDir: 'locales/',
      locales: [
        { code: 'en', iso: 'us', file: 'en.json' },
        { code: 'ru', iso: 'ru', file: 'ru.json' },
        { code: 'cn', iso: 'cn', file: 'cn.json' }
      ],
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
        silentTranslationWarn: true
      }
    }]

  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: `http://localhost/Robonus`
    baseURL: `https://robonus.com`
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
