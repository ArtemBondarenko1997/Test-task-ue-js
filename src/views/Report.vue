<template>
  <div class="report">
    <div v-for="header in headers" :key="header.name" class="fieldRow">
      <div class="title">{{ header.title }}:</div>
      <input type="text" v-model="record[header.name]">
    </div>
    <div class="buttonsBlock">
      <button @click="mainAction">{{ isNew ? 'Создать курс' : 'Сохранить изменения' }}</button>
      <button @click="cancel">Отменить редактирование</button>
      <button v-if="!isNew" @click="deleteReport">Удалить</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: 'Report',
  computed: {
    isNew () {
      return !this.$route.params.id
    },
    record () {
      if(this.isNew) {
        return {}
      }
      return this.$store.getters.getReportById(this.$route.params.id)
    },
    headers () {
      return this.$store.state.headers
    }
  },
  methods: {
    mainAction() {
      if(this.isNew) {
        this.$store.dispatch('create', this.record)
      } else {
        this.$store.dispatch('edit', this.record)
      }
      this.$router.push('/')
    },
    async deleteReport() {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete report?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      })
      if(!isConfirmed) return
      await this.$store.dispatch('delete', this.$route.params.id)
      this.$router.push('/')
    },
    async cancel () {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'Вы уверены что хотите вернутся? Ваши изменения не сохранятся!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      })
      if(!isConfirmed) return
      this.$router.push('/')
    },
    create () {
      this.$store.dispatch('create', this.record)
    }
  }
}
</script>

<style scoped lang="scss">
.report {
  padding: 20px;
  color: #fff;
  .fieldRow {
    margin: 20px auto;
    display: flex;
    max-width: 50%;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 30%;
      text-align: left;
    }
    input {
      width: 70%;
      margin: auto;
      padding: 12px;
      border: 2px solid transparent;
      color: #fff;
      display: block;
      background: #303339;
      &:focus{
        border: 2px solid #1976d2;
        outline: none;
      }
      &::placeholder{
        color: #4F555C;
      }
    }
  }
  button {
    cursor: pointer;
    margin: 0 10px;
    padding: 5px;
    background: linear-gradient(199.16deg, #202225 0.24%, #2A2C30 89.94%);
    box-shadow: 5px 5px 10px #2B2E32;
    -webkit-backdrop-filter: blur(13px);
    backdrop-filter: blur(13px);
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
    border: none;
    z-index: 2;
    outline: none;
  }
}
</style>