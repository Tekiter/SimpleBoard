<template>
    <div>
        <div class="d-flex">
            <h3 class="flex-grow-1">{{ post.title }}</h3>
            <p>{{ post.writer }}</p>
        </div>
        <div class="mt-2 p-3 bg-light">
            <p>
                {{ post.content }}
            </p>
        </div>
        <div class="mt-3 d-flex flex-row-reverse">
            <b-button-group>
                <b-button :to="{path: `/${$route.params.board_id}`}" variant="info"><i class="fas fa-list"></i></b-button>
                <b-button @click="onDelete" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
                <b-button ><i class="fas fa-edit"></i></b-button>

            </b-button-group>
        </div>
        <div class="mt-3">
            <b-list-group>
                <b-list-group-item v-for="comment in post.comments" :key="comment._id">
                    <div class="d-flex">
                        <p class="flex-grow-1 text-break mr-3">
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
                <b-button @click="onCommentWrite" variant="primary">Write</b-button>
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
        },
        async onDelete() {
            
            const ans = await this.$bvModal.msgBoxConfirm('Are you sure want to delete this post?', {
                title: 'Delete post',
                // size: 'sm',
                // buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Delete',
                cancelTitle: 'Cancel',
                footerClass: 'p-2',
                hideHeaderClose: false,
                // centered: true
            })

            if (ans) {
                try {
                    const res = await boardUtil.deletePost({ post_id: this.$route.params.post_id })
                    await this.$bvModal.msgBoxOk('Successfully deleted post')
                    
                    this.$router.push({ path: `/${this.$route.params.board_id}` })
                
                } catch (error) {
                    console.log(error)
                    await this.$bvModal.msgBoxOk('Cannot delete post')
                }

            }
        }
    },
    async mounted() {
        await this.loadPost()
    }
}
</script>