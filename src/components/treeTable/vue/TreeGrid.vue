<template>
  <el-table :data="data" border height="100%" style="width: 100%;height:100%" :row-style="showTr" @cell-click="cellClick" :tooltip-effect="tooltipEffect">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" :width="column.width" :align="column.align"  show-overflow-tooltip>
      <template scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" :key="space.levelIndex" class="sy-tree-space"></span>
        <span class="cp" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="sy-tree-caret sy-tree-caret-right" aria-hidden="true"></i>
          <i v-if="!scope.row._expanded" class="sy-tree-space ico_close" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="sy-tree-caret sy-tree-caret-bottom" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="sy-tree-space ico_open" aria-hidden="true"></i>
        </span>
        <span v-else-if="index===0" class="sy-tree-space ico_docu"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="oprate||oprateAdd||oprateEdite||oprateDelete" width="200" align="center">
      <template scope="scope">
        <span class="sy-btn-oprate-group">
          <span title="新增" class="el-icon-plus" v-if="oprate||oprateAdd" @click.stop.prevent="handleAdd(scope.$index,scope.row)"></span>
          <span title="修改" class="fa fa-pencil-square-o" v-if="oprate||oprateEdite" @click="handleEdite(scope.$index,scope.row)"></span>
          <span title="删除" class="el-icon-delete" v-if="oprate||oprateDelete" @click="handleDelete(scope.$index,scope.row)"></span>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Utils from "../utils/index.js";
export default {
  name: "tree-table",
  props: {
    tooltipEffect: {
      //表格不换行时出现三个点的提示title颜色,默认俄日dark,可更改为light
      type: String,
      default: function() {
        return 'dark';
      }
    },
    //对数据中的key值进行修改整理
    defaultProps: {
      type: Object,
      default: function() {
        return {
          id: "id",
          children: "children"
        };
      }
    },
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 这个是是否展示操作列
    oprate: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    oprateAdd: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    oprateEdite: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    oprateDelete: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    // 格式化数据源
    data: function() {
      let me = this;
      if (me.treeStructure) {
        let data = Utils.MSDataTransfer.treeToArray(
          me.dataSource,
          null,
          null,
          me.defaultExpandAll,
          this.defaultProps
        );
        return data;
      }
      return me.dataSource;
    }
  },
  methods: {
    // 显示行
    showTr: function(row, index) {
      let show = row._parent
        ? row._parent._expanded && row._parent._show
        : true;
      row._show = show;
      return show ? "" : "display:none;";
    },
    // 展开下级
    toggle: function(trIndex) {
      let me = this;
      let record = me.data[trIndex];
      record._expanded = !record._expanded;
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      let me = this;
      if (me.treeStructure && index === 0) {
        return true;
      }
      return false;
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      let me = this;
      if (
        me.treeStructure &&
        index === 0 &&
        record[this.defaultProps.children] &&
        record[this.defaultProps.children].length > 0
      ) {
        return true;
      }
      return false;
    },
    handleAdd(index, column) {
      this.$emit("click-add", index, column);
    },
    handleEdite(index, column) {
      this.$emit("click-edite", index, column);
    },
    handleDelete(index, column) {
      this.$emit("click-delete", index, column);
    },
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    }
  }
};
</script>
<style scoped>
.sy-tree-caret {
  display: inline-block;
  cursor: pointer;
  width: 0;
  height: 0;
  vertical-align: middle;
  margin: 0px 6px 0px 4px;
  border: 6px solid transparent;
  border-left-color: #97a8be;
  border-right-width: 0;
  border-left-width: 7px;
  transform: rotate(0deg);
  background: none;
}

.sy-tree-caret.sy-tree-caret-bottom {
  transform: rotate(90deg);
}

.sy-tree-space {
  background-image: none;
  display: inline-block;
  font: normal normal normal 16px/18px FontAwesome;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.sy-tree-space::before {
  content: "";
}

table td {
  line-height: 26px;
}

.ico_open:before {
  content: "\F115";
}

.ico_close:before {
  content: "\F114";
}

.ico_docu:before {
  content: "\F016";
}
</style>
