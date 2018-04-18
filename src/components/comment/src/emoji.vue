<template>
  <div class="sy-emoji" v-if="showEmoji">
    <h4 class="sy-emoji-title">表情</h4>
    <span :title="item.title"
          class="sy-emoji-item"
          v-for="(item, index) in list"
          :key="index"><img @click.stop="emojiClicked(getImg[index], item.title, index)" :src="getImg[index]" :alt="item.title" style="cursor: pointer"></span>
  </div>

</template>

<script>
  import list from './javaScripts/emoji'
  export default {
    name: 'SyEmoji',
    components: {
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        list: list.list,
        showEmoji:this.isShow
      }
    },
    computed: {
      getImg() {
        let urlArr = []
        for (let i = 0 ; i < this.list.length; i++) {
          urlArr.push('/common/emojiImg/' + (i + 1 ) + '.gif')
        }
        return urlArr
      }
    },
    methods: {
      emojiClicked(url, name, index) {
        this.$emit('emoji-change', {
          imgUrl: url,
          tplName: name,
          emojiIndex: index
        })
      }
    },
    watch: {
      isShow(val) {
        this.showEmoji = val
      }
    }
  }
</script>

<style scoped>
  .sy-emoji {
    position: absolute;
    top: 42px;
    left: 80px;
    width:56%;
    max-height: 105px;
    overflow: auto;
    border-radius: 5px;
    border: 1px solid #C1CCDA;
    background: #fff;
    /*box-shadow: 0px 0px 3px #C1CCDA;*/
    z-index: 1;
  }
  .sy-emoji-item {
    box-sizing: border-box;
    display: inline-block;
    padding:5px;
    line-height: 16px;
  }
  .sy-emoji-title {
    color: #333;
    padding:0 5px;
    margin: 10px 0px 3px;
    line-height: 12px;
    font-size: 14px;
  }
</style>

