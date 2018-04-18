const  tabsOptions = [{
  title: '行政班分班',
  name: '1',
}, {
  title: '批量分班',
  name: '2',
}]

const classData = [{
  id: 1,
  label: '上海市徐汇教育局',
  children: [{
    id: 2,
    label: '上海市徐汇中学',
    children: [{
      id: 4,
      label: '高一'

    }]
  }, {
      id: 3,
      label: '上海市南洋中学',
      children: [{
        id: 5,
        label: '高一'
      }]
    }]
}]
const stuInfo = [
  [{
    key: 0,
    label: "张三",
    pinyin: "zhangsan"
  },
    {
      key: 1,
      label: "李四",
      pinyin: "lisi"
    },
    {
      key: 2,
      label: "王五",
      pinyin: "wangwu"
    }],
  [{
    key: 0,
    label: "毛毛",
    pinyin: "maomao"
  },
    {
      key: 1,
      label: "宁宁",
      pinyin: "ningning"
    },
    {
      key: 2,
      label: "丢丢",
      pinyin: "diudiu"
    }],
  [{
    key: 0,
    label: "转转",
    pinyin: "zhuanzhuan"
  },
    {
      key: 1,
      label: "陈飞",
      pinyin: "chenfei"
    },
    {
      key: 2,
      label: "玉衡",
      pinyin: "yuheng"
    }],
  [{
    key: 0,
    label: "奥丁",
    pinyin: "aoding"
  },
    {
      key: 1,
      label: "阿瑞斯",
      pinyin: "aruisi"
    },
    {
      key: 2,
      label: "雅典娜",
      pinyin: "yadianna"
    }],

]
export default {
  tabsOptions,
  classData,
  stuInfo
}
