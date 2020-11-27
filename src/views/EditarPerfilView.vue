<template>
  <div>
    <app-header></app-header>
    <editar_perfil></editar_perfil>
    <app-footer></app-footer>
  </div>
</template>

<script>

import FooterTune from "@/components/inge/FooterTune";
import HeaderTune from "@/components/inge/HeaderTune";
import EditarPerfil from "@/components/inge/EditarPerfil";

export default {
  components: {
    'app-header': HeaderTune,
    'editar_perfil': EditarPerfil,
    'app-footer': FooterTune,
  },

  data() {
    return {
    }
  }
}
</script>