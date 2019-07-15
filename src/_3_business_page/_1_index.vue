<template>
    <div>
        <h1>门户首页</h1>
        <el-button type="warning" plain @click="skipEmployee">员工请假申请</el-button>
    </div>
</template>

<script>
    export default {
        name:"index",
        data(){
            return {

            }
        },
        methods:{
            skipEmployee(){
                this.$router.push({
                    path:"/apply_leave",
                    query:{
                        processKey:"test-outside-form"
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>