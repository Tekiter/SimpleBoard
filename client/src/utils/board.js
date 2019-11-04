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
    },
    async addBoard({name}) {
        const res = await axios.post('/board', {name})
        return res.data
    },
    async getPost(post_id) {
        const res = await axios.get(`/post/${post_id}`)
        return res.data
    },
    async writePost({title, content, board_id}) {
        const res = await axios.post(`/board/${board_id}`, {title, content})
        return res.data
    },
    async writeComment({ content, post_id }) {
        const res = await axios.post(`/post/${post_id}/comment`, {content})
        return res.data
    }
}

export default board