<template>
  <div class="wrap">
    <div class="tableFixHead">
      <table>
          <thead>
          <tr>
            <th v-for="header in headers" :key="header.title">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id">
            <td v-for="header in headers" :key="header.name">
              {{ record[header.name] }}
            </td>

            <td>
              <slot name="actions" :item="record"></slot>

<!--              <router-link tag="button" :to="`/report/${record.id}`">-->
<!--                Редактировать-->
<!--              </router-link>-->
<!--              <button>-->
<!--                Принять-->
<!--              </button>-->
<!--              <button>-->
<!--                Удалить-->
<!--              </button>-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
name: "tableComponent",

props: {
  headers: {
    type: Array,
    required: true
  },
  records: {
    type: Array,
    required: false,
  }
}
}
</script>

<style scoped>

</style>