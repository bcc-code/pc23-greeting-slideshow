import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { messages } from './translations'

const queryParams = new URLSearchParams(window.location.search);
const locale = queryParams.get("locale") ?? "nb";

const i18n = createI18n({
    legacy: false,
    messages: messages,
    locale: locale,
    returnEmptyString: false,
    fallbackLocale: 'nb'
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
