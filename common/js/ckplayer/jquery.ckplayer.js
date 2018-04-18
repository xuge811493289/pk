;
(function($, window) {
    var defSetting = {
        containerId: null,
        ckPlayerId: null,
        flashvars: {
            f: null, //视频地址
            b: '0',
            c: 0, //调用配置方式   0：调用ckplayer.js     1：调用ckplayer.xml
            x: '', //调用配置文件路径，只有在c=1时使用。默认为空调用的是ckplayer.xml
            i: '', //默认暂停可显示一张图片
            d: '', //暂停时播放的广告，swf/图片,多个用竖线隔开，图片要加链接地址，没有的时候留空就行
            u: '', //暂停时如果是图片的话，加个链接地址
            e: '0', //视频结束后的动作，0是调用js函数，1是循环播放，2是暂停播放并且不调用广告，3是调用视频推荐列表的插件，4是清除视频流并调用js功能和1差不多，5是暂停播放并且调用暂停广告
            v: '80', //默认音量，0-100之间,设置成-1则默认静音
            p: '1', //视频默认0是暂停，1是播放，2是不加载视频
            h: '3', //播放http视频流时采用何种拖动方法，=0不使用任意拖动，=1是使用按关键帧，=2是按时间点，=3是自动判断按什么(如果视频格式是.mp4就按关键帧，.flv就按关键时间)，=4也是自动判断(只要包含字符mp4就按mp4来，只要包含字符flv就按flv来)
            o: '', //当p=2时，可以设置视频的时间，单位，秒
            w: '', //当p=2时，可以设置视频的总字节数
            g: '', //视频直接g秒开始播放(支持'01:02:03'这样的时间格式)
            j: '', //跳过片尾功能，j>0则从播放多少时间后跳到结束，<0则总总时间-该值的绝对值时跳到结束
            k: '', //提示点时间，如 30|60鼠标经过进度栏30秒，60秒会提示n指定的相应的文字
            n: '', //提示点文字，跟k配合使用，如 提示点1|提示点2
            wh: '', //宽高比，可以自己定义视频的宽高或宽高比如：wh:'4:3',或wh:'1080:720'
            lv: '0', //是否锁定进度栏		0：不锁定，1：锁定
            loaded: 'loadedHandler', //播放器加载成功调用的js函数
        },
        params: {
            ckplayerSwfUrl: "/common/js/ckplayer/ckplayer-swf/ckplayer.swf",
            ckplayerWidth: "100%",
            ckplayerHeight: "100%",
        },
        listener: { //自定义监听(是ckplayer监听的扩展，监听器中会把触发这个监听的播放器id传入函数,用来处理多个播放器监听混乱问题)
            playerEnded: null //播放器结束播放会调用这个方法并传入当前播放器id
        }
    };

    function addListener(setting) {
        if (setting.listener.playerEnded && typeof setting.listener.playerEnded == 'function') {
            window[setting.ckPlayerId + '_endedHandler'] = function() {
                setting.listener.playerEnded(setting.ckPlayerId);
            };
            setting.flashvars.loaded = setting.ckPlayerId + '_LoadedHandler'; //修改播放器加载成功的回调方法
            window[setting.flashvars.loaded] = function() {
                CKobject.getObjectById(setting.ckPlayerId).addListener('ended', setting.ckPlayerId + '_endedHandler');
                window[setting.flashvars.loaded] = undefined;
            };
        }
    }

    $.fn.ckPlayer = function(setting) {
        var $this = $(this);
        if (!$this.attr('id')) throw new Error("document元素没有id属性");
        if (!setting) setting = {};
        var _setting = {};
        $.extend(true, _setting, defSetting, setting);
        if (!_setting.ckPlayerId) _setting.ckPlayerId = 'ckplayer_a1';
        addListener(_setting); //添加自定义监听
        CKobject.embedSWF(_setting.params.ckplayerSwfUrl, $this.attr('id'), _setting.ckPlayerId, _setting.params.ckplayerWidth, _setting.params.ckplayerHeight, _setting.flashvars, null);
    };


})(jQuery, window);