<template>
    <div>
        <div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.writer }}</p>
        </div>
        <div>
            <p>
                {{ post.content }}
            </p>
        </div>
        <div>
            <b-list-group>
                <b-list-group-item v-for="comment in post.comments" :key="comment._id"
                >
                {{ comment.content }}
                </b-list-group-item>
            </b-list-group>
        </div>

    </div>
</template>
<style scoped>

</style>
<script>
import boardUtil from "../../utils/board"

export default {
    data() {
        return {
            post: {}
        }
    },
    async mounted() {
        try {
            const post = await boardUtil.getPost(this.$route.params.post_id)
            this.post = post
        }
        catch (error) {
            console.log(error)
        }
    }
}
</script>