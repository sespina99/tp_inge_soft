<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col cols="1">
      <span style="text-align: right">
        <br>Ordenar por:</span>
      </v-col>
      <v-col cols="2">
        <v-select :items="orden" style="max-width: 50%;border-style: none" placeholder="Reciente"></v-select>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-card class="mx-auto" max-width="50%" style="margin-bottom: 20px">

      <div style="height: auto">

        <br>
        <v-card-title style="padding: 0" class="pl-2"  >

          <v-row>
            <v-col cols="1" style="padding-bottom: 0">
              <v-btn style="padding-left: 40px;padding-right: 60px" icon x-large right router :to="perfil_link">
                <v-avatar size="70">
                  <v-img  :src="this.foto"></v-img>
                </v-avatar>
              </v-btn>
            </v-col>

            <v-col cols="10" style="padding-bottom: 0"
            >
              <v-textarea
                  v-model="text"
                  label="Compartir anuncio"
                  rows="1"
                  auto-grow
                  counter
                  maxlength="200"
              ></v-textarea>
            </v-col>
          </v-row>

        </v-card-title>
        <v-card-text style="font-size:0.8em; padding:0;padding-top: 0" class="pl-2" contain>
          <v-card-actions style="padding-top: 0;padding-bottom: 0">
            <v-spacer></v-spacer>
            <v-col cols="2" class="mr-auto" style="padding-top: 0">
              <input v-if="emailVerified" type="file" @change="uploadFiles" accept="image/*, video/*"/>
            </v-col>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>


            <v-col cols="auto" style="padding-top: 0">
              <v-btn color="#47D6D7" v-if="emailVerified" @click="postBtn()">
                Publicar
              </v-btn>
              <v-card-text v-if="!emailVerified">tiene que verificar el email para postear</v-card-text>
              <v-btn v-if="!emailVerified" @click="resendEmail">reenviar email</v-btn>
            </v-col>
          </v-card-actions>


        </v-card-text>

      </div>

    </v-card>


    <v-list three-line>
      <template v-for="item in items">
        <v-card v-bind:key="item.text && item.time" class="mx-auto" max-width="50%" style="margin-bottom: 20px">
          <template >

            <v-list-item
            >
<v-btn icon x-large right router :to="perfil_ext_link">
              <v-avatar size="70" style="margin-right: 2%">
                <v-img  :src="item.avatar"></v-img>
              </v-avatar>

              </v-btn>

              <v-list-item-content>
                <v-row>
                  <v-col cols=9>
                    <v-list-item-title ><h3>{{ item.title }}</h3></v-list-item-title>
                    <v-list-item-subtitle>{{ item.tag }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ item.time }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                  </v-col>

                  <v-col cols="3">
                    <v-list-item-title >
                      <v-btn style="alignment-self: end" right router :to="mensajes_link">
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
import { auth, db, storage} from "@/db";
export default {
  data() {
    return {

      mensajes_link:'/Mensajes',
      perfil_link: '/Perfil',
	perfil_ext_link: '/PerfilExterno',
      text: '',
      anuncio: '',
      orden: ['Reciente'],
      toggled: false,
      categories: ['Clasica','Rock','Pop','Metal','Jazz','Cumbia','Trap','Hip Hop','EDM','Tango','New Age','Funk','Punk','Rap','Elevator','Noise'],

      items: [],
      lastPost: null,
      endPost:null,
      hasMorePost: true,
      postFiles: [],
      foto: '',
      emailVerified: true
    }
  },
  async beforeMount() {
    try {
      this.emailVerified = auth.currentUser.emailVerified
      await db.collection('users').doc(auth.currentUser.uid).get().then((data)=>{
        const aux = data.data()
        this.foto = aux.profilePic
      }).catch(async e => {
        this.created = e.message;
        const url = await storage.ref('users/start/profile.jpg').getDownloadURL()
        this.foto = url
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
          profilePic: url,
          activities: [],
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
        }).then(() => {
          db.collection('friends').doc(auth.currentUser.uid).set({
            friends: [],
            friendRequests: [],
            pendingFriends: []
          })
        }).catch(err => {
          console.log(err)
        })
      })


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
  methods:{
    resendEmail(){
      auth.currentUser.sendEmailVerification()
    },
    uploadFiles(e){
      const aux = e.target.files
      aux.forEach((elem)=>{
        this.postFiles.push(elem)
      })
    },
    async reloadData() {
      try {
        this.items = [];
        this.hasMorePost = true;
        this.emailVerified = auth.currentUser.emailVerified
        await this.getPosts(this.items);
        this.text = '';
        console.log(this.items)
        console.log("bien");
      }catch(e){
        console.log("mal");
        console.log(e)
      }
    },
    morePost(){
      this.getPosts(this.items)
      console.log(this.items)
    },
    formatDate (today) {
      const date = today.toISOString().substr(0, 10)
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    formatTime (today){

      const h = today.getHours();
      const min = today.getMinutes();
      let hStr = ''
      let minStr = ''
      if(min < 10){
        minStr = '0'
      }
      minStr = minStr + min.toString()
      if(h < 10){
        hStr = '0'
      }
      hStr = hStr + h.toString()
      return `${hStr}:${minStr}`
    },
    async getPosts(items){
      let post
      if(this.lastPost === null){
        const doc = await db.collection('posts').orderBy('pid', "desc").get()
        this.endPost = doc.docs[doc.docs.length -1]
        post = await db.collection('posts').orderBy('pid', "desc").limit(5).get()
      }else{
        post = await db.collection('posts').orderBy('pid', "desc").startAfter( this.lastPost).limit(5).get()
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
    },
    async postBtn(){
      this.addPost();
      this.lastPost = null;
      await this.reloadData();
    },
    addPost(){
      const today = new Date
      const postid = Date.now()
      let i = 0
      this.postFiles.forEach(async (elem) => {
        await storage.ref('users/' + auth.currentUser.uid + '/posts/' + postid + '/' + i++).put(elem, {contentType: elem.type}).catch((e)=>{console.log(e)})
      })
      let urlTest = []
      i = 0
      this.postFiles.forEach((elem) =>{
        storage.ref('users/' + auth.currentUser.uid + '/posts/' + postid + '/' + i).getDownloadURL().then((url) =>{
          urlTest.push(url)
        }).catch(()=>{
          console.log(elem)
        })
        i++
      })
      db.collection('posts').doc(postid.toString()).set({
        text: this.text,
        pid: postid,
        time: today,
        urls: urlTest,
        timestr: this.formatTime(today),
        datestr: this.formatDate(today),
        uid: auth.currentUser.uid
      }).catch(err =>{
        console.log(err)
      })
      this.postFiles = []
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
p {
  font-size: small;
  margin: 0;
}
span {
  display: block;
  color: grey;
}
img.center {
  display: block;
  margin: 0 auto;
}

</style>