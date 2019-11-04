<template>
    <div>
        <h3>Write</h3>
        <b-form @submit="onSubmit" class="mt-3">
            <b-form-input v-model="title" placeholder="title"></b-form-input>
            <b-form-textarea v-model="content" rows="7" placeholder="content"></b-form-textarea>
            <b-form-checkbox v-model="secret" switch>
                Secret
            </b-form-checkbox>
            <b-button type="submit" class="float-right">Write</b-button>
        </b-form>
    </div>
</template>
<style scoped>

</style>
<script>
import boardUtil from '@/utils/board'

export default {
    data() {
        return {
            title: "",
            content: "",
            secret: false
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault()

            try {
                const res = await boardUtil.writePost({ 
                    title: this.title, 
                    content: this.content,
                    board_id: this.$route.params.board_id
                })
                this.$router.push({ path: `/${this.$route.params.board_id}` })
            }
            catch (error) {
                
            }
        }
    },
    async mounted() {
        try {
            
        }
        catch (error) {

        }
    }
}
</script>