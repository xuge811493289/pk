
const periods = [{
  value : "primary ",
  label : "小学",
  children : [{
    value : "1-1",
    label : "小学一年级"
  },
    {
      value : "1-2",
      label : "小学二年级"
    },
    {
      value : "1-3",
      label : "小学三年级"
    },
    {
      value : "1-4",
      label : "小学四年级"
    },
    {
      value : "1-5",
      label : "小学五年级"
    },
    {
      value : "1-6",
      label : "小学六年级"
    }]
},
  {
    value : "junior",
    label : "初中",
    children : [{
      value : "2-1",
      label : "初中一年级"
    },
      {
        value : "2-2",
        label : "初中二年级"
      },
      {
        value : "2-3",
        label : "初中三年级"
      }]
  },
  {
    value : "senior",
    label : "高中",
    children: [{
      value : "3-1",
      label : "高中一年级"
    },
      {
        value : "3-2",
        label : "高中二年级"
      },
      {
        value : "3-3",
        label : "高中三年级"
      }]
  }]

const data = [{
  id: 1,
  label: '上海市徐汇教育局',
  children: [{
    id: 2,
    label: '上海市徐汇中学',
    children: [{
      id: 3,
      label: '高一'
    },
      {
        id: 3,
        label: '高二'
      },
      {
        id: 3,
        label: '高三'
      }]
  },
    {
      id: 2,
      label: '上海市海洋中学',
      children: [{
        id: 3,
        label:'高一',

      }]
    }]
}]



const knowData = [{
  id: 1,
  label: '语文',
  children: [{
    id: 4,
    label: '一年级语文',
    children: [{
      id: 9,
      label: '孔子'
    }, {
      id: 10,
      label: '孟子'
    }]
  }]
}, {
  id: 2,
  label: '思想品德',
  children: [{
    id: 5,
    label: '政治'
  }, {
    id: 6,
    label: '毛概'
  }]
}, {
  id: 3,
  label: '数学',
  children: [{
    id: 7,
    label: '集合及其表示方法',
    children: [{
      id:20,
      label: '第一节'
    },{
      id:21,
      label: '第二节'
    }]
  }, {
    id: 8,
    label: '集合之间的关系',
    children: [{
      id:23,
      label: '第一节'
    },{
      id:24,
      label: '第二节'
    }]
  },{
    id: 11,
    label: '集合的运算',
    children: [{
      id:25,
      label: '第一节'
    },{
      id:26,
      label: '第二节'
    }]
  },{
    id: 13,
    label: '子集与推出关系',
    children: [{
      id:27,
      label: '第一节'
    },{
      id:28,
      label: '第二节'
    }]
  },{
    id: 15,
    label: '一元二次不等式',
    children: [{
      id:29,
      label: '第一节'
    },{
      id:31,
      label: '第二节'
    }]
  },{
    id: 17,
    label: '基本不等式及其应用',
    children: [{
      id:34,
      label: '第一节'
    },{
      id:35,
      label: '第二节'
    }]
  }]
}]
const knowDataHeight = [{
  id: 1,
  label: '语文',
  children: [{
    id: 4,
    label: '高一语文',
    children: [{
      id: 9,
      label: '孔雀东南飞'
    }, {
      id: 10,
      label: '五里一徘徊'
    }]
  }]
}, {
  id: 2,
  label: '物理',
}, {
  id: 3,
  label: '化学',

}]
const defaultProps = {
  children: 'children',
  label: 'name'
  }

const knowDefaultProps = {
  children: 'children',
  label: 'name'
}

const checkKnowList = [
  { id: 1,
    label: '语文'
  },{
    id: 2,
    label: '数学'
  },{
    id: 3,
    label: '英语'
  },{
    id: 4,
    label: '政治'
  },{
    id: 5,
    label: '物理'
  },{
    id: 6,
    label: '化学'
  },{
    id: 7,
    label: '生物'
  },{
    id: 8,
    label: '地理'
  },{
    id: 9,
    label: '美术'
  },{
    id: 10,
    label: '综合实践'
  },
]

export default {
  knowDataHeight,
  periods,
  data,
  knowData,
  defaultProps,
  knowDefaultProps,
  checkKnowList
}
