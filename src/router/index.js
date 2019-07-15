import Vue from 'vue'
import Router from 'vue-router'

import DesignForm from '../_2_sys_page/_2_DesignForm'
import DesignList from '../_2_sys_page/_1_FormList'

//业务页面---开始
import index from '../_3_business_page/_1_index'
import applyLeave from '../_3_business_page/_2_apply_leave'
import applyList from '../_3_business_page/_99_apply_list'
import applyTask from '../_3_business_page/_99_apply_task_details'
//业务页面---结束

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/design_list"
    },
    {//表单设计器页面
      path: '/design_form',
      component: DesignForm
    },
    { //表单列表页面
      path:"/design_list",
      component:DesignList
    },
    //业务页面---开始
    {
      path:"/index",
      component:index
    },
    {
      path:"/apply_leave",
      component:applyLeave
    },
    {
      path:"/apply_list",
      component:applyList
    },
    {
      path:"/apply_task",
      component:applyTask
    }
    //业务页面---结束
  ]
})