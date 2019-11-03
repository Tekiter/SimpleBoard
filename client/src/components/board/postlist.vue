<template>
    <div>
        <h3>{{ boardInfo.name }}</h3>
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
        }
    }
}
</script>