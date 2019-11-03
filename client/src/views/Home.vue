<template>
  <div class="container">
    <div class="d-flex mt-4">
      <boardlist></boardlist>
      <router-view class="flex-grow-1"></router-view>
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
