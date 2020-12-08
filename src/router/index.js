import Vue from 'vue'
import VueRouter from 'vue-router'

// import UserStore from '@/store/UserStore'

import HomeView from '../views/HomeView'
import Login from '../views/LoginView'
import Register from '../views/RegisterView'
import PageNotFound from '../views/NotFoundView'
import AcercaDeNosotrosView from "@/views/AcercaDeNosotrosView";
import AyudaView from "@/views/AyudaView";
import OlvideContView from "@/views/OlvideContraseñaView";
import VerificarCuentaView from "@/views/VerificarCuentaView";
import ProfileView from "@/views/ProfileView";
import NetworkView from "@/views/NetworkView";
import ExploreView from "@/views/ExploreView";
import ExplorarArtistasView from "@/views/ExplorarArtistasView";
import ExplorarInstitutosView from "@/views/ExplorarInstitutosView";
import EditarPerfilView from "@/views/EditarPerfilView";
import MensajesView from "@/views/MensajesView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/Network',
    name: 'Network',
    component: NetworkView,
  },
  {
    path: '/Explorar',
    name: 'Explorar',
    component: ExploreView,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Registro',
    name: 'Registro',
    component: Register,
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component: ProfileView,
  },
  {
    path: '/PerfilExterno',
    name: 'PerfilExterno',
    component: PerfilExternoView,
  },
  {
    path: '/EditarPerfil',
    name: 'EditarPerfil',
    component: EditarPerfilView,
  },
  {
    path: '/Mensajes',
    name: 'Mensajes',
    component: MensajesView,
  },
  {
    path: '/ExplorarArtistas',
    name: 'ExplorarArtistas',
    component: ExplorarArtistasView
  },
  {
    path: '/ExplorarInstitutos',
    name: 'ExplorarInstitutos',
    component: ExplorarInstitutosView
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound,
  },
  {
    path: '/MasOpciones/AcercaDeNosotros',
    name: 'AcercaDeNosotros',
    component: AcercaDeNosotrosView
  },
  {
    path: '/MasOpciones/Ayuda',
    name: 'Ayuda',
    component: AyudaView
  },
  {
    path: '/OlvideContraseña',
    name: 'OlvideContraseña',
    component: OlvideContView
  },
  {
    path: '/VerificarCuenta',
    name: 'VerificarCuenta',
    component: VerificarCuentaView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.name === 'Login')
  //   next({name: 'Home'})
  // if ((to.name !== 'Login' && to.name !== 'Registro' && to.name !== 'VerificarCuenta' && to.name !== 'OlvideContraseña')
  //  && UserStore.getCurrentToken() === null){
  //   next({ name: 'Login' })
  // }
  // else
    next()
})

export default router
