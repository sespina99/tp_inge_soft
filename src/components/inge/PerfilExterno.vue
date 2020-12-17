<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

    <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
      <v-card class="mx-auto" max-width="50%" style="margin-bottom: 20px">
        <v-img height="500px" width="100%" :src="this.banner" style="padding-bottom: 0"/>

        <div style="height: auto">
          <v-card-actions>
            <v-col cols="2">
              <v-btn style="padding-left: 40px" icon >
                <v-avatar size="100%">
                  <v-img height="100px" width="100px" contain style="size: initial" :src="this.profilePic"/>
                </v-avatar>

              </v-btn>
            </v-col>
            <v-spacer></v-spacer>

            <v-btn style="background-color: #4ad5e1;color: white" router :to="mensajes_link">
              <v-icon>mdi-forum</v-icon>
              Mandar mensaje</v-btn>
            <v-btn  v-if="amigos === 3"  @click="acceptFriend(true)">
              <v-icon>mdi-account-plus</v-icon>
              Aceptar</v-btn>
            <v-btn  v-if="amigos === 3" @click="acceptFriend(false)">
              <v-icon>mdi-account-minus</v-icon>
              Rechazar</v-btn>
            <v-btn v-if="amigos !== 3" @click="clickBtn" >
              <v-icon>{{this.btnIcon()}}</v-icon>
              {{this.btnText()}}</v-btn>

          
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
                  <v-img  style="size: initial" src="../../assets/spotify.png" />
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
            <div>Actividad Reciente</div>


          </v-card-title>
          <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>


            <v-list three-line>
              <template v-for="(item, index) in actividades">
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
                    v-else-if="index <= 3"
                    :key="item.date.seconds"
                >
                  <v-list-item-icon>
                    <v-img height="250px" width="250px" contain :src="item.url"></v-img>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-row>
                      <v-col cols="12">
                        <v-list-item-title><h3>Performó en {{item.place}}</h3></v-list-item-title>
                      <v-list-item-subtitle >{{item.datestr}}</v-list-item-subtitle>
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
              <v-card v-bind:key="item.text && item.time" class="mx-auto" max-width="98%" style="margin-bottom: 20px">
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
                          <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
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

      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-btn style="margin-bottom: 2%;background-color: #4AD5E1;color: white" @click="morePost" v-if="this.hasMorePost">Más publicaciones</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>

</template>

<script>
import {auth, db} from "@/db";

