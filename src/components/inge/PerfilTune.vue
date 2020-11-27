<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

    <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
      <v-card class="mx-auto" max-width="50%" style="margin-bottom: 20px">
        <v-img src="../../assets/back.png" contain style="padding-bottom: 0"/>

        <div style="height: auto">
          <v-card-actions>
            <v-col cols="2">
              <v-btn style="padding-left: 40px" icon >
                <v-img contain style="size: initial" src="../../assets/profilePic.png"/>
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn  icon router :to="editar_link">
              <v-icon>mdi-pencil</v-icon>
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
                  <v-img style="size: initial" src="../../assets/spotify.png"/>
              </v-col>
              <v-col cols="1">
                  <v-img min-height="3'%" max-height="30%" style="size: initial" src="../../assets/apple.png"/>
              </v-col>
                <v-col cols="1" style="padding-top: 0">
                    <v-img style="size: initial" src="../../assets/youtube.png"/>
                </v-col>
                <v-col cols="1" style="padding-top: 0">
                    <v-img min-width="30%" max-width="80%" align="center" src="../../assets/soundcloud.png"/>
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
          </v-card-title>
          <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>


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

      <v-card class="mx-auto" max-width="50%" style="margin-top: auto">

        <div style="height: auto">

          <br>
          <v-card-title style="padding: 0" class="pl-2" contain>
            <div>Feed</div>
          </v-card-title>
          <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>

          </v-card-text>

        </div>

      </v-card>
    </v-container>

</template>

<script>
export default {
  data() {
    return {
      editar_link: '/EditarPerfil',
      tag: 'Musico',
        toggled: false,
        nombre: 'Nicolas Cicardi',

        trabajo: 'Profesor de Piano',
      instrumentos: 'Piano, Cello, Triángulo, Guitarra',
      generos: 'Deathcore, EDM, Clásica',
      acerca: 'Profesor de música con experiencia musical de 20 años, incluyendo master de composición clásica en Berklee. Poseo 5\n' +
          'años de experiencia en canto gregoriano.',
      lugares: ['Club Araoz','Moly'],
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Club Araoz',
          date: '01/10/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Moly',
          date: '11/09/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Obras',
          date: '05/09/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Luna Park',
          date: '01/09/2020'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Moly',
          date: '21/08/2020'
        },
      ],
    }
  },
  created() {
    this.tag = 'Musico';
    this.toggled = false;
    this.nombre = 'Nicolas Cicardi';

        this.trabajo= 'Profesor de Piano',
        this.instrumentos= 'Piano, Cello, Triángulo, Guitarra',
        this.generos= 'Deathcore, EDM, Clásica',
        this.acerca= 'Profesor de música con experiencia musical de 20 años, incluyendo master de composición clásica en Berklee. Poseo 5\n' +
    'años de experiencia en canto gregoriano.',
        this.lugares= ['Club Araoz','Moly'],
        this.items= [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Club Araoz',
        date: '01/10/2020'
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Moly',
        date: '11/09/2020'
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Obras',
        date: '05/09/2020'
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Luna Park',
        date: '01/09/2020'
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Moly',
        date: '21/08/2020'
      },
    ]
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
