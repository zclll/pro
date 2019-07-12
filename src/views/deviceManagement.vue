 <template>
 <div class="contain">
    <!--  工具栏 -->
<md-toolbar class="md-transparent md-raised" md-mode ="flexible">
    <div class="separator">
        <md-avatar class="md-large">
            <img src="../assets/logo.png" alt="logo">
        </md-avatar>
    </div>
    <h3 class="md-display-1">仪峰</h3>
    <h4 class="md-subheading md-toolbar-offset">系统管理</h4>
    <h4 class="md-subheading md-toolbar-offset">基础数据</h4>
    <h4 class="md-subheading md-toolbar-offset">设备管理</h4>
    <h4 class="md-subheading md-toolbar-offset" style="flex:1">专家管理</h4>
    <md-button class="md-icon-button">
        <md-icon>notifications_none</md-icon>
    </md-button>
    
    <md-menu>
        <md-button md-menu-trigger>平台管理员</md-button>
        <md-menu-content>
            <md-menu-item>退出</md-menu-item>
            <md-menu-item>修改密码</md-menu-item>
        </md-menu-content>
    </md-menu>
</md-toolbar>
    <!-- 选择框 -->
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">

      <md-app-drawer md-permanent="full">
        <md-list>
            <md-ripple>
                <router-link to="/deviceManagement/equinf">
                    <md-list-item>
                        <md-icon>comment</md-icon>
                        <span class="md-list-item-text">设备信息</span>
                    </md-list-item>
                </router-link>
            </md-ripple>
            <md-ripple>
               <router-link to="/deviceManagement/equout">  
                   <md-list-item>
                        <md-icon>build</md-icon>
                        <span class="md-list-item-text">设备出库</span>
                </md-list-item>
                </router-link>
            </md-ripple>
            <md-ripple>
                <router-link to="/deviceManagement/para">
                <md-list-item>
                    <md-icon>storage</md-icon>
                         <span class="md-list-item-text">参数配置</span>
                </md-list-item>
                </router-link>
            </md-ripple>
            <md-ripple>
                <router-link to="/deviceManagement/prot">
                    <md-list-item>
                        <md-icon>insert_drive_file</md-icon>
                            <span class="md-list-item-text">协议管理</span>
                    </md-list-item>
                </router-link>
            </md-ripple>
            <md-ripple>
                <router-link to="/deviceManagement/dict">
                    <md-list-item>
                    <md-icon>book</md-icon>
                        <span class="md-list-item-text">指令字典</span>
                    </md-list-item>
                </router-link>
            </md-ripple>
            <md-ripple> 
                <router-link to="/deviceManagement/alar">
                    <md-list-item>
                        <md-icon>warning</md-icon>
                            <span class="md-list-item-text">告警配置</span>
                    </md-list-item>
                </router-link>
            </md-ripple>
            <md-ripple>
                <router-link to="/deviceManagement/safe">
                <md-list-item>
                    <md-icon>watch</md-icon>
                        <span class="md-list-item-text">安全宝管理</span>
                </md-list-item>
                </router-link>
            </md-ripple>
        </md-list>
      </md-app-drawer>
        
      <md-app-content>
          <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>















</div>
 
</template>

<style lang="scss" scoped>
    .contain{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
  .md-app {
    border: 1px solid rgba(#000, .12);
  }
  /* .md-list{
      border: 1px solid rgba(#000, .12);
  } */
  .md-list span{
      cursor: pointer;
  }
  .md-drawer {
    width: 230px;
    min-height: calc(100vh - 70px);
  }
  

</style>

<script lang="ts">
export default {
  name: 'device',
  data:()=>({
      com:'safe',
      menuVisible:true,
  })
}
</script>