export default {
  props:{
    uid: String
  },
  data() {
    return {
	mensajes_link:'/Mensajes',
      amigos:0,
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
      items: [],
      hasMorePost: true,
      endPost: null,
      lastPost: null
    }
  },
  async beforeMount() {
    try {
      await this.getPosts(this.items);
      /*for(const item in this.items){
          item.timestr = this.formatDate(item.time)
      }*/
      console.log(this.items)
      console.log("bien");
    }catch(e){
      console.log("mal");
      console.log(e)
    }
  },
  methods: {
    async reloadData(){
      this.lastPost = null
      this.endPost = null
      this.hasMorePost = true
      this.items = []
      this.actividades = []
      await this.getPosts(this.items);
      this.amigos = 0;
      let indexFriends, indexPending, indexRequests

      db.collection('friends').doc( auth.currentUser.uid ).get().then((elem) =>{
        const data = elem.data();
        indexFriends = data.friends.indexOf(this.$route.query.uid )
        indexPending = data.pendingFriends.indexOf(this.$route.query.uid )
        indexRequests = data.friendRequests.indexOf(this.$route.query.uid )
        if(indexFriends !== -1){
          this.amigos = 1
        }else if(indexPending !== -1){
          this.amigos = 2
        }else if( indexRequests !== -1){
          this.amigos = 3
        }
      })
    },
    btnText(){
      switch (this.amigos){
        case 0: return 'Agregar'
        case 1: return 'Eliminar'
        case 2: return 'Cancelar solicitud'
      }
    },
    clickBtn(){
      switch (this.amigos){
        case 0: this.addFriend(this.$route.query.uid)
              break
        case 1: this.deleteFriend(this.$route.query.uid)
              break
        case 2: this.cancelRequest()
          break
      }
    },
    btnIcon(){
      switch (this.amigos){
        case 0: return 'mdi-account-plus'
        case 1: return 'mdi-account-minus'
        case 2: return 'mdi-close'
      }
    },
    async addFriend(uid){
      try {
        let pending
        let request
        const docCurrent = await db.collection('friends').doc(auth.currentUser.uid)
        const docFriend = db.collection('friends').doc(uid)
        docCurrent.get().then(async (elem) => {
          const data = await elem.data()
          pending = data.pendingFriends
          pending.push(uid)
        }).then(() => {
          docCurrent.update({
            pendingFriends: pending
          })
        })
        docFriend.get().then(async (elem) => {
          const data = await elem.data()
          request = data.friendRequests
          request.push(auth.currentUser.uid)
        }).then(() => {
          docFriend.update({
            friendRequests: request
          })
        }).finally(async ()=>{
          await this.reloadData()
        })
      }catch(e){
        console.log(e.message)
      }
    },
    async deleteFriend(uid){
      try {
        let friends
        let index
        const docCurrent = await db.collection('friends').doc(auth.currentUser.uid)
        const docFriend = db.collection('friends').doc(uid)
        docCurrent.get().then(async (elem) => {
          const data = await elem.data()
          friends = data.friends
          index = friends.indexOf(uid)
          friends.splice(index,1)
        }).then(() => {
          docCurrent.update({
            friends: friends
          })
        })
        docFriend.get().then(async (elem) => {
          const data = await elem.data()
          friends = data.friends
          index = friends.indexOf(uid)
          friends.splice(index,1)
        }).then(() => {
          docFriend.update({
            friends: friends
          })
        }).finally(async ()=>{
          await this.reloadData()
        })
      }catch(e){
        console.log(e.message)
      }

    },
    async acceptFriend( state){
      const uid = this.$route.query.uid
      const doc = await db.collection('friends').doc(auth.currentUser.uid).get()
      const list = doc.data()
      let friends = list.friends
      let request = list.friendRequests
      if(state)
        friends.push(uid)
      await db.collection('friends').doc(auth.currentUser.uid).update({
        friends: friends,
        friendRequests: request.filter((value)=>{
          return value !== uid
        })
      })

      const pendingDoc = await db.collection('friends').doc(uid).get()
      const pendingList = pendingDoc.data()
      let pendingFriends = pendingList.friends
      let pending = pendingList.pendingFriends
      if(state)
        pendingFriends.push(auth.currentUser.uid)
      await db.collection('friends').doc(uid).update({
        friends: pendingFriends,
        pendingFriends: pending.filter((value)=>{
          return value !== auth.currentUser.uid
        })
      })
      await this.reloadData()
    },
    async cancelRequest(){
      const doc = await db.collection('friends').doc(this.$route.query.uid).get()
      const list = doc.data()
      let request = list.friendRequests
      await db.collection('friends').doc(this.$route.query.uid).update({
        friendRequests: request.filter((value)=>{
          return value !== auth.currentUser.uid
        })
      })

      const pendingDoc = await db.collection('friends').doc(auth.currentUser.uid).get()
      const pendingList = pendingDoc.data()
      let pending = pendingList.pendingFriends
      await db.collection('friends').doc(auth.currentUser.uid).update({
        pendingFriends: pending.filter((value)=>{
          return value !== this.$route.query.uid
        })
      })
      await this.reloadData()
    },
    morePost(){
      this.getPosts(this.items)
    },
    formatDate (today) {
      const date = today.toISOString().substr(0, 10)
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    async getPosts(items){
      let post
      console.log(this.$route.query.uid)
      if(this.endPost === null) {
        const doc = await db.collection('posts').where('uid', '==',this.$route.query.uid).orderBy('pid', "desc").get()
        this.endPost = doc.docs[doc.docs.length -1]
        post = await db.collection('posts').where('uid', '==',this.$route.query.uid).orderBy('pid', "desc").limit(5).get()
      }
      else{
        post = await db.collection('posts').where('uid', '==',this.$route.query.uid).orderBy('pid', "desc").startAfter( this.lastPost).limit(5).get()
      }
      post.docs.forEach( doc =>{
        const aux = doc.data();
        db.collection('users').doc(aux.uid).get().then(async (elem)=>{
          const usr = await elem.data()
          const item = {
            text: aux.text,
            title: usr.username,
            avatar: usr.profilePic,
            time: aux.timestr,
            date: aux.datestr,
            tag: usr.tag,
          }
          items.push(item);
        })
      });
      this.lastPost = post.docs[post.docs.length -1];
      if(this.lastPost != null){
        const lastPost = this.lastPost.data()
        const endPost = this.endPost.data()
        if(lastPost.pid === endPost.pid){
          this.hasMorePost = false;
        }
      }else{
        console.log('es null pá')
      }
    }
  },
  created() {
    let indexFriends, indexPending, indexRequests

    db.collection('friends').doc( auth.currentUser.uid ).get().then((elem) =>{
      const data = elem.data();
      indexFriends = data.friends.indexOf(this.$route.query.uid )
      indexPending = data.pendingFriends.indexOf(this.$route.query.uid )
      indexRequests = data.friendRequests.indexOf(this.$route.query.uid )
      if(indexFriends !== -1){
        this.amigos = 1
      }else if(indexPending !== -1){
        this.amigos = 2
      }else if( indexRequests !== -1){
        this.amigos = 3
      }
    })
    db.collection('users').doc( this.$route.query.uid ).get().then( (elem) =>{
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

    }).catch(err =>{
        console.log(err)
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
