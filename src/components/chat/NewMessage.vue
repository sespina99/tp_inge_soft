<template>
  <div class="new-message">
      <v-text-field
          v-model="message"
          :label="this.hint"
          type="text"
          no-details
          outlined
          append-outer-icon="mdi-send"
          @click:append-outer="addMessage"
          v-on:keyup.enter="addMessage"
          hide-details
      />
  </div>
</template>

<script>
import {auth, db} from "@/db";
export default {
  name: "NewMessage",
  props: ['toUid', 'messages'],
  data(){
    return{
      hint:'Type a message',
      message: '',
    }
  },
  methods:{
    sub(){
      console.log('hola')
    },
    async addMessage(){
        if(this.message.length !== 0){
          if(this.messages.length !==0) {
            const message = this.message
            this.message = ''
            const dia = Date.now()
            const auxFrom = {
              date: dia,
              message: message,
              me: true
            }
            this.messages.push(auxFrom)
            const auxTo = {
              date: dia,
              message: message,
              me: false
            }
            await db.collection('chats').doc(auth.currentUser.uid + this.toUid).update({
              messages: this.messages,
              lastMessageTime: dia
            })
            await db.collection('chats').doc(this.toUid + auth.currentUser.uid).get().then(async (elem) => {
              const data = elem.data()
              let messageTo = data.messages
              messageTo.push(auxTo)
              await db.collection('chats').doc(this.toUid + auth.currentUser.uid).update({
                messages: messageTo,
                lastMessageTime: dia
              })
            })
          }else{
            const message = this.message
            this.message = ''
            const dia = Date.now()
            const auxFrom = {
              date: dia,
              message: message,
              me: true
            }
            this.messages.push(auxFrom)
            const auxTo = {
              date: dia,
              message: message,
              me: false
            }
            await db.collection('chats').doc(auth.currentUser.uid + this.toUid).set({
              messages: this.messages,
              lastMessageTime: dia,
              uidFrom: auth.currentUser.uid,
              uidTo: this.toUid
            })
            let messagesTo = []
            messagesTo.push(auxTo)

            await db.collection('chats').doc(this.toUid + auth.currentUser.uid).set({
              messages: messagesTo,
              lastMessageTime: dia,
              uidFrom: this.toUid,
              uidTo:  auth.currentUser.uid
            })
          }
        }
    }
  }
}
</script>

<style scoped>

</style>