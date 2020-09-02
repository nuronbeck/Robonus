<template>
  <vs-row type="flex" justify="center" align="center" :w="12">
      <div
        :style="{ width: '100vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }"
        v-if="!userBalance"
      >
        <Loading v-if="serverDataIsLoading"/>

        <vs-alert relief v-if="!serverDataIsLoading && !userBalance" danger :style="{ maxWidth: '400px' }"> 
          {{ $t('User not found!') }}
        </vs-alert> 
      </div>

      <vs-row v-if="!serverDataIsLoading && userBalance" type="flex" justify="center" align="center" :w="12">
        <vs-alert  relief success :style="{ maxWidth: '400px' }">
          <h2 :style="{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }">
            <div>
              <font-awesome-icon :icon="['fas', 'wallet']" :style="{ marginRight: '5px' }"/>
              {{ $t('YOUR SCORE:') }}
            </div>
            <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }">
              <span :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }">
                <span :style="{ paddingLeft: '5px', color: '#333' }">
                  {{ userBalance ? userBalance : ''}}
                </span>
                <img src="../assets/RoCoin.png" :style="{ height: '1.5rem', paddingLeft: '5px' }"/>
              </span>
            </div> 
          </h2>
        </vs-alert>

        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <h2 :style="{ textAlign: 'center', paddingTop: '15px', paddingBottom: '15px' }">{{ $t('Withdrawal') }} </h2> 
        </vs-col>

        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }">
            <div :style="{ fontStyle: 'italic', marginBottom: '4px' }">{{ $t('Roblox nickname') }}</div>
            <vs-input
              success
              v-model="newWidthdrawal.robloxNickname" 
            >
              <template #icon>
                <font-awesome-icon :icon="['fas', 'user']" :style="{ marginRight: '5px' }"/>
              </template>
              <template #message-danger v-if="$v.newWidthdrawal.robloxNickname.$invalid">
                <span :style="{ marginLeft: '25px' }">{{ $t('* Required') }}</span>
              </template>
            </vs-input>

            <div :style="{ fontStyle: 'italic', marginTop: '18px', marginBottom: '4px' }">{{ $t('Count Robux') }}</div>
            <vs-input
              success
              v-model="newWidthdrawal.countRobux"
              type="number"
              :style="{ alignItems: 'center' }"
            >
              <template #message-danger v-if="$v.newWidthdrawal.countRobux.$invalid">
                <span :style="{ marginLeft: '25px' }">{{ $t('* Required, whole number format.') }}</span>
              </template>
              <template #icon>
                <img src="../assets/Robux.png" :style="{ height: '1.1rem' }"/>
              </template>
            </vs-input>

            <div :style="{ fontStyle: 'italic', marginTop: '18px', marginBottom: '4px' }">{{ $t('Count Rocoins') }}</div>
            <vs-input
              success
              v-model="newWidthdrawal.countRocoins"
              type="number"
            >
              <template #message-danger v-if="$v.newWidthdrawal.countRocoins.$invalid">
                <span :style="{ marginLeft: '25px' }">{{ $t('* Required') }}</span>
              </template>
              <template #icon>
                <img src="../assets/RoCoin.png" :style="{ height: '1.1rem' }"/>
              </template>
            </vs-input>

            <div :style="{ paddingTop: '15px' }">
              <vs-alert color="danger" v-if="conditions"> 
                <div :style="{ textAlign: 'center' }">
                  {{ $t('Before create a request you') }}
                </div>
                <div :style="{ textAlign: 'center' }">
                  <b>{{ $t('must join') }}</b> {{ $t('to group in Roblox:') }}
                </div>
                <div :style="{ textAlign: 'center' }">
                  <vs-button
                    :href="conditions.GroupLink"
                    blank
                    primary
                    flat
                  >
                    <font-awesome-icon :icon="['fas', 'external-link-alt']" :style="{ marginRight: '5px' }"/> {{ conditions.GroupLink }}
                  </vs-button> 
                </div> 
              </vs-alert> 
            </div>

            <vs-button 
              success
              animation-type="vertical"
              :style="{ marginTop: '18px' }"
              @click="submitWithdrawal"
            >
              <font-awesome-icon :icon="['fas', 'upload']" :style="{ marginRight: '5px' }"/> {{ $t('Submit withdrawal') }}
            </vs-button>
            
          </div>
        </vs-col>

        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <h2 :style="{ textAlign: 'center', paddingTop: '15px', paddingBottom: '15px' }">{{ $t('Withdrawal history') }} </h2> 
        </vs-col>

        <vs-row type="flex" justify="center" align="center">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="10">
          <vue-good-table  
            compactMode
            :columns="columns"
            :rows="rows"
            :search-options="searchOptions"
            :pagination-options="paginationOptions"
          >
            <template slot="table-row" slot-scope="props">
              <div v-if="props.column.field == 'date'" >
                {{ props.row.date }}
              </div>
              <div v-if="props.column.field == 'nickname'">
                {{ props.row.nickname }}
              </div>
              <div v-if="props.column.field == 'robux'">
                <span :style="{ fontWeight: 'bold' }">
                  {{ props.row.robux }}
                </span>
                <img src="../assets/Robux.png" :style="{ height: '0.8rem' }"/>
              </div>
              <div v-if="props.column.field == 'status'">
                  <span :style="{ borderRadius: '3px', backgroundColor: '#1a5cff', color: '#fff', padding: '4px' }" v-if="props.row.status == 0" >
                    {{ $t('Under consideration') }}
                  </span>

                  <span :style="{ borderRadius: '3px', backgroundColor: '#46c93a', color: '#fff', padding: '4px' }" v-if="props.row.status == 1" >
                    {{ $t('Paid out') }}
                  </span>

                  <span :style="{ borderRadius: '3px', backgroundColor: '#fa3232', color: '#fff', padding: '4px' }" v-if="props.row.status == 2" >
                    {{ $t('Rejected') }}
                  </span> 
              </div>
            </template>
            <div slot="emptystate" :style="{ textAlign: 'center' }">
              {{ $t('Withdrawal history is empty.') }}
            </div>
          </vue-good-table>
          </vs-col>
        </vs-row>
      </vs-row>

      

    </vs-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from '@/components/Loading'
