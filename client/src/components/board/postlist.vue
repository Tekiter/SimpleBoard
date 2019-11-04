<template>
    <div>
        <div>
            <h3 class="float-left">{{ boardInfo.name }}</h3>
            <b-button class="float-right" @click="onWrite">write</b-button>
        </div>
        <b-table :items="posts" :fields="fields" select-mode="single" selectable
                    @row-selected="onClick"></b-table>
    </div>
</template>
<style scoped>

</style>
<script>
import boardUtil from '@/utils/board'

export default {
    data() {
        return {
            boardInfo: {},
            posts: [],
            fields: [
                { key: 'id', label: 'Seq'},
                { key: 'title', label: 'Title'},
                { key: 'writer', label: 'Writer'}
            ]
        }
    },
    async mounted() {
        const board = await boardUtil.getBoard(this.$route.params.board_id)
        this.boardInfo = board.board
        this.posts = board.posts

    },
    methods: {
        onClick(post) {
            console.log(post)
            this.$router.push({ path: `/${this.boardInfo._id}/${post[0]._id}`})
        },
        onWrite() {
            this.$router.push({ path: `/${this.$route.params.board_id}/write` })
        }
    }
}
</script>