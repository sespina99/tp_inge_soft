<template>
  <div>
    <app-header></app-header>
    <explorar></explorar>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export default {
    components: {
        'app-header': Header,
        'explorar': ExplorarTu,
        'app-footer': Footer,
        'app-menu': Menu,
    },

    data() {
        return {
        }
    }
}
</script>