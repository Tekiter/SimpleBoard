import axios from 'axios'

const board = {
    async getBoardList() {
        try {
            const res = await axios.get('/board')
            return res.data.boards
        } catch (error) {
            throw error
        }
    },
    async getBoard(board_id) {
        const res = await axios.get(`/board/${board_id}`)
        return res.data
    }
}

export default board