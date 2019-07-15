<template>
    <div>
        <generate-form v-if="previewVisible" insite="true" :data="widgetForm" :value="widgetModels"
            :remote="remoteFuncs" ref="generateForm">

            <template v-slot:blank="scope">
                宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
                高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
        </generate-form>
        <div class="dx-start-footer">
            <el-button type="primary" @click="submitApply" plain>提交申请</el-button>
            <el-button type="info" @click="cancelApply" plain>取消申请</el-button>
        </div>
    </div>
</template>

<script>
    import generateForm from '../../components/GenerateForm'
    export default {
        name: "processStart", //用于渲染开始表单的组件
        components: {
            generateForm: generateForm
        },
        data() {
            return {
                formDefinitionData: {},
                widgetForm: {},
                widgetModels: {},
                remoteFuncs: {},
                previewVisible: false,
                startProcessKey: this.$route.query.processKey
            }
        },
        created() {
            this.getFormRanderData();
        },
        methods: {
            //根据流程定义的key来渲染表单
            getFormRanderData() {
                //获取启动表单的id后,获取表单渲染数据
                this.getStartFormKey(this.startProcessKey);
            },
            getStartFormKey(startFormKey) { //获取启动表单的id
                this.$ajax.get("/formId_by_processkey?processKey=" + startFormKey)
                    .then(res => {
                        //获取表单详情
                        this.getFormDefinitionData(res.data);
                    })
            },
            getModels() { //d

            },
            getFormDefinitionData(startFormId) { //过去表单定义的数据
                this.$ajax.get("/admin_form/details?id=" + startFormId)
                    .then(res => {
                        this.formDefinitionData = res.data.content;
                        this.widgetForm = JSON.parse(res.data.content.content);
                        this.previewVisible = true;
                    })
            },
            cancelApply() { //取消当前申请返回上一个页面
                this.$router.go(-1);
            },
            submitApply() { //提交启动页面表单
                let sendData = {};
                //获取当前需要提交的数据
                this.$refs.generateForm.getData().then(data => {
                    // 数据获取成功
                    sendData = data;
                    //经测试这个方法是一个异步方法,需要注意获取值的时机

                    //构造发送的流程定义key,注意这里map的key要与服务端接收的参数名相同
                    sendData.processKey = this.startProcessKey;
                    debugger
                    //startProcessKey
                    this.$ajax.post("/start_process", sendData)
                        .then(res => {

                            this.$alert('申请成功', '操作提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.go(-1);
                                }
                            });

                        })
                }).catch(e => {
                    // 数据校验失败
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dx-start-footer {
        text-align: center;
    }
</style>