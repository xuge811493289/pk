import SyImageCarousel from './src/slideShow.vue';

/* istanbul ignore next */
SyImageCarousel.install = function(Vue) {
    Vue.component(SyImageCarousel.name, SyImageCarousel);
};

export default SyImageCarousel;