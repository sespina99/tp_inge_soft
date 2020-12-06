<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat fluid>

    <v-card class="mx-auto" max-width="50%" style=" margin-bottom: 4%">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-btn style="background-color: grey;color: white" right router to="/Perfil">
            Cancelar
          </v-btn>
        </v-col>
      </v-row>
      <v-card-text style="margin-top: 10px; margin-bottom: 10px;font-size:0.8em; padding:0" class="pl-2" contain>
        <h4>Imagen de fondo</h4>
        <v-img :src="getBannerUrl">
          <input type="file" @change="uploadBanner" accept="image/*"/>
        </v-img>
      </v-card-text>
      <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>
        <h4>Imagen de Perfil</h4>

        <v-img  :src="getProfileUrl" contain>
          <input type="file" @change="uploadProfilePic" accept="image/*"/>
        </v-img>
      </v-card-text>

      <br>
      <v-card-title style="padding: 0" class="pl-2" contain></v-card-title>
      <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>
        <h4>Nombre y apellido:</h4>
        <v-text-field
            v-model="fullname"
            :error-messages="fullnameErrors"
            label="Nombre de usuario"
            solo
            required
            @input="this.$v.fullname.$touch()"
            @blur="this.$v.fullname.$touch()"
        ></v-text-field>
      </v-card-text>

      <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>
        <h4>Tag:</h4>
        <v-select
            v-model="tag"
            :items="tags"
            :error-messages="tagErrors"
            label="Tag"
            solo
            required
            @change="this.$v.tag.$touch()"
            @blur="this.$v.tag.$touch()"
        ></v-select>
        <h4>Profesión:</h4>
        <v-text-field
            v-model="trabajo"
            label="Profesion"
            solo
            @input="this.$v.trabajo.$touch()"
            @blur="this.$v.trabajo.$touch()"
        ></v-text-field>
        <h4>Instrumentos:</h4>
        <v-text-field
            v-model="instrumentos"
            label="Instrumentos"
            solo
            @input="this.$v.instrumentos.$touch()"
            @blur="this.$v.instrumentos.$touch()"
        ></v-text-field>
        <h4>Géneros: </h4>
        <v-select
            v-model="generos"
            :items="categories"
            label="Genero"
            solo
            required
            @change="this.$v.generos.$touch()"
            @blur="this.$v.generos.$touch()"
        ></v-select>
        <h4>Acerca de: <br></h4>
        <v-text-field
            v-model="acerca"
            :error-messages="acercaErrors"
            label="Acerca de"
            solo
            required
            @input="this.$v.acerca.$touch()"
            @blur="this.$v.acerca.$touch()"
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
              @input="this.$v.ref_spotify.$touch()"
              @blur="this.$v.ref_spotify.$touch()"
          ></v-text-field>
          <v-col cols="1">
            <v-img min-height="3'%" max-height="30%" style="size: initial" src="../../assets/apple.png"/>
          </v-col>
          <v-text-field
              v-model="ref_apple"
              label="https://music.apple.com/ar/artist/..."
              solo
              @input="this.$v.ref_apple.$touch()"
              @blur="this.$v.ref_apple.$touch()"
          ></v-text-field>
          <v-col cols="1" style="padding-top: 0">
            <v-img style="size: initial" src="../../assets/youtube.png"/>
          </v-col>
          <v-text-field
              v-model="ref_youtube"
              label="https://www.youtube.com/channel/..."
              solo
              @input="this.$v.ref_youtube.$touch()"
              @blur="this.$v.ref_youtube.$touch()"
          ></v-text-field>
          <v-col cols="1" style="padding-top: 0">
            <v-img min-width="30%" max-width="80%" align="center" src="../../assets/soundcloud.png"/>
          </v-col>
          <v-text-field
              v-model="ref_soundcloud"
              label="https://soundcloud.com/..."
              solo
              @input="this.$v.ref_soundcloud.$touch()"
              @blur="this.$v.ref_soundcloud.$touch()"
          ></v-text-field>
        </div>
        <v-row>
          <v-divider></v-divider>
          <v-btn style="background-color: #4AD5E1;alignment: center;margin-bottom: 2%;color: white" text x-large
                 width="60%" @click="submit()">
            Confirmar cambios
          </v-btn>
          <v-divider></v-divider>
        </v-row>
      </v-card-text>
    </v-card>


  </v-container>

</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import {auth, db, storage} from "@/db";

export default {
  mixins: [validationMixin],

  validations: {
    fullname: {required},
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
      categories: ['Clásica', 'Rock', 'Pop', 'Metal', 'Jazz', 'Cumbia', 'Trap', 'Hip Hop', 'EDM', 'Tango', 'New Age', 'Funk', 'Punk', 'Rap', 'Elevator', 'Noise'],
      currentUser: undefined,
      ref_spotify: '',
      ref_apple: '',
      ref_youtube: '',
      ref_soundcloud: '',
      fullname: '',
      profilePic: '../../assets/p1.png',
      banner: '../../assets/back.png',
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

    db.collection('users').doc(auth.currentUser.uid).get().then((elem) => {
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

    }).then(() => {
      storage.ref('users/' + auth.currentUser.uid + '/profile.jpg').getDownloadURL().then(url => {
        this.profilePic = url;
      }).catch(err => {
        console.log(err.message)
      })
      storage.ref('users/' + auth.currentUser.uid + '/banner.jpg').getDownloadURL().then(url => {
        this.banner = url;
      }).catch(err => {
        console.log(err.message)
      })
    }).catch(e => {
      this.created = e.message;
    });
    this.toggled = false;


  },
  computed: {

    fullnameErrors() {
      const errors = []
      if (!this.$v.fullname.$dirty) return errors
      !this.$v.fullname.required && errors.push('El nombre es obligatorio')
      return errors
    },
    tagErrors() {
      const errors = []
      if (!this.$v.tag.$dirty) return errors
      !this.$v.tag.required && errors.push('El tag es obligatorio')
      return errors
    },
    acercaErrors() {
      const errors = []
      if (!this.$v.acerca.$dirty) return errors
      !this.$v.acerca.required && errors.push('Acerca de no puede quedar vacio')
      return errors
    },
    getProfileUrl: function () {
      return this.profilePic;
    },
    getBannerUrl: function () {
      return this.banner;
    }


  },
  methods: {
    async submit() {
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
      }).catch(err => {
        console.log(err)
      }).then(() => {
        if (this.profilePic.type !== undefined) {
          storage.ref('users/' + auth.currentUser.uid + '/profile.jpg').put(this.profilePic, {contentType: this.profilePic.type}).catch(err => {
            console.log(err.message);
          });
        }
        if (this.banner.type !== undefined) {
          storage.ref('users/' + auth.currentUser.uid + '/banner.jpg').put(this.banner, {contentType: this.banner.type}).catch(err => {
            console.log(err.message);
          });
        }

      }).then(async () => {
        await this.$router.push('/Perfil');
      })
    },
    uploadProfilePic(event) {
      this.profilePic = event.target.files[0]
    },
    uploadBanner(event) {
      this.banner = event.target.files[0]
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
