<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

    <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
      <v-card class="mx-auto" max-width="50%" style="margin-bottom: 20px">
        <v-img :src="this.banner" contain style="padding-bottom: 0"/>

        <div style="height: auto">
          <v-card-actions>
            <v-col cols="2">
              <v-btn style="padding-left: 40px" icon >
                <v-avatar size="100%">
                  <v-img contain style="size: initial" :src="this.profilePic"/>
                </v-avatar>

              </v-btn>
            </v-col>
            <v-spacer></v-spacer>

            <v-btn  icon router :to="editar_link">
              <v-icon color="#4AD5E1">mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>

            <v-spacer></v-spacer>

          <br>
          <v-card-title style="padding: 0" class="pl-2" contain>
            <div>{{ nombre }}</div>
          </v-card-title>
          <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>
            <h4>{{ tag }}</h4>
            <p>{{trabajo}}</p>
            <h4>Instrumentos:</h4> <p>{{ instrumentos }}</p>
            <h4>Géneros: </h4><p>{{ generos }}</p>
            <h4>Acerca de: <br></h4><p>{{ acerca }}</p>
            <h4>Referencias: <br></h4>
            <div>
              <v-row>
              <v-col cols="1">
                <a :href=this.ref_spotify v-if="this.ref_spotify.length > 0">
                  <v-img style="size: initial" src="../../assets/spotify.png" />
                </a>

              </v-col>
              <v-col cols="1">
                <a :href="this.ref_apple" v-if="this.ref_apple.length > 0">
                  <v-img min-height="3'%" max-height="30%" style="size: initial" src="../../assets/apple.png"/>
                </a>
              </v-col>
                <v-col cols="1" style="padding-top: 0">
                  <a :href="this.ref_youtube" v-if="this.ref_youtube.length > 0">
                    <v-img style="size: initial" src="../../assets/youtube.png"/>
                  </a>
                </v-col>
                <v-col cols="1" style="padding-top: 0">
                  <a :href="this.ref_soundcloud" v-if="this.ref_soundcloud.length > 0">
                    <v-img min-width="30%" max-width="80%" align="center" src="../../assets/soundcloud.png"/>
                  </a>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </div>
      </v-card>

      <v-card class="mx-auto" max-width="50%" style="margin-bottom: 20px">

        <div style="height: auto">

          <br>
          <v-card-title style="padding: 0" class="pl-2" contain>
            <div>Actividad Reciente    Ver mas</div>


            <v-row justify="end">
              <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="#4AD5E1"
                      v-bind="attrs"
                      v-on="on"
                      style="margin-right: 3%"
                  >
                    <h1 style="color: white"> + </h1> <h4 style="color: white"> Agregar actividad</h4>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <h1 class="headline">Nueva Actividad</h1>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                              v-model="nuevaInstitucion"
                              label="Nombre de Institución/Bar"
                              solo
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <input type="file"  @change="uploadImage" accept="image/*"/>
                        </v-col>
                        <v-col cols="12">
                          <v-date-picker
                              v-model="nuevaFecha"
                              solo
                              required
                          ></v-date-picker>
                        </v-col>

                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                      Cerrar
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="this.updateActivities"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>


          </v-card-title>
          <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>


            <v-list three-line>
              <template v-for="(item, index) in lugares">
                <v-subheader
                    v-if="item.header"
                    :key="item.header"
                    v-text="item.header"
                ></v-subheader>

                <v-divider
                    v-else-if="item.divider"
                    :key="index"
                    :inset="item.inset"
                ></v-divider>

                <v-list-item
                    v-else
                    :key="item.title"
                >
                  <v-list-item-icon>
                    <v-img src="../../assets/club.png"></v-img>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-row>
                      <v-col cols="12">
                        <v-list-item-title><h3>Performó en {{item.title}}</h3></v-list-item-title>
                      <v-list-item-subtitle >{{item.date}}</v-list-item-subtitle>
                      </v-col>
                    </v-row>

                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>

          </v-card-text>

        </div>

      </v-card>

      <v-card class="mx-auto" max-width="50%" style="margin-top: auto;margin-bottom: 2%">

        <div style="height: auto">

          <br>
          <v-card-title style="padding: 0" class="pl-2" contain>
            <div>Feed</div>
          </v-card-title>
          <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>


          <v-list three-line>
            <template v-for="item in items">
              <v-card v-bind:key="item" class="mx-auto" max-width="98%" style="margin-bottom: 20px">
                <template >

                  <v-list-item
                  >
                    <v-avatar size="70" style="margin-right: 2%">
                      <v-img  :src="item.avatar"></v-img>
                    </v-avatar>

                    <v-list-item-content>
                      <v-row>
                        <v-col cols=9>
                          <v-list-item-title ><h3>{{ item.title }}</h3></v-list-item-title>
                          <v-list-item-subtitle>{{ item.tag }}</v-list-item-subtitle>
                          <v-list-item-subtitle>{{ item.time }} h</v-list-item-subtitle>
                        </v-col>

                        <v-col cols="3">
                          <v-list-item-title >
                            <v-btn>
                              <v-icon>mdi-forum</v-icon>
                              Contactar
                            </v-btn>
                          </v-list-item-title>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>
                  <v-card-actions style="padding-right: 3%;padding-left: 5%">
                    <div v-html="item.text">
                    </div>
                  </v-card-actions>
                  <div style="padding-bottom: 1%">
                    <v-img v-if="item.image" :src="item.image"
                           aspect-ratio="1.5"
                           max-height="500"
                           contain
                    ></v-img>
                  </div>


                </v-card-text>

              </v-card>
            </template>

          </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-container>

