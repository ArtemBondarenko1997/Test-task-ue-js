<template>
  <div class="report">
    <div class="fieldRow">
      <div class="title"> Название: </div>
      <input type="text" v-model="record.name">
    </div>
    <div class="fieldRow">
      <div class="title"> Статус: </div>
      <div class="text"> {{ record.status ? 'Принят' : 'Не принят' }} </div>
    </div>
    <div class="fieldRow">
      <div class="title"> Автор: </div>
      <input v-if="isNew" type="text" v-model="record.author">
      <div v-else class="text"> {{ record.author }} </div>
    </div>
    <div class="fieldRow">
      <div class="title"> Время прохождения: </div>
      <vue-timepicker v-model="record.time" class="date"></vue-timepicker>
    </div>
    <div class="buttonsBlock">
      <button @click="mainAction">{{ isNew ? 'Создать курс' : 'Сохранить изменения' }}</button>
      <button @click="cancel">Отменить {{ isNew ? 'создание' : 'редактирование' }}</button>
      <button v-if="!isNew && !record.status" @click="approveReport">Принять</button>
      <button v-if="!isNew" @click="deleteReport">Удалить</button>
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'

export default {
  name: 'Report',
  components: { VueTimepicker },
  computed: {
    isNew () {
      return !this.$route.params.id
    },
    record () {
      if(this.isNew) {
        return {}
      }
      return this.$store.getters.getReportById(this.$route.params.id)
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
      if(!await this.showNote('Do you want to delete report?')) return
      await this.$store.dispatch('delete', this.$route.params.id)
      this.$router.push('/')
    },
    async approveReport() {
      if(!await this.showNote('Do you want to approve report?')) return
      this.$store.dispatch('approve', +this.$route.params.id)
      this.$router.push('/')
    },
    async cancel () {
      if(!await this.showNote('Do you want to exit?')) return
      this.$router.push('/')
    },
    create () {
      this.$store.dispatch('create', this.record)
    }
  }
}
</script>

<style src="vue2-timepicker/dist/VueTimepicker.css"></style>
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
    .text {
      width: 70%;
      text-align: left
    }
    .date {
      width: 70%;
      margin: auto;
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

@media all and (max-width: 1920px) and (min-width: 768px){
  .fieldRow {
    max-width: 75%!important;
  }
}

@media all and (max-width: 768px){
  .fieldRow {
    max-width: 100%!important;
    input, .text {
      width: 40%!important;
    }
    .date {
      width: 40%;
    }
  }
  button {
    width: 100%;
    margin-bottom: 10px!important;
  }
}
</style>