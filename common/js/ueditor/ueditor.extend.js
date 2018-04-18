/**
 * UEditor编辑器扩展
 *
 * @author Say
 * @date 2017年10月23日
 * @return
 */
;
(function(UE) {

    /**
     * 获取本地上传文件相关配置
     */
    var apiServer = (function() {
        if (!window.ShiYue || !window.ShiYue.base) {
            return '';
        }
        return window.ShiYue.base;
    }());
    /**
     * 上传相关配置文件位置
     */
    var config = '/common/js/ueditor/ueditor.upload.config.json';

    /**
     * 重写Editor加载配置的方式
     * 改用前台处理，不去服务端拿配置数据
     *
     * @author Say
     * @date 2017年10月23日
     * @return
     */
    UE.Editor.prototype.__loadServerConfig_ = UE.Editor.prototype.loadServerConfig;
    UE.Editor.prototype.loadServerConfig = function() {
        var me = this;
        setTimeout(function() {
            me._serverConfigLoaded = false;
            UE.ajax.request(config, {
                method: 'GET',
                onsuccess: function(r) {
                    try {
                        var config = eval('(' + r.responseText + ')');
                        if (config.imageUrlPrefix && (config.imageUrlPrefix.indexOf('http://') == -1 || config.imageUrlPrefix.indexOf('https://') == -1)) {
                            config.imageUrlPrefix = (apiServer + config.imageUrlPrefix);
                        }
                        UE.utils.extend(me.options, config);
                        me.fireEvent('serverConfigLoaded');
                        me._serverConfigLoaded = true;
                    } catch (e) {
                        (typeof console == 'object') && console.error(me.getLang('loadconfigFormatError'));
                    }
                }
            });
        });
    };

    /**
     * 重写Editor上传文件的服务端URL
     *
     * @author Say
     * @date 2017年10月23日
     * @return
     */
    UE.Editor.prototype.__getActionUrl_ = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function(action) {
        if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadfile' || action == 'uploadvideo') {
            return apiServer + '/zuul/api/storage/upload?serverid=editor';
        } else if (action == 'listimage') {
            return '';
        } else if (action == 'listfile') {
            return '';
        } else {
            return this.__getActionUrl_.call(this, action);
        }
    }

    /**
     * 扩充方法，用以获取Editor中单个、批量上传的图片数据
     *
     * @author Say
     * @date 2017年10月23日
     * @return
     */
    UE.Editor.prototype.getContentImgs = function() {
        var me = this,
            imgs = [],
            _imgs = me.body.querySelectorAll('.uploadimages');
        if (!_imgs || _imgs.length < 1) {
            return imgs;
        }
        for (var i = 0; i < _imgs.length; i++) {
            var _img = _imgs[i];
            if (_img) {
                imgs.push({
                    fileSize: (_img.getAttribute('filesize') || ''),
                    fileType: (_img.getAttribute('filetype') || ''),
                    suffix: (_img.getAttribute('suffix') || ''),
                    id: (_img.getAttribute('fileid') || ''),
                    src: (_img.getAttribute('src') || ''),
                    name: (_img.getAttribute('title') || '')
                });
            }
        }
        return imgs;
    };

    /**
     * 简单上传：点击按钮，直接选择文件上传
     *
     * @author Say
     * @date 2017年10月23日
     * @return
     */
    UE.plugin.register('simpleupload', function() {
        var me = this,
            isLoaded = false,
            containerBtn,
            domUtils = UE.dom.domUtils,
            utils = UE.utils;

        function initUploadBtn() {
            var w = containerBtn.offsetWidth || 20,
                h = containerBtn.offsetHeight || 20,
                btnIframe = document.createElement('iframe'),
                btnStyle = 'display:block;width:100px;height:' + h + 'px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;right:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;';

            domUtils.on(btnIframe, 'load', function() {
                var timestrap = (+new Date()).toString(36),
                    wrapper,
                    btnIframeDoc,
                    btnIframeBody;
                btnIframeDoc = (btnIframe.contentDocument || btnIframe.contentWindow.document);
                btnIframeBody = btnIframeDoc.body;
                wrapper = btnIframeDoc.createElement('div');
                wrapper.innerHTML = '<form id="edui_form_' + timestrap + '" target="edui_iframe_' + timestrap + '" method="POST" enctype="multipart/form-data" action="' + me.getOpt('serverUrl') + '" ' +
                    'style="' + btnStyle + '">' +
                    '<input id="edui_input_' + timestrap + '" type="file" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp" name="' + me.options.imageFieldName + '" ' +
                    'style="' + btnStyle + '" title="' + (me.getLang('labelMap.simpleupload') || '') + '">' +
                    '</form>' +
                    '<iframe id="edui_iframe_' + timestrap + '" name="edui_iframe_' + timestrap + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';
                wrapper.className = 'edui-' + me.options.theme;
                wrapper.id = me.ui.id + '_iframeupload';
                btnIframeBody.style.cssText = btnStyle;
                btnIframeBody.style.width = w + 'px';
                btnIframeBody.style.height = h + 'px';
                btnIframeBody.appendChild(wrapper);
                if (btnIframeBody.parentNode) {
                    btnIframeBody.parentNode.style.width = w + 'px';
                    btnIframeBody.parentNode.style.height = w + 'px';
                }
                var form = btnIframeDoc.getElementById('edui_form_' + timestrap),
                    input = btnIframeDoc.getElementById('edui_input_' + timestrap),
                    iframe = btnIframeDoc.getElementById('edui_iframe_' + timestrap);
                domUtils.on(input, 'change', function() {
                    if (!input.value) return;
                    var loadingId = 'loading_' + (+new Date()).toString(36),
                        params = utils.serializeParam(me.queryCommandValue('serverparam')) || '',
                        imageActionUrl = me.getActionUrl(me.getOpt('imageActionName')),
                        allowFiles = me.getOpt('imageAllowFiles');
                    me.focus();
                    me.execCommand('inserthtml', '<img class="loadingclass" id="' + loadingId + '" src="' + me.options.themePath + me.options.theme + '/images/spacer.gif" title="' + (me.getLang('simpleupload.loading') || '') + '" >');

                    function callback(data) {
                        try {
                            var json, loader,
                                body = (iframe.contentDocument || iframe.contentWindow.document).body,
                                result = body.innerText || body.textContent || data || '';
                            if (typeof result == 'string' && result) {
                                result = result.replace(/<pre>|<\/pre>/gi, '');
                            }
                            json = (typeof result == 'object' ? result : (new Function("return " + result))());
                            if (json.status == 200 && json.data) {
                                var _data = json.data;
                                loader = me.document.getElementById(loadingId);
                                loader.setAttribute('src', (me.options.imageUrlPrefix + _data.id));
                                loader.setAttribute('fileid', (_data.id || ''));
                                loader.setAttribute('title', _data.name || '');
                                loader.setAttribute('alt', _data.name || '');
                                loader.setAttribute('suffix', _data.suffix || '');
                                loader.setAttribute('filetype', _data.fileType || '');
                                loader.setAttribute('filesize', _data.fileSize || '');
                                loader.setAttribute('class', 'uploadimages');
                                loader.removeAttribute('id');
                                domUtils.removeClasses(loader, 'loadingclass');
                            } else if (json.status != 200 && json.message) {
                                showErrorLoader && showErrorLoader(json.message);
                            } else {
                                showErrorLoader && showErrorLoader(me.getLang('simpleupload.loadError') + '-1');
                            }
                        } catch (er) {
                            showErrorLoader && showErrorLoader(me.getLang('simpleupload.loadError'));
                        }
                        form.reset();
                        domUtils.un(iframe, 'load', callback);
                    }

                    function showErrorLoader(title) {
                        if (loadingId) {
                            var loader = me.document.getElementById(loadingId);
                            loader && domUtils.remove(loader);
                            me.fireEvent('showmessage', {
                                'id': loadingId,
                                'content': title,
                                'type': 'error',
                                'timeout': 4000
                            });
                        }
                    }
                    /**
                     * 判断后端配置是否没有加载成功
                     */
                    if (!me.getOpt('imageActionName')) {
                        errorHandler(me.getLang('autoupload.errorLoadConfig'));
                        return;
                    }
                    /**
                     * 判断文件格式是否错误
                     */
                    var filename = input.value,
                        fileext = filename ? filename.substr(filename.lastIndexOf('.')) : '';
                    if (!fileext || (allowFiles && (allowFiles.join('') + '.').indexOf(fileext.toLowerCase() + '.') == -1)) {
                        showErrorLoader(me.getLang('simpleupload.exceedTypeError'));
                        return;
                    }
                    domUtils.on(iframe, 'load', callback);
                    form.action = utils.formatUrl(imageActionUrl + (imageActionUrl.indexOf('?') == -1 ? '?' : '&') + params);
                    window.$(form).ajaxSubmit({
                        success: callback
                    });
                    // form.submit();
                });
                var stateTimer;
                me.addListener('selectionchange', function() {
                    clearTimeout(stateTimer);
                    stateTimer = setTimeout(function() {
                        var state = me.queryCommandState('simpleupload');
                        if (state == -1) {
                            input.disabled = 'disabled';
                        } else {
                            input.disabled = false;
                        }
                    }, 400);
                });
                isLoaded = true;
            });
            btnIframe.style.cssText = btnStyle;
            containerBtn.appendChild(btnIframe);
        }

        return {
            bindEvents: {
                ready: function() {
                    /**
                     * 设置loading的样式
                     */
                    utils.cssRule('loading',
                        '.loadingclass{display:inline-block;cursor:default;background: url(\'' +
                        this.options.themePath +
                        this.options.theme + '/images/loading.gif\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n' +
                        '.loaderrorclass{display:inline-block;cursor:default;background: url(\'' +
                        this.options.themePath +
                        this.options.theme + '/images/loaderror.png\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;' +
                        '}',
                        this.document);
                },
                /**
                 * 初始化简单上传按钮
                 */
                simpleuploadbtnready: function(type, container) {
                    containerBtn = container;
                    me.afterConfigReady(initUploadBtn);
                }
            },
            outputRule: function(root) {
                utils.each(root.getNodesByTagName('img'), function(n) {
                    if (/\b(loaderrorclass)|(bloaderrorclass)\b/.test(n.getAttr('class'))) {
                        n.parentNode.removeChild(n);
                    }
                });
            },
            commands: {
                simpleupload: {
                    queryCommandState: function() {
                        return isLoaded ? 0 : -1;
                    }
                }
            }
        }
    });

    /**
     * 数学公式
     *
     * @author Say
     * @date 2017年11月24日
     * @return
     */
    ;(function(UE) {
        var name = 'equation';
        UE.I18N['zh-cn'].labelMap[name] = '插入公式';
        UE.ui.equation = function(editor) {
            var editorui = UE.ui,
                title = (editor.options.labelMap[name] || editor.getLang('labelMap.' + name) || ''),
                dialog = new UE.ui.Dialog({
                    iframeUrl: editor.options.UEDITOR_HOME_URL + 'dialogs/math/index.html',
                    editor: editor,
                    name: name,
                    title: title,
                    className: 'edui-for-' + name,
                    cssRules: 'width:600px;height:350px;',
                    closeDialog: editor.getLang('closeDialog'),
                    buttons: [{
                        className: 'edui-okbutton',
                        label: editor.getLang('ok'),
                        editor: editor,
                        onclick: function() {
                            var $iframe = $('#' + dialog.id + '_iframe').contents(),
                                $math = $iframe.find('#jme-math'),
                                $mathCode = $iframe.find('#matheqCode');
                            // 获取html显示
                            var _math = $math.html(),
                                _mathCode = $mathCode.html();
                            if (_math == '<span class="textarea"><textarea></textarea></span>') {
                                dialog.close(true);
                                return;
                            }
                            _math = '<span data-code=' + _mathCode + ' data-png-src="http://latex.codecogs.com/png.latex?' + _mathCode + '" data-gif-src="http://latex.codecogs.com/gif.latex?' + _mathCode + '" class="mathquill-rendered-math" style="font-size: 20px;" >' + _math + '</span><span>&nbsp;</span>';
                            this.editor.execCommand('insertHtml', _math);
                            dialog.close(true);
                        }
                    }, {
                        className: 'edui-cancelbutton',
                        label: editor.getLang("cancel"),
                        editor: editor,
                        onclick: function() {
                            dialog.close(true);
                        }
                    }]
                });

            editorui.buttons[name] = new editorui.Button({
                title: title,
                className: 'edui-for-' + name,
                theme: editor.options.theme,
                cssRules: 'background: url("' + editor.options.UEDITOR_HOME_URL + 'dialogs/math/images/icon.png") !important',
                onclick: function() {
                    dialog.render();
                    dialog.open();
                }
            });

            return editorui.buttons[name];
        };
    }(UE));

}(UE));