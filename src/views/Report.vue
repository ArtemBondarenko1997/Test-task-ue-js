<template>
  <div class="report">
    <div v-for="header in headers" :key="header.name">
      {{ header.title }}: <input type="text" v-model="record[header.name]">
    </div>
    <div class="buttonsBlock">
      <button>{{ isNew ? 'Создать курс' : 'Сохранить изменения' }}</button>
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
