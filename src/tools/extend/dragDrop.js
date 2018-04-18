/*binding 参数解析
    v-dragged="{ set: function , data: Object , className: '',  type: 'drag/drop'}"
        // drap--- 被拖拽元素 drop --- 容器 
        // className 自定义类名 元素被拖拽或者经过产生效果
 */

// <template>
//     <div>
//         <div style="height:30px" v-dragged="{ set: trasforData , data: {a: '123'} , className: '',  type: 'drag'}">
//             被拖元素
//         </div>
//         <div style="height:30px" v-dragged="{ set: trasforData , data: {a: '456'} , className: '',  type: 'drop'}">
//             容器元素
//         </div>
//     </div>
// </template>

// <script>
// export default {
//     methods: {
//         trasforData(data){
//             console.log(data);
//         },
//     }
// }
// </script>



let dragDom = null;
export default {
    bind(el, binding, vnode) {
        if (binding.value.type == 'drag') {
            el.setAttribute('draggable', true)
        }
        let makeDrops = {
            // 初始化 
            init: function() {
                let me = this;
                el.addEventListener('dragenter', me.onDragEnter, false);
                el.addEventListener('dragover', me.onDragOver, false);
                el.addEventListener('dragleave', me.onDragLeave, false);
                el.addEventListener('drop', me.onDrop, false);
            },
            onDragEnter: function(e) {
                let me = this;
                let target = e.target;
                target.classList.add(binding.value.className || 'sy-move-over')
            },
            onDragLeave: function(e) {
                let target = e.target;
                target.classList.remove(binding.value.className || 'sy-move-over')
            },
            onDragOver: function(e) {
                e.preventDefault();
            },
            onDrop: function(e) {
                e.stopPropagation();
                let data = JSON.parse(e.dataTransfer.getData('data') || {});
                data.dom = dragDom;
                let target = e.target;
                target.classList.remove(binding.value.className || 'sy-move-over')
                let argus = {
                    drag: data,
                    drop: {
                        dom: target,
                        data: binding.value.data,
                        tagName: target.tagName
                    }
                };
                binding.value.set(argus);
            }
        };
        let drag = {
            // 初始化
            init: function() {
                let me = this;
                console.log('dragstart', this);
                el.addEventListener('dragstart', me.onDragStart, false);
                el.addEventListener('dragend', me.onDragEend, false);
            },
            onDragStart: function(e) {

                let target = e.target;
                target.classList.add(binding.value.className || 'sy-move');
                console.log(target);
                binding.value.data.tagName = target.tagName;
                dragDom = target;
                e.dataTransfer.setData('data', JSON.stringify(binding.value.data));
            },
            onDragEend: function(e) {
                e.target.classList.remove(binding.value.className || 'sy-move')
            },
        };
        if (binding.value.type == 'drag') {
            console.log('drag');
            drag.init();
        }
        if (binding.value.type == 'drop') {
            console.log('drop');
            makeDrops.init();
        }
    }
};