<template>
  <div class="container">
    <div class="d-flex mt-4">
      <boardlist @addBoard="$bvModal.show('add-board-modal')"></boardlist>
      <div class="flex-grow-1 card p-4 ml-3">
        <router-view></router-view>
      </div>
      
    </div>
    
    <b-modal id="add-board-modal" title="Create new board" @show="resetAddBoardModal" @ok="onAddBoardConfirm">
      <form @submit.stop.prevent="onAddBoardConfirm">
        <b-form-group label="New board name">
          <b-form-input v-model="addModal.name" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import board from '@/components/board/board.vue'
import boardlist from '@/components/board/boardlist.vue'
import boardUtil from '@/utils/board'

export default {
  name: 'home',
  components: {
    board,
    boardlist
  },
  data() {
    return {
      addModal: {
        name: ""
      }
    }
  },
  methods: {
    async onAddBoardConfirm(evt) {
      if (evt) {
        evt.preventDefault()
      }

      if (!this.addModal.name) {
        return
      }

      try {
        const res = await boardUtil.addBoard({name: this.addModal.name})
        this.$nextTick(() => {
          this.$bvModal.hide('add-board-modal')
          location.reload()
        })
      }
      catch (error) {
        console.log(error.response)
      }
    },
    resetAddBoardModal() {
      this.addModal.name = ""
    }
  }
}
</script>