</template>

<script>
import {auth, db, storage} from "@/db";

export default {
  data() {
    return {
      created: '',
      nuevaInstitucion: '',
      nuevaFecha: '',
      nuevaImagen: '',
      dialog: false,
      editar_link: '/EditarPerfil',
      tag: '',
      toggled: false,
      nombre: '',
      trabajo: '',
      instrumentos: '',
      generos: '',
      acerca: '',
      ref_apple: '',
      ref_soundcloud: '',
      ref_spotify: '',
      ref_youtube: '',
      profilePic: '',
      banner: '',
      actividades: [],
      lugares: [{title:'Club Araoz',date:'11/10/2020'},{title:'Club AntiDomingo',date:'04/10/2020'},{title:'Moly',date:'12/09/2020'},{title:'Club Manati',date:'5/09/2020'}],
      items: [
        {
          avatar: require('../../assets/profilePic.png'),
          title: 'Nicolas Cicardi',
          time: 6,
          tag: 'Músico',
          text: 'Holka'
        },
        {
          avatar: require('../../assets/profilePic.png'),
          title: 'Nicolas Cicardi',
          time: 7,
          tag: 'Músico',
          text: 'Holka'
        },
        {
          avatar: require('../../assets/profilePic.png'),
          title: 'Nicolas Cicardi',
          time: 8,
          tag: 'Músico',
          text: 'Holka'
        },
      ],
    }
  },
  methods: {
    updateActivities() {
      this.dialog = false;
      console.log(this.nuevaFecha);
      db.collection('users').doc(auth.currentUser.uid).get().then( elem => {
        const activ = elem.data().activities;
        let len = 0;
        if ( activ !== undefined){
          len = activ.length
        }
        let auxUrl;
        if ( this.nuevaImagen.type !== undefined){
          storage.ref('users/' + auth.currentUser.uid + '/activities/' + len + '.png').put(this.nuevaImagen, { contentType: this.nuevaImagen.type } ).then( () =>{
            storage.ref('users/' + auth.currentUser.uid + '/activities/' + len + '.png').getDownloadURL().then( url => {
              auxUrl = url;
            }).then(() => {
              const aux = {
                place: this.nuevaInstitucion,
                date: new Date(this.nuevaFecha),
                url: auxUrl
              }
              console.log(aux);
              this.actividades.push(aux);
              console.log(this.actividades);
              db.collection('users').doc(auth.currentUser.uid).update({
                activities: this.actividades
              }).catch(err => {
                console.log(err.message);
              })
            }).catch(err => {
              console.log(err.message)
            })
          }).catch(err => {
            console.log(err.message);
          });
        }
      }).catch(err => {
        console.log(err.message)
      })
    },
    uploadImage( event ){
      this.nuevaImagen = event.target.files[0];
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
      this.profilePic = data.profilePic;
      this.banner = data.banner;
      this.actividades = data.activities;

    }).then( async () => {
      await storage.ref('users/' + auth.currentUser.uid + '/profile.jpg').getDownloadURL().then( url => {
        this.profilePic = url;
      }).catch(err =>{
        console.log (err.message)
      })
      await storage.ref('users/' + auth.currentUser.uid + '/banner.jpg').getDownloadURL().then( url => {
        this.banner = url;
      }).catch(err =>{
        console.log (err.message)
      })
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
        youtube: '',
        banner: '',
        profilePic: '',
        activities: [],
        username: auth.currentUser.displayName
      }).catch(err =>{
        console.log(err)
      })
    });
    this.toggled = false;
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
