import axios from 'axios'
import session from '@/utils/session'

export default {
    state: {
        accessToken: null,

    },
    mutations: {
        
        SET_ACCESS_TOKEN(state, token) {
            state.accessToken = token
        }
    },
    actions: {
        initialize(context) {
            let accessToken = localStorage.getItem('accessToken')
            context.commit('SET_ACCESS_TOKEN', accessToken)
        },
        async login(context, {username, password}) {
            try {

                const res = await axios.post('/login', { username: username, password: password}, {
                    baseURL: session.apiURL
                })
    
                if (res.access_token) {
                    context.commit('SET_ACCESS_TOKEN', res.access_token)
                    return
                }
                throw res
            }
            catch (err) {
                throw err
            }
        },
        logout() {
            localStorage.setItem('accessToken', null)
            context.commit('SET_ACCESS_TOKEN', null)
        }
    },
    getters: {
        
    }
}