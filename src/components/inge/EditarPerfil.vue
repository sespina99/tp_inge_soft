<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
    <v-card class="mx-auto" max-width="50%" style="margin-bottom: 4%">
          <v-img src="../../assets/back.png" contain style="padding-bottom: 0">
            <v-row>
              <v-col></v-col>
            </v-row>
            <v-row>
              <v-col></v-col>
            </v-row>
            <v-row>
            <v-divider></v-divider>
            <v-btn text style="background-color: black;color: #4AD5E1 ">
            <v-icon color="#4AD5E1" x-large>mdi-pencil</v-icon>
              Editar fondo
            </v-btn>
            <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col></v-col>
            </v-row>
          </v-img>


      <div style="height: auto">
        <v-card-actions>
          <v-col cols="2">
            <v-btn style="padding-left: 40px" icon >
              <v-img contain style="size: initial" src="../../assets/profilePic.png">
                <v-row>
                  <v-col></v-col>
                </v-row>
                <v-btn icon style="color: #4AD5E1 ">
                  <v-icon color="#4AD5E1" x-large>mdi-pencil</v-icon>
                </v-btn>
                <v-row>
                  <v-col></v-col>
                </v-row>
              </v-img>
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
              label="Nombre de usuario"
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
import { auth, db} from "@/db";

export default {
  mixins: [validationMixin],

  validations: {
    fullname: { required },
    tag: {required},
    acerca: {required},
  },
  data() {
    return {
      loggedIn: true,
      profile_link: '/Perfil',
      created: null,
      submitError: false,
      mensajeError: 'No se pueden actualizar tus datos en el servidor ahora mismo',
 categories: ['Clásica','Rock','Pop','Metal','Jazz','Cumbia','Trap','Hip Hop','EDM','Tango','New Age','Funk','Punk','Rap','Elevator','Noise'],
      currentUser: undefined,
      ref_spotify: '',
      ref_apple: '',
      ref_youtube: '',
      ref_soundcloud: '',
      fullname: '',
      tag: '',
      tags: [
        'Músico',
        'Institución',
        'Bar Nocturno',
        'Educación',
      ],
      menu: false,
      toggled: false,
      nombre: '',

      trabajo: '',
      instrumentos: '',
      generos: '',
      acerca: '',



    }
  },
  created() {

    db.collection('users').doc( auth.currentUser.uid).get().then( (elem) =>{
      const data = elem.data();
      this.fullname = auth.currentUser.displayName;
      this.trabajo = data.job;
      this.ref_apple = data.appleMusic;
      this.ref_soundcloud = data.soundcloud;
      this.ref_spotify = data.spotify;
      this.ref_youtube = data.youtube;
      this.acerca = data.bio;
      this.tag = data.tag;
      this.generos = data.genres;
      this.instrumentos = data.instruments;

    }).catch( e =>{
      this.created = e.message;
      db.collection('users').doc(auth.currentUser.uid).set({
        job: '',
        tag: '',
        instruments: '',
        genres: '',
        bio: '',
        spotify: '',
        appleMusic: '',
        soundcloud: '',
        youtube: ''
      }).catch(err =>{
        console.log(err)
      })
    });
    this.toggled = false;


  },
  computed: {

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
















  },
  methods: {
    async submit () {
      db.collection('users').doc(auth.currentUser.uid).update({
        job: this.trabajo,
        tag: this.tag,
        instruments: this.instrumentos,
        genres: this.generos,
        bio: this.acerca,
        spotify: this.ref_spotify,
        appleMusic: this.ref_apple,
        soundcloud: this.ref_soundcloud,
        youtube: this.ref_youtube,
      }).catch(err =>{
        console.log(err)
      }).then(async () =>{
        await this.$router.push('/Perfil');
      })
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
