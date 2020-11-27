<template style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0">

  <v-container color="black" flat style="padding-right: 0; margin-left: 0;margin-bottom: 0;margin-right: 0;margin-top: 0" fluid>
<!--   <h1 style="text-align: center">Network</h1>-->

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
                <v-avatar size="70">
                  <v-img  :src="item.avatar"></v-img>
                </v-avatar>

                <v-list-item-content>
                  <v-row>
                    <v-col cols="4">
                      <v-list-item-title ><h3 style="padding-left: 5%">{{item.title}}</h3></v-list-item-title>
                      <v-list-item-subtitle style="padding-left: 5%">{{item.distance}} </v-list-item-subtitle>
                    </v-col>
                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>
                    <v-col cols="3">
                      <v-list-item-title >
                        <v-btn>
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












        </v-card-text>

      </div>

    </v-card>

  </v-container>

</template>

<script>
export default {
  numAAB: 1,
  data() {
    return {
      anuncio: '',
      numAA: 1,
      orden: ['Reciente'],
      toggled: false,
      categories: ['Clasica','Rock','Pop','Metal','Jazz','Cumbia','Trap','Hip Hop','EDM','Tango','New Age','Funk','Punk','Rap','Elevator','Noise'],
      items: [
        {
          avatar: require("../../assets/p1.png"),
          title: 'Lisa Gerrard',
          distance: 'Musico',
          direction: ' Ciudad Autónoma de Buenos\n' +
              ' Aires, AR'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Gonzalo Sintardi',
          distance: 'Dueño de Bar Moly',
          direction: ' Ramos Mejía, AR'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Domingo Santaris',
          distance: 'Dueño de Bar Antidomingo',
          direction: ' Moron, AR'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Carla Gardel',
          distance: 'Musico',
          direction: ' Buenos Aires, AR'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Sofia Martinez',
          distance: 'Musico',
          direction: ' Buenos Aires, AR'
        },
        { divider: true, inset: true },
        {
          avatar: require("../../assets/p5.png"),
          title: 'Mariela Gomez',
          distance: 'Musico',
          direction: ' Buenos Aires, AR'
        },
        { divider: true, inset: true },
        {
          avatar: require("../../assets/p7.png"),
          title: 'Brendan Perry ',
          distance: 'Musico',
          direction: ' Buenos Aires, AR'
        },
        { divider: true, inset: true },
        {
          avatar: require("../../assets/p8.png"),
          title: 'Maria Santana',
          distance: 'Musico',
          direction: ' Buenos Aires, AR'
        },
        { divider: true, inset: true },
        {
          avatar: require("../../assets/p9.png"),
          title: 'Dastona Gonikian',
          distance: 'Directora de Conservatorio Astor Piazzolla',
          direction: ' Buenos Aires, AR'
        },
      ],
      methods: {
         getImg(inf) {
           switch (inf) {
              case 1: return '../../p1.png';
             case 2: return '../../p2.png';
             case 3: return '../../p3.png';
             case 4: return '../../p4.png';
             case 5: return '../../p5.png';
             case 6: return '../../p5.png';
             case 7: return '../../p7.png';
             case 8: return '../../p8.png';
             case 9: return '../../p9.png';

           }
        }
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