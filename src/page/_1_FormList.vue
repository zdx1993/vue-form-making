<template>
    <div>
        <h2>表单列表页</h2>
        <ul>
            <li v-for="(item,index) in formList" :key="index" @click="skipFormDetails(item.id)">
                {{item.name}}
                <br>
                <span style="color:#DDD">{{item.desc}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                formList:[]
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.getFormList();
            },
            getFormList(){
                this.$ajax.get("/admin_form/form_list")
                .then(res => {
                    if(res.data.code == 200){
                        this.formList = res.data.content;
                    }
                })
            },
            skipFormDetails(formId){
                this.$router.push({
                    path:"/design_form",
                    query:{
                        formId:formId
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>