<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="250px">
          <div class="components-list">
            <div class="widget-cate">基础字段</div>
            <draggable tag="ul" :list="basicComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">

              <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>

            <div class="widget-cate">高级字段</div>
            <draggable tag="ul" :list="advanceComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">

              <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>

            <div class="widget-cate">布局字段</div>
            <draggable tag="ul" :list="layoutComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">

              <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
          </div>

        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <!-- <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON
            </el-button> -->
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-tickets" @click="backList">返回列表页
            </el-button>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空
            </el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览
            </el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreviewFormKey">查看表单key
            </el-button>
            <!-- <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">
              生成JSON</el-button> -->
            <!-- <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document"
              @click="handleGenerateCode">生成代码</el-button> -->
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-upload2" @click="handleStoreForm">
              保存表单</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">

            <widget-form v-if="!resetJson" ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect">
            </widget-form>
          </el-main>
        </el-container>

        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性
              </div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性
              </div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
              <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
            </el-main>
          </el-container>

        </el-aside>

        <cus-dialog :visible="previewVisible" @on-close="previewVisible = false" ref="widgetPreview" width="1000px"
          form>
          <generate-form insite="true" v-if="previewVisible" :data="widgetForm" :value="widgetModels"
            :remote="remoteFuncs" ref="generateForm">

            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </cus-dialog>

        <cus-dialog :visible="uploadVisible" @on-close="uploadVisible = false" @on-submit="handleUploadJson"
          ref="uploadJson" width="800px" form>
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </cus-dialog>

        <cus-dialog :visible="jsonVisible" @on-close="jsonVisible = false" ref="jsonPreview" width="800px" form>

          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>

          <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">复制数据</el-button>
          </template>
        </cus-dialog>

        <cus-dialog :visible="codeVisible" @on-close="codeVisible = false" ref="codePreview" width="800px" form
          :action="false">
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>
      </el-container>
    </el-main>

    <el-dialog title="表单信息" :visible.sync="addFormDialog" width="30%">
      <div class="dd-form-content">
        <el-form ref="form" label-width="80px">
          <el-form-item label="表单名称">
            <el-input v-model="formName"></el-input>
          </el-form-item>
          <el-form-item label="表单描述">
            <el-input type="textarea" v-model="formDesc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFormItem">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>

</template>

