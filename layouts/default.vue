<template>
  <div>
    <vs-navbar
      shadow 
      fixed
      
    >
      <img class="siteImage" src="../assets/RoBonus.svg" alt="Robonus logo" />

      <template #right :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }">
        <vs-button
          :loading="serverDataIsLoading"
          circle
          icon
          size="mini"
          v-for="locale in $i18n.locales" :key="locale.code"
          :success="locale.code == $i18n.locale"
          :transparent="locale.code != $i18n.locale"
          :active="$i18n.locale == locale.code"
          :to="switchLocalePath(locale.code)"
          :title="$t(locale.code)"
        >
          <img :src="require(`../assets/lang_icons/${locale.code}.svg`)" :style="{ cursor: 'pointer', width: '22px', height: '22px', borderRadius: '50%' }" alt="Language">
        </vs-button>
      </template> 

    </vs-navbar>
    
    <Nuxt class="nuxt-view-container"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      serverDataIsLoading: 'user/serverDataIsLoading'
    })
  },
  created(){
    this.selectedLanguage = this.$i18n.locales.filter((lang) => lang.code == this.$i18n.locale)[0] 
  },
  data(){
    return {
      selectedLanguage: null,
    }
  },
  methods: {
    changeUserLanguage(locale_code){ 
      this.$router.push(this.switchLocalePath(locale_code))
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap');
.nuxt-view-container { 
  min-height: 100vh;
  padding: calc(25vh + 20px) 0 110px 0;
} 
body { 
  font-family: 'PT Sans', sans-serif;
}
.siteImage {
  height: 25vh;
  margin-left: 100px;
}
.langIcons {
  display: flex;
  border-radius: 50%;
  margin-right: 5px;  
  border: 3px solid rgba(70, 200, 58, 1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .4);
  transition: .25s ease-in-out;
}
.langIcons:hover { 
  box-shadow: 0px 0px 10px rgba(70, 200, 58, 1);
}
@media screen and (max-width: 470px) {
  .nuxt-view-container { 
    padding: calc(18vh + 20px) 0 110px 0;
  } 
  .siteImage {
    height: 20vh;
    margin-left: 100px;
  }
}
</style>