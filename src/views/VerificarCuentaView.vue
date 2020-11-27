<template>
  <div>
    <verificar-cuenta></verificar-cuenta>
    <app-footer></app-footer>
  </div>
</template>

<script>

import VerificarCuenta from '../components/VerificarCuenta'
import Footer from '../components/Footer'

export default {
    components: {
        'verificar-cuenta': VerificarCuenta,
        'app-footer': Footer,
    },

    data() {
        return {  
        }
    }
}
</script>