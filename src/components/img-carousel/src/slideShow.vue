<template>
    <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
        <div class="slide-img" v-if="text == 'img' && slides.length != 0 ">
            <transition :name="effect == 'leftLoop' ? 'slide-trans' : 'slide-top'">
                <div class="slide-img" v-if="isShow">
                    <img :class="[imgClassName || 'slide-img_item']"  :src="slides[nowIndex].src" @click="hanleClick(slides[nowIndex])">
                </div>
            </transition>
            <transition :name="effect == 'leftLoop' ? 'slide-trans-old' : 'slide-top-old'">
                <div class="slide-img" v-if="!isShow">
                    <img :class="[imgClassName || 'slide-img_item']" :src="slides[nowIndex].src" @click="hanleClick(slides[nowIndex])">
                </div>
            </transition>
        </div>
        <div class="slide-img" v-if="text != 'img'">
            
        </div>
        <div class="slide-show-control" v-if="mode == 'middel' && control">
            <a class="prev" @click="goto(prevIndex)" href="javascript:void(0)">
                <i class="el-icon-arrow-left"></i>
            </a>
            <a class="next"  @click="goto(nextIndex)" href="javascript:void(0)">
                <i class="el-icon-arrow-right"></i>
            </a>
        </div>
        <ul class="sy-carousel__indicators" v-if="mode == 'middel' && control">
            <li class="sy-carousel__indicator" v-for="(item, index) in slides" :key="'img_'+index" @click="goto(index)">
                <a class="sy-carousel__button" :class="{active: index === nowIndex}"></a>
            </li>
        </ul>
        <h2 v-if="mode == 'bottom' && control">{{ slides[nowIndex].title }}</h2>
        <ul v-if="mode == 'bottom' && control" class="slide-pages">
            <li @click="goto(prevIndex)">&lt;</li>
            <li v-for="(item, index) in slides" :key="'img_'+index" @click="goto(index)">
                <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
            </li>
            <li @click="goto(nextIndex)">&gt;</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "syCarousel",
    props: {
        imgClassName: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: 'img'
        },
        mode: {
            type: String,
            default: 'middel'
        },
        control: {
            type: Boolean,
            default: true
        },
        effect: {
            type: String,
            default: 'leftLoop' // leftLoop topLoop
        },
        slides: {
            type: Array,
            default: []
        },
        inv: {
            type: Number,
            default: 2500
        },
        currentIndex: {
            type: Number,
            default: 0
        },
        autoplay: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            nowIndex: this.currentIndex,
            isShow: true
        };
    },
    watch:{
        currentIndex(val){
            this.nowIndex = this.currentIndex;
        },
        'slides': {
            handler(newVal,oldVal){
                this.runInv();
            },
            deep: true
        }
    },
    computed: {
        prevIndex() {
            if (this.nowIndex === 0) {
                return this.slides.length - 1;
            } else {
                return this.nowIndex - 1;
            }
        },
        nextIndex() {
            if (this.nowIndex === this.slides.length - 1) {
                return 0;
            } else {
                return this.nowIndex + 1;
            }
        }
    },
    methods: {
        hanleClick(row){
            this.$emit('ietm-click',row)
        },
        goto(index) {
            this.isShow = false;
            setTimeout(() => {
                this.isShow = true;
                this.nowIndex = index;
            }, 42);
        },
        runInv() {
            if(this.slides.length != 0){
                if(this.autoplay){
                    this.invId = setInterval(() => {
                        this.goto(this.nextIndex);
                    }, this.inv);
                }
            }else{
                this.clearInv();
            }
        },
        clearInv() {
            clearInterval(this.invId);
        }
    },
    mounted() {
        if(this.autoplay){
            this.runInv();
        }
    }
};
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all 0.6s;
}
.slide-trans-enter {
  transform: translateX(100%);
}
.slide-trans-old-leave-active {
  transition: all 0.6s;
  transform: translateX(-100%);
}
.slide-top-enter {
  transform: translateY(37px);
}
.slide-top-old-leave-active {
  transition: all 0.6s;
  transform: translateY(-37px);
}
.slide-show {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.slide-show-control{
}
.slide-show-control a{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, .11);
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 32px;
    position: absolute;
    height: 32px;
    width:32px;
    top: 50%;
    transform: translateY(-50%);
}
.slide-show-control a:hover{
    background-color: rgba(31, 45, 61, .5);
}
.slide-show-control a.prev{
    left: 15px;
}
.slide-show-control a.next{
    right: 15px;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  color: #fff;
  background-color: #333;
  font-size: 14px;
  line-height: 32px;
  opacity: 0.5;
  bottom: 0;
  margin: 0;
  height: 32px;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
  height: 100%; 
}
.slide-img_item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 0;
  margin-bottom: 5px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.slide-pages li .on {
  color: deeppink;
  text-decoration: underline;
}

.sy-carousel__indicators {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 2;
}

.sy-carousel__indicator {
    display: inline-block;
    background-color: transparent;
    padding: 12px 4px;
    cursor: pointer;
}

.sy-carousel__button {
    display: block;
    opacity: .48;
    width: 30px;
    height: 2px;
    background-color: #fff;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: .3s;
}
.sy-carousel__button.active{
    opacity: 1;
}
</style>
