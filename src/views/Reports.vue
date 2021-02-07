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
import { mapState } from 'vuex';
const tableCoponent = () => import('@/components/tableComponent/tableComponent')

export default {
  name: 'Reports',
  components: {tableCoponent},
  computed: mapState({
    headers: state => state.headers,
    records: state => state.records,
  }),
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
      this.$store.dispatch('approve', id)
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
      this.$store.dispatch('delete', id)
    }
  }
}
</script>
