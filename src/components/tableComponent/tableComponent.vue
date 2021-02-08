<template>
  <div class="wrap">
    <div class="tableFixHead">
      <table cellspacing="0">
          <thead>
          <tr>
            <th v-for="header in headers" :key="header.title">
              {{ header.title }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id">
            <td v-for="header in headers" :key="header.name">
              {{ record[header.name] }}
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

  .tableFixHead {
    height: 700px;
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
      padding: 10px;
      background-color: #282a2f;
    }

    th {
      transition: box-shadow .6s linear;
      font-weight: 500;
      &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>