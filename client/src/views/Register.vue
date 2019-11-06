<template>
    <div class="mainscreen">
        <div class="d-flex justify-content-center align-items-center">
            <b-card title="Register">
                <b-card-text>

                    <b-form @submit="onSubmit">
                        <b-form-group>
                            <b-form-input v-model="form.username" :state="isValid('username')" placeholder="username">
                            </b-form-input>
                            <b-form-invalid-feedback :state="isValid('username')">
                                {{ validation.username }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group >
                            <b-form-input v-model="form.password" type="password" :state="isValid('password')" placeholder="password">
                            </b-form-input>
                            <b-form-invalid-feedback :state="isValid('password')">
                                {{ validation.password }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group >
                            <b-form-input v-model="form.email" type="email" :state="isValid('password')" placeholder="email">
                            </b-form-input>
                            <b-form-invalid-feedback :state="isValid('password')">
                                {{ validation.email }}
                            </b-form-invalid-feedback>
                        </b-form-group>

                        <p></p>
                        
                        <b-button type="submit" variant="success" :block="true">Register</b-button>
                    </b-form>
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>
<style scoped>
.mainscreen > div {
    height: 100vh
}
</style>
<script>
import axios from 'axios'
import session from '@/utils/session'

export default {
    data() {
        return {
            form: {

                username: "",
                password: "",
                email: "",
            },
            errors: []
        }
    },
    computed: {
        validation() {
            let result = {}

            this.errors.forEach(e => {
                result[e.param] = e.msg
            });

            return result
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault()
            
            try {
                let res = await axios.post('/user', {
                    username: this.form.username,
                    password: this.form.password,
                    email: this.form.email
                }, 
                {
                    baseURL: session.apiURL
                })
                
                alert("You have been registered!")
                this.$router.push('/login')
            }
            catch (err) {
                let errres = err.response
                if (errres.status == 400) {
                    this.errors = errres.data.errors
                }
            }
        },
        isValid(field) {
            let test = this.validation[field]
            if (!test) {
                return null
            }
            return false
        }
    }
}
</script>