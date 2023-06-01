//import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'
import 'devextreme/dist/css/dx.dark.css';


const app = createApp(App);
app.use(router);

app.mount('#app');
