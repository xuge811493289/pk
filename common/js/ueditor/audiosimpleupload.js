/**
 * 简单音频上传：点击按钮，直接选择上传文件
 * 
 * @author Say
 * @date 2016-04-27
 */
UE.plugin.register('audiosimpleupload', function() {
    var me = this,
        isLoaded = false,
        containerBtn,
        domUtils = UE.dom.domUtils,
        utils = UE.utils;

    function initUploadBtn() {
        var w = containerBtn.offsetWidth || 20,
            h = containerBtn.offsetHeight || 20,
            btnIframe = document.createElement('iframe'),
            btnStyle = 'display:block;width:' + w + 'px;height:' + h + 'px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;';

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
                '<input id="edui_input_' + timestrap + '" type="file" accept="audio/*" name="' + me.options.imageFieldName + '" ' +
                'style="' + btnStyle + '">' +
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

            var form = btnIframeDoc.getElementById('edui_form_' + timestrap);
            var input = btnIframeDoc.getElementById('edui_input_' + timestrap);
            var iframe = btnIframeDoc.getElementById('edui_iframe_' + timestrap);

            domUtils.on(input, 'change', function() {
                if (!input.value) return;
                var loadingId = 'loading_' + (+new Date()).toString(36);
                var params = utils.serializeParam(me.queryCommandValue('serverparam')) || '';

                var imageActionUrl = me.getActionUrl(me.getOpt('imageActionName'));
                var allowFiles = me.getOpt('audioAllowFiles');

                me.focus();
                me.execCommand('inserthtml', '<span id="' + loadingId + '"><img class="loadingclass" src="' + me.options.themePath + me.options.theme + '/images/spacer.gif" title="' + (me.getLang('simpleupload.loading') || '') + '" /></span>');

                function callback(data) {
                    try {
                        var link, json, loader,
                            body = (iframe.contentDocument || iframe.contentWindow.document).body,
                            result = body.innerText || body.textContent || data || '';

                        if (result) {
                            result = result.replace('<PRE>', '').replace('</PRE>', '');
                        }
                        json = (new Function("return " + result))();

                        link = me.options.imageUrlPrefix + json.url;
                        if (json.state == 'SUCCESS' && json.url) {
                            loader = me.document.getElementById(loadingId);
                            loader.innerHTML = 
                           '<object title="' + (json.title || '') + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="163" height="37" style="position: relative;z-index: 0;">\
     							<param name="movie" value="/themes/js/niftyplayer/niftyplayer.swf?file=' + link + '&as=0" />\
     							<param name="quality" value="high" />\
     							<param name="wmode" value="transparent">\
     							<embed wmode="transparent" style="position: relative;z-index: 0;" title="' + (json.title || '') + '" src="/themes/js/niftyplayer/niftyplayer.swf?file=' + link + '&as=0" quality="high" width="163" height="37" type="application/x-shockwave-flash" swLiveConnect="true" pluginspage="http://www.macromedia.com/go/getflashplayer" />\
     						</object>';
                            loader.removeAttribute('id');
                            domUtils.removeClasses(loader, 'loadingclass');
                        } else {
                            showErrorLoader && showErrorLoader(json.state);
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

                /* 判断后端配置是否没有加载成功 */
                if (!me.getOpt('imageActionName')) {
                    errorHandler(me.getLang('autoupload.errorLoadConfig'));
                    return;
                }
                // 判断文件格式是否错误
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
            'ready': function() {
                //设置loading的样式
                utils.cssRule('loading',
                    '.loadingclass{display:inline-block;cursor:default;background: url(\'' + this.options.themePath + this.options.theme + '/images/loading.gif\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n' +
                    '.loaderrorclass{display:inline-block;cursor:default;background: url(\'' + this.options.themePath + this.options.theme + '/images/loaderror.png\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;' +
                    '}',
                    this.document);
            },
            /* 初始化简单上传按钮 */
            'audiosimpleuploadbtnready': function(type, container) {
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
            'audiosimpleupload': {
                queryCommandState: function() {
                    return isLoaded ? 0 : -1;
                }
            }
        }
    }
});

(function() {
    var editorui = baidu.editor.ui;
    editorui["audiosimpleupload"] = function(editor) {
        var name = 'audiosimpleupload',
            ui = new editorui.Button({
                className: 'edui-for-' + name,
                title: editor.options.labelMap[name] || editor.getLang("labelMap." + name) || '',
                onclick: function() {},
                theme: editor.options.theme,
                showText: false
            });
        editorui.buttons[name] = ui;
        editor.addListener('ready', function() {
            var b = ui.getDom('body'),
                iconSpan = b.children[0];
            editor.fireEvent('audiosimpleuploadbtnready', iconSpan);
        });
        editor.addListener('selectionchange', function(type, causeByUi, uiReady) {
            var state = editor.queryCommandState(name);
            if (state == -1) {
                ui.setDisabled(true);
                ui.setChecked(false);
            } else {
                if (!uiReady) {
                    ui.setDisabled(false);
                    ui.setChecked(state);
                }
            }
        });
        return ui;
    };
}());