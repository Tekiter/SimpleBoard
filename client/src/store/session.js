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
            let accessToken = localStorage.getItem('access_token')
            context.commit('SET_ACCESS_TOKEN', accessToken)
        },
        async login(context, {username, password}) {
            try {

                const res = await axios.post('/login', { username: username, password: password}, {
                    baseURL: session.apiURL
                })
    
                if (res.data.access_token) {
                    localStorage.setItem('access_token', res.data.access_token)
                    axios.defaults.headers.common['Authorization'] = `JWT ${res.data.access_token}`
                    context.commit('SET_ACCESS_TOKEN', res.data.access_token)
                    return
                }
                throw res
            }
            catch (err) {
                throw err
            }
        },
        restoreLogin(context) {
            const token = localStorage.getItem('access_token')
            if (token) {
                context.commit('SET_ACCESS_TOKEN', token)
                axios.defaults.headers.common['Authorization'] = `JWT ${token}`
            }
        },
        logout(context) {
            localStorage.removeItem('accessToken')
            delete axios.defaults.headers.common['Authorization']
            context.commit('SET_ACCESS_TOKEN', null)
        }
    },
    getters: {
        isLoggedIn(state, getters) {
            return !!state.accessToken
        }
    }
}