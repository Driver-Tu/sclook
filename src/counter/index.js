// stores/counter.js
import { defineStore } from 'pinia'

 const useCounterStore = defineStore('counter', {
    state: () => ({ token: 0 }),
})
export default useCounterStore