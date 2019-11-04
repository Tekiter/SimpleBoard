<template>
    <div>
        <b-list-group>
            <b-list-group-item v-for="board in boards" :key="board._id" :to="{path: `/${board._id}`}"
                                :active="board._id == $route.params.board_id">
                {{ board.name }}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>
<style scoped>

</style>
<script>
import boardUtil from "../../utils/board"

export default {
    data() {
        return {
            boards: []
        }
    },
    methods: {
        async updateBoardList() {
            try {
                const board = await boardUtil.getBoardList()
                this.boards = board
            } catch (error) {
                console.log(error)
            }
        }
    },
    async mounted() {
        await this.updateBoardList()
    }
}
</script>