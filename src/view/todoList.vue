<template>
    <div class="todo">
        <div>
            <div class="logo">
                <img src="../assets/logo.png" alt="">
                <el-button size="mini" type="danger" @click="quit" class="quit">安全退出</el-button>
            </div>
            <div class="nav-box">
                <div class="nav">
                    <el-select v-model="selvalue" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="seltype" placeholder="请选择">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div><el-button type="primary" @click="opendrawer">新增采购单</el-button></div>
            </div>
            <el-input placeholder="请输入内容" v-model="findstr" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="getFindPage"></el-button>
            </el-input>
        </div>
        
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column  label="序号" width="50px" :index="indexMethod" type="index"></el-table-column>
            <el-table-column prop="project_name" label="项目名称" > </el-table-column>
            <el-table-column prop="odd_num" label="批次/单号" width="100px"> </el-table-column>
            <el-table-column prop="material" label="材料名称"> </el-table-column>
            <el-table-column prop="how_much" label="下单量"  width="80px"> </el-table-column>
            <el-table-column prop="order_name" label="下单厂家"> </el-table-column>
            <el-table-column prop="contact" label="联系人"  width="100px"> </el-table-column>
            <el-table-column prop="order_time" label="下单日"> </el-table-column>
            <el-table-column prop="sure_time" label="确认日"> </el-table-column>
            <el-table-column prop="pormise_time" label="承诺到期日" width="100px"> </el-table-column>
            <el-table-column prop="status" label="完成状态"> </el-table-column>
            <el-table-column prop="apply_des" label="备注"> </el-table-column>
            <el-table-column prop="apply_des" label="操作"  width="220px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleApp(scope.$index, scope.row)" :class="{notsus:scope.row.status == '已完成'}">{{scope.row.status == "未完成"?"完成":"已完成"}}</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="getNowPage"
            :total="total"
            class="setpage">
        </el-pagination>
        <el-drawer
            ref="drawer"
            title="添加采购"
            size="50%"
            :visible.sync="drawer"
            :direction="direction"

            :before-close="handleClose">
            <div class="demo-drawer__content">
                <el-form :model="form" size="mini" class="my-form">
                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                        <el-input v-model="form.project_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="采购单号" :label-width="formLabelWidth">
                        <el-input v-model="form.odd_num" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="材料类型" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="材料名称" :label-width="formLabelWidth" v-if="form.type==3 ||form.type==4">
                        <el-input v-model="form.material" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="下单量" :label-width="formLabelWidth">
                        <el-input v-model="form.how_much" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="下单厂家" :label-width="formLabelWidth">
                        <el-input v-model="form.order_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" :label-width="formLabelWidth">
                        <el-input v-model="form.contact" autocomplete="off"></el-input>
                    </el-form-item>
                   <el-form-item label="下单日" :label-width="formLabelWidth"  class="other2">
                        <el-date-picker
                            v-model="form.order_time"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="确认日" :label-width="formLabelWidth"  class="other2">
                        <el-date-picker
                            v-model="form.sure_time"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="承诺到期日" :label-width="formLabelWidth"  class="other2">
                        <el-date-picker
                            v-model="form.pormise_time"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth" class="other1">
                        <el-input v-model="form.apply_des" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                <el-button @click="cancelForm" size="mini">取 消</el-button>
                <el-button type="primary" @click="createTodo" size="mini">确 定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>    

