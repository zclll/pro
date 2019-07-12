<template>
    <div class="contain">
        <md-card md-with-hover class="card">
            <md-table v-model="searched"  @md-selected.self="onSelect"  md-fixed-header>
            <!-- 标题 -->
            <md-table-toolbar style="width:100%">
                <h1 class="md-title">安全宝管理</h1>
                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="蓝牙地址搜索" v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>
            <!-- 表格头部扩展 -->
            <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
                <div class="md-toolbar-section-end">
                    <md-button  @click="show = true" class="allButton">
                        批量分配
                    </md-button>
                    <md-button class="md-icon-button" @click="actives = true">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>
            <md-table-empty-state
                md-label="No found"
                :md-description="`没有找到符合搜索的数据`">
                <md-button class="md-primary md-raised" @click="newUser()">添加数据</md-button>
            </md-table-empty-state>
            <!-- 表格内容 -->
            
            <md-table-row slot="md-table-row" slot-scope="{ item }"  md-selectable="multiple" md-auto-select>
                <!-- <transition-group appear> -->
                    <md-table-cell md-label="序号" md-sort-by="item.id">{{ item.id }}</md-table-cell>
                    <md-table-cell md-label="蓝牙地址" md-sort-by="adress">{{ item.adress }}</md-table-cell>
                    <md-table-cell md-label="所属公司" md-sort-by="OwnershipEnterprise">{{ item.OwnershipEnterprise }}</md-table-cell>
                    <md-table-cell md-label="修改" >
                        <md-button class="md-icon-button" @click.stop="modify()">
                            <md-icon>border_color</md-icon>
                        </md-button>
                    </md-table-cell>
                    <md-table-cell md-label="删除" >
                        <md-button class="md-icon-button del-button" @click.stop="del(item.id)">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>
                <!--  </transition-group>-->
            </md-table-row>
            
        </md-table>
        </md-card>
            
        <!-- 资源分配的模态框 -->
        <div>
            <md-dialog :md-active.sync="show" class="allDialog">
                <md-dialog-title>资源分配</md-dialog-title>
                <md-autocomplete v-model="selectedCompany" :md-options="companys">
                    <label>公司</label>
                </md-autocomplete>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="show = false">Close</md-button>
                    <md-button class="md-primary" @click="allocation()">Save</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
        <!-- 添加模态框 -->
        <div>
            <md-dialog :md-active.sync="showDialog" class="addDialog">
                <md-dialog-title>Preferences</md-dialog-title>
                <md-field>
                    <md-select v-model="way" name="way" id="way" placeholder="项目">
                        <md-option value="0">安全宝</md-option>
                        <md-option value="1">手环</md-option>
                    </md-select>
                </md-field>
                <md-field>
                    <label>蓝牙地址</label>
                    <md-input v-model="adr"></md-input>
                    <span class="md-helper-text">格式(??:??:??:??:??)</span>
                </md-field>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                    <md-button class="md-primary" @click="add()">Save</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
        <md-dialog-confirm
            :md-active.sync="active"
            md-title="警告"
            md-content="删除之后数据将会丢失，您确定要删除?"
            md-confirm-text="同意"
            md-cancel-text="不同意"
            @md-cancel="onCancel"
            @md-confirm="onConfirm" 
            class="delDialog"/>
        <md-dialog-confirm
            :md-active.sync="actives"
            md-title="警告!!!"
            md-content="删除之后数据将会丢失，您确定要删除?"
            md-confirm-text="同意"
            md-cancel-text="不同意"
            @md-cancel="onCancels"
            @md-confirm="onConfirms" 
            />
        <md-button class="md-fab md-fab-bottom-right" @click="showDialog = true">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>