import { required, between } from 'vuelidate/lib/validators'

export default {
  watch: { 
    'newWidthdrawal.countRobux': function (newVal, oldVal){
      this.newWidthdrawal.countRocoins = (this.newWidthdrawal.countRobux * this.conditions.Rate).toFixed()
      this.$v.newWidthdrawal.countRobux.$touch()
      this.$v.newWidthdrawal.countRocoins.$touch()
    },
    'newWidthdrawal.countRocoins': function (newVal, oldVal){
      this.newWidthdrawal.countRobux = (this.newWidthdrawal.countRocoins / this.conditions.Rate)
      this.$v.newWidthdrawal.countRobux.$touch()
      this.$v.newWidthdrawal.countRocoins.$touch()
    },
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters({
      serverData: 'user/serverData',
      serverDataIsLoading: 'user/serverDataIsLoading',
      userBalance: 'user/userBalance',
      userTransactions: 'user/userTransactions',
      conditions: 'user/conditions',
    })
  },
  validations: {
    newWidthdrawal: {
      robloxNickname: {
        required,
        usernameValidator: (username) => /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm.test(username)
      },
      countRobux: {
        required,
        between: between(1, 999999999),
        isCountable: (count) => Number.isInteger(count)
      },
      countRocoins: {
        required,
        between: between(0, 999999999)
      }
    }
  },
  data(){
    return {
      newWidthdrawal: {
        robloxNickname: '',
        countRobux: 0,
        countRocoins: 0
      },
      searchOptions: {
        enabled: true,
        skipDiacritics: true,
        placeholder: this.$t('Search'),
      },
      paginationOptions: {
        enabled: true,
        perPage: 5,
        perPageDropdown: [5, 10, 20, 50],
        dropdownAllowAll: false,
        nextLabel: this.$t('next'),
        prevLabel: this.$t('prev'),
        rowsPerPageLabel: this.$t('Display on page'),
        ofLabel: this.$t('from'),
        pageLabel: this.$t('page'),
      },
      columns: [
        {
          label: this.$t('Date'),
          field: 'date',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'dd.MM.yyyy',
          thClass: 'columsCentered',
          tdClass: 'columsCentered'
        },
        {
          label: this.$t('Nickname'),
          field: 'nickname',
          thClass: 'columsCentered',
          tdClass: 'columsCentered'
        },
        {
          label: this.$t('Summ'),
          field: 'robux',
          thClass: 'columsCentered',
          tdClass: 'columsCentered'
        },
        {
          label: this.$t('Status'),
          field: 'status',
          type: 'number',
          thClass: 'columsCentered',
          tdClass: 'columsCentered'
        },
      ],
      rows: [],
    }
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      sendWithdrawalRequest: 'user/sendWithdrawalRequest'
    }),
    loadTableData(){
      this.rows = this.userTransactions.map((eachTransaction) => { 
        return {
          date: eachTransaction.date,
          nickname: eachTransaction.nickname,
          robux: eachTransaction.robux,
          status: eachTransaction.status
        }
      })
    },
    countRobuxChanged(){
      this.newWidthdrawal.countRocoins = this.newWidthdrawal.countRobux
    },
    submitWithdrawal(){
      this.$v.$touch()

      if(!this.$v.$invalid) {
        // Check user balance is not less than requested
        if(parseFloat(this.newWidthdrawal.countRocoins) > parseFloat(this.userBalance)){
          this.$swal.fire({
            customClass: {
              container: 'swal_custom_index'
            },
            position: 'center',
            icon: 'error',
            title: this.$t("Your scores isn't enought!")
          })
        }
        else {
          this.$swal.fire({
            title: this.$t('Enter account password key'),
            customClass: {
              container: 'swal_custom_index'
            },
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: this.$t('Submit'),
            cancelButtonText: this.$t('Cancel'),
            showLoaderOnConfirm: true,
            preConfirm: (authPassword) => {
              return this.$axios.post(`/robonus_auth.php`, { 
                id: this.$route.query.id,
                passwordCode: authPassword,
                nickname: this.newWidthdrawal.robloxNickname,
                count_rocoins: this.newWidthdrawal.countRocoins,
                count_robux: this.newWidthdrawal.countRobux
              })
              .then((response) => { 
                if(response.data == "CredentialsError"){
                  this.$swal.showValidationMessage(this.$t('Credentials Error!'))
                }
                if(response.data == "PasswordError"){
                  this.$swal.showValidationMessage(this.$t(`Password isn't valid!`))
                }
                if(response.data == "StockError"){
                  this.$swal.showValidationMessage(this.$t(`Sorry, there are not enough Robux on the site. Please try to submit your withdrawal request later!`))
                }
                if(response.data == "Success"){
                  return response.data
                } 
              })
              .catch(() => {
                this.$swal.fire({
                  customClass: {
                    container: 'swal_custom_index'
                  },
                  position: 'center',
                  icon: 'error',
                  title: this.$t('Server error 404'),
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            },
            allowOutsideClick: () => !this.$swal.isLoading()
          }).then((result) => {
            if (result.value == "Success") {
              this.$swal.fire({
                customClass: {
                  container: 'swal_custom_index'
                },
                position: 'center',
                icon: 'success',
                title: this.$t('Successfully submitted!'),
                showConfirmButton: false,
                timer: 1500
              })

              this.newWidthdrawal.robloxNickname = ''
              this.loadUserInitData()
            }
          })

        }

      } else {
        this.$swal.fire({
          customClass: {
            container: 'swal_custom_index'
          },
          position: 'center',
          icon: 'error',
          title: this.$t('Something filled wrong! Please check your creditials!')
        })
      }
    }, 
    loadUserInitData(){ 
      if(this.$route.query.id != 'undefined' || this.$route.query.id !== null){ 
        this.getUserData(this.$route.query.id)
        .then(() => { 
          if(this.serverData !== null){
            this.newWidthdrawal.countRocoins = parseInt(this.conditions.Rate)
            this.loadTableData() 
          }
          else {
            this.$swal.fire({
              customClass: {
                container: 'swal_custom_index'
              },
              position: 'center',
              icon: 'error',
              title: this.$t('User not found!'),
            })
          }
        })
      }
    }
  },
  mounted(){
    this.loadUserInitData()
  }
}
</script>

<style>
.columsCentered {
  text-align: center;
}
.swal_custom_index{
  z-index: 99999;
}
</style>
