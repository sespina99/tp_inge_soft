<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
    <v-card class="mx-auto" max-width="50%" style="margin-bottom: 4%">
      <v-img src="../../assets/back.png" contain style="padding-bottom: 0"/>

      <div style="height: auto">
        <v-card-actions>
          <v-col cols="2">
            <v-btn style="padding-left: 40px" icon >
              <v-img contain style="size: initial" src="../../assets/profilePic.png"/>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn style="background-color: grey;color: white" text router to="/Perfil" >
            Cancelar
          </v-btn>
        </v-card-actions>

        <v-spacer></v-spacer>

        <br>
        <v-card-title style="padding: 0" class="pl-2" contain>
          <v-text-field
              v-model="fullname"
              :error-messages="fullnameErrors"
              label="Nombre y Apellido"
              solo
              required
              @input="$v.fullname.$touch()"
              @blur="$v.fullname.$touch()"
          ></v-text-field>
        </v-card-title>
        <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>
          <v-select
              v-model="tag"
              :items="tags"
              :error-messages="tagErrors"
              label="Tag"
              solo
              required
              @change="$v.tag.$touch()"
              @blur="$v.tag.$touch()"
          ></v-select>
          <v-text-field
              v-model="trabajo"
              label="Profesion"
              solo
              @input="$v.trabajo.$touch()"
              @blur="$v.trabajo.$touch()"
          ></v-text-field>
          <h4>Instrumentos:</h4>
          <v-text-field
              v-model="instrumentos"
              label="Instrumentos"
              solo
              @input="$v.instrumentos.$touch()"
              @blur="$v.instrumentos.$touch()"
          ></v-text-field>
          <h4>Géneros: </h4>
          <v-select
              v-model="generos"
              :items="categories"
              label="Genero"
              solo
              required
              @change="$v.generos.$touch()"
              @blur="$v.generos.$touch()"
          ></v-select>
          <h4>Acerca de: <br></h4>
          <v-text-field
              v-model="acerca"
              :error-messages="acercaErrors"
              label="Acerca de"
              solo
              required
              @input="$v.acerca.$touch()"
              @blur="$v.acerca.$touch()"
          ></v-text-field>
          <h4>Referencias: <br></h4>
          <div>
              <v-col cols="1">
                <v-img style="size: initial" src="../../assets/spotify.png"/>
              </v-col>
                <v-text-field
                    v-model="ref_spotify"
                    label="https://spotify.com/..."
                    solo
                    @input="$v.ref_spotify.$touch()"
                    @blur="$v.ref_spotify.$touch()"
                ></v-text-field>
              <v-col cols="1">
                <v-img min-height="3'%" max-height="30%" style="size: initial" src="../../assets/apple.png"/>
              </v-col>
                <v-text-field
                    v-model="ref_apple"
                    label="https://music.apple.com/ar/artist/..."
                    solo
                    @input="$v.ref_apple.$touch()"
                    @blur="$v.ref_apple.$touch()"
                ></v-text-field>
              <v-col cols="1" style="padding-top: 0">
                <v-img style="size: initial" src="../../assets/youtube.png"/>
              </v-col>
                <v-text-field
                    v-model="ref_youtube"
                    label="https://www.youtube.com/channel/..."
                    solo
                    @input="$v.ref_youtube.$touch()"
                    @blur="$v.ref_youtube.$touch()"
                ></v-text-field>
              <v-col cols="1" style="padding-top: 0">
                <v-img min-width="30%" max-width="80%" align="center" src="../../assets/soundcloud.png"/>
              </v-col>
                <v-text-field
                    v-model="ref_soundcloud"
                    label="https://soundcloud.com/..."
                    solo
                    @input="$v.ref_soundcloud.$touch()"
                    @blur="$v.ref_soundcloud.$touch()"
                ></v-text-field>
          </div>
<v-row>
  <v-divider></v-divider>
          <v-btn style="background-color: #4AD5E1;alignment: center;margin-bottom: 2%;color: white" text x-large width="60%" @click="submit()">
             Confirmar cambios
          </v-btn>
  <v-divider></v-divider>
</v-row>
        </v-card-text>
      </div>
    </v-card>


  </v-container>

