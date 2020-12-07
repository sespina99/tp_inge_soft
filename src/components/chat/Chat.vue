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
                >
                  <v-list-item-avatar color="grey lighten-1 white--text">
                    <v-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title" />
                    <v-list-item-subtitle v-text="item.lastmessage" />
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">
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
              <template v-for="(msg, i) in messages">
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
                          {{ msg.content }}
                          <sub
                              class="ml-2"
                              style="font-size: 0.5rem;"
                          >{{ msg.created_at }}</sub>
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
              <v-text-field
                  v-model="messageForm.content"
                  label="type_a_message"
                  type="text"
                  no-details
                  outlined
                  append-outer-icon="mdi-send"
                  @keyup.enter="messages.push(messageForm)"
                  @click:append-outer="messages.push(messageForm)"
                  hide-details
              />
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
export default {
  data() {
    return {
      activeChat: 1,
      parents: [
        {
          id: 1,
          title: "john doe",
          avatar: require("../../assets/p1.png"),
          lastmessage: 'hi',
          active: true
        },
        {
          id: 3,
          title: "scarlett",
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          lastmessage: 'si',
          active: false
        },
        {
          id: 4,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'no',
          active: false
        },
        {
          id: 5,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'sa',
          active: false
        },
        {
          id: 6,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 7,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 8,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 9,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 10,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 11,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 12,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 13,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        },
        {
          id: 14,
          title: "scarlett",
          avatar: require("../../assets/p9.png"),
          lastmessage: 'hi',
          active: false
        }
      ],
      messages: [
        {
          content: "lorem ipsum",
          me: true,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: true,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:12am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:14am"
        }
      ],
      messageForm: {
        content: "",
        me: true,
        created_at: "11:11am"
      }
    }
  },


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

