<template>
  <div class="about">
    <router-link tag="button" :to="`/report`">
      Создать
    </router-link>
    <table-coponent :headers="headers" :records="records">
      <template v-slot:actions="{ item }">
        <router-link tag="button" :to="`/report/${item.id}`">
          Редактировать
        </router-link>
        <button v-if="!item.status" @click="approveReport(item.id)">
          Принять
        </button>
        <button @click="deleteReport(item.id)">
          Удалить
        </button>
      </template>
    </table-coponent>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
const tableCoponent = () => import('@/components/tableComponent/tableComponent')

export default {
  name: 'Reports',
  components: {tableCoponent},
  data () {
    return {
      headers: [
        {
          name: 'name',
          title: 'Название'
        },
        {
          name: 'status',
          title: 'Статус'
        },
        {
          name: 'author',
          title: 'Автор'
        },
        {
          name: 'time',
          title: 'Время прохождения'
        },
      ],
      records: [
        {
          id: 1,
          name: 'Resport1',
          status: false,
          author: 'Author1',
          time: '2013-03-01T01:10:00'
        },
        {
          id: 2,
          name: 'Resport2',
          status: true,
          author: 'Author2',
          time: '2013-03-01T01:10:00'
        }
      ]
    }
  },
  methods: {
    async approveReport(id) {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete approve?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve it!',
        cancelButtonText: 'No, cancel!',
      })
      if(!isConfirmed) return
      const report = this.records.find(item=> item.id === id)
      report.status = true
    },
    async deleteReport(id) {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete report?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      })
      if(!isConfirmed) return
      this.records = this.records.filter(item => item.id !== id)
    }
  }
}
</script>
