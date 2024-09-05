import { createRouter,createWebHashHistory } from "vue-router";

const routes=[
    {
        path:"/",
        component:()=>import("../components/HelloLogin.vue")
    },{
        path:"/HomeAll",
        component:()=>import("../components/HomeAll.vue"),
        children:[
            {//主题
                path:"/HomeAll/index/theme",
                component:()=>import("../components/FrontPage/FontTeme.vue")
            },
            {//设置
                path:"/HomeAll/index/setting",
                component:()=>import("../components/FrontPage/FontSetting.vue")
            },
            {//个人信息
                path:"/HomeAll/user/staffdetail",
                component:()=>import("../components/userSelf/UserSelectMessage.vue")
            },
            {//个人考勤
                path:"/HomeAll/staff/attendenceList",
                component:()=>import("../components/userSelf/UserAttendence.vue")
            },
            {//资源管理
                path:"/HomeAll/other/resourceManager",
                component:()=>import("../components/OtherPage/ResourceManager")
            },{//回收站
                path:"/HomeAll/other/wasteBin",
                component:()=>import("../components/OtherPage/wasteBin")
            },{//日常打卡
                path:"/HomeAll/normal/punchCard",
                component:()=>import("../components/EveryDay/DayPunchCard")
            },
            {//日常总结
                path:"/HomeAll/normal/sumarry",
                component:()=>import("../components/EveryDay/DaySumarry")
            },
            {//日常流程
                path:"/HomeAll/normal/process",
                component:()=>import("../components/EveryDay/DayProcess")
            },
            {//成员管理
                path:"/HomeAll/admin/memberControl",
                component:()=>import("../components/Depart/MemberControl")
            },{//部门管理
                path:"/HomeAll/admin/dept",
                component:()=>import("../components/Depart/Dept")
            },{//角色管理
                path:"/HomeAll/admin/role",
                component:()=>import("../components/Depart/AllPControl")
            },{//邮箱管理
                path:"/HomeAll/admin/mail",
                component:()=>import("../components/Depart/MailControl")
            }
        ]
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})

export default router