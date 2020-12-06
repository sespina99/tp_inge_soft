<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat
               style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>

    <v-row style="width: 80%; margin-left: auto;margin-right: auto;">
      <v-col>
        <v-card class="mx-auto" style="margin-bottom: 20px">

          <div style="height: auto">

            <br>
            <v-card-title style="padding: 0" class="pl-2" contain>
              <div>Explorar Artistas y Bandas
                <v-btn text router style="text-transform: none !important;" :to="artistas_link"><u>Ver todo</u></v-btn>
              </div>
            </v-card-title>
            <v-card-subtitle style="margin-top:10px; font-size: 16px">¡Descubri artistas buscando por la categoria que mas te guste!</v-card-subtitle>
            <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>

              <ul style="list-style: none;">
                <v-row>
                  <li v-for="category in 16" v-bind:key="category">
                    <v-col cols="1">
                      <v-btn>{{ categories[category - 1] }}</v-btn>
                    </v-col>
                  </li>
                </v-row>
              </ul>

            </v-card-text>

          </div>

        </v-card>
      </v-col>
      <v-col>

        <v-card class="mx-auto" style="margin-top: auto">

          <div style="height: auto">

            <br>
            <v-card-title style="padding: 0" class="pl-2" contain>
              <div>Explorar Institutos y Bares
                <v-btn text style="text-transform: none !important;" router :to="institutos_link"><u>Ver todo</u>
                </v-btn>
                <br></div>
            </v-card-title>
            <v-card-text style="font-size:0.8em; padding-left:0" class="pl-2" contain>
            </v-card-text>
          </div>

        </v-card>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      institutos_link: '/ExplorarInstitutos',
      artistas_link: '/ExplorarArtistas',
      toggled: false,
      categories: ['Clásica', 'Rock', 'Pop', 'Metal', 'Jazz', 'Cumbia', 'Trap', 'Hip Hop', 'EDM', 'Tango', 'New Age', 'Funk', 'Punk', 'Rap', 'Elevator', 'Noise'],
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jactans',
          distance: 1.5,
          direction: ' Ciudad Autónoma de Buenos\n' +
              ' Aires, AR'
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'MJ Pub',
          distance: 3.1,
          direction: ' Ramos Mejía, AR'
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Club Manatee',
          distance: 6.66,
          direction: ' Moron, AR'
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Antidomingo',
          distance: 7,
          direction: ' Buenos Aires, AR'
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Moly',
          distance: 8.4,
          direction: ' Buenos Aires, AR'
        },
      ],
    }
  },
  created() {
    this.toggled = false,
        this.institutos_link = '/ExplorarInstitutos',
        this.artistas_link = '/ExplorarArtistas',
        this.categories = ['Clasica', 'Rock', 'Pop', 'Metal', 'Jazz', 'Cumbia', 'Trap', 'Hip Hop', 'EDM', 'Tango', 'New Age', 'Funk', 'Punk', 'Rap', 'Elevator', 'Noise'],
        this.items = [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Jactans',
            distance: 1.5,
            direction: ' Ciudad Autónoma de Buenos\n' +
                ' Aires, AR'
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'MJ Pub',
            distance: 3.1,
            direction: ' Ramos Mejía, AR'
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Club Manatee',
            distance: 6.66,
            direction: ' Moron, AR'
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Antidomingo',
            distance: 7,
            direction: ' Buenos Aires, AR'
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Moly',
            distance: 8.4,
            direction: ' Buenos Aires, AR'
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

.astext {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>
