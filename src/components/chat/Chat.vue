<template>
<div >
<v-app>
  <v-container

  >
    <v-row class="no-gutters elevation-4">
      <v-col
          cols="12" sm="3"
          class="flex-grow-1 flex-shrink-0"
          style="border-right: 1px solid #0000001f;"
      >
        <v-responsive
            class="overflow-y-auto fill-height"
            height="500"
        >
          <v-list subheader>
            <v-list-item-group v-model="activeChat">
              <template v-for="(item, index) in parents">
                <v-list-item
                    :key="`parent${index}`"
                    :value="item.id"
                    @click="itemClick(index+1)"
                >
                  <v-list-item-avatar color="grey lighten-1 white--text">
                    <v-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name" />
                    <v-list-item-subtitle v-text="item.lastmessage.message" />
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon :color="(item.id === activeChat) ? 'deep-purple accent-4' : 'grey'">
                      mdi-forum
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider
                    :key="`chatDivider${index}`"
                    class="my-0"
                />
              </template>
            </v-list-item-group>
          </v-list>
        </v-responsive>
      </v-col>
      <v-col
          cols="auto"
          class="flex-grow-1 flex-shrink-0"
      >
        <v-responsive
            v-if="activeChat"
            class="overflow-y-hidden fill-height">
          <v-card
              flat

          >
            <v-card-title>
              john doe
            </v-card-title>
            <v-card-text style="min-height: 80%;max-height: 500px">

              <v-responsive
                  class="overflow-y-auto fill-height"
                  height="500"

              >
                  <template v-for="(msg, i) in this.messages">
                <div v-bind:key="i"
                    :class="{ 'd-flex flex-row-reverse': msg.me }"
                >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
<!--                      <v-hover-->
<!--                          v-slot:default="{ hover }"-->
<!--                      >-->
                        <v-chip
                            :color="msg.me ? 'primary' : ''"
                            dark
                            style="height:auto;white-space: normal;"
                            class="pa-4 mb-2"
                            v-on="on"
                        >
                          {{ msg.message }}
                          <sub
                              class="ml-2"
                              style="font-size: 0.5rem;"
                          >{{ formatDate(msg.date)}}</sub>
<!--                          <v-icon-->
<!--                              v-if="hover"-->
<!--                              small-->
<!--                          >-->
<!--                            expand_more-->
<!--                          </v-icon>-->
                        </v-chip>
<!--                      </v-hover>-->
                    </template>
<!--                    <v-list>-->
<!--                      <v-list-item>-->
<!--                        <v-list-item-title>delete</v-list-item-title>-->
<!--                      </v-list-item>-->
<!--                    </v-list>-->
                  </v-menu>
                </div>
              </template>
              </v-responsive>
            </v-card-text>
            <v-card-text >
              <NewMessage  :toUid="activeUid" :messages="this.messages"></NewMessage>
            </v-card-text>
          </v-card>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</div>
</template>

<script>

import NewMessage from "@/components/chat/NewMessage";
import {auth, db} from "@/db";
export default {
  components: {NewMessage},
  data() {
    return {
      activeChat: 1,
      parents:[],
      messages:[],
      activeUid: '',
    }
  },
  async beforeMount() {
    await db.collection('chats').where('uidFrom', '==',auth.currentUser.uid).orderBy('lastMessageTime', "desc").onSnapshot(async (users)=>{
      let i = 1
      this.parents = []
      this.messages = []
      for (const doc of users.docs) {
        const aux = doc.data()
        const message = aux.messages
        await db.collection('users').doc(aux.uidTo).get().then( usr =>{
          if(this.activeChat === undefined){
            this.activeChat = 1
          }
          const user = usr.data()
          const aux2 = {
            id: new Number(i).valueOf(),
            name: user.username,
            avatar: user.profilePic,
            uid: user.uid,
            lastmessage: message[message.length-1]
          }
          if(aux2.id === this.activeChat){
            this.messages = message
            this.activeUid = user.uid
          }
          this.parents.push(aux2)
        })

        i++
      }
    })

  },
  methods:{
    formatDate(fecha){
      const today = new Date(fecha)

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
    async itemClick(index){
      //const users = await db.collection('chats').where('uidFrom', '==',auth.currentUser.uid).get()
      //let i

      this.activeChat = index
      this.activeUid = this.parents[index -1 ].uid
      const users = await db.collection('chats').where('uidFrom', '==',auth.currentUser.uid).orderBy('lastMessageTime', "desc").get()
      for (const doc of users.docs) {
        const aux = doc.data()
        const message = aux.messages
        if(aux.uidTo === this.activeUid){
          console.log('entro')
          this.messages = message
        }
      }
      /*
      users.docs.forEach( doc =>{
        const aux = doc.data()
        if(index === i){
          this.messages = message
        }
        i++
      })*/
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