<script>
  import Draggable from 'vuedraggable'
  import WidgetConfig from './WidgetConfig'
  import FormConfig from './FormConfig'
  import WidgetForm from './WidgetForm'
  import CusDialog from './CusDialog'
  import GenerateForm from './GenerateForm'
  import Clipboard from 'clipboard'
  import {
    basicComponents,
    layoutComponents,
    advanceComponents
  } from './componentsConfig.js'
  import {
    loadJs,
    loadCss
  } from '../util/index.js'
  import request from '../util/request.js'
  import generateCode from './generateCode.js'

  export default {
    name: 'fm-making-form',
    components: {
      Draggable,
      WidgetConfig,
      FormConfig,
      WidgetForm,
      CusDialog,
      GenerateForm
    },
    props: {
      preview: {
        type: Boolean,
        default: false
      },
      generateCode: {
        type: Boolean,
        default: false
      },
      generateJson: {
        type: Boolean,
        default: false
      },
      upload: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        basicComponents,
        layoutComponents,
        advanceComponents,
        resetJson: false,
        formName: "", //表单名称
        formDesc: "", //表单描述
        widgetForm: {
          list: [],
          config: {
            labelWidth: 100,
            labelPosition: 'right',
            size: 'small',
          },
        },
        configTab: 'widget',
        widgetFormSelect: null,
        previewVisible: false,
        jsonVisible: false,
        codeVisible: false,
        uploadVisible: false,
        remoteFuncs: {
          func_test(resolve) {
            setTimeout(() => {
              const options = [{
                  id: '1',
                  name: '1111'
                },
                {
                  id: '2',
                  name: '2222'
                },
                {
                  id: '3',
                  name: '3333'
                }
              ]

              resolve(options)
            }, 2000)
          },
          funcGetToken(resolve) {
            request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
              resolve(res.uptoken)
            })
          },
          upload_callback(response, file, fileList) {
            console.log('callback', response, file, fileList)
          }
        },
        widgetModels: {},
        blank: '',
        htmlTemplate: '',
        jsonTemplate: '',
        uploadEditor: null,
        jsonCopyValue: '',
        jsonClipboard: null,
        jsonEg: `{
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908864000_94322"
      },
      "key": "1540908864000_94322",
      "model": "input_1540908864000_94322",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908876000_19435"
      },
      "key": "1540908876000_19435",
      "model": "textarea_1540908876000_19435",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`,
        addFormDialog: false, //保存表单显示的dialog
        form: {
          name: '',
          desc: ''
        },
        currentFormId: ""
      }
    },
    created(){
      if(this.$route.query.formId){ //当路由中存在formid的时候,才对currentFormId进行复制
        this.currentFormId = this.$route.query.formId;
        this.getFormDetails();
      }
    },
    mounted() {

    },
    methods: {
      handleGoGithub() {
        window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
      },
      handleConfigSelect(value) {
        this.configTab = value
      },
      handleMoveEnd(evt) {
        console.log('end', evt)
      },
      handleMoveStart({
        oldIndex
      }) {
        console.log('start', oldIndex, this.basicComponents)
      },
      handleMove() {
        return true
      },
      handlePreview() {
        console.log(this.widgetForm)
        this.previewVisible = true
      },
      handleTest() {
        this.$refs.generateForm.getData().then(data => {
          this.$alert(data, '').catch(e => {})
          this.$refs.widgetPreview.end()
        }).catch(e => {
          this.$refs.widgetPreview.end()
        })
      },
      handleReset() {
        this.$refs.generateForm.reset()
      },
      handleGenerateJson() {
        this.jsonVisible = true
        this.jsonTemplate = this.widgetForm
        console.log(JSON.stringify(this.widgetForm))
        this.$nextTick(() => {

          const editor = ace.edit('jsoneditor')
          editor.session.setMode("ace/mode/json")

          if (!this.jsonClipboard) {
            this.jsonClipboard = new Clipboard('.json-btn')
            this.jsonClipboard.on('success', (e) => {
              this.$message.success('复制成功')
            })
          }
          this.jsonCopyValue = JSON.stringify(this.widgetForm)
        })
      },
      handleGenerateCode() {
        this.codeVisible = true
        this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
        this.$nextTick(() => {
          const editor = ace.edit('codeeditor')
          editor.session.setMode("ace/mode/html")
        })
      },
      handleStoreForm() { //保存表单
        this.addFormDialog = true;
      },
      handleUpload() {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.uploadEditor = ace.edit('uploadeditor')
          this.uploadEditor.session.setMode("ace/mode/json")
        })
      },
      handleUploadJson() {
        try {
          this.setJSON(JSON.parse(this.uploadEditor.getValue()))
          this.uploadVisible = false
        } catch (e) {
          this.$message.error(e.message)
          this.$refs.uploadJson.end()
        }
      },
      handleClear() {
        this.widgetForm = {
          list: [],
          config: {
            labelWidth: 100,
            labelPosition: 'right',
            size: 'small',
            customClass: ''
          },
        }

        this.widgetFormSelect = {}
      },
      getJSON() {
        return this.widgetForm
      },
      getHtml() {
        return generateCode(JSON.stringify(this.widgetForm))
      },
      setJSON(json) {
        this.widgetForm = json

        if (json.list.length > 0) {
          this.widgetFormSelect = json.list[0]
        }
      },
      handleInput(val) {
        console.log(val)
        this.blank = val
      },
      //二次开发逻辑---开始
      addFormItem() { //新增表单项目
        let formName = this.formName; //表单名称
        let formDesc = this.formDesc; //表单描述
        let content = JSON.stringify(this.widgetForm);
        if (this.currentFormId == "") { //当点击新增表单按钮进入页面时,相当于在数据库中插入一条数据
          this.$ajax.post("/admin_form/add_form_item", {
            name: formName,
            desc: formDesc,
            content: content
          }).then(res => {
            if (res.data.code == 200) {
              this.currentFormId = res.data.content;
              this.$alert("保存成功","操作提示");
              this.addFormDialog=false;
            }
          })
        }else{ //对原有表单数据进行修改
          this.$ajax.post("/admin_form/update_item", {
            id:this.currentFormId,
            name: formName,
            desc: formDesc,
            content: content
          }).then(res => {
            if (res.data.code == 200) {
              this.$alert("修改成功","操作提示");
              this.addFormDialog=false;
            }
          })
        }
      },
      handlePreviewFormKey(){
        if(this.currentFormId){
          this.$alert("表单key为:"+this.currentFormId,"外置表单");
        }else{
          this.$alert("保存表单后才会生成formKey","外置表单");
        }
      },
      getFormDetails(){ //获取企业详情
        //setJSON
        this.$ajax.get("/admin_form/details?id=" + this.currentFormId)
        .then(res => {
          if(res.data.code == 200){
            this.formName = res.data.content.name;
            this.formDesc = res.data.content.desc;
            this.setJSON(JSON.parse(res.data.content.content));
          }
        })
      },
      backList(){
        this.$router.push("/design_list");
      }
      //二次开发逻辑---结束
    },
    watch: {
      widgetForm: {
        deep: true,
        handler: function (val) {
          console.log(this.$refs.widgetForm)
        }
      }
    }
  }
</script>

<style lang="scss">
  .widget-empty {
    background: url('../assets/form_empty.png') no-repeat;
    background-position: 50%;
  }
</style>