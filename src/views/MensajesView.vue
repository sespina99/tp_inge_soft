<template>
  <div>
    <app-header></app-header>
    <mensajes></mensajes>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/inge/HeaderTune'

import Footer from '../components/inge/FooterTune'
import Mensajes from "@/components/chat/Chat";

export default {
  components: {
    'app-header': Header,
    'mensajes': Mensajes,
    'app-footer': Footer,
  },

  data() {
    return {
    }
  }
}
</script>