</template>
<script>
    import Server from "@/server/api.js"
    export default{
        data(){
            return{
                tableData:[],
                drawer:false,
                direction:'rtl',
                form:{
                    project_name:"",  //项目名称
                    odd_num:"",       //采购单号
                    how_much:"",       //下单量
                    order_name:"", //下单厂家
                    contact:"", //联系人
                    order_time:"", //下单日
                    sure_time:"",//确认日
                    pormise_time:"",//承诺到期日
                    apply_des:"",     //申请描述
                    approval_name:"" ,      //审批人
                    approval_id:"" ,      //审批人id
                    apply_name:"",    //申请人
                    apply_id:"",//申请人id
                    type:"",
                    material:""
                },
                formLabelWidth: '100px',
                pagesize:10,
                status:null,        //1:未审批    2：未审批
                page:1,
                options: [{
                        value: "",
                        label: '全部'
                    }, {
                        value: "1",
                        label: '未完成'
                    }, {
                        value: "2",
                        label: '已完成'
                }],
                options1: [{
                        value: "",
                        label: '全部'
                    }, {
                        value: "1",
                        label: '刚铝材'
                    }, {
                        value: "2",
                        label: '玻璃'
                    }, {
                        value: "3",
                        label: '五金'
                    }, {
                        value: "4",
                        label: '辅材'
                    }
                ],
                options2: [
                    {
                        value: "1",
                        label: '刚铝材'
                    }, {
                        value: "2",
                        label: '玻璃'
                    }, {
                        value: "3",
                        label: '五金'
                    }, {
                        value: "4",
                        label: '辅材'
                    }
                ],
                seltype:"",
                selvalue:"",                //搜索状态
                findstr:"",             //搜索字段
                type:1,             //1：创建   2编辑
                edit_id:"",     //编辑的那一条数据的id
                total:0,    //数据总条数
                editIndex:"",
            }
        },
        created(){
            this.getList()
            let user_info = this.$store.state.user_info;
            this.form.apply_name = user_info.user_name     //申请人
            this.form.apply_id = user_info.user_id 
        },
        methods:{
            getList(){
                let data = {
                    page:this.page,
                    size:this.pagesize,
                }
                Server.getList(data).then((res)=>{
                    console.log(res)
                    this.total = res.result.count || 0;
                    this.tableData =res.result.rows?res.result.rows.map((item)=>{
                        item.status = item.status == 1 ? '未完成' : '已完成' ;
                        return item ;
                    }):[];
                })
            },
            createTodo(){
                if(this.form.project_name == ""){
                    this.$message({
                        message: '请输入项目名称',
                        type: 'warming'
                    });
                    return ;
                }else if(this.form.order_name == ""){
                    this.$message({
                        message: '请输入下单厂家名称',
                        type: 'warming'
                    });
                    return ;
                }else if(this.form.order_time == ""){
                    this.$message({
                        message: '请输入下单时间',
                        type: 'warming'
                    });
                    return ;
                }else if(this.form.sure_time == ""){
                    this.$message({
                        message: '请输入确认日期',
                        type: 'warming'
                    });
                    return ;
                }else if(this.form.project_name == ""){
                    this.$message({
                        message: '请输入承诺日期',
                        type: 'warming'
                    });
                    return ;
                }else if(this.form.type == ""){
                    this.$message({
                        message: '请选择采购类型',
                        type: 'warming'
                    });
                    return ;
                }
                if(this.type == 2){
                    this.setEdit()
                }else{
                    let params = this.form ;
                    Server.createTodo(params).then((res)=>{
                        if(res.status == 1){
                            this.searchList()
                            this.setForm()
                            this.$message({
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('错了哦，添加失败');
                        }
                        this.$refs.drawer.closeDrawer()
                    })
                }
                
            },
            handleClose(){
                this.drawer = false ;
            },
            cancelForm(){
                this.drawer = false ;
            },
            opendrawer(type){
                this.type = type ;
                this.drawer = true ;
            },
            getNowPage(val){
                this.page = val ;
                this.searchList()
            },
            searchList(){
                let data = {
                    page:this.page,
                    size:this.pagesize,
                    status:this.status,
                    findstr:this.findstr,
                    type:this.seltype
                }
                Server.getList(data).then((res)=>{
                    this.total = res.result.count || 0
                    this.tableData = res.result.rows?res.result.rows.map((item)=>{
                        item.status = item.status == 1 ? '未完成' : '已完成' ;
                        return item ;
                    }):[];
                })
            },
            getFindPage(){
                this.page = 1 ;
                this.searchList()
            },
            handleApp(index,row){
                if(row.status == "未完成"){
                    this.$confirm('此操作将完成此采购单, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            id:row.id,
                            status:2,
                            approval_name:this.$store.state.user_info.user_name,
                            approval_id:this.$store.state.user_info.user_id,
                        }
                        Server.updateStatus(data).then(res=>{
                            row.status = "已完成"
                            this.$message({
                                type: 'success',
                                message: '完成成功!'
                            });
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消完成'
                        });          
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '已完成,无法操作'
                    });       
                }
            },
            handleEdit(index,row){
                this.edit_id = row.id ;
                this.form.project_name=row.project_name  //项目名称
                this.form.odd_num=row.odd_num    //采购单号
                this.form.how_much=row.how_much      //下单量
                this.form.order_name=row.order_name //下单厂家
                this.form.contact=row.contact //联系人
                this.form.order_time=row.order_time //下单日
                this.form.sure_time=row.sure_time//确认日
                this.form.apply_des=row.apply_des
                this.form.approval_name=row.approval_name       //审批人
                this.form.approval_id=row.approval_id    //审批人id
                this.form.apply_name=row.apply_name    //申请人
                this.form.apply_id=row.apply_id//申请人id
                this.form.pormise_time=row.pormise_time//承诺到期日
                this.form.material=row.material//承诺到期日
                this.form.type=row.type//承诺到期日
                this.drawer = true ;
                this.type = 2 ;
                this.editIndex = index ;
            },
            setEdit(){
                let data = this.form ;
                data.id = this.edit_id ;
                Server.editTodo(data).then(res=>{
                    if(res.status == 1){
                        this.setForm()
                        res.resedit.status = res.resedit.status == 1?"未完成":'已完成';
                        this.tableData.splice(this.editIndex,1,res.resedit)
                        this.$message({
                            message: '恭喜你，编辑成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('错了哦，编辑失败');
                    }
                    this.$refs.drawer.closeDrawer()
                })
            },
            handleDelete(index,row){
                let data = {
                    id:row.id
                }
                this.$confirm('此操作将删除此采购单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Server.deleteTodo(data).then(res=>{
                        if(res.status == 1){
                            this.searchList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'warming',
                                message: '删除失败!'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'warming',
                        message: '您已取消删除!'
                    });
                })
                
                
            },
            indexMethod(index){
                return (this.page-1)*10+index+1
            },
            setForm(){
                this.form ={
                    project_name:"",  //项目名称
                    odd_num:"",       //采购单号
                    how_much:"",       //下单量
                    order_name:"", //下单厂家
                    contact:"", //联系人
                    order_time:"", //下单日
                    sure_time:"",//确认日
                    pormise_time:"",//承诺到期日
                    apply_des:"",     //申请描述
                    approval_name:"" ,      //审批人
                    approval_id:"" ,      //审批人id
                    apply_name:"",    //申请人
                    apply_id:"",//申请人id
                    type:"",
                    material:""
                }
            },
            quit(){
                this.$confirm('确定要退出吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem("CHUSER")
                    this.$store.commit("signOut")
                    this.$message({
                        type: 'success',
                        message: '退出成功'
                    });   
                    this.$router.push({path:"/"})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });          
                });
            }
        },
        watch:{
            selvalue(){
                this.page = 1;
                this.status = this.selvalue ;
                this.searchList()
            } , 
            seltype(){
                this.page = 1;
                this.searchList()
            }     
        }
    }
</script>
<style lang="less">
    .my-form{
        display:flex;
        flex-wrap:wrap;
        >div{
            width:50%
        }
        .other1{
            width:90%;
        }
        .el-form-item__content{
            text-align:left;
        }
    }
    .el-drawer__body>* {
        padding: 0 10px 0 0;
    }
    .logo{
        height:80px;
        text-align: left;
        img{
            height:100%;
        }
        .quit{
            position:absolute;
            right:30px;
            top:10px;
        }
    }
    .nav-box{
        display:flex;
        justify-content: space-between;
    }
    .todo{
        padding: 0 30px;
        .input-with-select{
            margin:20px 0;
        }
    }
    .notsus{
        padding: 7px 8px;
    }
    .setpage{
        margin: 10px 0 30px 0;
    }
</style>