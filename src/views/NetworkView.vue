<template>
  <div>
    <app-header></app-header>
    <network></network>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/inge/HeaderTune'

import Footer from '../components/inge/FooterTune'
import NetworkTune from "@/components/inge/NetworkTune";

export default {
  components: {
    'app-header': Header,
    'network': NetworkTune,
    'app-footer': Footer,
  },


  data() {
    return {
    }
  }
}
</script>