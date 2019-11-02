<template>
    <div class="mainscreen">
        <div class="d-flex justify-content-center align-items-center">
            <b-card title="Login">
                <b-card-text>

                    <b-form @submit="onSubmit">
                        <b-form-group>
                            <b-form-input v-model="username" :state="isValid" placeholder="username">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group >
                            <b-form-input v-model="password" :state="isValid" type="password" placeholder="password">
                            </b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="success" :block="true">Login</b-button>
                        <div>
                            <b-link to="register" class="float-right">Register</b-link>
                        </div>
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
export default {
    data() {
        return {
            username: "",
            password: "",
            is_error: false
        }
    },
    computed: {
        isValid() {
            if (!this.is_error) {
                return null
            }
            return false
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault()
            try {

                const res = await this.$store.dispatch('login', {username:this.username, password:this.password})
                
                this.$router.push('/home')
            }
            catch (err) {
                this.is_error = true
                console.log(err)
            }
        }
    }
}
</script>