<template>
    <div>
        <b-list-group>
            <b-list-group-item v-for="board in boards" :key="board._id" :to="{path: `/${board._id}`}">
                {{ board.name }}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    data() {
        return {
            boards: []
        }
    },
    methods: {
        async updateBoardList() {
            try {
                const res = await this.$http.get('/board')
                this.boards = res.data.boards
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.updateBoardList()
    }
}
</script>