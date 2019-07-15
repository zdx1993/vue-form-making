<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="skipTaskDetails(item.id)">
                待办理任务名称-{{item.taskName}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"applyList", //获取李四审核列表.lisi是内置的审核用户
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.getApplyList();
        },
        methods:{
            getApplyList(){
                this.$ajax.get("/task_list?assignee=lisi")
                .then(res => {
                    this.list = res.data
                })
            },
            skipTaskDetails(taskId){ //跳转到任务办理页面
                this.$router.push({
                    path:"apply_task",
                    query:{
                        taskId:taskId
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>