<!-- AlertBox.vue -->
<template>
  <transition name="fade">
    <div v-if="visible" class="alert-box" @click="close">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: ''
    };
  },
  methods: {
    show(message) {
      this.message = message;
      this.visible = true;
      setTimeout(() => this.close(), 3000); // Auto-close after 3 seconds
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.alert-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #f55;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 80%;
}
</style>
