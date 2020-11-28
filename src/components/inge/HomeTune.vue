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
                  <v-btn style="padding-left: 40px;padding-right: 60px" icon large right>
                    <v-avatar size="70">
                      <v-img  src="../../assets/profilePic.png"></v-img>
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
              <v-btn  >
                <v-icon>mdi-image</v-icon> Foto/Video
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>


            <v-col cols="auto" style="padding-top: 0">
              <v-btn color="#47D6D7">
                Publicar
              </v-btn>
            </v-col>
          </v-card-actions>


        </v-card-text>

      </div>

    </v-card>


    <v-list three-line>
      <template v-for="item in items">
        <v-card v-bind:key="item" class="mx-auto" max-width="50%" style="margin-bottom: 20px">
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
                  </v-col>

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




  </v-container>

</template>

<script>
export default {
  data() {
    return {
      text: '',
      anuncio: '',
      orden: ['Reciente'],
      toggled: false,
      categories: ['Clasica','Rock','Pop','Metal','Jazz','Cumbia','Trap','Hip Hop','EDM','Tango','New Age','Funk','Punk','Rap','Elevator','Noise'],
      items: [
        {
          avatar: require("../../assets/InstitutoLogo.png"),
          title: 'Conservatorio Superior de Música Astor Piazzolla',
          time: 1.5,
          tag: 'Educación',
          text: "<strong>#SE BUSCA</strong>\n" +
              "              <p><strong>Se busca profesor de guitarra clásica para Conservatorio Superior de Música Astor Piazzolla</strong><br>\n" +
              "                <strong>FUNCIONES:</strong> Impartir clases de guitarra clásica. Participar en las demostraciones didácticas,\n" +
              "              actividades varias o en los conciertos programados por la institución.<br>\n" +
              "                <strong>REQUISITOS:</strong> Estar en posesión del Título de Profesor-Grado medio de Música (Plan 1996)\n" +
              "              y/o Título Profesional de Música (LOGSE) y/o Título de Técnico en las Enseñanzas profesionales\n" +
              "              de música (LOE).\n" +
              "            </p>"
        },
        {
          avatar: require("../../assets/club.png"),
          title: 'Club Araoz',
          time: 3.1,
          tag: 'Club Nocturno',
          image: 'http://elgermenpop.net/wp-content/uploads/2017/05/ZELEN.jpg',
          text: "<strong>#SE BUSCA</strong>\n" +
              "              <p><strong>Se busca banda de rock/pop para evento el 11/12/2019</strong><br>\n" +
              "                Condiciones sobre equipamiento presentes en descripción de la institución.\n" +
              "              </p>"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Club Manatee',
          time: 6.66,
          tag: 'Instituto',
          text: 'Holka'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Antidomingo',
          time: 7,
          tag: 'Musico',
          text: 'Holka'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Moly',
          time: 8.4,
          tag: 'Musico',
          text: 'Holka'
        },
      ],
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