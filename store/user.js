export const state = () => ({
    serverData: null,
    serverDataIsLoading: true
})

export const mutations = {
    SET_SERVER_DATA(store, serverResponse){
        store.serverData = serverResponse
    },
    SET_SERVER_LOADING_STATE(store, loading_boolean){
        store.serverDataIsLoading = loading_boolean
    }
}

export const actions = {
    async getUserData({ commit }, id_user){
        return await this.$axios.get(`/robonus_auth.php?id=${id_user}`)
        .then((response) => {
            if(response.data.hasOwnProperty('userBalance')){
                if(response.data.userBalance != null){
                    commit('SET_SERVER_DATA', response.data)
                }else {
                    commit('SET_SERVER_DATA', null)
                }
            } else {
                commit('SET_SERVER_DATA', null)
            }
            commit('SET_SERVER_LOADING_STATE', false)
        })
        .catch(() => {
            commit('SET_SERVER_DATA', null)
            commit('SET_SERVER_LOADING_STATE', false)
        }) 
    }
}

export const getters = {
    serverData: state => state.serverData,
    serverDataIsLoading: state => state.serverDataIsLoading,
    userBalance: state => state.serverData != null ? state.serverData.userBalance.RoCoin : false,
    userTransactions: state => {
        if(state.serverData != null){
            let normalizedTransactions = state.serverData.transactions.map((eachTransaction) => {
                return {
                    date: eachTransaction['Date'],
                    nickname: eachTransaction['Nickname'],
                    robux: eachTransaction['Robux'],
                    status: eachTransaction['Status']
                }
            })
            return normalizedTransactions
        }
        return false
    },
    conditions: state => state.serverData != null ? state.serverData.conditions : false
}