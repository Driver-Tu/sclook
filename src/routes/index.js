import { createRouter,createWebHashHistory } from "vue-router";

const routes=[
    {
        path:"/login",
        component:()=>import("../components/HelloLogin.vue")
    },{
        path:"/",
        component:()=>import("../components/HomeAll.vue")
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})

export default router