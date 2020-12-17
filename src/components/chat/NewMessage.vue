<template>
  <div class="new-message">
    <v-form>
      <v-text-field
          v-model="message"
          :label="this.hint"
          type="text"
          no-details
          outlined
          append-outer-icon="mdi-send"
          @keyup.enter="addMessage"
          @click:append-outer="addMessage"
          hide-details
      />
    </v-form>
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
    async addMessage(){
        if(this.message.length !== 0){
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
          await db.collection('chats').doc(this.toUid + auth.currentUser.uid ).get().then(async (elem)=>{
            const data = elem.data()
            let messageTo = data.messages
            messageTo.push(auxTo)
            await db.collection('chats').doc(this.toUid + auth.currentUser.uid).update({
              messages: messageTo,
              lastMessageTime: dia
            })
          })
        }
    }
  }
}
</script>

<style scoped>

</style>