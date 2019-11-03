<template>
  <div class="container">
    <div class="d-flex mt-4">
      <boardlist></boardlist>
      <div class="flex-grow-1 card p-4 ml-3">
        <router-view></router-view>
      </div>
      
    </div>
    
    
    <!-- <board></board> -->
  </div>
</template>

<script>
import board from '@/components/board/board.vue'
import boardlist from '@/components/board/boardlist.vue'

export default {
  name: 'home',
  components: {
    board,
    boardlist
  }
}
</script>
