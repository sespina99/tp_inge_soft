<template>
  <div>
    <olvide-cont></olvide-cont>
    <app-footer></app-footer>
  </div>
</template>

<script>

import OlvideCont from '../components/OlvideContraseña'
import Footer from '../components/Footer'

export default {
    components: {
        'olvide-cont': OlvideCont,
        'app-footer': Footer,
    },

    data() {
        return {  
        }
    }
}
</script>