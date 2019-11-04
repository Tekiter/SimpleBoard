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
                <b-list-group-item v-for="comment in post.comments" :key="comment._id">
                    <div class="d-flex">
                        <p class="flex-grow-1">
                            {{ comment.content }}
                        </p>
                        <p>
                            {{ comment.writer }}
                        </p>
                    </div>
                </b-list-group-item>
            </b-list-group>
            <div class="d-flex mt-3">
                <b-textarea class="flex-grow-1 mr-1" v-model="commentContent" placeholder="comment..."></b-textarea>
                <b-button @click="onCommentWrite">Write</b-button>
            </div>
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
            post: {},
            commentContent: ""
        }
    },
    methods: {
        async loadPost() {
            try {
                const post = await boardUtil.getPost(this.$route.params.post_id)
                this.post = post
            }
            catch (error) {
                console.log(error)
            }
        },
        async onCommentWrite() {
            try {
                const res = await boardUtil.writeComment({ content: this.commentContent, post_id: this.$route.params.post_id })
                this.commentContent = ""
                await this.loadPost()
                
            } catch (error) {
                console.log(error)
            }
        }
    },
    async mounted() {
        await this.loadPost()
    }
}
</script>