<template>
    <div>
        <div class="dx-task-form">
            <taskForm></taskForm>
        </div>
    </div>
</template>

<script>
    import taskForm from '../_1_custom_components/common/_2_process_task'
    export default {
        name: "taskDetails", //任务表单详情页
        components: {
            taskForm: taskForm
        },
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        }

    }
</script>

<style lang="scss" scoped>
.dx-task-form{
    margin-top: 50px;
}
</style>