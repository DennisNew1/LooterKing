import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            items: [],
            tagList: [],
            spellList: [],
        }
    },
    mutations: {
        setItems(state, payload) {
            state.items = payload;
        },
        setTags(state, payload) {
            state.tagList = payload;
        },
        setSpells(state, payload) {
            state.spellList = payload;
        },
        setItem(state, payload) {
            let index = state.items.findIndex(el => el.id === payload.id);
            state.items[index] = payload;
        }
    }
})