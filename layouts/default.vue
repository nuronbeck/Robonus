<template>
  <div>
    <vs-navbar
      shadow 
      fixed
    >
      <div :style="{ minWidth: '280px', maxWidth: '280px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px' }">
        <h1>Robonus</h1>
        
        <v-select
          :style="{ minWidth: '132px' }"
          :options="$i18n.locales"
          v-model="selectedLanguage"
          :clearable="false"
          :searchable="false"
          @input="changeUserLanguage" 
        >
          <template slot="option" slot-scope="option">
            <flag :iso="option.iso" />
              <span :style="{ paddingLeft: '10px' }">
                {{ $t(option.code) }}
              </span>
          </template>

          <template slot="selected-option" slot-scope="option">
            <flag :iso="option.iso" />
            <span :style="{ paddingLeft: '10px' }">
              {{ $t(option.code) }}
            </span>
          </template> 
        </v-select>
      </div>

    </vs-navbar>
    
    <Nuxt class="nuxt-view-container"/>
  </div>
</template>

<script>
export default {
  mounted(){
    this.selectedLanguage = this.$i18n.locales.filter((lang) => lang.code == this.$i18n.locale)[0] 
  },
  data(){
    return {
      selectedLanguage: null,
    }
  },
  methods: {
    changeUserLanguage(){ 
      this.$router.push(this.switchLocalePath(this.selectedLanguage.code))
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap');
.nuxt-view-container { 
  min-height: 100vh;
  padding: 110px 0;
} 
body { 
  font-family: 'PT Sans', sans-serif;
} 
</style>