<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <profile-edit></profile-edit>
    <app-footer></app-footer>
  </div>
</template>

<script>

import ProfileEditing from '../components/ProfileEditing'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export default {
    components: {
        'app-header': Header,
        'profile-edit': ProfileEditing,
        'app-footer': Footer,
        'app-menu': Menu,
    },

    data() {
        return {  
        }
    }
}
</script>