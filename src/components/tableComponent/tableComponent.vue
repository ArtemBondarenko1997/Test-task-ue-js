<template>
  <div class="wrap">
    <div>
      <table cellspacing="0">
          <thead>
          <tr>
            <th v-for="header in headers" :key="header.title">
              {{ header.title }}
              <div class="sortZone" @click="sorting(header.name)">
                <img v-if="sort.field !== header.name || !sort.desc" src="@/assets/images/arrow.svg" alt="sort">
                <img v-if="sort.field !== header.name || sort.desc" style="transform: rotate(180deg)" src="@/assets/images/arrow.svg" alt="sort">
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id">
            <td v-for="header in headers" :key="header.name">
              <span v-if="header.type === 'time'">{{ record[header.name].HH }} : {{ record[header.name].mm }}</span>
              <span v-else>{{ record[header.name] }}</span>
            </td>

            <td>
              <slot name="actions" :item="record"></slot>
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
  },
  sort: {
    type: Object,
    required: false,
  }
},
methods: {
  sorting (name) {
    if (this.sort.field !== name || this.sort.desc) {
      this.$emit('sort', {
        field: name,
        desc: false
      })
      return
    }
    this.$emit('sort', {
      field: name,
      desc: true
    })
  }
}
}
</script>

<style scoped lang="scss">
.wrap {
  overflow: auto;
  max-width: 50%;
  margin: 20px auto;

  &::-webkit-scrollbar {
    width: 1px;
    position: absolute;
    z-index: 2;
    right: 20px;
  }

  &::-webkit-scrollbar-thumb {
    width: 1px;
    background: linear-gradient(180deg, #9BEDFF 0%, #88C5EE 63.54%, #6C8CD5 100%);
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track {
    width: 1px;
  }

  > div {
    position: relative;
    padding-bottom: 40px;
    z-index: 3;
    width: auto;
    thead {
      border-bottom: 1px solid rgb(75, 78, 82);
    }
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }

  tr {
    position: relative;
    background: #34373C;
    color: #fff;

    th, td {
      background-color: #282a2f;
    }
    td {
      padding: 10px;
    }
    th {
      transition: box-shadow .6s linear;
      font-weight: 500;
      padding-top: 10px;
      padding-bottom: 0;
      &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
      }
      .sortZone {
        user-select: none;
        cursor: pointer;
        margin: auto;
        margin-top: 10px;
        padding-top: 3px;
        width: 100px;
        background: #303339;
        border-radius: 5px 5px 0px 0px;
        height: 20px;
      }
    }
  }
}

@media all and (max-width: 1920px) and (min-width: 1180px){
  .wrap {
    max-width: 75%;
  }
}
@media all and (max-width: 1180px) and (min-width: 990px){
  .wrap {
    max-width: 90%;
  }
}
@media all and (max-width: 990px){
  .wrap {
    max-width: 100%;
  }
}
</style>