</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    fullname: { required },
    tag: {required},
    acerca: {required},
    generos: {required}
  },
  data() {
    return {
      loggedIn: true,
      profile_link: '/Perfil',
      categories: ['Clásica','Rock','Pop','Metal','Jazz','Cumbia','Trap','Hip Hop','EDM','Tango','New Age','Funk','Punk','Rap','Elevator','Noise'],

      submitError: false,
      mensajeError: 'No se pueden actualizar tus datos en el servidor ahora mismo',

      currentUser: undefined,
      ref_spotify: '',
      ref_apple: '',
      ref_youtube: '',
      ref_soundcloud: '',
      fullname: '',
      tag: 'Músico',
      tags: [
        'Músico',
        'Institución',
        'Bar Nocturno',
          'Educación',
      ],
      menu: false,
      toggled: false,
      nombre: 'Nicolas Cicardi',

      trabajo: 'Profesor de Piano',
      instrumentos: 'Piano, Cello, Triángulo, Guitarra',
      generos: 'Deathcore, EDM, Clásica',
      acerca: 'Profesor de música con experiencia musical de 20 años, incluyendo master de composición clásica en Berklee. Poseo 5\n' +
          'años de experiencia en canto gregoriano.',
      lugares: ['Club Araoz','Moly'],
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Club Araoz',
          date: '01/10/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Moly',
          date: '11/09/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Obras',
          date: '05/09/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Luna Park',
          date: '01/09/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Moly',
          date: '21/08/2020'
        },
      ],
    }
  },
  created() {
    this.tag = 'Músico';
    this.toggled = false;
    this.nombre = 'Nicolas Cicardi';
    this.tag = 'Músico'

    this.trabajo= 'Profesor de Piano',
        this.fullname = 'Nicolas Cicardi';
        this.instrumentos= 'Piano, Cello, Triángulo, Guitarra',
        this.generos= 'Deathcore, EDM, Clásica',
        this.acerca= 'Profesor de música con experiencia musical de 20 años, incluyendo master de composición clásica en Berklee. Poseo 5\n' +
            'años de experiencia en canto gregoriano.',
        this.lugares= ['Club Araoz','Moly'],
        this.items= [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Club Araoz',
            date: '01/10/2020'
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Moly',
            date: '11/09/2020'
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Obras',
            date: '05/09/2020'
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Luna Park',
            date: '01/09/2020'
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Moly',
            date: '21/08/2020'
          },
        ]
  },
  computed: {
    getRecent () {
      return this.items.map((t) => t = t.title);
    },
    userNameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('El nombre de usuario es obligatorio')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('El e-mail debe ser válido')
      !this.$v.email.required && errors.push('El e-mail es obligatorio')
      return errors
    },
    metaErrors () {
      const errors = []
      if (!this.$v.meta.$dirty) return errors
      !this.$v.meta.required && errors.push('La meta es obligatoria')
      return errors
    },
    fullnameErrors () {
      const errors = []
      if (!this.$v.fullname.$dirty) return errors
      !this.$v.fullname.required && errors.push('El nombre es obligatorio')
      return errors
    },
    tagErrors () {
      const errors = []
      if (!this.$v.tag.$dirty) return errors
      !this.$v.tag.required && errors.push('El tag es obligatorio')
      return errors
    },
    acercaErrors () {
      const errors = []
      if (!this.$v.acerca.$dirty) return errors
      !this.$v.acerca.required && errors.push('Acerca de no puede quedar vacio')
      return errors
    },
    weightErrors () {
      const errors = []
      if (!this.$v.weight.$dirty) return errors
      !this.$v.weight.decimal && errors.push('El peso debe ser un número, con el punto como separador decimal')
      !this.$v.weight.minValue && errors.push('El peso mínimo soportado es de 20 kilogramos')
      !this.$v.weight.maxValue && errors.push('El peso máximo soportado es de 500 kilogramos')
      return errors
    },
    heightErrors () {
      const errors = []
      if (!this.$v.height.$dirty) return errors
      !this.$v.height.decimal && errors.push('La altura debe ser un número, con el punto como separador decimal')
      !this.$v.height.minValue && errors.push('La altura mínima soportada es de 0.7 metros')
      !this.$v.height.maxValue && errors.push('La altura máxima soportada es de 3 metros')
      return errors
    }
  },
  methods: {
    async submit () {
      await this.$router.push('/Perfil');
    }
  }
}
</script>

<style scoped>
.bottom-right {
  position: absolute;
  bottom: 4px;
  right: 8px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
p {
  font-size: small;
  margin: 0;
}
span {
  display: block;
  color: white;
}
img.center {
  display: block;
  margin: 0 auto;
}
</style>
