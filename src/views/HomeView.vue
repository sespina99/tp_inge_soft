<template>
  <div>
    <app-header></app-header>
    <home></home>
    <app-footer></app-footer>
  </div>
</template>

<script>

import HomeTune from '../components/inge/HomeTune'
import Header from '../components/inge/HeaderTune'

import Footer from '../components/inge/FooterTune'

export default {
    components: {
        'app-header': Header,
        'home': HomeTune,
        'app-footer': Footer,
    },

    data() {
        return {  
        }
    }
}
</script>