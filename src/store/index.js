import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
      }
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
  },
  mutations: {
    'APPROVE': (state, id) => state.records.find(item=> item.id === id).status = true,
    'DELETE': (state, id) => state.records = state.records.filter(item => item.id !== +id),
    'CREAT': (state, payload) => state.records.push(payload),
    'EDIT': (state, payload) => {
      const record = state.records.find(item => item.id === payload.id)
      for(let key in payload.value) {
        record[key] = payload[key]
      }
    }
  },
  actions: {
    approve({ commit }, id) {
      commit('APPROVE', id)
    },
    delete({ commit }, id) {
      commit('DELETE', id)
    },
    create({ commit }, payload) {
      commit('CREAT', payload)
    },
    edit({ commit }, payload) {
      commit('EDIT', payload)
    },
  },
  getters: {
    getReportById: state => id => {
      return state.records.find(item => item.id === +id)
    }
  },
  modules: {
  }
})
