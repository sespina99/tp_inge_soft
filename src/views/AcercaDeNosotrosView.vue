<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <about-us></about-us>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AboutUs from '../components/AcercaDeNosotros'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export default {
    components: {
        'app-header': Header,
        'about-us': AboutUs,
        'app-footer': Footer,
        'app-menu': Menu,
    },

    data() {
        return {  
        }
    }
}
</script>