<script lang="ts">
    const toLower = (text:any):string => {
        return text.toString().toLowerCase()
    }

    const searchByName = (items:any, term:any):any => {
        if (term) {
            return items.filter((item:any):boolean => toLower(item.adress).includes(toLower(term)))
        }
        return items
    }
    export default {
        methods: {
            /* 数据选择后数据绑定 */
            onSelect (this:any,items: any): void {
                this.selected = items
            },
            /* 数据选中显示界面内容 */
            getAlternateLabel (count:any):string {
                let plural = ''
                return `有${count}个被选中了`
            },
            /* 修改功能 */
            modify(this:any):void{
                console.log(1)
            },
            /* 删除功能 */
            del(this:any,i:any):void{
                this.active = true;
                this.delData = i;
            },
            /*  分配功能 */
            allocation(this:any):void{
                this.show = false;
                for(let i = 0 ; i < this.selected.length ; i ++){
                    this.mes[this.mes.indexOf(this.selected[i])].OwnershipEnterprise = this.selectedCompany;
                }
            },
            /* 添加数据提示 */
            newUser (this:any) {
                this.showDialog = true
            },
            /* 数据查找的数据匹配 */
            searchOnTable (this:any):void {
                this.searched = searchByName(this.mes, this.search)
            },
            /* 添加数据 */ 
            add(this:any):void{
                this.mes.push({
                    id:this.mes.length,
                    adress:this.adr,
                    OwnershipEnterprise:'未分配'
                })
                this.selected = this.mes;
                this.searchOnTable();
                this.showDialog = false;
            },
            /*  选择删除 */
            onConfirm(this:any):void{
                this.mes.splice(this.mes.findIndex((a:any):any=>{
                    return a.id == this.delData;
                }),1)
                this.delData = '';
            },
            /* 选择放弃删除 */
            onCancel(this:any):void{
                this.delData = '';
            },
            onConfirms(this:any):void{
                for(let i = 0 ; i < this.selected.length ; i ++){
                    this.mes.splice(this.mes.indexOf(this.selected[i]),1)
                }
            },
            onCancels(this:any):void{
                this.actives = false;
            }
        },
    
        created (this:any) {
            this.searched = this.mes;
        },
        watch:{
            mes(this:any){
                this.searched = this.mes;
                this.searchOnTable()
            }
        },
        data:()=>({
            show:false, /* 分配模态框显示 */
            showDialog:false, /* 添加模态框的显示 */
            selected: [],/* 表格被选中的项 */
            selectedCompany:null, /* 模态框中选择的项 */ 
            address:'',/* 模态框1的绑定数据 */
            search:'',  /* 搜索内容的数据 */
            searched:[],/* 搜索到的mes数据 */
            way:'', /* 添加框的蓝牙地址数据 */
            adr:'',/* 添加框的地址数据 */
            active:false,/* 单个删除模态框的显示 */
            delData:'',/* 单个删除的数据id */
            actives:false,/* 多个删除的模态框显示 */
            mes:[
                {
                    id:0,
                    adress:'00:18:31:84:CA:3F',
                    OwnershipEnterprise:'未分配'
                },{
                    id:1,
                    adress:'98:18:31:84:CA:3F',
                    OwnershipEnterprise:"湖南仪峰永信节能环保有限公司"
                },{
                    id:2,
                    adress:'99:14:33:88:CA:3F',
                    OwnershipEnterprise:"湖南仪峰永信节能环保有限公司"
                },{
                    id:3,
                    adress:'90:D7:EB:B2:A0:C9',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:4,
                    adress:'00:18:30:EA:10:B4',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:5,
                    adress:'00:18:31:F1:67:15',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:6,
                    adress:'90:D7:EB:B3:F3:0F',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:7,
                    adress:'00:18:31:F1:67:15',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:8,
                    adress:'00:18:30:EA:11:B4',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:9,
                    adress:'00:18:31:E5:DD:9B',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:10,
                    adress:'00:18:31:F1:DC:46',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:11,
                    adress:'00:18:31:F1:DC:46',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:12,
                    adress:'00:18:31:F1:DC:46',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },{
                    id:13,
                    adress:'00:18:31:F1:DC:46',
                    OwnershipEnterprise:'湖南仪峰永信节能环保有限公司',
                },
                
            ],
            companys:[
                "湖南仪峰永信节能环保",
                "中国电信",
                "中国移动",
                "中国联通",
            ]
            
        })

    }
</script>
<style lang="scss" scoped>
    .contain{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .md-table + .md-table {
        margin-top: 20px;
        
    }
    .md-table-fixed-header-container table{
        width: 100% !important;
    }
    .md-dialog{
        padding:0 40px;
        width: 400px;
    }
    .md-dialog-fullscreen{
        z-index: 6;
        
    }
    .md-field {
        max-width: 300px;
    }
    .md-dialog-container{
        width: 400px;
    }
    .md-empty-state-container{
        display: inline-block;
    }
    .md-table-empty-state{
        height: 480px;
        line-height: 480px;
    }
</style>


