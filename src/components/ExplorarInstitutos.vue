<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat
               style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>


    <v-card class="mx-auto" max-width="50%" style="margin-top: auto">

      <div style="height: auto">

        <br>
        <v-card-title style="padding: 0" class="pl-2" contain>
          <div>Explorar Institutos y Bares<br></div>
          <v-spacer></v-spacer>
          <v-text-field style="margin-right:20px" prepend-inner-icon="mdi-magnify" placeholder="Buscar" v-model="searchUsr" v-on:keyup.enter="reloadData"></v-text-field>
        </v-card-title>
        <v-card-text style="font-size:0.8em; padding-left:0" class="pl-2" contain>
          <br>
          <v-divider></v-divider>
          <v-list three-line>
            <template v-for="(item, index) in items">
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
                  <v-btn icon x-large right router @click="clickProfile(item.uid)">
                    <v-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-avatar>
                  </v-btn>

                </v-list-item-icon>

                <v-list-item-content>
                  <v-row>
                    <v-col cols="2">
                      <v-list-item-title><h3>{{ item.username }}</h3></v-list-item-title>
                      <v-list-item-subtitle>{{ item.genre }}</v-list-item-subtitle>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                      <v-list-item-title>
                        <v-btn @click="contactBtn(item.uid)">
<!--                          aca no deberia llevarme al perfil el v-icon?-->
                          <v-icon >mdi-forum</v-icon>
                          <v-spacer></v-spacer>
                          Contactar
                        </v-btn>
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>


        </v-card-text>

      </div>

    </v-card>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-btn :loading="btnLoading" style="margin-bottom: 10%;background-color: #4AD5E1;color: white" @click="moreUsr" v-if="this.hasMoreUsr && this.items.length !== 0" >Más usuarios</v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>

</template>

<script>
import {auth, db} from "@/db";

export default {
  data() {
    return {
      institutos_link: '/ExplorarInstitutos',
      artistas_link: '/ExplorarArtistas',
      toggled: false,
      categories: ['Clasica', 'Rock', 'Pop', 'Metal', 'Jazz', 'Cumbia', 'Trap', 'Hip Hop', 'EDM', 'Tango', 'New Age', 'Funk', 'Punk', 'Rap', 'Elevator', 'Noise'],
      items: [],
      lastUsr: null,
      endUsr: null,
      hasMoreUsr: true,
      searchUsr: '',
      perfil_link: '/Perfil',
      perfil_ext_link: '/PerfilExterno',
      btnLoading: false,
    }
  },
  created() {
    this.toggled = false,
        this.institutos_link = '/ExplorarInstitutos',
        this.artistas_link = '/ExplorarArtistas',
        this.categories = ['Clasica', 'Rock', 'Pop', 'Metal', 'Jazz', 'Cumbia', 'Trap', 'Hip Hop', 'EDM', 'Tango', 'New Age', 'Funk', 'Punk', 'Rap', 'Elevator', 'Noise']
  },
  async beforeMount() {
    try {
      console.log("hola")
      await this.getUsr(this.items);
      /*for(const item in this.items){
          item.timestr = this.formatDate(item.time)
      }*/
      console.log(this.items)
      console.log("bien");
    } catch (e) {
      console.log("mal");
      console.log(e)
    }
  },
  methods:{
    async contactBtn(uid){
      await this.$router.push({path: '/Mensajes', query:{uid: uid}});
    },
    async moreUsr(){
      this.btnLoading = true
      await this.getUsr(this.items)
      this.btnLoading = false
    },
    async clickProfile(uid){
      if(uid === auth.currentUser.uid){
        await this.$router.push(this.perfil_link);
      }else{
        await this.$router.push({path: this.perfil_ext_link, query:{uid: uid}});
      }
    },
    async reloadData() {
      try {
        this.items = [];
        this.hasMoreUsr = true;
        this.lastUsr = null
        this.endUsr = null
        await this.getUsr(this.items);
        console.log("bien");
      }catch(e){
        console.log("mal");
        console.log(e)
      }
    },
    async getUsr(user){
      let users
      if(this.lastUsr === null){
        const doc = await db.collection('users').where('tag','==','Institución/Bar').where('username', '>=', this.searchUsr).orderBy('username').get()
        this.endUsr = doc.docs[doc.docs.length -1]
        users = await db.collection('users').where('tag','==','Institución/Bar').where('username', '>=', this.searchUsr).orderBy('username').limit(5).get()
      }else{
        users = await db.collection('users').where('tag','==','Institución/Bar').where('username', '>=', this.searchUsr).orderBy('username').startAfter( this.lastUsr).limit(5).get()
      }

      users.docs.forEach( doc => {
        const aux = doc.data()
        if (aux.email !== auth.currentUser.email) {
          const item = {
            username: aux.username,
            avatar: aux.profilePic,
            genre: aux.genres,
            uid: aux.uid
          }
          user.push(item);
        }
      });
      this.lastUsr = users.docs[users.docs.length -1];
      if(this.lastUsr != null){
        const lastUsr = this.lastUsr.data()
        const endUsr = this.endUsr.data()
        if(lastUsr.email === endUsr.email){
          this.hasMoreUsr = false;
        }
      }else{
        console.log('es null pá')
      }
    },
  }

}
</script>

<style scoped>
.bottom-right {
  position: absolute;
  bottom: 4px;
  right: 8px;
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