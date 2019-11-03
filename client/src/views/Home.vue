<template>
  <div class="container">
    <boardlist></boardlist>
    <router-view></router-view>
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
