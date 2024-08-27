import { createRouter,createWebHashHistory } from "vue-router";

const routes=[
    {
        path:"/",
        component:()=>import("../components/HelloLogin.vue")
    },{
        path:"/Home",
        component:()=>import("../components/HomeAll.vue")
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})

export default router