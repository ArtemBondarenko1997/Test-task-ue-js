<template>
  <div class="reports">
    <router-link tag="button" :to="`/report`">
      Создать
    </router-link>
    <table-coponent :headers="headers" :records="records" :sort="sort" @sort="sorting">
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
    <div class="paginationWrap">
      <img v-if="pages > 1" style="transform: rotate(180deg)" src="@/assets/images/paginationArrow.svg" alt="back" @click="setPage(page-1)">
      <div :class="{active: page===i}" class="page" v-for="i in pages" :key="i" @click="setPage(i)"> {{i}} </div>
      <img v-if="page !== pages && pages > 0" src="@/assets/images/paginationArrow.svg" alt="next" @click="setPage(page+1)">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const tableCoponent = () => import('@/components/tableComponent/tableComponent')

export default {
  name: 'Reports',
  components: {tableCoponent},
  computed: { ...mapState({
    headers: state => state.reports.headers,
    sort: state => state.reports.sort,
    page: state => state.reports.paginate.page
  }),
    records() {
      return this.$store.getters.getRecords
    },
    pages() {
      return this.$store.getters.pages
    }
  },
  methods: {
    async approveReport(id) {
      if(!await this.showNote('Do you want to approve report?')) return
      this.$store.dispatch('approve', id)
    },
    async deleteReport(id) {
      if(!await this.showNote('Do you want to delete report?')) return
      this.$store.dispatch('delete', id)
    },
    sorting (payload) {
      this.$store.dispatch('setSort', payload)
    },
    setPage (page) {
      this.$store.dispatch('setPage', page)
    }
  }
}
</script>

<style scoped lang="scss">
.reports {
  padding: 20px;
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
  .paginationWrap{
    display: flex;
    justify-content: space-around;
    max-width: 50%;
    margin: auto;
    .page {
      cursor: pointer;
      color: #fff;
      transition: font-size .5s ease;
      &.active{
        font-weight: 600;
        font-size: 18px;
      }
    }
    .img{
      cursor: pointer;
    }
  }
}

@media all and (max-width: 990px){
  .reports {
    padding: 20px 0;
    button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}

</style>
