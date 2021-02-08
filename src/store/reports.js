export const reports = {
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
                title: 'Время прохождения',
                type: 'time'
            }
        ],
        records: [],
        sort: {
            field: 'id',
            desc: false
        },
        paginate: {
            countRecord: 5,
            page: 1
        }
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
        },
        'SET_SORT': (state, payload) => state.sort = payload,
        'SET_PAGE': (state, page) => state.paginate.page = page
    },
    actions: {
        approve({ commit }, id) {
            commit('APPROVE', id)
        },
        delete({ commit }, id) {
            commit('DELETE', id)
        },
        create({ commit }, payload) {
            payload.id =  new Date().getUTCMilliseconds()
            payload.status =  false
            commit('CREAT', payload)
        },
        edit({ commit }, payload) {
            commit('EDIT', payload)
        },
        setSort({ commit }, payload) {
            commit('SET_SORT', payload)
        },
        setPage({ commit }, page) {
            commit('SET_PAGE', page)
        }
    },
    getters: {
        getReportById: state => id => {
            return state.records.find(item => item.id === +id)
        },
        getRecords: state => {
            return state.records.sort((a, b) => {
                if ( a[state.sort.field] < b[state.sort.field] ){
                    return state.sort.desc?1:-1;
                }
                if ( a[state.sort.field] > b[state.sort.field] ){
                    return state.sort.desc?-1:1;
                }
                return 0;
            }).slice((state.paginate.page - 1) * state.paginate.countRecord, state.paginate.page * state.paginate.countRecord)
        },
        pages: state => Math.ceil(state.records.length / state.paginate.countRecord)
    },
}