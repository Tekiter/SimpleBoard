<template>
    <div class="mainscreen">
        <div class="d-flex justify-content-center align-items-center">
            <b-card title="Login">
                <b-card-text>

                    <b-form @submit="onSubmit">
                        <b-form-group>
                            <b-form-input v-model="username" placeholder="username">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group >
                            <b-form-input v-model="password" type="password" placeholder="password">
                            </b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="success" :block="true">Login</b-button>
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
            password: ""
        }
    },
    
    methods: {
        async onSubmit(evt) {
            evt.preventDefault()
            try {

                const res = await this.$store.dispatch('login', {username:this.username, password:this.password})
                console.log("SUCCESS")
                this.$router.push('/home')
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}
</script>