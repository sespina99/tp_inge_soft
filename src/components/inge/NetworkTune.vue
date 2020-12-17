<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
<!--   <h1 style="text-align: center">Network</h1>-->

   
<v-card class="mx-auto" max-width="50%" style="margin-bottom: 20px">

      <div style="height: auto">

        <br>
        <v-card-title style="padding: 0" class="pl-2" contain>
          <v-row>
  <v-col cols="4">
          <div>Solicitudes Pendientes <br></div></v-col>
  <v-spacer></v-spacer>
          <v-btn style="margin-right: 2%" @click="solicitudes_abierto = !solicitudes_abierto" :v-model="solicitudes_abierto">{{solicitudes_abierto?'Ocultar':'Mostrar'}}</v-btn>
</v-row>
        </v-card-title>

        <v-card-text style="font-size:0.8em; padding-left:0" class="pl-2" contain>


<br>
          <v-divider v-if="solicitudes_abierto === true"></v-divider>
          <v-list three-line v-if="solicitudes_abierto === true">
            <template v-for="(item, index) in requests">
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
                  v-else-if="index < maxPending"
                  :key="item.title"
              >
                <v-avatar size="70">
                  <v-img  :src="item.avatar"></v-img>
                </v-avatar>

                <v-list-item-content>
                  <v-row>
                    <v-col cols="4">
                      <v-list-item-title ><h3 style="padding-left: 5%">{{item.username}}</h3></v-list-item-title>
                      <v-list-item-subtitle style="padding-left: 5%">{{item.job}} </v-list-item-subtitle>
                    </v-col>
                    <v-spacer></v-spacer>

                   <v-spacer></v-spacer>
                    <v-col cols="2">
                      <v-list-item-title >
                        <v-btn style="alignment-self: end" @click="acceptFriend(item.uid,true)">
                          <v-icon>mdi-account-plus</v-icon>
                          Aceptar
                        </v-btn>
                      </v-list-item-title>
                    </v-col>
                    <v-col cols="2">
                      <v-list-item-title>
                        <v-btn style="alignment-self: end" @click="acceptFriend(item.uid,false)">
                          <v-icon>mdi-account-minus</v-icon>
                          Rechazar
                        </v-btn>
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>


            </template>
          </v-list>
          <v-btn v-if="!isMaxPending" @click="morePending">mas peticiones</v-btn>












        </v-card-text>

      </div>

    </v-card>





 <v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col cols="1">
      <span style="text-align: right">
        <br>Ordenar por:</span>
      </v-col>
      <v-col cols="2">
        <v-select :items="orden" style="max-width: 60%;border-style: none" placeholder="Relevancia"></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-row>

    <v-card class="mx-auto" max-width="50%" style="margin-bottom: 20px">

      <div style="height: auto">

        <br>
        <v-card-title style="padding: 0" class="pl-2" contain>
          <div>Network <br></div>
        </v-card-title>

        <v-card-text style="font-size:0.8em; padding-left:0" class="pl-2" contain>


<br>
          <v-divider></v-divider>
          <v-list three-line>
            <template v-for="(item, index) in friends">
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
                  v-else-if="index < maxFriend"
                  :key="item.title"
              >
                <v-avatar size="70">
                  <v-img  :src="item.avatar"></v-img>
                </v-avatar>

                <v-list-item-content>
                  <v-row>
                    <v-col cols="4">
                      <v-list-item-title ><h3 style="padding-left: 5%">{{item.username}}</h3></v-list-item-title>
                      <v-list-item-subtitle style="padding-left: 5%">{{item.job}} </v-list-item-subtitle>
                    </v-col>
                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>
                    <v-col cols="3">
                      <v-list-item-title >
                        <v-btn @click="contactBtn(item.uid)">
                          <v-icon>mdi-forum</v-icon>
                          Contactar
                        </v-btn>
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>

            </template>
          </v-list>
          <v-btn v-if="!isMaxFriend" @click="moreFriends">mas amigos</v-btn>












        </v-card-text>

      </div>

    </v-card>

  </v-container>

</template>

<script>
import {auth, db} from "@/db";

export default {
  numAAB: 1,
  data() {
    return {
solicitudes_abierto: true,
      anuncio: '',
      numAA: 1,
      orden: ['Reciente'],
      toggled: false,
      categories: ['Clasica','Rock','Pop','Metal','Jazz','Cumbia','Trap','Hip Hop','EDM','Tango','New Age','Funk','Punk','Rap','Elevator','Noise'],
      friends: [],
      maxFriend: 0,
      isMaxFriend: false,
      maxPending: 0,
      isMaxPending: true,
      requests: [],
    }
  }, async beforeMount() {
    await this.getFriends(this.friends)
    await this.getRequests(this.requests)
    console.log(this.requests.length)
    this.moreFriends()
    this.morePending()
    console.log(this.requests)
  },
  methods: {
    async contactBtn(uid){
      await this.$router.push({path: '/Mensajes', query:{uid: uid}});
    },
    /*async deleteFriend(uid){
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

    },*/
    moreFriends(){
      this.maxFriend += 5
      if(this.maxFriend >= this.friends.length)
        this.isMaxFriend = true
    },
    morePending(){
      this.maxPending += 5
      if(this.maxPending >= this.requests.length)
        this.isMaxPending = true
      console.log(this.requests.length)
    },
    async reloadData(){
      this.friends = []
      this.requests = []
      this.solicitudes_abierto = true
      await this.getFriends(this.friends)
      await this.getRequests(this.requests)
      console.log(this.requests)
    },
    async acceptFriend(uid, state){
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

    async getFriends(friend) {
      const doc = await db.collection('friends').doc(auth.currentUser.uid).get()
      const friendList = doc.data()

      friendList.friends.forEach((uid) => {
        db.collection('users').doc(uid).get().then((usr) => {
          const elem = usr.data()
          const aux = {
            username: elem.username,
            avatar: elem.profilePic,
            job: elem.job,
            uid: uid
          }
          friend.push(aux)
        })
      })

    },
    async getRequests(friend) {
      const doc = await db.collection('friends').doc(auth.currentUser.uid).get()
      const friendList = doc.data()

      friendList.friendRequests.forEach((uid) => {
        db.collection('users').doc(uid).get().then((usr) => {
          const elem = usr.data()
          const aux = {
            username: elem.username,
            avatar: elem.profilePic,
            job: elem.job,
            uid: uid
          }
          friend.push(aux)
        })
      })

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
  color: grey;
}
img.center {
  display: block;
  margin: 0 auto;
}

</style>