import Vue from 'vue'
import Router from 'vue-router'

import DesignForm from '../page/_2_DesignForm'
import DesignList from '../page/_1_FormList'

Vue.use(Router)

export default new Router({
  routes: [
    {//表单设计器页面
      path: '/design_form',
      component: DesignForm
    },
    { //表单列表页面
      path:"/design_list",
      component:DesignList
    }
  ]
})