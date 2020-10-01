<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />

      <div class="modal__dialog">
        <div class="modal__header">
          <div class="title">
            <slot name="header" />
          </div>
        </div>

        <div class="modal__body">
          <slot name="body" />
        </div>

        <div v-if="useFooter" class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    useFooter: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      const body = document.querySelector('body');
      body.classList.remove('overflow-hidden');
    },
    openModal() {
      this.show = true;
      const body = document.querySelector('body');
      body.classList.add('overflow-hidden');
    },
  },
};
</script>

<style scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
}

.modal__backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
}

.modal__dialog {
  background-color: #ffffff;
  position: relative;
  width: 850px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  z-index: 2;
}

.modal__header {
  padding: 20px 20px 10px;
  display: flex;
  align-items: flex-start;
}

.title {
  flex: 1;
}

.modal__body {
  padding: 10px 20px 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.modal__footer {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding: 10px 20px 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 900px) {
  .modal__dialog {
    width: 90%;
  }
}
</style>
