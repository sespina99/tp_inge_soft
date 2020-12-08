<template>
  <div>
    <app-header></app-header>
    <profile></profile>
    <app-footer></app-footer>
  </div>
</template>

<script>

import PerfilTune from "@/components/inge/PerfilExterno";
import FooterTune from "@/components/inge/FooterTune";
import HeaderTune from "@/components/inge/HeaderTune";

export default {
  components: {
    'app-header': HeaderTune,
    'profile': PerfilTune,
    'app-footer': FooterTune,
  },

  data() {
    return {
    }
  }
}
</script>