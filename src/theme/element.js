export default `@charset "UTF-8";.el-breadcrumb:after,
.el-breadcrumb:before,
.el-button-group:after,
.el-button-group:before,
.el-form-item:after,
.el-form-item:before,
.el-form-item__content:after,
.el-form-item__content:before {
    display: table;
    content: 
}

.el-pagination--small .arrow.disabled,
.el-table .hidden-columns,
.el-table td.is-hidden>*,
.el-table th.is-hidden>* {
    visibility: hidden
}

.el-form-item__content:after {
    clear: both
}

.el-form-item:after {
    clear: both
}

.el-breadcrumb:after {
    clear: both
}

.el-button-group:after {
    clear: both
}

.el-autocomplete-suggestion.is-loading li:after {
    display: inline-block;
    content: ;
    height: 100%;
    vertical-align: middle
}

.el-icon-loading {
    animation: rotating 1s linear infinite
}

.el-icon--right {
    margin-left: 5px
}

.el-icon--left {
    margin-right: 5px
}

@keyframes rotating {
    0% {
        transform: rotateZ(0)
    }
    100% {
        transform: rotateZ(360deg)
    }
}

.el-pagination {
    white-space: nowrap;
    padding: 2px 0px;
    color: #48576a
}

.el-pagination:after,
.el-pagination:before {
    display: table;
    content: 
}

.el-pagination:after {
    clear: both
}

.el-pagination button,
.el-pagination span {
    display: inline-block;
    font-size: 12px;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box
}

.el-pagination .el-select .el-input {
    width: 110px
}

.el-pagination .el-select .el-input input {
    padding-right: 25px;
    border-radius: 2px;
    height: 28px
}

.el-pagination button {
    border: none;
    padding: 0 6px;
    background: 0 0
}

.el-pagination button:focus {
    outline: 0
}

.el-pagination button:hover {
    color: #20a0ff
}

.el-pagination button.disabled {
    color: #e4e4e4;
    background-color: #fff;
    cursor: not-allowed
}

.el-pager li,
.el-pager li.btn-quicknext:hover,
.el-pager li.btn-quickprev:hover {
    cursor: pointer
}

.el-pagination .btn-next,
.el-pagination .btn-prev {
    background: center center no-repeat #fff;
    background-size: 16px;
    border: 1px solid #d1dbe5;
    cursor: pointer;
    margin: 0;
    color: #97a8be
}

.el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
    display: block;
    font-size: 12px
}

.el-pagination .btn-prev {
    border-radius: 2px 0 0 2px;
    border-right: 0
}

.el-pagination .btn-next {
    border-radius: 0 2px 2px 0;
    border-left: 0
}

.el-pagination--small .btn-next,
.el-pagination--small .btn-prev,
.el-pagination--small .el-pager li,
.el-pagination--small .el-pager li:last-child {
    border-color: transparent;
    font-size: 12px;
    line-height: 22px;
    height: 22px;
    min-width: 22px
}

.el-pagination--small .el-pager li {
    border-radius: 2px
}

.el-pagination__sizes {
    margin: 0 10px 0 0
}

.el-pagination__sizes .el-input .el-input__inner {
    font-size: 12px;
    border-color: #d1dbe5
}

.el-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #20a0ff
}

.el-pagination__jump {
    margin-left: 10px
}

.el-pagination__total {
    margin: 0 10px
}

.el-pagination__rightwrapper {
    float: right
}

.el-pagination__editor {
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    line-height: 18px;
    padding: 4px 2px;
    width: 30px;
    text-align: center;
    margin: 0 6px;
    box-sizing: border-box;
    transition: border .3s
}

.el-pager,
.el-pager li {
    vertical-align: top;
    display: inline-block;
    margin: 0
}

.el-pagination__editor::-webkit-inner-spin-button,
.el-pagination__editor::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0
}

.el-pagination__editor:focus {
    outline: 0;
    border-color: #20a0ff
}

.el-autocomplete-suggestion__wrap,
.el-pager li {
    border: 1px solid #d1dbe5;
    box-sizing: border-box
}

.el-pager {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    list-style: none;
    font-size: 0;
    padding: 0
}

.el-date-table,
.el-radio {
    -webkit-user-select: none;
    -ms-user-select: none
}

.el-date-table,
.el-radio,
.el-time-panel {
    -moz-user-select: none
}

.el-pager li {
    padding: 0 4px;
    border-right: 0;
    background: #fff;
    font-size: 12px;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center
}

.el-pager li:last-child {
    border-right: 1px solid #d1dbe5
}

.el-pager li.btn-quicknext,
.el-pager li.btn-quickprev {
    line-height: 28px;
    color: #97a8be
}

.el-pager li.active+li {
    border-left: 0;
    padding-left: 5px
}

.el-pager li:hover {
    color: #20a0ff
}

.el-pager li.active {
    border-color: #20a0ff;
    background-color: #20a0ff;
    color: #fff;
    cursor: default
}

.el-dialog {
    position: fixed;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    margin-bottom: 50px
}

.el-dialog--tiny {
    width: 30%
}

.el-dialog--small {
    width: 50%
}

.el-dialog--large {
    width: 90%
}

.el-dialog--full {
    width: 100%;
    top: 0;
    margin-bottom: 0;
    height: 100%;
    overflow: auto
}

.el-dialog__wrapper {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
    margin: 0
}

.el-autocomplete,
.el-dropdown {
    display: inline-block;
    position: relative
}

.el-dialog__header {
    padding: 20px 20px 0
}

.el-dialog__headerbtn {
    float: right;
    background: 0 0;
    border: none;
    outline: 0;
    padding: 0;
    cursor: pointer
}

.el-dialog__headerbtn .el-dialog__close {
    color: #bfcbd9
}

.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
    color: #20a0ff
}

.el-dialog__title {
    line-height: 1;
    font-size: 16px;
    font-weight: 700;
    color: #1f2d3d
}

.el-dialog__body {
    padding: 30px 20px;
    color: #48576a;
    font-size: 12px
}

.el-dialog__footer {
    padding: 10px 20px 15px;
    text-align: right;
    box-sizing: border-box
}

.dialog-fade-enter-active {
    animation: dialog-fade-in .3s
}

.dialog-fade-leave-active {
    animation: dialog-fade-out .3s
}

@keyframes dialog-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

@keyframes dialog-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
}

.el-autocomplete-suggestion {
    margin: 5px 0;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .04), 0 2px 4px 0 rgba(0, 0, 0, .12)
}

.el-autocomplete-suggestion li {
    list-style: none;
    line-height: 36px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
    color: #48576a;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.el-autocomplete-suggestion li:hover {
    background-color: #e4e8f1
}

.el-autocomplete-suggestion li.highlighted {
    background-color: #20a0ff;
    color: #fff
}

.el-autocomplete-suggestion li:active {
    background-color: #0082e6
}

.el-autocomplete-suggestion.is-loading li:hover,
.el-dropdown-menu {
    background-color: #fff
}

.el-autocomplete-suggestion li.divider {
    margin-top: 6px;
    border-top: 1px solid #d1dbe5
}

.el-autocomplete-suggestion li.divider:last-child {
    margin-bottom: -6px
}

.el-autocomplete-suggestion.is-loading li {
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-size: 20px;
    color: #999
}

.el-autocomplete-suggestion.is-loading .el-icon-loading {
    vertical-align: middle
}

.el-autocomplete-suggestion__wrap {
    max-height: 280px;
    overflow: auto;
    background-color: #fff;
    padding: 6px 0;
    border-radius: 2px
}

.el-autocomplete-suggestion__list {
    margin: 0;
    padding: 0
}

.el-dropdown {
    color: #48576a;
    font-size: 12px
}

.el-dropdown .el-button-group {
    display: block
}

.el-dropdown .el-button-group .el-button {
    float: none
}

.el-dropdown .el-dropdown__caret-button {
    padding-right: 5px;
    padding-left: 5px
}

.el-dropdown .el-dropdown__caret-button .el-dropdown__icon {
    padding-left: 0
}

.el-dropdown__icon {
    font-size: 12px;
    margin: 0 3px
}

.el-dropdown-menu {
    margin: 5px 0;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
    padding: 6px 0;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100px
}

.el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer
}

.el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #e4e8f1;
    color: #48576a
}

.el-dropdown-menu__item.is-disabled {
    cursor: default;
    color: #bfcbd9;
    pointer-events: none
}

.el-dropdown-menu__item--divided {
    position: relative;
    margin-top: 6px;
    border-top: 1px solid #d1dbe5
}

.el-dropdown-menu__item--divided:before {
    content: ;
    height: 6px;
    display: block;
    margin: 0 -10px;
    background-color: #fff
}

.el-menu-item,
.el-submenu__title {
    height: 56px;
    line-height: 56px;
    font-size: 12px;
    color: #48576a;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s, background-color .3s, color .3s;
    box-sizing: border-box;
    white-space: nowrap
}

.el-menu {
    border-radius: 2px;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #eef1f6
}

.el-menu:after,
.el-menu:before {
    display: table;
    content: 
}

.el-menu:after {
    clear: both
}

.el-menu li {
    list-style: none
}

.el-menu--dark {
    background-color: #324157
}

.el-menu--dark .el-menu-item,
.el-menu--dark .el-submenu__title {
    color: #bfcbd9
}

.el-menu--dark .el-menu-item:hover,
.el-menu--dark .el-submenu__title:hover {
    background-color: #48576a
}

.el-menu--dark .el-submenu .el-menu {
    background-color: #1f2d3d
}

.el-menu--dark .el-submenu .el-menu .el-menu-item:hover {
    background-color: #48576a
}

.el-menu--horizontal .el-menu-item {
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent
}

.el-menu--horizontal .el-menu-item a,
.el-menu--horizontal .el-menu-item a:hover {
    color: inherit
}

.el-menu--horizontal .el-submenu {
    float: left;
    position: relative
}

.el-menu--horizontal .el-submenu>.el-menu {
    position: absolute;
    top: 65px;
    left: 0;
    border: 1px solid #d1dbe5;
    padding: 5px 0;
    background-color: #fff;
    z-index: 100;
    min-width: 100%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04)
}

.el-menu--horizontal .el-submenu .el-submenu__title {
    height: 60px;
    line-height: 60px;
    border-bottom: 5px solid transparent
}

.el-menu--horizontal .el-submenu .el-menu-item {
    background-color: #fff;
    float: none;
    height: 36px;
    line-height: 36px;
    padding: 0 10px
}

.el-menu--horizontal .el-submenu .el-submenu__icon-arrow {
    position: static;
    vertical-align: middle;
    margin-left: 5px;
    color: #97a8be;
    margin-top: -3px
}

.el-menu--horizontal .el-menu-item:hover,
.el-menu--horizontal .el-submenu__title:hover {
    background-color: #eef1f6
}

.el-menu--horizontal>.el-menu-item:hover,
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal>.el-submenu:hover .el-submenu__title {
    border-bottom: 5px solid #20a0ff
}

.el-menu--horizontal.el-menu--dark .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu__title:hover {
    background-color: #324157
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover,
.el-menu-item:hover {
    background-color: #d1dbe5
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item,
.el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title {
    color: #48576a
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
    color: #20a0ff
}

.el-menu-item [class^=el-icon-] {
    vertical-align: baseline;
    margin-right: 10px
}

.el-menu-item:first-child {
    margin-left: 0
}

.el-menu-item:last-child {
    margin-right: 0
}

.el-submenu [class^=el-icon-] {
    vertical-align: baseline;
    margin-right: 10px
}

.el-submenu .el-menu {
    background-color: #e4e8f1
}

.el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
    background-color: #d1dbe5
}

.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px
}

.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
    -ms-transform: rotate(180deg);
    transform: rotateZ(180deg)
}

.el-submenu.is-active .el-submenu__title {
    border-bottom-color: #20a0ff
}

.el-submenu__title {
    position: relative
}

.el-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -7px;
    transition: transform .3s;
    font-size: 12px
}

.el-radio,
.el-radio__inner,
.el-radio__input {
    position: relative;
    display: inline-block
}

.el-menu-item-group>ul {
    padding: 0
}

.el-menu-item-group__title {
    padding-top: 15px;
    line-height: normal;
    font-size: 12px;
    padding-left: 20px;
    color: #97a8be
}

.el-radio-button__inner,
.el-radio-group,
.el-radio__input {
    line-height: 1;
    vertical-align: middle
}

.el-radio {
    color: #1f2d3d;
    cursor: pointer;
    white-space: nowrap
}

.el-radio+.el-radio {
    margin-left: 15px
}

.el-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: 0
}

.el-radio__input.is-focus .el-radio__inner {
    border-color: #20a0ff
}

.el-radio__input.is-checked .el-radio__inner {
    border-color: #20a0ff;
    background: #20a0ff
}

.el-radio__input.is-checked .el-radio__inner::after {
    -ms-transform: translate(-50%, -50%) scale(1);
    transform: translate(-50%, -50%) scale(1)
}

.el-radio__input.is-disabled .el-radio__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
    cursor: not-allowed
}

.el-radio__input.is-disabled .el-radio__inner::after {
    cursor: not-allowed;
    background-color: #eef1f6
}

.el-radio__input.is-disabled .el-radio__inner+.el-radio__label {
    cursor: not-allowed
}

.el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #d1dbe5;
    border-color: #d1dbe5
}

.el-radio__inner,
.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #fff
}

.el-radio__input.is-disabled+.el-radio__label {
    color: #bbb;
    cursor: not-allowed
}

.el-radio__inner {
    border: 1px solid #bfcbd9;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
    box-sizing: border-box
}

.el-radio__inner:hover {
    border-color: #20a0ff
}

.el-radio__inner::after {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    content: ;
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%) scale(0);
    transform: translate(-50%, -50%) scale(0);
    transition: transform .15s cubic-bezier(.71, -.46, .88, .6)
}

.el-switch__core,
.el-switch__label {
    width: 46px;
    height: 22px;
    cursor: pointer
}

.el-radio__original {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0
}

.el-radio-button,
.el-radio-button__inner {
    position: relative;
    display: inline-block
}

.el-radio__label {
    font-size: 12px;
    padding-left: 5px
}

.el-radio-group {
    display: inline-block;
    font-size: 0
}

.el-radio-group .el-radio {
    font-size: 12px
}

.el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid #bfcbd9;
    border-radius: 4px 0 0 4px;
    box-shadow: none!important
}

.el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 4px 4px 0
}

.el-radio-button__inner {
    white-space: nowrap;
    background: #fff;
    border: 1px solid #bfcbd9;
    border-left: 0;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 0
}

.el-radio-button__inner:hover {
    color: #fff
}

.el-radio-button__inner [class*=el-icon-] {
    line-height: .9
}

.el-radio-button__inner [class*=el-icon-]+span {
    margin-left: 5px
}

.el-radio-button__orig-radio {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
    left: -999px
}

.el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    box-shadow: -1px 0 0 0 #20a0ff
}

.el-radio-button__orig-radio:disabled+.el-radio-button__inner {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
    box-shadow: none
}

.el-radio-button--large .el-radio-button__inner {
    padding: 11px 19px;
    font-size: 16px;
    border-radius: 0
}

.el-radio-button--small .el-radio-button__inner {
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 0
}

.el-radio-button--mini .el-radio-button__inner {
    padding: 4px;
    font-size: 12px;
    border-radius: 0
}

.el-switch {
    display: inline-block;
    position: relative;
    font-size: 12px;
    line-height: 22px;
    height: 22px;
    vertical-align: middle
}

.el-switch__label,
.el-switch__label * {
    position: absolute;
    font-size: 12px;
    display: inline-block
}

.el-switch .label-fade-enter,
.el-switch .label-fade-leave-active {
    opacity: 0
}

.el-switch.is-disabled .el-switch__core {
    border-color: #e4e8f1!important;
    background: #e4e8f1!important
}

.el-switch.is-disabled .el-switch__core span {
    background-color: #fbfdff!important
}

.el-switch.is-disabled .el-switch__core~.el-switch__label * {
    color: #fbfdff!important
}

.el-switch.is-checked .el-switch__core {
    border-color: #20a0ff;
    background-color: #20a0ff
}

.el-switch.is-disabled .el-switch__core,
.el-switch.is-disabled .el-switch__label {
    cursor: not-allowed
}

.el-switch__label {
    transition: .2s;
    left: 0;
    top: 0
}

.el-switch__label * {
    line-height: 1;
    top: 4px;
    color: #fff
}

.el-switch__label--left i {
    left: 6px
}

.el-switch__label--right i {
    right: 6px
}

.el-switch__input {
    display: none
}

.el-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    border: 1px solid #bfcbd9;
    outline: 0;
    border-radius: 12px;
    box-sizing: border-box;
    background: #bfcbd9;
    transition: border-color .3s, background-color .3s
}

.el-switch__core .el-switch__button {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 100%;
    transition: transform .3s;
    width: 16px;
    height: 16px;
    background-color: #fff
}

.el-switch--wide .el-switch__label.el-switch__label--left span {
    left: 10px
}

.el-switch--wide .el-switch__label.el-switch__label--right span {
    right: 10px
}

.el-select-dropdown {
    position: absolute;
    z-index: 1001;
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    box-sizing: border-box;
    margin: 5px 0
}

.el-select-dropdown .el-scrollbar.is-empty .el-select-dropdown__list {
    padding: 0
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    color: #20a0ff;
    background-color: #fff
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
    background-color: #e4e8f1
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    position: absolute;
    right: 10px;
    font-size: 11px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

.el-select-dropdown__empty {
    padding: 10px 0;
    margin: 0;
    text-align: center;
    color: #999;
    font-size: 12px
}

.el-select-dropdown__wrap {
    max-height: 274px
}

.el-select-dropdown__list {
    list-style: none;
    padding: 6px 0;
    margin: 0;
    box-sizing: border-box
}

.el-select-dropdown__item {
    font-size: 12px;
    padding: 8px 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #48576a;
    height: 36px;
    line-height: 1.5;
    box-sizing: border-box;
    cursor: pointer
}

.el-select-dropdown__item.selected {
    color: #fff;
    background-color: #20a0ff
}

.el-select-dropdown__item.selected.hover {
    background-color: #1c8de0
}

.el-select-dropdown__item span {
    line-height: 1.5!important
}

.el-select-dropdown__item.is-disabled {
    color: #bfcbd9;
    cursor: not-allowed
}

.el-select-dropdown__item.is-disabled:hover {
    background-color: #fff
}

.el-select-group {
    margin: 0;
    padding: 0
}

.el-select-group .el-select-dropdown__item {
    padding-left: 20px
}

.el-select-group__wrap {
    list-style: none;
    margin: 0;
    padding: 0
}

.el-select-group__title {
    padding-left: 10px;
    font-size: 12px;
    color: #999;
    height: 30px;
    line-height: 30px
}

.el-select {
    display: inline-block;
    position: relative
}

.el-select:hover .el-input__inner {
    border-color: #8391a5
}

.el-select .el-input__inner {
    cursor: pointer;
    padding-right: 35px
}

.el-select .el-input__inner:focus {
    border-color: #20a0ff
}

.el-select .el-input .el-input__icon {
    color: #bfcbd9;
    font-size: 12px;
    transition: transform .3s;
    -ms-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotateZ(180deg);
    line-height: 16px;
    top: 50%;
    cursor: pointer
}

.el-select .el-input .el-input__icon.is-show-close {
    transition: 0s;
    width: 16px;
    height: 16px;
    font-size: 12px;
    right: 8px;
    text-align: center;
    -ms-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotateZ(180deg);
    border-radius: 100%;
    color: #bfcbd9
}

.el-select .el-input .el-input__icon.is-show-close:hover {
    color: #97a8be
}

.el-select .el-input .el-input__icon.is-reverse {
    -ms-transform: translateY(-50%);
    transform: translateY(-50%)
}

.el-select .el-input.is-disabled .el-input__inner {
    cursor: not-allowed
}

.el-select .el-input.is-disabled .el-input__inner:hover {
    border-color: #d1dbe5
}

.el-select>.el-input {
    display: block
}

.el-select .el-tag__close {
    margin-top: -2px
}

.el-select .el-tag {
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    margin: 3px 0 3px 6px
}

.el-select__input {
    border: none;
    outline: 0;
    padding: 0;
    margin-left: 10px;
    color: #666;
    font-size: 12px;
    vertical-align: baseline;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 28px;
    background-color: transparent
}

.el-select__input.is-mini {
    height: 14px
}

.el-select__close {
    cursor: pointer;
    position: absolute;
    top: 8px;
    z-index: 1000;
    right: 25px;
    color: #bfcbd9;
    line-height: 18px;
    font-size: 12px
}

.el-select__close:hover {
    color: #97a8be
}

.el-select__tags {
    position: absolute;
    line-height: normal;
    white-space: normal;
    z-index: 1;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%)
}

.el-table,
.el-table td,
.el-table th {
    box-sizing: border-box;
    position: relative
}

.el-select__tag {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #20a0ff
}

.el-select__tag .el-icon-close {
    font-size: 12px
}

.el-table {
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    border: 1px solid #dfe6ec;
    font-size: 12px;
    color: #1f2d3d
}

.el-table .el-tooltip.cell {
    white-space: nowrap;
    min-width: 50px
}

.el-table td,
.el-table th {
    height: 40px;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle
}

.el-table::after,
.el-table::before {
    content: ;
    position: absolute;
    background-color: #dfe6ec;
    z-index: 1
}

.el-table td.is-right,
.el-table th.is-right {
    text-align: right
}

.el-table td.is-left,
.el-table th.is-left {
    text-align: left
}

.el-table td.is-center,
.el-table th.is-center {
    text-align: center
}

.el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec
}

.el-table td.gutter,
.el-table th.gutter {
    width: 15px;
    border-right-width: 0;
    border-bottom-width: 0;
    padding: 0
}

.el-table .cell,
.el-table th>div {
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    text-overflow: ellipsis
}

.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px
}

.el-table::after {
    top: 0;
    right: 0;
    width: 1px;
    height: 100%
}

.el-table .caret-wrapper,
.el-table th>.cell {
    position: relative;
    display: inline-block;
    vertical-align: middle
}

.el-table th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #eef1f6;
    text-align: left
}

.el-table th>div {
    display: inline-block;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap
}

.el-table td>div {
    box-sizing: border-box
}

.el-table th.required>div::before {
    display: inline-block;
    content: ;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff4d51;
    margin-right: 5px;
    vertical-align: middle
}

.el-table th>.cell {
    word-wrap: normal;
    text-overflow: ellipsis;
    line-height: 30px;
    width: 100%;
    box-sizing: border-box
}

.el-table th>.cell.highlight {
    color: #20a0ff
}

.el-table .caret-wrapper {
    cursor: pointer;
    margin-left: 5px;
    margin-top: -2px;
    width: 16px;
    height: 30px;
    overflow: visible;
    overflow: initial
}

.el-table .cell,
.el-table__footer-wrapper,
.el-table__header-wrapper {
    overflow: hidden
}

.el-table .sort-caret {
    display: inline-block;
    width: 0;
    height: 0;
    border: 0;
    content: ;
    position: absolute;
    left: 3px;
    z-index: 2
}

.el-table .sort-caret.ascending,
.el-table .sort-caret.descending {
    border-right: 5px solid transparent;
    border-left: 5px solid transparent
}

.el-table .sort-caret.ascending {
    top: 9px;
    border-top: none;
    border-bottom: 5px solid #97a8be
}

.el-table .sort-caret.descending {
    bottom: 9px;
    border-top: 5px solid #97a8be;
    border-bottom: none
}

.el-table .ascending .sort-caret.ascending {
    border-bottom-color: #48576a
}

.el-table .descending .sort-caret.descending {
    border-top-color: #48576a
}

.el-table td.gutter {
    width: 0
}

.el-table .cell {
    white-space: normal;
    word-break: break-all;
    line-height: 24px
}

.el-badge__content,
.el-message__group p,
.el-steps.is-horizontal,
.el-tabs__nav,
.el-tag,
.el-time-spinner,
.el-tree-node,
.el-upload-cover__title {
    white-space: nowrap
}

.el-table tr input[type=checkbox] {
    margin: 0
}

.el-table tr {
    background-color: #fff
}

.el-table .hidden-columns {
    position: absolute;
    z-index: -1
}

.el-table__empty-block {
    position: relative;
    min-height: 60px;
    text-align: center;
    width: 100%;
    height: 100%
}

.el-table__empty-text {
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #5e7382
}

.el-table__expand-column .cell {
    padding: 0;
    text-align: center
}

.el-table__expand-icon {
    position: relative;
    cursor: pointer;
    color: #666;
    font-size: 12px;
    transition: transform .2s ease-in-out;
    height: 40px
}

.el-table__expand-icon>.el-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -5px;
    margin-top: -5px
}

.el-table__expand-icon--expanded {
    -ms-transform: rotate(90deg);
    transform: rotate(90deg)
}

.el-table__expanded-cell {
    padding: 20px 50px;
    background-color: #fbfdff;
    box-shadow: inset 0 2px 0 #f4f4f4
}

.el-table__expanded-cell:hover {
    background-color: #fbfdff!important
}

.el-table--fit {
    border-right: 0;
    border-bottom: 0
}

.el-table--border th,
.el-table__fixed-right-patch {
    border-bottom: 1px solid #dfe6ec
}

.el-table--fit td.gutter,
.el-table--fit th.gutter {
    border-right-width: 0px
}

.el-table--border td,
.el-table--border th {
    border-right: 1px solid #dfe6ec
}

.el-table__fixed,
.el-table__fixed-right {
    position: absolute;
    top: 0;
    left: 0px;
    box-shadow: none;
    overflow-x: hidden
}

.el-table__fixed-right::before,
.el-table__fixed::before {
    content: ;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #dfe6ec;
    z-index: 4
}

.el-table__fixed-right-patch {
    position: absolute;
    top: -1px;
    right: 0;
    background-color: #eef1f6
}

.el-table__fixed-right {
    top: 0;
    left: auto;
    right: 0;
    box-shadow: -1px 0 8px #d3d4d6
}

.el-table__fixed-right .el-table__fixed-body-wrapper,
.el-table__fixed-right .el-table__fixed-footer-wrapper,
.el-table__fixed-right .el-table__fixed-header-wrapper {
    left: auto;
    right: 0
}

.el-table__fixed-header-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3
}

.el-table__fixed-header-wrapper thead div {
    background-color: #eef1f6;
    color: #1f2d3d
}

.el-table__fixed-footer-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3
}

.el-table__fixed-footer-wrapper tbody td {
    border-top: 1px solid #dfe6ec;
    background-color: #fbfdff;
    color: #1f2d3d
}

.el-table__fixed-body-wrapper {
    position: absolute;
    left: 0;
    top: 37px;
    overflow: hidden;
    z-index: 3
}

.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
    width: 100%
}

.el-table__footer-wrapper {
    margin-top: -1px
}

.el-table__footer-wrapper td {
    border-top: 1px solid #dfe6ec
}

.el-table__body,
.el-table__footer,
.el-table__header {
    table-layout: fixed
}

.el-table__footer-wrapper thead div,
.el-table__header-wrapper thead div {
    background-color: #eef1f6;
    color: #1f2d3d
}

.el-table__footer-wrapper tbody td,
.el-table__header-wrapper tbody td {
    background-color: #fbfdff;
    color: #1f2d3d
}

.el-table__body-wrapper {
    overflow: auto;
    position: relative
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #FAFAFA;
    background-clip: padding-box
}

.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: #edf7ff
}

.el-table__body tr.hover-row>td {
    background-color: #eef1f6
}

.el-table__body tr.current-row>td {
    background: #edf7ff
}

.el-table__column-resize-proxy {
    position: absolute;
    left: 200px;
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #dfe6ec;
    z-index: 10
}

.el-table__column-filter-trigger {
    display: inline-block;
    line-height: 34px;
    margin-left: 5px;
    cursor: pointer
}

.el-table__column-filter-trigger i {
    color: #97a8be
}

.el-table--enable-row-transition .el-table__body td {
    transition: background-color .25s ease
}

.el-fade-in-linear-enter-active,
.el-fade-in-linear-leave-active,
.fade-in-linear-enter-active,
.fade-in-linear-leave-active {
    transition: opacity .2s linear
}

.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #eef1f6;
    background-clip: padding-box
}

.el-table--fluid-height .el-table__fixed,
.el-table--fluid-height .el-table__fixed-right {
    bottom: 0;
    overflow: hidden
}

.el-table-column--selection .cell {
    padding-left: 14px;
    padding-right: 14px
}

.el-table-filter {
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
    box-sizing: border-box;
    margin: 2px 0
}

.el-table-filter__list {
    padding: 5px 0;
    margin: 0;
    list-style: none;
    min-width: 100px
}

.el-table-filter__list-item {
    line-height: 36px;
    padding: 0 10px;
    cursor: pointer;
    font-size: 12px
}

.el-table-filter__list-item:hover {
    background-color: #e4e8f1;
    color: #48576a
}

.el-table-filter__list-item.is-active {
    background-color: #20a0ff;
    color: #fff
}

.el-table-filter__content {
    min-width: 100px
}

.el-table-filter__bottom {
    border-top: 1px solid #d1dbe5;
    padding: 8px
}

.el-table-filter__bottom button {
    background: 0 0;
    border: none;
    color: #8391a5;
    cursor: pointer;
    font-size: 12px;
    padding: 0 3px
}

.el-table-filter__bottom button:hover {
    color: #20a0ff
}

.el-table-filter__bottom button:focus {
    outline: 0
}

.el-table-filter__bottom button.is-disabled {
    color: #bfcbd9;
    cursor: not-allowed
}

.el-table-filter__checkbox-group {
    padding: 10px
}

.el-table-filter__checkbox-group label.el-checkbox {
    display: block;
    margin-bottom: 8px;
    margin-left: 5px
}

.el-table-filter__checkbox-group .el-checkbox:last-child {
    margin-bottom: 0
}

.el-date-table {
    font-size: 12px;
    min-width: 224px;
    user-select: none
}

.el-date-table td {
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer
}

.el-date-table td.next-month,
.el-date-table td.prev-month {
    color: #ddd
}

.el-date-table td.today {
    color: #20a0ff;
    position: relative
}

.el-date-table td.today:before {
    content: ;
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: .5em solid #20a0ff;
    border-left: .5em solid transparent
}

.el-month-table td .cell,
.el-year-table td .cell {
    width: 48px;
    height: 32px;
    display: block;
    line-height: 32px
}

.el-date-table td.available:hover {
    background-color: #e4e8f1
}

.el-date-table td.in-range {
    background-color: #d2ecff
}

.el-date-table td.in-range:hover {
    background-color: #afddff
}

.el-date-table td.current:not(.disabled),
.el-date-table td.end-date,
.el-date-table td.start-date {
    background-color: #20a0ff!important;
    color: #fff
}

.el-date-table td.disabled {
    background-color: #f4f4f4;
    opacity: 1;
    cursor: not-allowed;
    color: #ccc
}

.el-fade-in-enter,
.el-fade-in-leave-active,
.el-fade-in-linear-enter,
.el-fade-in-linear-leave,
.el-fade-in-linear-leave-active,
.fade-in-linear-enter,
.fade-in-linear-leave,
.fade-in-linear-leave-active {
    opacity: 0
}

.el-date-table td.week {
    font-size: 80%;
    color: #8391a5
}

.el-month-table,
.el-year-table {
    font-size: 12px;
    margin: -1px;
    border-collapse: collapse
}

.el-date-table th {
    padding: 5px;
    color: #8391a5;
    font-weight: 400
}

.el-date-table.is-week-mode .el-date-table__row:hover {
    background-color: #e4e8f1
}

.el-date-table.is-week-mode .el-date-table__row.current {
    background-color: #d2ecff
}

.el-month-table td {
    text-align: center;
    padding: 20px 3px;
    cursor: pointer
}

.el-month-table td .cell {
    color: #48576a
}

.el-month-table td .cell:hover {
    background-color: #e4e8f1
}

.el-month-table td.disabled .cell {
    background-color: #f4f4f4;
    cursor: not-allowed;
    color: #ccc
}

.el-month-table td.current:not(.disabled) .cell {
    background-color: #20a0ff!important;
    color: #fff
}

.el-year-table .el-icon {
    color: #97a8be
}

.el-year-table td {
    text-align: center;
    padding: 20px 3px;
    cursor: pointer
}

.el-year-table td .cell {
    color: #48576a
}

.el-year-table td .cell:hover {
    background-color: #e4e8f1
}

.el-year-table td.disabled .cell {
    background-color: #f4f4f4;
    cursor: not-allowed;
    color: #ccc
}

.el-year-table td.current:not(.disabled) .cell {
    background-color: #20a0ff!important;
    color: #fff
}

.el-date-range-picker {
    min-width: 520px
}

.el-date-range-picker table {
    table-layout: fixed;
    width: 100%
}

.el-date-range-picker .el-picker-panel__body {
    min-width: 513px
}

.el-date-range-picker .el-picker-panel__content {
    margin: 0
}

.el-date-range-picker.has-sidebar.has-time {
    min-width: 766px
}

.el-date-range-picker.has-sidebar {
    min-width: 620px
}

.el-date-range-picker.has-time {
    min-width: 660px
}

.el-date-range-picker__header {
    position: relative;
    text-align: center;
    height: 28px
}

.el-date-range-picker__header button {
    float: left
}

.el-date-range-picker__header div {
    font-size: 12px;
    margin-right: 50px
}

.el-date-range-picker__content {
    float: left;
    width: 50%;
    box-sizing: border-box;
    margin: 0;
    padding: 16px
}

.el-date-range-picker__content.is-right .el-date-range-picker__header button {
    float: right
}

.el-date-range-picker__content.is-right .el-date-range-picker__header div {
    margin-left: 50px;
    margin-right: 50px
}

.el-date-range-picker__content.is-left {
    border-right: 1px solid #e4e4e4
}

.el-date-range-picker__editors-wrap {
    box-sizing: border-box;
    display: table-cell
}

.el-date-range-picker__editors-wrap.is-right {
    text-align: right
}

.el-date-range-picker__time-header {
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 8px 5px 5px;
    display: table;
    width: 100%;
    box-sizing: border-box
}

.el-date-range-picker__time-header>.el-icon-arrow-right {
    font-size: 20px;
    vertical-align: middle;
    display: table-cell;
    color: #97a8be
}

.el-date-range-picker__time-picker-wrap {
    position: relative;
    display: table-cell;
    padding: 0 5px
}

.el-date-range-picker__time-picker-wrap .el-picker-panel {
    position: absolute;
    top: 13px;
    right: 0;
    z-index: 1;
    background: #fff
}

.el-time-range-picker {
    min-width: 354px;
    overflow: visible
}

.el-time-range-picker__content {
    position: relative;
    text-align: center;
    padding: 10px
}

.el-time-range-picker__cell {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 7px 7px;
    width: 50%;
    display: inline-block
}

.el-time-range-picker__header {
    margin-bottom: 5px;
    text-align: center;
    font-size: 12px
}

.el-time-range-picker__body {
    border-radius: 2px;
    border: 1px solid #d1dbe5
}

.el-picker-panel {
    color: #48576a;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 6px #ccc;
    background: #fff;
    border-radius: 2px;
    line-height: 20px;
    margin: 5px 0
}

.el-picker-panel__body-wrapper::after,
.el-picker-panel__body::after {
    content: ;
    display: table;
    clear: both
}

.el-picker-panel__content {
    position: relative;
    margin: 15px
}

.el-picker-panel__footer {
    border-top: 1px solid #e4e4e4;
    padding: 4px;
    text-align: right;
    background-color: #fff;
    position: relative
}

.el-picker-panel__shortcut {
    display: block;
    width: 100%;
    border: 0;
    background-color: transparent;
    line-height: 28px;
    font-size: 12px;
    color: #48576a;
    padding-left: 12px;
    text-align: left;
    outline: 0;
    cursor: pointer
}

.el-picker-panel__shortcut:hover {
    background-color: #e4e8f1
}

.el-picker-panel__shortcut.active {
    background-color: #e6f1fe;
    color: #20a0ff
}

.el-picker-panel__btn {
    border: 1px solid #dcdcdc;
    color: #333;
    line-height: 24px;
    border-radius: 2px;
    padding: 0 20px;
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    font-size: 12px
}

.el-picker-panel__btn[disabled] {
    color: #ccc;
    cursor: not-allowed
}

.el-picker-panel__icon-btn {
    font-size: 12px;
    color: #97a8be;
    border: 0;
    background: 0 0;
    cursor: pointer;
    outline: 0;
    margin-top: 3px
}

.el-date-picker__header-label.active,
.el-date-picker__header-label:hover,
.el-picker-panel__icon-btn:hover {
    color: #20a0ff
}

.el-picker-panel__link-btn {
    cursor: pointer;
    color: #20a0ff;
    text-decoration: none;
    padding: 15px;
    font-size: 12px
}

.el-picker-panel [slot=sidebar],
.el-picker-panel__sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 110px;
    border-right: 1px solid #e4e4e4;
    box-sizing: border-box;
    padding-top: 6px;
    background-color: #fbfdff;
    overflow: auto
}

.el-picker-panel [slot=sidebar]+.el-picker-panel__body,
.el-picker-panel__sidebar+.el-picker-panel__body {
    margin-left: 110px
}

.el-date-picker {
    min-width: 254px
}

.el-date-picker .el-picker-panel__content {
    min-width: 224px
}

.el-date-picker table {
    table-layout: fixed;
    width: 100%
}

.el-date-picker.has-sidebar.has-time {
    min-width: 434px
}

.el-date-picker.has-sidebar {
    min-width: 370px
}

.el-date-picker.has-time {
    min-width: 324px
}

.el-date-picker__editor-wrap {
    position: relative;
    display: table-cell;
    padding: 0 5px
}

.el-date-picker__time-header {
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 8px 5px 5px;
    display: table;
    width: 100%;
    box-sizing: border-box
}

.el-date-picker__header {
    margin: 12px;
    text-align: center
}

.el-date-picker__header-label {
    font-size: 12px;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    cursor: pointer
}

.el-date-picker__prev-btn {
    float: left
}

.el-date-picker__next-btn {
    float: right
}

.el-date-picker__time-wrap {
    padding: 10px;
    text-align: center
}

.el-date-picker__time-label {
    float: left;
    cursor: pointer;
    line-height: 30px;
    margin-left: 10px
}

.time-select {
    margin: 5px 0;
    min-width: 0
}

.time-select .el-picker-panel__content {
    max-height: 200px;
    margin: 0
}

.time-select-item {
    padding: 8px 10px;
    font-size: 12px
}

.time-select-item.selected:not(.disabled) {
    background-color: #20a0ff;
    color: #fff
}

.time-select-item.selected:not(.disabled):hover {
    background-color: #20a0ff
}

.time-select-item.disabled {
    color: #d1dbe5;
    cursor: not-allowed
}

.time-select-item:hover {
    background-color: #e4e8f1;
    cursor: pointer
}

.el-fade-in-enter-active,
.el-fade-in-leave-active,
.el-zoom-in-center-enter-active,
.el-zoom-in-center-leave-active {
    transition: all .3s cubic-bezier(.55, 0, .1, 1)
}

.el-zoom-in-center-enter,
.el-zoom-in-center-leave-active {
    opacity: 0;
    -ms-transform: scaleX(0);
    transform: scaleX(0)
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    opacity: 1;
    -ms-transform: scaleY(1);
    transform: scaleY(1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s;
    -ms-transform-origin: center top;
    transform-origin: center top
}

.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active {
    opacity: 0;
    -ms-transform: scaleY(0);
    transform: scaleY(0)
}

.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active {
    opacity: 1;
    -ms-transform: scaleY(1);
    transform: scaleY(1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s;
    -ms-transform-origin: center bottom;
    transform-origin: center bottom
}

.el-zoom-in-bottom-enter,
.el-zoom-in-bottom-leave-active {
    opacity: 0;
    -ms-transform: scaleY(0);
    transform: scaleY(0)
}

.collapse-transition {
    transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out
}

.el-list-enter-active,
.el-list-leave-active {
    transition: all 1s
}

.el-list-enter,
.el-list-leave-active {
    opacity: 0;
    -ms-transform: translateY(-30px);
    transform: translateY(-30px)
}

.el-date-editor {
    position: relative;
    display: inline-block
}

.el-date-editor .el-picker-panel {
    position: absolute;
    min-width: 180px;
    box-sizing: border-box;
    box-shadow: 0 2px 6px #ccc;
    background: #fff;
    z-index: 10;
    top: 41px
}

.el-date-editor.el-input {
    width: 193px
}

.el-date-editor--daterange.el-input {
    width: 220px
}

.el-date-editor--datetimerange.el-input {
    width: 350px
}

.el-time-spinner.has-seconds .el-time-spinner__wrapper {
    width: 33%
}

.el-time-spinner.has-seconds .el-time-spinner__wrapper:nth-child(2) {
    margin-left: 1%
}

.el-time-spinner__wrapper {
    max-height: 190px;
    overflow: auto;
    display: inline-block;
    width: 50%;
    vertical-align: top;
    position: relative
}

.el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
    padding-bottom: 15px
}

.el-time-spinner__list {
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center
}

.el-time-spinner__list::after,
.el-time-spinner__list::before {
    content: ;
    display: block;
    width: 100%;
    height: 80px
}

.el-time-spinner__item {
    height: 32px;
    line-height: 32px;
    font-size: 12px
}

.el-time-spinner__item:hover:not(.disabled):not(.active) {
    background: #e4e8f1;
    cursor: pointer
}

.el-time-spinner__item.active:not(.disabled) {
    color: #fff
}

.el-time-spinner__item.disabled {
    color: #d1dbe5;
    cursor: not-allowed
}

.el-time-panel {
    margin: 5px 0;
    border: 1px solid #d1dbe5;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 2px;
    position: absolute;
    width: 180px;
    left: 0;
    z-index: 1000;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.el-popover,
.el-tabs--border-card {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04)
}

.el-slider__button,
.el-slider__button-wrapper {
    -webkit-user-select: none;
    -moz-user-select: none
}

.el-time-panel__content {
    font-size: 0;
    position: relative;
    overflow: hidden
}

.el-time-panel__content::after,
.el-time-panel__content::before {
    content: ;
    top: 50%;
    color: #fff;
    position: absolute;
    font-size: 12px;
    margin-top: -15px;
    line-height: 16px;
    background-color: #20a0ff;
    height: 32px;
    z-index: -1;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding-top: 6px;
    text-align: left
}

.el-time-panel__content::after {
    left: 50%;
    margin-left: -2px
}

.el-time-panel__content::before {
    padding-left: 50%;
    margin-right: -2px
}

.el-time-panel__content.has-seconds::after {
    left: 66.66667%
}

.el-time-panel__content.has-seconds::before {
    padding-left: 33.33333%
}

.el-time-panel__footer {
    border-top: 1px solid #e4e4e4;
    padding: 4px;
    height: 36px;
    line-height: 25px;
    text-align: right;
    box-sizing: border-box
}

.el-time-panel__btn {
    border: none;
    line-height: 28px;
    padding: 0 5px;
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    font-size: 12px;
    color: #8391a5
}

.el-time-panel__btn.confirm {
    font-weight: 800;
    color: #20a0ff
}

.el-popover {
    position: absolute;
    background: #fff;
    min-width: 150px;
    border-radius: 2px;
    border: 1px solid #d1dbe5;
    padding: 10px;
    z-index: 2000;
    font-size: 12px
}

.el-popover .popper__arrow,
.el-popover .popper__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid
}

.el-popover .popper__arrow {
    border-width: 6px
}

.el-popover .popper__arrow::after {
    content: ;
    border-width: 6px
}

.el-popover[x-placement^=top] {
    margin-bottom: 12px
}

.el-popover[x-placement^=top] .popper__arrow {
    bottom: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-color: #d1dbe5;
    border-bottom-width: 0
}

.el-popover[x-placement^=top] .popper__arrow::after {
    bottom: 1px;
    margin-left: -6px;
    border-top-color: #fff;
    border-bottom-width: 0
}

.el-popover[x-placement^=bottom] {
    margin-top: 12px
}

.el-popover[x-placement^=bottom] .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #d1dbe5
}

.el-popover[x-placement^=bottom] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #fff
}

.el-popover[x-placement^=right] {
    margin-left: 12px
}

.el-popover[x-placement^=right] .popper__arrow {
    top: 50%;
    left: -6px;
    margin-bottom: 3px;
    border-right-color: #d1dbe5;
    border-left-width: 0
}

.el-popover[x-placement^=right] .popper__arrow::after {
    bottom: -6px;
    left: 1px;
    border-right-color: #fff;
    border-left-width: 0
}

.el-popover[x-placement^=left] {
    margin-right: 12px
}

.el-popover[x-placement^=left] .popper__arrow {
    top: 50%;
    right: -6px;
    margin-bottom: 3px;
    border-right-width: 0;
    border-left-color: #d1dbe5
}

.el-popover[x-placement^=left] .popper__arrow::after {
    right: 1px;
    bottom: -6px;
    margin-left: -6px;
    border-right-width: 0;
    border-left-color: #fff
}

.el-popover__title {
    color: #1f2d3d;
    font-size: 12px;
    line-height: 1;
    margin-bottom: 9px
}

.v-modal-enter {
    animation: v-modal-in .2s ease
}

.v-modal-leave {
    animation: v-modal-out .2s ease forwards
}

@keyframes v-modal-in {
    0% {
        opacity: 0
    }
}

@keyframes v-modal-out {
    100% {
        opacity: 0
    }
}

.v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000
}

.el-message-box {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    width: 420px;
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
}

.el-message-box__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center
}

.el-message-box__wrapper::after {
    content: ;
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle
}

.el-message-box__header {
    position: relative;
    padding: 20px 20px 0
}

.el-message-box__headerbtn {
    position: absolute;
    top: 19px;
    right: 20px;
    background: 0 0;
    border: none;
    outline: 0;
    padding: 0;
    cursor: pointer
}

.el-message-box__headerbtn .el-message-box__close {
    color: #999
}

.el-message-box__headerbtn:focus .el-message-box__close,
.el-message-box__headerbtn:hover .el-message-box__close {
    color: #20a0ff
}

.el-message-box__content {
    padding: 30px 20px;
    color: #48576a;
    font-size: 12px;
    position: relative
}

.el-message-box__input {
    padding-top: 15px
}

.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
    border-color: #ff4949
}

.el-message-box__errormsg {
    color: #ff4949;
    font-size: 12px;
    min-height: 18px;
    margin-top: 2px
}

.el-message-box__title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    height: 18px;
    color: #333
}

.el-message-box__message {
    margin: 0
}

.el-message-box__message p {
    margin: 0;
    line-height: 1.4
}

.el-message-box__btns {
    padding: 10px 20px 15px;
    text-align: right
}

.el-message-box__btns button:nth-child(2) {
    margin-left: 10px
}

.el-message-box__btns-reverse {
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse
}

.el-message-box__status {
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 36px!important
}

.el-message-box__status.el-icon-circle-check {
    color: #13ce66
}

.el-message-box__status.el-icon-information {
    color: #50bfff
}

.el-message-box__status.el-icon-warning {
    color: #f7ba2a
}

.el-message-box__status.el-icon-circle-cross {
    color: #ff4949
}

.msgbox-fade-enter-active {
    animation: msgbox-fade-in .3s
}

.msgbox-fade-leave-active {
    animation: msgbox-fade-out .3s
}

@keyframes msgbox-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

@keyframes msgbox-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
}

.el-breadcrumb {
    font-size: 12px;
    line-height: 1
}

.el-breadcrumb__separator {
    margin: 0 8px;
    color: #bfcbd9
}

.el-breadcrumb__item {
    float: left
}

.el-breadcrumb__item:last-child .el-breadcrumb__item__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover {
    color: #97a8be;
    cursor: text
}

.el-breadcrumb__item:last-child .el-breadcrumb__separator {
    display: none
}

.el-breadcrumb__item__inner,
.el-breadcrumb__item__inner a {
    transition: color .15s linear;
    color: #48576a
}

.el-breadcrumb__item__inner a:hover,
.el-breadcrumb__item__inner:hover {
    color: #20a0ff;
    cursor: pointer
}

.el-form--label-left .el-form-item__label {
    text-align: left
}

.el-form--label-top .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0 0 10px
}

.el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top
}

.el-form--inline .el-form-item__label {
    float: none;
    display: inline-block
}

.el-form--inline .el-form-item__content {
    display: inline-block;
    vertical-align: top
}

.el-form--inline.el-form--label-top .el-form-item__content {
    display: block
}

.el-form-item {
    margin-bottom: 15px
}

.el-form-item .el-form-item {
    margin-bottom: 0
}

.el-form-item .el-form-item .el-form-item__content {
    margin-left: 0!important
}

.el-form-item.is-error .el-input-group__append .el-input__inner,
.el-form-item.is-error .el-input-group__prepend .el-input__inner,
.el-form-item.is-error .el-input__inner {
    border-color: transparent
}

.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-textarea__inner {
    border-color: #ff4949
}

.el-form-item.is-required .el-form-item__label:before {
    content: ;
    color: #ff4949;
    margin-right: 4px
}

.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #48576a;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box
}

.el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 12px
}

.el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0
}

.el-tabs__header {
    border-bottom: 1px solid #d1dbe5;
    padding: 0;
    position: relative;
    margin: 0 0 15px
}

.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: #20a0ff;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645, .045, .355, 1);
    list-style: none
}

.el-tabs__new-tab {
    float: right;
    border: 1px solid #d3dce6;
    height: 18px;
    width: 18px;
    line-height: 18px;
    margin: 12px 0 9px 10px;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    color: #d3dce6;
    cursor: pointer;
    transition: all .15s
}

.el-tabs__new-tab .el-icon-plus {
    -ms-transform: scale(.8, .8);
    transform: scale(.8, .8)
}

.el-tabs__new-tab:hover {
    color: #20a0ff
}

.el-tabs__nav-wrap {
    overflow: hidden;
    margin-bottom: -1px;
    position: relative
}

.el-tabs__nav-wrap.is-scrollable {
    padding: 0 15px
}

.el-tabs__nav-scroll {
    overflow: hidden
}

.el-tabs__nav-next,
.el-tabs__nav-prev {
    position: absolute;
    cursor: pointer;
    line-height: 44px;
    font-size: 12px;
    color: #8391a5
}

.el-tabs__nav-next {
    right: 0
}

.el-tabs__nav-prev {
    left: 0
}

.el-tabs__nav {
    position: relative;
    transition: transform .3s;
    float: left
}

.el-tabs__item {
    padding: 0 16px;
    height: 42px;
    box-sizing: border-box;
    line-height: 42px;
    display: inline-block;
    list-style: none;
    font-size: 12px;
    color: #8391a5;
    position: relative
}

.el-tabs__item .el-icon-close {
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    margin-left: 5px
}

.el-tabs__item .el-icon-close:before {
    -ms-transform: scale(.7, .7);
    transform: scale(.7, .7);
    display: inline-block
}

.el-tabs__item .el-icon-close:hover {
    background-color: #97a8be;
    color: #fff
}

.el-tabs__item:hover {
    color: #1f2d3d;
    cursor: pointer
}

.el-tabs__item.is-disabled {
    color: #bbb;
    cursor: default
}

.el-tabs__item.is-active {
    color: #20a0ff
}

.el-tabs__content {
    overflow: hidden;
    position: relative
}

.el-tabs--card>.el-tabs__header .el-tabs__active-bar {
    display: none
}

.el-tag,
.slideInLeft-transition,
.slideInRight-transition {
    display: inline-block
}

.el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close {
    position: relative;
    font-size: 12px;
    width: 0;
    height: 14px;
    vertical-align: middle;
    line-height: 15px;
    overflow: hidden;
    top: -1px;
    right: -2px;
    -ms-transform-origin: 100% 50%;
    transform-origin: 100% 50%
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable .el-icon-close,
.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover .el-icon-close {
    width: 14px
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
    border: 1px solid transparent;
    transition: all .3s cubic-bezier(.645, .045, .355, 1)
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover {
    padding-right: 9px;
    padding-left: 9px
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border: 1px solid #d1dbe5;
    border-bottom-color: #fff;
    border-radius: 4px 4px 0 0
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
    padding-right: 16px;
    padding-left: 16px
}

.el-tabs--border-card {
    background: #fff;
    border: 1px solid #d1dbe5
}

.el-tabs--border-card>.el-tabs__content {
    padding: 15px
}

.el-tabs--border-card>.el-tabs__header {
    background-color: #eef1f6;
    margin: 0
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item {
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    border: 1px solid transparent;
    border-top: 0;
    margin-right: -1px;
    margin-left: -1px
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    background-color: #fff;
    border-right-color: #d1dbe5;
    border-left-color: #d1dbe5
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:first-child {
    border-left-color: #d1dbe5
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:last-child {
    border-right-color: #d1dbe5
}

.slideInRight-enter {
    animation: slideInRight-enter .3s
}

.slideInRight-leave {
    position: absolute;
    left: 0;
    right: 0;
    animation: slideInRight-leave .3s
}

.slideInLeft-enter {
    animation: slideInLeft-enter .3s
}

.slideInLeft-leave {
    position: absolute;
    left: 0;
    right: 0;
    animation: slideInLeft-leave .3s
}

@keyframes slideInRight-enter {
    0% {
        opacity: 0;
        transform-origin: 0 0;
        transform: translateX(100%)
    }
    to {
        opacity: 1;
        transform-origin: 0 0;
        transform: translateX(0)
    }
}

@keyframes slideInRight-leave {
    0% {
        transform-origin: 0 0;
        transform: translateX(0);
        opacity: 1
    }
    100% {
        transform-origin: 0 0;
        transform: translateX(100%);
        opacity: 0
    }
}

@keyframes slideInLeft-enter {
    0% {
        opacity: 0;
        transform-origin: 0 0;
        transform: translateX(-100%)
    }
    to {
        opacity: 1;
        transform-origin: 0 0;
        transform: translateX(0)
    }
}

@keyframes slideInLeft-leave {
    0% {
        transform-origin: 0 0;
        transform: translateX(0);
        opacity: 1
    }
    100% {
        transform-origin: 0 0;
        transform: translateX(-100%);
        opacity: 0
    }
}

.el-tag {
    background-color: #8391a5;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent
}

.el-tag .el-icon-close {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    -ms-transform: scale(.75, .75);
    transform: scale(.75, .75);
    height: 18px;
    width: 18px;
    line-height: 18px;
    vertical-align: middle;
    top: -1px;
    right: -2px
}

.el-tag .el-icon-close:hover {
    background-color: #fff;
    color: #8391a5
}

.el-tag--gray {
    background-color: #e4e8f1;
    border-color: #e4e8f1;
    color: #48576a
}

.el-tag--gray .el-tag__close:hover {
    background-color: #48576a;
    color: #fff
}

.el-tag--gray.is-hit {
    border-color: #48576a
}

.el-tag--primary {
    background-color: rgba(32, 160, 255, .1);
    border-color: rgba(32, 160, 255, .2);
    color: #20a0ff
}

.el-tag--primary .el-tag__close:hover {
    background-color: #20a0ff;
    color: #fff
}

.el-tag--primary.is-hit {
    border-color: #20a0ff
}

.el-tag--success {
    background-color: rgba(18, 206, 102, .1);
    border-color: rgba(18, 206, 102, .2);
    color: #13ce66
}

.el-tag--success .el-tag__close:hover {
    background-color: #13ce66;
    color: #fff
}

.el-tag--success.is-hit {
    border-color: #13ce66
}

.el-tag--warning {
    background-color: rgba(247, 186, 41, .1);
    border-color: rgba(247, 186, 41, .2);
    color: #f7ba2a
}

.el-tag--warning .el-tag__close:hover {
    background-color: #f7ba2a;
    color: #fff
}

.el-tag--warning.is-hit {
    border-color: #f7ba2a
}

.el-tag--danger {
    background-color: rgba(255, 73, 73, .1);
    border-color: rgba(255, 73, 73, .2);
    color: #ff4949
}

.el-tag--danger .el-tag__close:hover {
    background-color: #ff4949;
    color: #fff
}

.el-tag--danger.is-hit {
    border-color: #ff4949
}

.el-tree {
    cursor: default;
    background: #fff;
    border: 1px solid #d1dbe5
}

.el-tree__empty-block {
    position: relative;
    min-height: 60px;
    text-align: center;
    width: 100%;
    height: 100%
}

.el-tree__empty-text {
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #5e7382
}

.el-tree-node>.el-tree-node__children {
    overflow: hidden;
    background-color: transparent
}

.el-tree-node.is-expanded>.el-tree-node__children {
    display: block
}

.el-tree-node__expand-icon,
.el-tree-node__label,
.el-tree-node__loading-icon {
    display: inline-block;
    vertical-align: middle
}

.el-tree-node__content {
    line-height: 36px;
    height: 36px;
    cursor: pointer
}

.el-tree-node__content>.el-checkbox,
.el-tree-node__content>.el-tree-node__expand-icon {
    margin-right: 8px
}

.el-tree-node__content>.el-checkbox {
    vertical-align: middle
}

.el-tree-node__content:hover {
    background: #e4e8f1
}

.el-tree-node__expand-icon {
    cursor: pointer;
    width: 0;
    height: 0;
    margin-left: 10px;
    border: 6px solid transparent;
    border-right-width: 0;
    border-left-color: #97a8be;
    border-left-width: 7px;
    -ms-transform: rotate(0);
    transform: rotate(0);
    transition: transform .3s ease-in-out
}

.el-tree-node__expand-icon:hover {
    border-left-color: #999
}

.el-tree-node__expand-icon.expanded {
    -ms-transform: rotate(90deg);
    transform: rotate(90deg)
}

.el-tree-node__expand-icon.is-leaf {
    border-color: transparent;
    cursor: default
}

.el-tree-node__label {
    font-size: 12px
}

.el-tree-node__loading-icon {
    margin-right: 4px;
    font-size: 12px;
    color: #97a8be
}

.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #edf7ff
}

.el-alert {
    width: 100%;
    padding: 8px 16px;
    margin: 0;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    color: #fff;
    opacity: 1;
    display: table;
    transition: opacity .2s
}

.el-alert .el-alert__description {
    color: #fff;
    font-size: 12px;
    margin: 5px 0 0
}

.el-alert--success {
    background-color: #13ce66
}

.el-alert--info {
    background-color: #50bfff
}

.el-alert--warning {
    background-color: #f7ba2a
}

.el-alert--error {
    background-color: #ff4949
}

.el-alert__content {
    display: table-cell;
    padding: 0 8px
}

.el-alert__icon {
    font-size: 16px;
    width: 16px;
    display: table-cell;
    color: #fff;
    vertical-align: middle
}

.el-alert__icon.is-big {
    font-size: 28px;
    width: 28px
}

.el-alert__title {
    font-size: 12px;
    line-height: 18px
}

.el-alert__title.is-bold {
    font-weight: 700
}

.el-alert__closebtn {
    font-size: 12px;
    color: #fff;
    opacity: 1;
    top: 12px;
    right: 15px;
    position: absolute;
    cursor: pointer
}

.el-alert-fade-enter,
.el-alert-fade-leave-active,
.el-loading-fade-enter,
.el-loading-fade-leave-active,
.el-notification-fade-leave-active {
    opacity: 0
}

.el-alert__closebtn.is-customed {
    font-style: normal;
    font-size: 12px;
    top: 9px
}

.el-notification {
    width: 330px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 2px;
    position: fixed;
    right: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    transition: opacity .3s, transform .3s, right .3s, top .4s;
    overflow: hidden
}

.el-notification .el-icon-circle-check {
    color: #13ce66
}

.el-notification .el-icon-circle-cross {
    color: #ff4949
}

.el-notification .el-icon-information {
    color: #50bfff
}

.el-notification .el-icon-warning {
    color: #f7ba2a
}

.el-notification__group {
    margin-left: 0
}

.el-notification__group.is-with-icon {
    margin-left: 55px
}

.el-notification__title {
    font-weight: 400;
    font-size: 16px;
    color: #1f2d3d;
    margin: 0
}

.el-notification__content {
    font-size: 12px;
    line-height: 21px;
    margin: 10px 0 0;
    color: #8391a5;
    text-align: justify
}

.el-notification__icon {
    width: 40px;
    height: 40px;
    font-size: 40px;
    float: left;
    position: relative;
    top: 3px
}

.el-notification__closeBtn {
    top: 20px;
    right: 20px;
    position: absolute;
    cursor: pointer;
    color: #bfcbd9;
    font-size: 12px
}

.el-notification__closeBtn:hover {
    color: #97a8be
}

.el-notification-fade-enter {
    -ms-transform: translateX(100%);
    transform: translateX(100%);
    right: 0
}

.el-input-number {
    display: inline-block;
    width: 180px;
    position: relative
}

.el-input-number .el-input {
    display: block
}

.el-input-number .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 82px
}

.el-input-number.is-without-controls .el-input__inner {
    padding-right: 10px
}

.el-input-number.is-disabled .el-input-number__decrease,
.el-input-number.is-disabled .el-input-number__increase {
    border-color: #d1dbe5;
    color: #d1dbe5
}

.el-input-number.is-disabled .el-input-number__decrease:hover,
.el-input-number.is-disabled .el-input-number__increase:hover {
    color: #d1dbe5;
    cursor: not-allowed
}

.el-input-number__decrease,
.el-input-number__increase {
    height: auto;
    border-left: 1px solid #bfcbd9;
    width: 36px;
    line-height: 34px;
    top: 1px;
    text-align: center;
    color: #97a8be;
    cursor: pointer;
    position: absolute;
    z-index: 1
}

.el-input-number__decrease:hover,
.el-input-number__increase:hover {
    color: #20a0ff
}

.el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled),
.el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
    border-color: #20a0ff
}

.el-input-number__decrease.is-disabled,
.el-input-number__increase.is-disabled {
    color: #d1dbe5;
    cursor: not-allowed
}

.el-input-number__increase {
    right: 0
}

.el-input-number__decrease {
    right: 37px
}

.el-input-number--large {
    width: 200px
}

.el-input-number--large .el-input-number__decrease,
.el-input-number--large .el-input-number__increase {
    line-height: 42px;
    width: 42px;
    font-size: 16px
}

.el-input-number--large .el-input-number__decrease {
    right: 43px
}

.el-input-number--large .el-input__inner {
    padding-right: 94px
}

.el-input-number--small {
    width: 130px
}

.el-input-number--small .el-input-number__decrease,
.el-input-number--small .el-input-number__increase {
    line-height: 30px;
    width: 30px;
    font-size: 12px
}

.el-input-number--small .el-input-number__decrease {
    right: 31px
}

.el-input-number--small .el-input__inner {
    padding-right: 70px
}

.el-tooltip__popper {
    position: absolute;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.2
}

.el-tooltip__popper .popper__arrow,
.el-tooltip__popper .popper__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid
}

.el-tooltip__popper .popper__arrow {
    border-width: 6px
}

.el-tooltip__popper .popper__arrow::after {
    content: ;
    border-width: 5px
}

.el-progress-bar__inner:after,
.el-row:after,
.el-row:before,
.el-slider:after,
.el-slider:before,
.el-slider__button-wrapper:after,
.el-upload-cover:after {
    content: 
}

.el-tooltip__popper[x-placement^=top] {
    margin-bottom: 12px
}

.el-tooltip__popper[x-placement^=top] .popper__arrow {
    bottom: -6px;
    border-top-color: #1f2d3d;
    border-bottom-width: 0
}

.el-tooltip__popper[x-placement^=top] .popper__arrow::after {
    bottom: 1px;
    margin-left: -5px;
    border-top-color: #1f2d3d;
    border-bottom-width: 0
}

.el-tooltip__popper[x-placement^=bottom] {
    margin-top: 12px
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow {
    top: -6px;
    border-top-width: 0;
    border-bottom-color: #1f2d3d
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow::after {
    top: 1px;
    margin-left: -5px;
    border-top-width: 0;
    border-bottom-color: #1f2d3d
}

.el-tooltip__popper[x-placement^=right] {
    margin-left: 12px
}

.el-tooltip__popper[x-placement^=right] .popper__arrow {
    left: -6px;
    border-right-color: #1f2d3d;
    border-left-width: 0
}

.el-tooltip__popper[x-placement^=right] .popper__arrow::after {
    bottom: -5px;
    left: 1px;
    border-right-color: #1f2d3d;
    border-left-width: 0
}

.el-tooltip__popper[x-placement^=left] {
    margin-right: 12px
}

.el-tooltip__popper[x-placement^=left] .popper__arrow {
    right: -6px;
    border-right-width: 0;
    border-left-color: #1f2d3d
}

.el-tooltip__popper[x-placement^=left] .popper__arrow::after {
    right: 1px;
    bottom: -5px;
    margin-left: -5px;
    border-right-width: 0;
    border-left-color: #1f2d3d
}

.el-tooltip__popper.is-light {
    background: #fff;
    border: 1px solid #1f2d3d
}

.el-tooltip__popper.is-light[x-placement^=top] .popper__arrow {
    border-top-color: #1f2d3d
}

.el-tooltip__popper.is-light[x-placement^=top] .popper__arrow::after {
    border-top-color: #fff
}

.el-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #1f2d3d
}

.el-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: #fff
}

.el-tooltip__popper.is-light[x-placement^=left] .popper__arrow {
    border-left-color: #1f2d3d
}

.el-tooltip__popper.is-light[x-placement^=left] .popper__arrow::after {
    border-left-color: #fff
}

.el-tooltip__popper.is-light[x-placement^=right] .popper__arrow {
    border-right-color: #1f2d3d
}

.el-tooltip__popper.is-light[x-placement^=right] .popper__arrow::after {
    border-right-color: #fff
}

.el-tooltip__popper.is-dark {
    background: #1f2d3d;
    color: #fff
}

.el-slider:after,
.el-slider:before {
    display: table
}

.el-slider__button-wrapper .el-tooltip,
.el-slider__button-wrapper:after {
    display: inline-block;
    vertical-align: middle
}

.el-slider:after {
    clear: both
}

.el-slider.is-vertical {
    position: relative
}

.el-slider.is-vertical .el-slider__runway {
    width: 4px;
    height: 100%;
    margin: 0 16px
}

.el-slider.is-vertical .el-slider__bar {
    width: 4px;
    height: auto;
    border-radius: 0 0 3px 3px
}

.el-slider.is-vertical .el-slider__button-wrapper {
    top: auto;
    left: -16px;
    -ms-transform: translateY(50%);
    transform: translateY(50%)
}

.el-slider.is-vertical .el-slider__stop {
    -ms-transform: translateY(50%);
    transform: translateY(50%)
}

.el-slider.is-vertical.el-slider--with-input {
    padding-bottom: 64px
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input {
    overflow: visible;
    float: none;
    position: absolute;
    bottom: 22px;
    width: 36px;
    margin-top: 15px
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input__inner {
    text-align: center;
    padding-left: 5px;
    padding-right: 5px
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__decrease,
.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase {
    top: 30px;
    margin-top: -1px;
    border: 1px solid #bfcbd9;
    line-height: 20px;
    box-sizing: border-box;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__decrease {
    width: 18px;
    right: 18px;
    border-bottom-left-radius: 4px
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase {
    width: 19px;
    border-bottom-right-radius: 4px
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase~.el-input .el-input__inner {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input:hover .el-input-number__decrease,
.el-slider.is-vertical.el-slider--with-input .el-slider__input:hover .el-input-number__increase {
    border-color: #8391a5
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input:active .el-input-number__decrease,
.el-slider.is-vertical.el-slider--with-input .el-slider__input:active .el-input-number__increase {
    border-color: #20a0ff
}

.el-slider__runway {
    width: 100%;
    height: 4px;
    margin: 16px 0;
    background-color: #e4e8f1;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle
}

.el-slider__runway.show-input {
    margin-right: 160px;
    width: auto
}

.el-slider__runway.disabled {
    cursor: default
}

.el-slider__runway.disabled .el-slider__bar,
.el-slider__runway.disabled .el-slider__button {
    background-color: #bfcbd9
}

.el-slider__runway.disabled .el-slider__button-wrapper.dragging,
.el-slider__runway.disabled .el-slider__button-wrapper.hover,
.el-slider__runway.disabled .el-slider__button-wrapper:hover {
    cursor: not-allowed
}

.el-slider__runway.disabled .el-slider__button.dragging,
.el-slider__runway.disabled .el-slider__button.hover,
.el-slider__runway.disabled .el-slider__button:hover {
    -ms-transform: scale(1);
    transform: scale(1);
    cursor: not-allowed
}

.el-slider__input {
    float: right;
    margin-top: 3px
}

.el-slider__bar {
    height: 4px;
    background-color: #20a0ff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    position: absolute
}

.el-slider__button-wrapper {
    width: 36px;
    height: 36px;
    position: absolute;
    z-index: 1001;
    top: -16px;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: transparent;
    text-align: center;
    -ms-user-select: none;
    user-select: none
}

.el-slider__button-wrapper:after {
    height: 100%
}

.el-slider__button-wrapper.hover,
.el-slider__button-wrapper:hover {
    cursor: -webkit-grab;
    cursor: grab
}

.el-slider__button-wrapper.dragging {
    cursor: -webkit-grabbing;
    cursor: grabbing
}

.el-slider__button {
    width: 12px;
    height: 12px;
    background-color: #20a0ff;
    border-radius: 50%;
    transition: .2s;
    -ms-user-select: none;
    user-select: none
}

.el-slider__button.dragging,
.el-slider__button.hover,
.el-slider__button:hover {
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    background-color: #1c8de0
}

.el-slider__button.hover,
.el-slider__button:hover {
    cursor: -webkit-grab;
    cursor: grab
}

.el-slider__button.dragging {
    cursor: -webkit-grabbing;
    cursor: grabbing
}

.el-slider__stop {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #bfcbd9;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
}

.el-loading-mask {
    position: absolute;
    z-index: 1001;
    background-color: rgba(255, 255, 255, .9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s
}

.el-loading-mask.is-fullscreen {
    position: fixed
}

.el-loading-mask.is-fullscreen .el-loading-spinner {
    margin-top: -25px
}

.el-loading-mask.is-fullscreen .el-loading-spinner .circular {
    width: 50px;
    height: 50px
}

.el-loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute
}

.el-col-pull-0,
.el-col-pull-1,
.el-col-pull-10,
.el-col-pull-11,
.el-col-pull-13,
.el-col-pull-14,
.el-col-pull-15,
.el-col-pull-16,
.el-col-pull-17,
.el-col-pull-18,
.el-col-pull-19,
.el-col-pull-2,
.el-col-pull-20,
.el-col-pull-21,
.el-col-pull-22,
.el-col-pull-23,
.el-col-pull-24,
.el-col-pull-3,
.el-col-pull-4,
.el-col-pull-5,
.el-col-pull-6,
.el-col-pull-7,
.el-col-pull-8,
.el-col-pull-9,
.el-col-push-0,
.el-col-push-1,
.el-col-push-10,
.el-col-push-11,
.el-col-push-12,
.el-col-push-13,
.el-col-push-14,
.el-col-push-15,
.el-col-push-16,
.el-col-push-17,
.el-col-push-18,
.el-col-push-19,
.el-col-push-2,
.el-col-push-20,
.el-col-push-21,
.el-col-push-22,
.el-col-push-23,
.el-col-push-24,
.el-col-push-3,
.el-col-push-4,
.el-col-push-5,
.el-col-push-6,
.el-col-push-7,
.el-col-push-8,
.el-col-push-9,
.el-row {
    position: relative
}

.el-loading-spinner .el-loading-text {
    color: #20a0ff;
    margin: 3px 0;
    font-size: 12px
}

.el-loading-spinner .circular {
    width: 42px;
    height: 42px;
    animation: loading-rotate 2s linear infinite
}

.el-loading-spinner .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #20a0ff;
    stroke-linecap: round
}

@keyframes loading-rotate {
    100% {
        transform: rotate(360deg)
    }
}

@keyframes loading-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40px
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120px
    }
}

.el-row {
    box-sizing: border-box
}

.el-row:after,
.el-row:before {
    display: table
}

.el-row:after {
    clear: both
}

.el-row--flex {
    display: -ms-flexbox;
    display: flex
}

.el-row--flex:after,
.el-row--flex:before {
    display: none
}

.el-row--flex.is-align-bottom {
    -ms-flex-align: end;
    align-items: flex-end
}

.el-row--flex.is-align-middle {
    -ms-flex-align: center;
    align-items: center
}

.el-row--flex.is-justify-space-around {
    -ms-flex-pack: distribute;
    justify-content: space-around
}

.el-row--flex.is-justify-space-between {
    -ms-flex-pack: justify;
    justify-content: space-between
}

.el-row--flex.is-justify-end {
    -ms-flex-pack: end;
    justify-content: flex-end
}

.el-row--flex.is-justify-center {
    -ms-flex-pack: center;
    justify-content: center
}

.el-col-1,
.el-col-10,
.el-col-11,
.el-col-12,
.el-col-13,
.el-col-14,
.el-col-15,
.el-col-16,
.el-col-17,
.el-col-18,
.el-col-19,
.el-col-2,
.el-col-20,
.el-col-21,
.el-col-22,
.el-col-23,
.el-col-24,
.el-col-3,
.el-col-4,
.el-col-5,
.el-col-6,
.el-col-7,
.el-col-8,
.el-col-9 {
    float: left;
    box-sizing: border-box
}

.el-col-0 {
    width: 0
}

.el-col-offset-0 {
    margin-left: 0
}

.el-col-pull-0 {
    right: 0
}

.el-col-push-0 {
    left: 0
}

.el-col-1 {
    width: 4.16667%
}

.el-col-offset-1 {
    margin-left: 4.16667%
}

.el-col-pull-1 {
    right: 4.16667%
}

.el-col-push-1 {
    left: 4.16667%
}

.el-col-2 {
    width: 8.33333%
}

.el-col-offset-2 {
    margin-left: 8.33333%
}

.el-col-pull-2 {
    right: 8.33333%
}

.el-col-push-2 {
    left: 8.33333%
}

.el-col-3 {
    width: 12.5%
}

.el-col-offset-3 {
    margin-left: 12.5%
}

.el-col-pull-3 {
    right: 12.5%
}

.el-col-push-3 {
    left: 12.5%
}

.el-col-4 {
    width: 16.66667%
}

.el-col-offset-4 {
    margin-left: 16.66667%
}

.el-col-pull-4 {
    right: 16.66667%
}

.el-col-push-4 {
    left: 16.66667%
}

.el-col-5 {
    width: 20.83333%
}

.el-col-offset-5 {
    margin-left: 20.83333%
}

.el-col-pull-5 {
    right: 20.83333%
}

.el-col-push-5 {
    left: 20.83333%
}

.el-col-6 {
    width: 25%
}

.el-col-offset-6 {
    margin-left: 25%
}

.el-col-pull-6 {
    right: 25%
}

.el-col-push-6 {
    left: 25%
}

.el-col-7 {
    width: 29.16667%
}

.el-col-offset-7 {
    margin-left: 29.16667%
}

.el-col-pull-7 {
    right: 29.16667%
}

.el-col-push-7 {
    left: 29.16667%
}

.el-col-8 {
    width: 33.33333%
}

.el-col-offset-8 {
    margin-left: 33.33333%
}

.el-col-pull-8 {
    right: 33.33333%
}

.el-col-push-8 {
    left: 33.33333%
}

.el-col-9 {
    width: 37.5%
}

.el-col-offset-9 {
    margin-left: 37.5%
}

.el-col-pull-9 {
    right: 37.5%
}

.el-col-push-9 {
    left: 37.5%
}

.el-col-10 {
    width: 41.66667%
}

.el-col-offset-10 {
    margin-left: 41.66667%
}

.el-col-pull-10 {
    right: 41.66667%
}

.el-col-push-10 {
    left: 41.66667%
}

.el-col-11 {
    width: 45.83333%
}

.el-col-offset-11 {
    margin-left: 45.83333%
}

.el-col-pull-11 {
    right: 45.83333%
}

.el-col-push-11 {
    left: 45.83333%
}

.el-col-12 {
    width: 50%
}

.el-col-offset-12 {
    margin-left: 50%
}

.el-col-pull-12 {
    position: relative;
    right: 50%
}

.el-col-push-12 {
    left: 50%
}

.el-col-13 {
    width: 54.16667%
}

.el-col-offset-13 {
    margin-left: 54.16667%
}

.el-col-pull-13 {
    right: 54.16667%
}

.el-col-push-13 {
    left: 54.16667%
}

.el-col-14 {
    width: 58.33333%
}

.el-col-offset-14 {
    margin-left: 58.33333%
}

.el-col-pull-14 {
    right: 58.33333%
}

.el-col-push-14 {
    left: 58.33333%
}

.el-col-15 {
    width: 62.5%
}

.el-col-offset-15 {
    margin-left: 62.5%
}

.el-col-pull-15 {
    right: 62.5%
}

.el-col-push-15 {
    left: 62.5%
}

.el-col-16 {
    width: 66.66667%
}

.el-col-offset-16 {
    margin-left: 66.66667%
}

.el-col-pull-16 {
    right: 66.66667%
}

.el-col-push-16 {
    left: 66.66667%
}

.el-col-17 {
    width: 70.83333%
}

.el-col-offset-17 {
    margin-left: 70.83333%
}

.el-col-pull-17 {
    right: 70.83333%
}

.el-col-push-17 {
    left: 70.83333%
}

.el-col-18 {
    width: 75%
}

.el-col-offset-18 {
    margin-left: 75%
}

.el-col-pull-18 {
    right: 75%
}

.el-col-push-18 {
    left: 75%
}

.el-col-19 {
    width: 79.16667%
}

.el-col-offset-19 {
    margin-left: 79.16667%
}

.el-col-pull-19 {
    right: 79.16667%
}

.el-col-push-19 {
    left: 79.16667%
}

.el-col-20 {
    width: 83.33333%
}

.el-col-offset-20 {
    margin-left: 83.33333%
}

.el-col-pull-20 {
    right: 83.33333%
}

.el-col-push-20 {
    left: 83.33333%
}

.el-col-21 {
    width: 87.5%
}

.el-col-offset-21 {
    margin-left: 87.5%
}

.el-col-pull-21 {
    right: 87.5%
}

.el-col-push-21 {
    left: 87.5%
}

.el-col-22 {
    width: 91.66667%
}

.el-col-offset-22 {
    margin-left: 91.66667%
}

.el-col-pull-22 {
    right: 91.66667%
}

.el-col-push-22 {
    left: 91.66667%
}

.el-col-23 {
    width: 95.83333%
}

.el-col-offset-23 {
    margin-left: 95.83333%
}

.el-col-pull-23 {
    right: 95.83333%
}

.el-col-push-23 {
    left: 95.83333%
}

.el-col-24 {
    width: 100%
}

.el-col-offset-24 {
    margin-left: 100%
}

.el-col-pull-24 {
    right: 100%
}

.el-col-push-24 {
    left: 100%
}

@media (max-width:768px) {
    .el-col-xs-0 {
        width: 0
    }
    .el-col-xs-offset-0 {
        margin-left: 0
    }
    .el-col-xs-pull-0 {
        position: relative;
        right: 0
    }
    .el-col-xs-push-0 {
        position: relative;
        left: 0
    }
    .el-col-xs-1 {
        width: 4.16667%
    }
    .el-col-xs-offset-1 {
        margin-left: 4.16667%
    }
    .el-col-xs-pull-1 {
        position: relative;
        right: 4.16667%
    }
    .el-col-xs-push-1 {
        position: relative;
        left: 4.16667%
    }
    .el-col-xs-2 {
        width: 8.33333%
    }
    .el-col-xs-offset-2 {
        margin-left: 8.33333%
    }
    .el-col-xs-pull-2 {
        position: relative;
        right: 8.33333%
    }
    .el-col-xs-push-2 {
        position: relative;
        left: 8.33333%
    }
    .el-col-xs-3 {
        width: 12.5%
    }
    .el-col-xs-offset-3 {
        margin-left: 12.5%
    }
    .el-col-xs-pull-3 {
        position: relative;
        right: 12.5%
    }
    .el-col-xs-push-3 {
        position: relative;
        left: 12.5%
    }
    .el-col-xs-4 {
        width: 16.66667%
    }
    .el-col-xs-offset-4 {
        margin-left: 16.66667%
    }
    .el-col-xs-pull-4 {
        position: relative;
        right: 16.66667%
    }
    .el-col-xs-push-4 {
        position: relative;
        left: 16.66667%
    }
    .el-col-xs-5 {
        width: 20.83333%
    }
    .el-col-xs-offset-5 {
        margin-left: 20.83333%
    }
    .el-col-xs-pull-5 {
        position: relative;
        right: 20.83333%
    }
    .el-col-xs-push-5 {
        position: relative;
        left: 20.83333%
    }
    .el-col-xs-6 {
        width: 25%
    }
    .el-col-xs-offset-6 {
        margin-left: 25%
    }
    .el-col-xs-pull-6 {
        position: relative;
        right: 25%
    }
    .el-col-xs-push-6 {
        position: relative;
        left: 25%
    }
    .el-col-xs-7 {
        width: 29.16667%
    }
    .el-col-xs-offset-7 {
        margin-left: 29.16667%
    }
    .el-col-xs-pull-7 {
        position: relative;
        right: 29.16667%
    }
    .el-col-xs-push-7 {
        position: relative;
        left: 29.16667%
    }
    .el-col-xs-8 {
        width: 33.33333%
    }
    .el-col-xs-offset-8 {
        margin-left: 33.33333%
    }
    .el-col-xs-pull-8 {
        position: relative;
        right: 33.33333%
    }
    .el-col-xs-push-8 {
        position: relative;
        left: 33.33333%
    }
    .el-col-xs-9 {
        width: 37.5%
    }
    .el-col-xs-offset-9 {
        margin-left: 37.5%
    }
    .el-col-xs-pull-9 {
        position: relative;
        right: 37.5%
    }
    .el-col-xs-push-9 {
        position: relative;
        left: 37.5%
    }
    .el-col-xs-10 {
        width: 41.66667%
    }
    .el-col-xs-offset-10 {
        margin-left: 41.66667%
    }
    .el-col-xs-pull-10 {
        position: relative;
        right: 41.66667%
    }
    .el-col-xs-push-10 {
        position: relative;
        left: 41.66667%
    }
    .el-col-xs-11 {
        width: 45.83333%
    }
    .el-col-xs-offset-11 {
        margin-left: 45.83333%
    }
    .el-col-xs-pull-11 {
        position: relative;
        right: 45.83333%
    }
    .el-col-xs-push-11 {
        position: relative;
        left: 45.83333%
    }
    .el-col-xs-12 {
        width: 50%
    }
    .el-col-xs-offset-12 {
        margin-left: 50%
    }
    .el-col-xs-pull-12 {
        position: relative;
        right: 50%
    }
    .el-col-xs-push-12 {
        position: relative;
        left: 50%
    }
    .el-col-xs-13 {
        width: 54.16667%
    }
    .el-col-xs-offset-13 {
        margin-left: 54.16667%
    }
    .el-col-xs-pull-13 {
        position: relative;
        right: 54.16667%
    }
    .el-col-xs-push-13 {
        position: relative;
        left: 54.16667%
    }
    .el-col-xs-14 {
        width: 58.33333%
    }
    .el-col-xs-offset-14 {
        margin-left: 58.33333%
    }
    .el-col-xs-pull-14 {
        position: relative;
        right: 58.33333%
    }
    .el-col-xs-push-14 {
        position: relative;
        left: 58.33333%
    }
    .el-col-xs-15 {
        width: 62.5%
    }
    .el-col-xs-offset-15 {
        margin-left: 62.5%
    }
    .el-col-xs-pull-15 {
        position: relative;
        right: 62.5%
    }
    .el-col-xs-push-15 {
        position: relative;
        left: 62.5%
    }
    .el-col-xs-16 {
        width: 66.66667%
    }
    .el-col-xs-offset-16 {
        margin-left: 66.66667%
    }
    .el-col-xs-pull-16 {
        position: relative;
        right: 66.66667%
    }
    .el-col-xs-push-16 {
        position: relative;
        left: 66.66667%
    }
    .el-col-xs-17 {
        width: 70.83333%
    }
    .el-col-xs-offset-17 {
        margin-left: 70.83333%
    }
    .el-col-xs-pull-17 {
        position: relative;
        right: 70.83333%
    }
    .el-col-xs-push-17 {
        position: relative;
        left: 70.83333%
    }
    .el-col-xs-18 {
        width: 75%
    }
    .el-col-xs-offset-18 {
        margin-left: 75%
    }
    .el-col-xs-pull-18 {
        position: relative;
        right: 75%
    }
    .el-col-xs-push-18 {
        position: relative;
        left: 75%
    }
    .el-col-xs-19 {
        width: 79.16667%
    }
    .el-col-xs-offset-19 {
        margin-left: 79.16667%
    }
    .el-col-xs-pull-19 {
        position: relative;
        right: 79.16667%
    }
    .el-col-xs-push-19 {
        position: relative;
        left: 79.16667%
    }
    .el-col-xs-20 {
        width: 83.33333%
    }
    .el-col-xs-offset-20 {
        margin-left: 83.33333%
    }
    .el-col-xs-pull-20 {
        position: relative;
        right: 83.33333%
    }
    .el-col-xs-push-20 {
        position: relative;
        left: 83.33333%
    }
    .el-col-xs-21 {
        width: 87.5%
    }
    .el-col-xs-offset-21 {
        margin-left: 87.5%
    }
    .el-col-xs-pull-21 {
        position: relative;
        right: 87.5%
    }
    .el-col-xs-push-21 {
        position: relative;
        left: 87.5%
    }
    .el-col-xs-22 {
        width: 91.66667%
    }
    .el-col-xs-offset-22 {
        margin-left: 91.66667%
    }
    .el-col-xs-pull-22 {
        position: relative;
        right: 91.66667%
    }
    .el-col-xs-push-22 {
        position: relative;
        left: 91.66667%
    }
    .el-col-xs-23 {
        width: 95.83333%
    }
    .el-col-xs-offset-23 {
        margin-left: 95.83333%
    }
    .el-col-xs-pull-23 {
        position: relative;
        right: 95.83333%
    }
    .el-col-xs-push-23 {
        position: relative;
        left: 95.83333%
    }
    .el-col-xs-24 {
        width: 100%
    }
    .el-col-xs-offset-24 {
        margin-left: 100%
    }
    .el-col-xs-pull-24 {
        position: relative;
        right: 100%
    }
    .el-col-xs-push-24 {
        position: relative;
        left: 100%
    }
}

@media (min-width:768px) {
    .el-col-sm-0 {
        width: 0
    }
    .el-col-sm-offset-0 {
        margin-left: 0
    }
    .el-col-sm-pull-0 {
        position: relative;
        right: 0
    }
    .el-col-sm-push-0 {
        position: relative;
        left: 0
    }
    .el-col-sm-1 {
        width: 4.16667%
    }
    .el-col-sm-offset-1 {
        margin-left: 4.16667%
    }
    .el-col-sm-pull-1 {
        position: relative;
        right: 4.16667%
    }
    .el-col-sm-push-1 {
        position: relative;
        left: 4.16667%
    }
    .el-col-sm-2 {
        width: 8.33333%
    }
    .el-col-sm-offset-2 {
        margin-left: 8.33333%
    }
    .el-col-sm-pull-2 {
        position: relative;
        right: 8.33333%
    }
    .el-col-sm-push-2 {
        position: relative;
        left: 8.33333%
    }
    .el-col-sm-3 {
        width: 12.5%
    }
    .el-col-sm-offset-3 {
        margin-left: 12.5%
    }
    .el-col-sm-pull-3 {
        position: relative;
        right: 12.5%
    }
    .el-col-sm-push-3 {
        position: relative;
        left: 12.5%
    }
    .el-col-sm-4 {
        width: 16.66667%
    }
    .el-col-sm-offset-4 {
        margin-left: 16.66667%
    }
    .el-col-sm-pull-4 {
        position: relative;
        right: 16.66667%
    }
    .el-col-sm-push-4 {
        position: relative;
        left: 16.66667%
    }
    .el-col-sm-5 {
        width: 20.83333%
    }
    .el-col-sm-offset-5 {
        margin-left: 20.83333%
    }
    .el-col-sm-pull-5 {
        position: relative;
        right: 20.83333%
    }
    .el-col-sm-push-5 {
        position: relative;
        left: 20.83333%
    }
    .el-col-sm-6 {
        width: 25%
    }
    .el-col-sm-offset-6 {
        margin-left: 25%
    }
    .el-col-sm-pull-6 {
        position: relative;
        right: 25%
    }
    .el-col-sm-push-6 {
        position: relative;
        left: 25%
    }
    .el-col-sm-7 {
        width: 29.16667%
    }
    .el-col-sm-offset-7 {
        margin-left: 29.16667%
    }
    .el-col-sm-pull-7 {
        position: relative;
        right: 29.16667%
    }
    .el-col-sm-push-7 {
        position: relative;
        left: 29.16667%
    }
    .el-col-sm-8 {
        width: 33.33333%
    }
    .el-col-sm-offset-8 {
        margin-left: 33.33333%
    }
    .el-col-sm-pull-8 {
        position: relative;
        right: 33.33333%
    }
    .el-col-sm-push-8 {
        position: relative;
        left: 33.33333%
    }
    .el-col-sm-9 {
        width: 37.5%
    }
    .el-col-sm-offset-9 {
        margin-left: 37.5%
    }
    .el-col-sm-pull-9 {
        position: relative;
        right: 37.5%
    }
    .el-col-sm-push-9 {
        position: relative;
        left: 37.5%
    }
    .el-col-sm-10 {
        width: 41.66667%
    }
    .el-col-sm-offset-10 {
        margin-left: 41.66667%
    }
    .el-col-sm-pull-10 {
        position: relative;
        right: 41.66667%
    }
    .el-col-sm-push-10 {
        position: relative;
        left: 41.66667%
    }
    .el-col-sm-11 {
        width: 45.83333%
    }
    .el-col-sm-offset-11 {
        margin-left: 45.83333%
    }
    .el-col-sm-pull-11 {
        position: relative;
        right: 45.83333%
    }
    .el-col-sm-push-11 {
        position: relative;
        left: 45.83333%
    }
    .el-col-sm-12 {
        width: 50%
    }
    .el-col-sm-offset-12 {
        margin-left: 50%
    }
    .el-col-sm-pull-12 {
        position: relative;
        right: 50%
    }
    .el-col-sm-push-12 {
        position: relative;
        left: 50%
    }
    .el-col-sm-13 {
        width: 54.16667%
    }
    .el-col-sm-offset-13 {
        margin-left: 54.16667%
    }
    .el-col-sm-pull-13 {
        position: relative;
        right: 54.16667%
    }
    .el-col-sm-push-13 {
        position: relative;
        left: 54.16667%
    }
    .el-col-sm-14 {
        width: 58.33333%
    }
    .el-col-sm-offset-14 {
        margin-left: 58.33333%
    }
    .el-col-sm-pull-14 {
        position: relative;
        right: 58.33333%
    }
    .el-col-sm-push-14 {
        position: relative;
        left: 58.33333%
    }
    .el-col-sm-15 {
        width: 62.5%
    }
    .el-col-sm-offset-15 {
        margin-left: 62.5%
    }
    .el-col-sm-pull-15 {
        position: relative;
        right: 62.5%
    }
    .el-col-sm-push-15 {
        position: relative;
        left: 62.5%
    }
    .el-col-sm-16 {
        width: 66.66667%
    }
    .el-col-sm-offset-16 {
        margin-left: 66.66667%
    }
    .el-col-sm-pull-16 {
        position: relative;
        right: 66.66667%
    }
    .el-col-sm-push-16 {
        position: relative;
        left: 66.66667%
    }
    .el-col-sm-17 {
        width: 70.83333%
    }
    .el-col-sm-offset-17 {
        margin-left: 70.83333%
    }
    .el-col-sm-pull-17 {
        position: relative;
        right: 70.83333%
    }
    .el-col-sm-push-17 {
        position: relative;
        left: 70.83333%
    }
    .el-col-sm-18 {
        width: 75%
    }
    .el-col-sm-offset-18 {
        margin-left: 75%
    }
    .el-col-sm-pull-18 {
        position: relative;
        right: 75%
    }
    .el-col-sm-push-18 {
        position: relative;
        left: 75%
    }
    .el-col-sm-19 {
        width: 79.16667%
    }
    .el-col-sm-offset-19 {
        margin-left: 79.16667%
    }
    .el-col-sm-pull-19 {
        position: relative;
        right: 79.16667%
    }
    .el-col-sm-push-19 {
        position: relative;
        left: 79.16667%
    }
    .el-col-sm-20 {
        width: 83.33333%
    }
    .el-col-sm-offset-20 {
        margin-left: 83.33333%
    }
    .el-col-sm-pull-20 {
        position: relative;
        right: 83.33333%
    }
    .el-col-sm-push-20 {
        position: relative;
        left: 83.33333%
    }
    .el-col-sm-21 {
        width: 87.5%
    }
    .el-col-sm-offset-21 {
        margin-left: 87.5%
    }
    .el-col-sm-pull-21 {
        position: relative;
        right: 87.5%
    }
    .el-col-sm-push-21 {
        position: relative;
        left: 87.5%
    }
    .el-col-sm-22 {
        width: 91.66667%
    }
    .el-col-sm-offset-22 {
        margin-left: 91.66667%
    }
    .el-col-sm-pull-22 {
        position: relative;
        right: 91.66667%
    }
    .el-col-sm-push-22 {
        position: relative;
        left: 91.66667%
    }
    .el-col-sm-23 {
        width: 95.83333%
    }
    .el-col-sm-offset-23 {
        margin-left: 95.83333%
    }
    .el-col-sm-pull-23 {
        position: relative;
        right: 95.83333%
    }
    .el-col-sm-push-23 {
        position: relative;
        left: 95.83333%
    }
    .el-col-sm-24 {
        width: 100%
    }
    .el-col-sm-offset-24 {
        margin-left: 100%
    }
    .el-col-sm-pull-24 {
        position: relative;
        right: 100%
    }
    .el-col-sm-push-24 {
        position: relative;
        left: 100%
    }
}

@media (min-width:992px) {
    .el-col-md-0 {
        width: 0
    }
    .el-col-md-offset-0 {
        margin-left: 0
    }
    .el-col-md-pull-0 {
        position: relative;
        right: 0
    }
    .el-col-md-push-0 {
        position: relative;
        left: 0
    }
    .el-col-md-1 {
        width: 4.16667%
    }
    .el-col-md-offset-1 {
        margin-left: 4.16667%
    }
    .el-col-md-pull-1 {
        position: relative;
        right: 4.16667%
    }
    .el-col-md-push-1 {
        position: relative;
        left: 4.16667%
    }
    .el-col-md-2 {
        width: 8.33333%
    }
    .el-col-md-offset-2 {
        margin-left: 8.33333%
    }
    .el-col-md-pull-2 {
        position: relative;
        right: 8.33333%
    }
    .el-col-md-push-2 {
        position: relative;
        left: 8.33333%
    }
    .el-col-md-3 {
        width: 12.5%
    }
    .el-col-md-offset-3 {
        margin-left: 12.5%
    }
    .el-col-md-pull-3 {
        position: relative;
        right: 12.5%
    }
    .el-col-md-push-3 {
        position: relative;
        left: 12.5%
    }
    .el-col-md-4 {
        width: 16.66667%
    }
    .el-col-md-offset-4 {
        margin-left: 16.66667%
    }
    .el-col-md-pull-4 {
        position: relative;
        right: 16.66667%
    }
    .el-col-md-push-4 {
        position: relative;
        left: 16.66667%
    }
    .el-col-md-5 {
        width: 20.83333%
    }
    .el-col-md-offset-5 {
        margin-left: 20.83333%
    }
    .el-col-md-pull-5 {
        position: relative;
        right: 20.83333%
    }
    .el-col-md-push-5 {
        position: relative;
        left: 20.83333%
    }
    .el-col-md-6 {
        width: 25%
    }
    .el-col-md-offset-6 {
        margin-left: 25%
    }
    .el-col-md-pull-6 {
        position: relative;
        right: 25%
    }
    .el-col-md-push-6 {
        position: relative;
        left: 25%
    }
    .el-col-md-7 {
        width: 29.16667%
    }
    .el-col-md-offset-7 {
        margin-left: 29.16667%
    }
    .el-col-md-pull-7 {
        position: relative;
        right: 29.16667%
    }
    .el-col-md-push-7 {
        position: relative;
        left: 29.16667%
    }
    .el-col-md-8 {
        width: 33.33333%
    }
    .el-col-md-offset-8 {
        margin-left: 33.33333%
    }
    .el-col-md-pull-8 {
        position: relative;
        right: 33.33333%
    }
    .el-col-md-push-8 {
        position: relative;
        left: 33.33333%
    }
    .el-col-md-9 {
        width: 37.5%
    }
    .el-col-md-offset-9 {
        margin-left: 37.5%
    }
    .el-col-md-pull-9 {
        position: relative;
        right: 37.5%
    }
    .el-col-md-push-9 {
        position: relative;
        left: 37.5%
    }
    .el-col-md-10 {
        width: 41.66667%
    }
    .el-col-md-offset-10 {
        margin-left: 41.66667%
    }
    .el-col-md-pull-10 {
        position: relative;
        right: 41.66667%
    }
    .el-col-md-push-10 {
        position: relative;
        left: 41.66667%
    }
    .el-col-md-11 {
        width: 45.83333%
    }
    .el-col-md-offset-11 {
        margin-left: 45.83333%
    }
    .el-col-md-pull-11 {
        position: relative;
        right: 45.83333%
    }
    .el-col-md-push-11 {
        position: relative;
        left: 45.83333%
    }
    .el-col-md-12 {
        width: 50%
    }
    .el-col-md-offset-12 {
        margin-left: 50%
    }
    .el-col-md-pull-12 {
        position: relative;
        right: 50%
    }
    .el-col-md-push-12 {
        position: relative;
        left: 50%
    }
    .el-col-md-13 {
        width: 54.16667%
    }
    .el-col-md-offset-13 {
        margin-left: 54.16667%
    }
    .el-col-md-pull-13 {
        position: relative;
        right: 54.16667%
    }
    .el-col-md-push-13 {
        position: relative;
        left: 54.16667%
    }
    .el-col-md-14 {
        width: 58.33333%
    }
    .el-col-md-offset-14 {
        margin-left: 58.33333%
    }
    .el-col-md-pull-14 {
        position: relative;
        right: 58.33333%
    }
    .el-col-md-push-14 {
        position: relative;
        left: 58.33333%
    }
    .el-col-md-15 {
        width: 62.5%
    }
    .el-col-md-offset-15 {
        margin-left: 62.5%
    }
    .el-col-md-pull-15 {
        position: relative;
        right: 62.5%
    }
    .el-col-md-push-15 {
        position: relative;
        left: 62.5%
    }
    .el-col-md-16 {
        width: 66.66667%
    }
    .el-col-md-offset-16 {
        margin-left: 66.66667%
    }
    .el-col-md-pull-16 {
        position: relative;
        right: 66.66667%
    }
    .el-col-md-push-16 {
        position: relative;
        left: 66.66667%
    }
    .el-col-md-17 {
        width: 70.83333%
    }
    .el-col-md-offset-17 {
        margin-left: 70.83333%
    }
    .el-col-md-pull-17 {
        position: relative;
        right: 70.83333%
    }
    .el-col-md-push-17 {
        position: relative;
        left: 70.83333%
    }
    .el-col-md-18 {
        width: 75%
    }
    .el-col-md-offset-18 {
        margin-left: 75%
    }
    .el-col-md-pull-18 {
        position: relative;
        right: 75%
    }
    .el-col-md-push-18 {
        position: relative;
        left: 75%
    }
    .el-col-md-19 {
        width: 79.16667%
    }
    .el-col-md-offset-19 {
        margin-left: 79.16667%
    }
    .el-col-md-pull-19 {
        position: relative;
        right: 79.16667%
    }
    .el-col-md-push-19 {
        position: relative;
        left: 79.16667%
    }
    .el-col-md-20 {
        width: 83.33333%
    }
    .el-col-md-offset-20 {
        margin-left: 83.33333%
    }
    .el-col-md-pull-20 {
        position: relative;
        right: 83.33333%
    }
    .el-col-md-push-20 {
        position: relative;
        left: 83.33333%
    }
    .el-col-md-21 {
        width: 87.5%
    }
    .el-col-md-offset-21 {
        margin-left: 87.5%
    }
    .el-col-md-pull-21 {
        position: relative;
        right: 87.5%
    }
    .el-col-md-push-21 {
        position: relative;
        left: 87.5%
    }
    .el-col-md-22 {
        width: 91.66667%
    }
    .el-col-md-offset-22 {
        margin-left: 91.66667%
    }
    .el-col-md-pull-22 {
        position: relative;
        right: 91.66667%
    }
    .el-col-md-push-22 {
        position: relative;
        left: 91.66667%
    }
    .el-col-md-23 {
        width: 95.83333%
    }
    .el-col-md-offset-23 {
        margin-left: 95.83333%
    }
    .el-col-md-pull-23 {
        position: relative;
        right: 95.83333%
    }
    .el-col-md-push-23 {
        position: relative;
        left: 95.83333%
    }
    .el-col-md-24 {
        width: 100%
    }
    .el-col-md-offset-24 {
        margin-left: 100%
    }
    .el-col-md-pull-24 {
        position: relative;
        right: 100%
    }
    .el-col-md-push-24 {
        position: relative;
        left: 100%
    }
}

@media (min-width:1200px) {
    .el-col-lg-0 {
        width: 0
    }
    .el-col-lg-offset-0 {
        margin-left: 0
    }
    .el-col-lg-pull-0 {
        position: relative;
        right: 0
    }
    .el-col-lg-push-0 {
        position: relative;
        left: 0
    }
    .el-col-lg-1 {
        width: 4.16667%
    }
    .el-col-lg-offset-1 {
        margin-left: 4.16667%
    }
    .el-col-lg-pull-1 {
        position: relative;
        right: 4.16667%
    }
    .el-col-lg-push-1 {
        position: relative;
        left: 4.16667%
    }
    .el-col-lg-2 {
        width: 8.33333%
    }
    .el-col-lg-offset-2 {
        margin-left: 8.33333%
    }
    .el-col-lg-pull-2 {
        position: relative;
        right: 8.33333%
    }
    .el-col-lg-push-2 {
        position: relative;
        left: 8.33333%
    }
    .el-col-lg-3 {
        width: 12.5%
    }
    .el-col-lg-offset-3 {
        margin-left: 12.5%
    }
    .el-col-lg-pull-3 {
        position: relative;
        right: 12.5%
    }
    .el-col-lg-push-3 {
        position: relative;
        left: 12.5%
    }
    .el-col-lg-4 {
        width: 16.66667%
    }
    .el-col-lg-offset-4 {
        margin-left: 16.66667%
    }
    .el-col-lg-pull-4 {
        position: relative;
        right: 16.66667%
    }
    .el-col-lg-push-4 {
        position: relative;
        left: 16.66667%
    }
    .el-col-lg-5 {
        width: 20.83333%
    }
    .el-col-lg-offset-5 {
        margin-left: 20.83333%
    }
    .el-col-lg-pull-5 {
        position: relative;
        right: 20.83333%
    }
    .el-col-lg-push-5 {
        position: relative;
        left: 20.83333%
    }
    .el-col-lg-6 {
        width: 25%
    }
    .el-col-lg-offset-6 {
        margin-left: 25%
    }
    .el-col-lg-pull-6 {
        position: relative;
        right: 25%
    }
    .el-col-lg-push-6 {
        position: relative;
        left: 25%
    }
    .el-col-lg-7 {
        width: 29.16667%
    }
    .el-col-lg-offset-7 {
        margin-left: 29.16667%
    }
    .el-col-lg-pull-7 {
        position: relative;
        right: 29.16667%
    }
    .el-col-lg-push-7 {
        position: relative;
        left: 29.16667%
    }
    .el-col-lg-8 {
        width: 33.33333%
    }
    .el-col-lg-offset-8 {
        margin-left: 33.33333%
    }
    .el-col-lg-pull-8 {
        position: relative;
        right: 33.33333%
    }
    .el-col-lg-push-8 {
        position: relative;
        left: 33.33333%
    }
    .el-col-lg-9 {
        width: 37.5%
    }
    .el-col-lg-offset-9 {
        margin-left: 37.5%
    }
    .el-col-lg-pull-9 {
        position: relative;
        right: 37.5%
    }
    .el-col-lg-push-9 {
        position: relative;
        left: 37.5%
    }
    .el-col-lg-10 {
        width: 41.66667%
    }
    .el-col-lg-offset-10 {
        margin-left: 41.66667%
    }
    .el-col-lg-pull-10 {
        position: relative;
        right: 41.66667%
    }
    .el-col-lg-push-10 {
        position: relative;
        left: 41.66667%
    }
    .el-col-lg-11 {
        width: 45.83333%
    }
    .el-col-lg-offset-11 {
        margin-left: 45.83333%
    }
    .el-col-lg-pull-11 {
        position: relative;
        right: 45.83333%
    }
    .el-col-lg-push-11 {
        position: relative;
        left: 45.83333%
    }
    .el-col-lg-12 {
        width: 50%
    }
    .el-col-lg-offset-12 {
        margin-left: 50%
    }
    .el-col-lg-pull-12 {
        position: relative;
        right: 50%
    }
    .el-col-lg-push-12 {
        position: relative;
        left: 50%
    }
    .el-col-lg-13 {
        width: 54.16667%
    }
    .el-col-lg-offset-13 {
        margin-left: 54.16667%
    }
    .el-col-lg-pull-13 {
        position: relative;
        right: 54.16667%
    }
    .el-col-lg-push-13 {
        position: relative;
        left: 54.16667%
    }
    .el-col-lg-14 {
        width: 58.33333%
    }
    .el-col-lg-offset-14 {
        margin-left: 58.33333%
    }
    .el-col-lg-pull-14 {
        position: relative;
        right: 58.33333%
    }
    .el-col-lg-push-14 {
        position: relative;
        left: 58.33333%
    }
    .el-col-lg-15 {
        width: 62.5%
    }
    .el-col-lg-offset-15 {
        margin-left: 62.5%
    }
    .el-col-lg-pull-15 {
        position: relative;
        right: 62.5%
    }
    .el-col-lg-push-15 {
        position: relative;
        left: 62.5%
    }
    .el-col-lg-16 {
        width: 66.66667%
    }
    .el-col-lg-offset-16 {
        margin-left: 66.66667%
    }
    .el-col-lg-pull-16 {
        position: relative;
        right: 66.66667%
    }
    .el-col-lg-push-16 {
        position: relative;
        left: 66.66667%
    }
    .el-col-lg-17 {
        width: 70.83333%
    }
    .el-col-lg-offset-17 {
        margin-left: 70.83333%
    }
    .el-col-lg-pull-17 {
        position: relative;
        right: 70.83333%
    }
    .el-col-lg-push-17 {
        position: relative;
        left: 70.83333%
    }
    .el-col-lg-18 {
        width: 75%
    }
    .el-col-lg-offset-18 {
        margin-left: 75%
    }
    .el-col-lg-pull-18 {
        position: relative;
        right: 75%
    }
    .el-col-lg-push-18 {
        position: relative;
        left: 75%
    }
    .el-col-lg-19 {
        width: 79.16667%
    }
    .el-col-lg-offset-19 {
        margin-left: 79.16667%
    }
    .el-col-lg-pull-19 {
        position: relative;
        right: 79.16667%
    }
    .el-col-lg-push-19 {
        position: relative;
        left: 79.16667%
    }
    .el-col-lg-20 {
        width: 83.33333%
    }
    .el-col-lg-offset-20 {
        margin-left: 83.33333%
    }
    .el-col-lg-pull-20 {
        position: relative;
        right: 83.33333%
    }
    .el-col-lg-push-20 {
        position: relative;
        left: 83.33333%
    }
    .el-col-lg-21 {
        width: 87.5%
    }
    .el-col-lg-offset-21 {
        margin-left: 87.5%
    }
    .el-col-lg-pull-21 {
        position: relative;
        right: 87.5%
    }
    .el-col-lg-push-21 {
        position: relative;
        left: 87.5%
    }
    .el-col-lg-22 {
        width: 91.66667%
    }
    .el-col-lg-offset-22 {
        margin-left: 91.66667%
    }
    .el-col-lg-pull-22 {
        position: relative;
        right: 91.66667%
    }
    .el-col-lg-push-22 {
        position: relative;
        left: 91.66667%
    }
    .el-col-lg-23 {
        width: 95.83333%
    }
    .el-col-lg-offset-23 {
        margin-left: 95.83333%
    }
    .el-col-lg-pull-23 {
        position: relative;
        right: 95.83333%
    }
    .el-col-lg-push-23 {
        position: relative;
        left: 95.83333%
    }
    .el-col-lg-24 {
        width: 100%
    }
    .el-col-lg-offset-24 {
        margin-left: 100%
    }
    .el-col-lg-pull-24 {
        position: relative;
        right: 100%
    }
    .el-col-lg-push-24 {
        position: relative;
        left: 100%
    }
}

.el-progress-bar__inner:after {
    display: inline-block;
    height: 100%;
    vertical-align: middle
}

.el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer
}

.el-upload iframe {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    opacity: 0;
    filter: alpha(opacity=0)
}

.el-upload__input {
    display: none
}

.el-upload__tip {
    font-size: 12px;
    color: #8391a5;
    margin-top: 7px
}

.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top
}

.el-upload--picture-card i {
    font-size: 28px;
    color: #8c939d
}

.el-upload--picture-card:hover {
    border-color: #20a0ff;
    color: #20a0ff
}

.el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden
}

.el-upload-dragger .el-upload__text {
    color: #97a8be;
    font-size: 12px;
    text-align: center
}

.el-upload-dragger .el-upload__text em {
    color: #20a0ff;
    font-style: normal
}

.el-upload-dragger .el-icon-upload {
    font-size: 67px;
    color: #97a8be;
    margin: 40px 0 16px;
    line-height: 50px
}

.el-upload-dragger+.el-upload__tip {
    text-align: center
}

.el-upload-dragger~.el-upload__files {
    border-top: 1px solid rgba(191, 203, 217, .2);
    margin-top: 7px;
    padding-top: 5px
}

.el-upload-dragger:hover {
    border-color: #20a0ff
}

.el-upload-dragger.is-dragover {
    background-color: rgba(32, 159, 255, .06);
    border: 2px dashed #20a0ff
}

.el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none
}

.el-upload-list__item {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    font-size: 12px;
    color: #48576a;
    line-height: 1.8;
    margin-top: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    position: relative
}

.el-upload-list__item .el-progress-bar {
    margin-right: 0;
    padding-right: 0
}

.el-upload-list__item .el-progress {
    position: absolute;
    top: 20px;
    width: 100%
}

.el-upload-list__item .el-progress__text {
    position: absolute;
    top: -13px;
    right: 0
}

.el-upload-list__item:first-child {
    margin-top: 10px
}

.el-upload-list__item .el-icon-upload-success {
    color: #13ce66
}

.el-upload-list__item .el-icon-close {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: .75;
    color: #48576a;
    -ms-transform: scale(.7);
    transform: scale(.7)
}

.el-upload-list__item .el-icon-close:hover {
    opacity: 1
}

.el-upload-list__item:hover {
    background-color: #eef1f6
}

.el-upload-list__item:hover .el-icon-close {
    display: inline-block
}

.el-upload-list__item:hover .el-progress__text {
    display: none
}

.el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: block
}

.el-upload-list__item.is-success .el-upload-list__item-name:hover {
    color: #20a0ff;
    cursor: pointer
}

.el-upload-list__item.is-success:hover .el-upload-list__item-status-label {
    display: none
}

.el-upload-list__item-name {
    color: #48576a;
    display: block;
    margin-right: 40px;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    transition: color .3s;
    white-space: nowrap
}

.el-upload-list__item-name [class^=el-icon] {
    color: #97a8be;
    margin-right: 7px;
    height: 100%;
    line-height: inherit
}

.el-upload-list__item-status-label {
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
    display: none
}

.el-upload-list__item-delete {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 12px;
    color: #48576a;
    display: none
}

.el-upload-list__item-delete:hover {
    color: #20a0ff
}

.el-upload-list--picture-card {
    margin: 0;
    display: inline;
    vertical-align: top
}

.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block
}

.el-upload-list--picture-card .el-upload-list__item .el-icon-check,
.el-upload-list--picture-card .el-upload-list__item .el-icon-circle-check {
    color: #fff
}

.el-upload-list--picture-card .el-upload-list__item .el-icon-close,
.el-upload-list--picture-card .el-upload-list__item:hover .el-upload-list__item-status-label {
    display: none
}

.el-upload-list--picture-card .el-upload-list__item:hover .el-progress__text {
    display: block
}

.el-upload-list--picture-card .el-upload-list__item-name {
    display: none
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100%;
    height: 100%
}

.el-upload-list--picture-card .el-upload-list__item-status-label {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-shadow: 0 0 1pc 1px rgba(0, 0, 0, .2)
}

.el-upload-list--picture-card .el-upload-list__item-status-label i {
    font-size: 12px;
    margin-top: 11px;
    -ms-transform: rotate(-45deg) scale(.8);
    transform: rotate(-45deg) scale(.8)
}

.el-upload-list--picture-card .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s
}

.el-upload-list--picture-card .el-upload-list__item-actions:after {
    display: inline-block;
    content: ;
    height: 100%;
    vertical-align: middle
}

.el-upload-list--picture-card .el-upload-list__item-actions span {
    display: none;
    cursor: pointer
}

.el-upload-list--picture-card .el-upload-list__item-actions span+span {
    margin-left: 15px
}

.el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
    position: static;
    font-size: inherit;
    color: inherit
}

.el-upload-list--picture-card .el-upload-list__item-actions:hover {
    opacity: 1
}

.el-upload-list--picture-card .el-upload-list__item-actions:hover span {
    display: inline-block
}

.el-upload-list--picture-card .el-progress {
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    bottom: auto;
    width: 126px
}

.el-upload-list--picture-card .el-progress .el-progress__text {
    top: 50%
}

.el-upload-list--picture .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 92px
}

.el-upload-list--picture .el-upload-list__item .el-icon-check,
.el-upload-list--picture .el-upload-list__item .el-icon-circle-check {
    color: #fff
}

.el-upload-list--picture .el-upload-list__item:hover .el-upload-list__item-status-label {
    background: 0 0;
    box-shadow: none;
    top: -2px;
    right: -12px
}

.el-upload-list--picture .el-upload-list__item:hover .el-progress__text {
    display: block
}

.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name {
    line-height: 70px;
    margin-top: 0
}

.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name i {
    display: none
}

.el-upload-list--picture .el-upload-list__item-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    float: left;
    position: relative;
    z-index: 1;
    margin-left: -80px
}

.el-upload-list--picture .el-upload-list__item-name {
    display: block;
    margin-top: 20px
}

.el-upload-list--picture .el-upload-list__item-name i {
    font-size: 70px;
    line-height: 1;
    position: absolute;
    left: 9px;
    top: 10px
}

.el-upload-list--picture .el-upload-list__item-status-label {
    position: absolute;
    right: -17px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc
}

.el-upload-list--picture .el-upload-list__item-status-label i {
    font-size: 12px;
    margin-top: 12px;
    -ms-transform: rotate(-45deg) scale(.8);
    transform: rotate(-45deg) scale(.8)
}

.el-upload-list--picture .el-progress {
    position: relative;
    top: -7px
}

.el-upload-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
    cursor: default
}

.el-upload-cover:after {
    display: inline-block;
    height: 100%;
    vertical-align: middle
}

.el-upload-cover img {
    display: block;
    width: 100%;
    height: 100%
}

.el-upload-cover+.el-upload__inner {
    opacity: 0;
    position: relative;
    z-index: 1
}

.el-upload-cover__label {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-shadow: 0 0 1pc 1px rgba(0, 0, 0, .2)
}

.el-upload-cover__label i {
    font-size: 12px;
    margin-top: 11px;
    -ms-transform: rotate(-45deg) scale(.8);
    transform: rotate(-45deg) scale(.8);
    color: #fff
}

.el-upload-cover__progress {
    display: inline-block;
    vertical-align: middle;
    position: static;
    width: 243px
}

.el-upload-cover__progress+.el-upload__inner {
    opacity: 0
}

.el-upload-cover__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
}

.el-upload-cover__interact {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .72);
    text-align: center
}

.el-upload-cover__interact .btn {
    display: inline-block;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    vertical-align: middle;
    transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s;
    margin-top: 60px
}

.el-upload-cover__interact .btn span {
    opacity: 0;
    transition: opacity .15s linear
}

.el-upload-cover__interact .btn:not(:first-child) {
    margin-left: 35px
}

.el-upload-cover__interact .btn:hover {
    -ms-transform: translateY(-13px);
    transform: translateY(-13px)
}

.el-upload-cover__interact .btn:hover span {
    opacity: 1
}

.el-upload-cover__interact .btn i {
    color: #fff;
    display: block;
    font-size: 24px;
    line-height: inherit;
    margin: 0 auto 5px
}

.el-upload-cover__title {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    height: 36px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    text-align: left;
    padding: 0 10px;
    margin: 0;
    line-height: 36px;
    font-size: 12px;
    color: #48576a
}

.el-progress {
    position: relative;
    line-height: 1
}

.el-progress.is-exception .el-progress-bar__inner {
    background-color: #ff4949
}

.el-progress.is-exception .el-progress__text {
    color: #ff4949
}

.el-progress.is-success .el-progress-bar__inner {
    background-color: #13ce66
}

.el-progress.is-success .el-progress__text {
    color: #13ce66
}

.el-progress__text {
    font-size: 12px;
    color: #48576a;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    line-height: 1
}

.el-progress__text i {
    vertical-align: middle;
    display: block
}

.el-progress--circle {
    display: inline-block
}

.el-progress--circle .el-progress__text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%)
}

.el-progress--circle .el-progress__text i {
    vertical-align: middle;
    display: inline-block
}

.el-progress--without-text .el-progress__text {
    display: none
}

.el-progress--without-text .el-progress-bar {
    padding-right: 0;
    margin-right: 0;
    display: block
}

.el-progress-bar,
.el-progress-bar__innerText,
.el-spinner {
    display: inline-block;
    vertical-align: middle
}

.el-progress--text-inside .el-progress-bar {
    padding-right: 0;
    margin-right: 0
}

.el-progress-bar {
    padding-right: 50px;
    width: 100%;
    margin-right: -55px;
    box-sizing: border-box
}

.el-progress-bar__outer {
    height: 6px;
    border-radius: 100px;
    background-color: #e4e8f1;
    overflow: hidden;
    position: relative;
    vertical-align: middle
}

.el-progress-bar__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #20a0ff;
    text-align: right;
    border-radius: 100px;
    line-height: 1
}

.el-progress-bar__innerText {
    color: #fff;
    font-size: 12px;
    margin: 0 5px
}

@keyframes progress {
    0% {
        background-position: 0 0
    }
    100% {
        background-position: 32px 0
    }
}

.el-time-spinner {
    width: 100%
}

.el-spinner-inner {
    animation: rotate 2s linear infinite;
    width: 50px;
    height: 50px
}

.el-spinner-inner .path {
    stroke: #ececec;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite
}

@keyframes rotate {
    100% {
        transform: rotate(360deg)
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124
    }
}

.el-message {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    min-width: 300px;
    padding: 10px 12px;
    box-sizing: border-box;
    border-radius: 2px;
    position: fixed;
    left: 50%;
    top: 20px;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #fff;
    transition: opacity .3s, transform .4s;
    overflow: hidden
}

.el-message .el-icon-circle-check {
    color: #13ce66
}

.el-message .el-icon-circle-cross {
    color: #ff4949
}

.el-message .el-icon-information {
    color: #50bfff
}

.el-message .el-icon-warning {
    color: #f7ba2a
}

.el-message__group {
    margin-left: 38px;
    position: relative;
    height: 20px;
    line-height: 20px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center
}

.el-message__group p {
    font-size: 12px;
    margin: 0 34px 0 0;
    color: #8391a5;
    text-align: justify
}

.el-step__head,
.el-steps.is-horizontal.is-center {
    text-align: center
}

.el-message__group.is-with-icon {
    margin-left: 0
}

.el-message__img {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0
}

.el-message__icon {
    vertical-align: middle;
    margin-right: 8px
}

.el-message__closeBtn {
    top: 3px;
    right: 0;
    position: absolute;
    cursor: pointer;
    color: #bfcbd9;
    font-size: 12px
}

.el-message__closeBtn:hover {
    color: #97a8be
}

.el-message-fade-enter,
.el-message-fade-leave-active {
    opacity: 0;
    -ms-transform: translate(-50%, -100%);
    transform: translate(-50%, -100%)
}

.el-badge {
    position: relative;
    vertical-align: middle;
    display: inline-block
}

.el-badge__content {
    background-color: #ff4949;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    border: 1px solid #fff
}

.el-badge__content.is-dot {
    width: 8px;
    height: 8px;
    padding: 0;
    right: 0;
    border-radius: 50%
}

.el-badge__content.is-fixed {
    top: 0;
    right: 10px;
    position: absolute;
    -ms-transform: translateY(-50%) translateX(100%);
    transform: translateY(-50%) translateX(100%)
}

.el-rate__icon,
.el-rate__item {
    position: relative;
    display: inline-block
}

.el-badge__content.is-fixed.is-dot {
    right: 5px
}

.el-card {
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04)
}

.el-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #d1dbe5;
    box-sizing: border-box
}

.el-card__body {
    padding: 20px
}

.el-rate {
    height: 20px;
    line-height: 1
}

.el-rate__item {
    font-size: 0;
    vertical-align: middle
}

.el-rate__icon {
    font-size: 18px;
    margin-right: 6px;
    color: #bfcbd9;
    transition: .3s
}

.el-rate__decimal,
.el-rate__icon .path2 {
    position: absolute;
    top: 0;
    left: 0
}

.el-rate__icon.hover {
    -ms-transform: scale(1.15);
    transform: scale(1.15)
}

.el-rate__decimal {
    display: inline-block;
    overflow: hidden
}

.el-rate__text {
    font-size: 12px;
    vertical-align: middle
}

.el-steps {
    font-size: 0
}

.el-steps>:last-child .el-step__line {
    display: none
}

.el-step.is-horizontal,
.el-step.is-vertical .el-step__head,
.el-step.is-vertical .el-step__main,
.el-step__line {
    display: inline-block
}

.el-step {
    position: relative;
    vertical-align: top
}

.el-step:last-child .el-step__main {
    padding-right: 0
}

.el-step.is-vertical .el-step__main {
    padding-left: 10px
}

.el-step__line {
    position: absolute;
    border-color: inherit;
    background-color: #bfcbd9
}

.el-step__line.is-vertical {
    width: 2px;
    box-sizing: border-box;
    top: 32px;
    bottom: 0;
    left: 15px
}

.el-step__line.is-horizontal {
    top: 15px;
    height: 2px;
    left: 32px;
    right: 0
}

.el-step__line.is-icon.is-horizontal {
    right: 4px
}

.el-step__line-inner {
    display: block;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    transition: all 150ms;
    width: 0;
    height: 0
}

.el-step__icon {
    display: block;
    line-height: 28px
}

.el-step__icon>* {
    line-height: inherit;
    vertical-align: middle
}

.el-step__head {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: transparent;
    line-height: 28px;
    font-size: 28px;
    vertical-align: top;
    transition: all 150ms
}

.el-carousel__arrow,
.el-carousel__button {
    margin: 0;
    transition: .3s;
    cursor: pointer;
    outline: 0
}

.el-step__head.is-finish {
    color: #20a0ff;
    border-color: #20a0ff
}

.el-step__head.is-error {
    color: #ff4949;
    border-color: #ff4949
}

.el-step__head.is-success {
    color: #13ce66;
    border-color: #13ce66
}

.el-step__head.is-process,
.el-step__head.is-wait {
    color: #bfcbd9;
    border-color: #bfcbd9
}

.el-step__head.is-text {
    font-size: 12px;
    border-width: 2px;
    border-style: solid
}

.el-step__head.is-text.is-finish {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff
}

.el-step__head.is-text.is-error {
    color: #fff;
    background-color: #ff4949;
    border-color: #ff4949
}

.el-step__head.is-text.is-success {
    color: #fff;
    background-color: #13ce66;
    border-color: #13ce66
}

.el-step__head.is-text.is-wait {
    color: #bfcbd9;
    background-color: #fff;
    border-color: #bfcbd9
}

.el-step__head.is-text.is-process {
    color: #fff;
    background-color: #bfcbd9;
    border-color: #bfcbd9
}

.el-step__main {
    white-space: normal;
    padding-right: 10px;
    text-align: left
}

.el-step__title {
    font-size: 12px;
    line-height: 32px;
    display: inline-block
}

.el-step__title.is-finish {
    font-weight: 700;
    color: #20a0ff
}

.el-step__title.is-error {
    font-weight: 700;
    color: #ff4949
}

.el-step__title.is-success {
    font-weight: 700;
    color: #13ce66
}

.el-step__title.is-wait {
    font-weight: 400;
    color: #97a8be
}

.el-step__title.is-process {
    font-weight: 700;
    color: #48576a
}

.el-step__description {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px
}

.el-step__description.is-finish {
    color: #20a0ff
}

.el-step__description.is-error {
    color: #ff4949
}

.el-step__description.is-success {
    color: #13ce66
}

.el-step__description.is-wait {
    color: #bfcbd9
}

.el-step__description.is-process {
    color: #8391a5
}

.el-carousel {
    overflow-x: hidden;
    position: relative
}

.el-carousel__container {
    position: relative;
    height: 300px
}

.el-carousel__arrow {
    border: none;
    padding: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, .11);
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 10;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
    font-size: 12px
}

.el-carousel__arrow:hover {
    background-color: rgba(31, 45, 61, .23)
}

.el-carousel__arrow i {
    cursor: pointer
}

.el-carousel__arrow--left {
    left: 16px
}

.el-carousel__arrow--right {
    right: 16px
}

.el-carousel__indicators {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 2
}

.el-carousel__indicators--outside {
    bottom: 26px;
    text-align: center;
    position: static;
    -ms-transform: none;
    transform: none
}

.el-carousel__indicators--outside .el-carousel__indicator:hover button {
    opacity: .64
}

.el-carousel__indicators--outside button {
    background-color: #8391a5;
    opacity: .24
}

.el-carousel__indicators--labels {
    left: 0;
    right: 0;
    -ms-transform: none;
    transform: none;
    text-align: center
}

.el-carousel__indicators--labels .el-carousel__button {
    width: auto;
    height: auto;
    padding: 2px 18px;
    font-size: 12px
}

.el-carousel__indicators--labels .el-carousel__indicator {
    padding: 6px 4px
}

.el-carousel__indicator {
    display: inline-block;
    background-color: transparent;
    padding: 12px 4px;
    cursor: pointer
}

.el-carousel__indicator:hover button {
    opacity: .72
}

.el-carousel__indicator.is-active button {
    opacity: 1
}

.el-carousel__button {
    display: block;
    opacity: .48;
    width: 30px;
    height: 2px;
    background-color: #fff;
    border: none;
    padding: 0
}

.carousel-arrow-left-enter,
.carousel-arrow-left-leave-active {
    -ms-transform: translateY(-50%) translateX(-10px);
    transform: translateY(-50%) translateX(-10px);
    opacity: 0
}

.carousel-arrow-right-enter,
.carousel-arrow-right-leave-active {
    -ms-transform: translateY(-50%) translateX(10px);
    transform: translateY(-50%) translateX(10px);
    opacity: 0
}

.el-scrollbar {
    overflow: hidden;
    position: relative
}

.el-scrollbar:active .el-scrollbar__bar,
.el-scrollbar:focus .el-scrollbar__bar,
.el-scrollbar:hover .el-scrollbar__bar {
    opacity: 1;
    transition: opacity 340ms ease-out
}

.el-scrollbar__wrap {
    overflow: scroll
}

.el-scrollbar__wrap--hidden-default::-webkit-scrollbar {
    width: 0;
    height: 0
}

.el-scrollbar__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(151, 168, 190, .3);
    transition: .3s background-color
}

.el-scrollbar__thumb:hover {
    background-color: rgba(151, 168, 190, .5)
}

.el-scrollbar__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 120ms ease-out
}

.el-scrollbar__bar.is-horizontal {
    height: 6px;
    left: 2px
}

.el-scrollbar__bar.is-horizontal>div {
    height: 100%
}

.el-scrollbar__bar.is-vertical {
    width: 6px;
    top: 2px
}

.el-scrollbar__bar.is-vertical>div {
    width: 100%
}

.el-carousel__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    transition: .4s ease-in-out;
    overflow: hidden;
    z-index: 0
}

.el-carousel__item.is-active {
    z-index: 2
}

.el-carousel__item--card {
    width: 50%
}

.el-carousel__item--card.is-in-stage {
    cursor: pointer;
    z-index: 1
}

.el-carousel__item--card.is-active,
.el-cascader .el-icon-circle-close,
.el-cascader-menus {
    z-index: 2
}

.el-carousel__item--card.is-in-stage.is-hover .el-carousel__mask,
.el-carousel__item--card.is-in-stage:hover .el-carousel__mask {
    opacity: .12
}

.el-carousel__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    opacity: .24;
    transition: .2s
}

.el-collapse {
    border: 1px solid #dfe6ec;
    border-radius: 0
}

.el-collapse-item:last-child {
    margin-bottom: -1px
}

.el-collapse-item.is-active>.el-collapse-item__header .el-collapse-item__header__arrow {
    -ms-transform: rotate(90deg);
    transform: rotate(90deg)
}

.el-collapse-item__header {
    height: 43px;
    line-height: 43px;
    padding-left: 15px;
    background-color: #fff;
    color: #48576a;
    cursor: pointer;
    border-bottom: 1px solid #dfe6ec;
    font-size: 12px
}

.el-collapse-item__header__arrow {
    margin-right: 8px;
    transition: transform .3s
}

.el-collapse-item__wrap {
    will-change: height;
    background-color: #fbfdff;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #dfe6ec
}

.el-collapse-item__content {
    padding: 10px 15px;
    font-size: 12px;
    color: #1f2d3d;
    line-height: 1.769230769230769
}

.el-cascader {
    display: inline-block;
    position: relative
}

.el-cascader .el-input,
.el-cascader .el-input__inner {
    cursor: pointer
}

.el-cascader .el-input__icon {
    transition: none
}

.el-cascader .el-icon-caret-bottom {
    transition: transform .3s
}

.el-cascader .el-icon-caret-bottom.is-reverse {
    -ms-transform: rotate(180deg);
    transform: rotateZ(180deg)
}

.el-cascader.is-disabled .el-cascader__label {
    z-index: 2;
    color: #bbb
}

.el-cascader__label {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    line-height: 34px;
    padding: 0 25px 0 10px;
    color: #1f2d3d;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 12px;
    text-align: left
}

.el-cascader__label span {
    color: #97a8be
}

.el-cascader--large {
    font-size: 16px
}

.el-cascader--large .el-cascader__label {
    line-height: 40px
}

.el-cascader--small {
    font-size: 12px
}

.el-cascader--small .el-cascader__label {
    line-height: 28px
}

.el-cascader-menus {
    white-space: nowrap;
    background: #fff;
    position: absolute;
    margin: 5px 0;
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-cascader-menu {
    display: inline-block;
    vertical-align: top;
    height: 204px;
    overflow: auto;
    border-right: solid 1px #d1dbe5;
    background-color: #fff;
    box-sizing: border-box;
    margin: 0;
    padding: 6px 0;
    min-width: 160px
}

.el-cascader-menu:last-child {
    border-right: 0
}

.el-cascader-menu__item {
    font-size: 12px;
    padding: 8px 30px 8px 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #48576a;
    height: 36px;
    line-height: 1.5;
    box-sizing: border-box;
    cursor: pointer
}

.el-cascader-menu__item:hover {
    background-color: #e4e8f1
}

.el-cascader-menu__item.selected {
    color: #fff;
    background-color: #20a0ff
}

.el-cascader-menu__item.selected.hover {
    background-color: #1c8de0
}

.el-cascader-menu__item.is-active {
    color: #fff;
    background-color: #20a0ff
}

.el-cascader-menu__item.is-active:hover {
    background-color: #1c8de0
}

.el-cascader-menu__item.is-disabled {
    color: #bfcbd9;
    background-color: #fff;
    cursor: not-allowed
}

.el-cascader-menu__item.is-disabled:hover {
    background-color: #fff
}

.el-cascader-menu__item__keyword {
    font-weight: 700
}

.el-cascader-menu__item--extensible:after {
    font-size: 12px;
    -ms-transform: scale(.8);
    transform: scale(.8);
    color: #bfcbd9;
    position: absolute;
    right: 10px;
    margin-top: 1px
}

.el-cascader-menu--flexible {
    height: auto;
    max-height: 180px;
    overflow: auto
}

.el-cascader-menu--flexible .el-cascader-menu__item {
    overflow: visible
}

.el-color-hue-slider {
    position: relative;
    box-sizing: border-box;
    width: 280px;
    height: 12px;
    background-color: red;
    padding: 0 2px
}

.el-color-hue-slider.is-vertical {
    width: 12px;
    height: 180px;
    padding: 2px 0
}

.el-color-hue-slider.is-vertical .el-color-hue-slider__bar {
    background: linear-gradient(to bottom, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red 100%)
}

.el-color-hue-slider.is-vertical .el-color-hue-slider__thumb {
    left: 0;
    top: 0;
    width: 100%;
    height: 4px
}

.el-color-hue-slider__bar {
    position: relative;
    background: linear-gradient(to right, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red 100%);
    height: 100%
}

.el-color-hue-slider__thumb {
    position: absolute;
    cursor: pointer;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    border-radius: 1px;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px rgba(0, 0, 0, .6);
    z-index: 1
}

.el-color-svpanel {
    position: relative;
    width: 280px;
    height: 180px
}

.el-color-svpanel__black,
.el-color-svpanel__white {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0
}

.el-color-svpanel__white {
    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0))
}

.el-color-svpanel__black {
    background: linear-gradient(to top, #000, rgba(0, 0, 0, 0))
}

.el-color-svpanel__cursor {
    position: absolute
}

.el-color-svpanel__cursor>div {
    cursor: head;
    width: 4px;
    height: 4px;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 1px 2px rgba(0, 0, 0, .4);
    border-radius: 50%;
    -ms-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px)
}

.el-color-alpha-slider {
    position: relative;
    box-sizing: border-box;
    width: 280px;
    height: 12px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)
}

.el-color-alpha-slider.is-vertical {
    width: 20px;
    height: 180px
}

.el-color-alpha-slider.is-vertical .el-color-alpha-slider__bar {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%)
}

.el-color-alpha-slider.is-vertical .el-color-alpha-slider__thumb {
    left: 0;
    top: 0;
    width: 100%;
    height: 4px
}

.el-color-alpha-slider__bar {
    position: relative;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%);
    height: 100%
}

.el-color-alpha-slider__thumb {
    position: absolute;
    cursor: pointer;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    border-radius: 1px;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px rgba(0, 0, 0, .6);
    z-index: 1
}

.el-color-dropdown {
    width: 300px
}

.el-color-dropdown__main-wrapper {
    margin-bottom: 6px
}

.el-color-dropdown__main-wrapper::after {
    content: ;
    display: table;
    clear: both
}

.el-color-dropdown__btns {
    margin-top: 6px;
    text-align: right
}

.el-color-dropdown__value {
    float: left;
    line-height: 26px;
    font-size: 12px;
    color: #1f2d3d
}

.el-color-dropdown__btn {
    border: 1px solid #dcdcdc;
    color: #333;
    line-height: 24px;
    border-radius: 2px;
    padding: 0 20px;
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    font-size: 12px
}

.el-color-dropdown__btn[disabled] {
    color: #ccc;
    cursor: not-allowed
}

.el-color-dropdown__btn:hover {
    color: #20a0ff;
    border-color: #20a0ff
}

.el-color-dropdown__link-btn {
    cursor: pointer;
    color: #20a0ff;
    text-decoration: none;
    padding: 15px;
    font-size: 12px
}

.el-color-dropdown__link-btn:hover {
    color: #4db3ff
}

.el-color-picker {
    display: inline-block;
    position: relative;
    line-height: normal
}

.el-color-picker__trigger {
    display: inline-block;
    box-sizing: border-box;
    height: 36px;
    padding: 6px;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    font-size: 0
}

.el-color-picker__color {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #666;
    width: 22px;
    height: 22px;
    text-align: center
}

.el-color-picker__color.is-alpha {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)
}

.el-color-picker__color-inner {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0
}

.el-color-picker__empty {
    font-size: 12px;
    vertical-align: middle;
    color: #666;
    position: absolute;
    top: 4px;
    left: 4px
}

.el-color-picker__icon {
    display: inline-block;
    position: relative;
    top: -6px;
    margin-left: 8px;
    width: 12px;
    color: #888;
    font-size: 12px
}

.el-input,
.el-input__inner {
    width: 100%;
    display: inline-block
}

.el-color-picker__panel {
    position: absolute;
    z-index: 10;
    padding: 6px;
    background-color: #fff;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12)
}

.el-input {
    position: relative;
    font-size: 12px
}

.el-input.is-disabled .el-input__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #bbb;
    cursor: not-allowed
}

.el-input.is-disabled .el-input__inner::-webkit-input-placeholder {
    color: #bfcbd9
}

.el-input.is-disabled .el-input__inner::-moz-placeholder {
    color: #bfcbd9
}

.el-input.is-disabled .el-input__inner:-ms-input-placeholder {
    color: #bfcbd9
}

.el-input.is-disabled .el-input__inner::placeholder {
    color: #bfcbd9
}

.el-input.is-active .el-input__inner {
    outline: 0;
    border-color: #20a0ff
}

.el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
}

.el-button,
.el-checkbox-button__inner {
    -webkit-appearance: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    outline: 0;
    text-align: center
}

.el-input__inner::-webkit-input-placeholder {
    color: #97a8be
}

.el-input__inner::-moz-placeholder {
    color: #97a8be
}

.el-input__inner:-ms-input-placeholder {
    color: #97a8be
}

.el-input__inner::placeholder {
    color: #97a8be
}

.el-input__inner:hover {
    border-color: #8391a5
}

.el-input__inner:focus {
    outline: 0;
    border-color: #20a0ff
}

.el-input__icon {
    position: absolute;
    width: 35px;
    height: 100%;
    right: 0;
    top: 0;
    text-align: center;
    color: #bfcbd9;
    transition: all .3s
}

.el-input__icon:after {
    content: ;
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle
}

.el-input__icon+.el-input__inner {
    padding-right: 35px
}

.el-input__icon.is-clickable:hover {
    cursor: pointer;
    color: #8391a5
}

.el-input__icon.is-clickable:hover+.el-input__inner {
    border-color: #8391a5
}

.el-input--large {
    font-size: 16px
}

.el-input--large .el-input__inner {
    height: 42px
}

.el-input--small {
    font-size: 12px
}

.el-input--small .el-input__inner {
    height: 30px
}

.el-input--mini {
    font-size: 12px
}

.el-input--mini .el-input__inner {
    height: 22px
}

.el-input-group {
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate
}

.el-input-group>.el-input__inner {
    vertical-align: middle;
    display: table-cell
}

.el-input-group__append,
.el-input-group__prepend {
    background-color: #fbfdff;
    color: #97a8be;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    padding: 0 10px;
    width: 1px;
    white-space: nowrap
}

.el-input-group--prepend .el-input__inner,
.el-input-group__append {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
}

.el-input-group--append .el-input__inner,
.el-input-group__prepend {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
}

.el-input-group__append .el-button,
.el-input-group__append .el-select,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-select {
    display: block;
    margin: -10px
}

.el-input-group__append button.el-button,
.el-input-group__append div.el-select .el-input__inner,
.el-input-group__append div.el-select:hover .el-input__inner,
.el-input-group__prepend button.el-button,
.el-input-group__prepend div.el-select .el-input__inner,
.el-input-group__prepend div.el-select:hover .el-input__inner {
    border-color: transparent;
    background-color: transparent;
    color: inherit;
    border-top: 0;
    border-bottom: 0
}

.el-input-group__append .el-button,
.el-input-group__append .el-input,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-input {
    font-size: inherit
}

.el-button,
.el-textarea__inner {
    font-size: 12px;
    box-sizing: border-box
}

.el-input-group__prepend {
    border-right: 0
}

.el-input-group__append {
    border-left: 0
}

.el-textarea {
    display: inline-block;
    width: 100%;
    vertical-align: bottom
}

.el-textarea.is-disabled .el-textarea__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #bbb;
    cursor: not-allowed
}

.el-textarea.is-disabled .el-textarea__inner::-webkit-input-placeholder {
    color: #bfcbd9
}

.el-textarea.is-disabled .el-textarea__inner::-moz-placeholder {
    color: #bfcbd9
}

.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder {
    color: #bfcbd9
}

.el-textarea.is-disabled .el-textarea__inner::placeholder {
    color: #bfcbd9
}

.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 7px;
    line-height: 1.5;
    width: 100%;
    color: #1f2d3d;
    background-color: #fff;
    background-image: none;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
}

.el-textarea__inner::-webkit-input-placeholder {
    color: #97a8be
}

.el-textarea__inner::-moz-placeholder {
    color: #97a8be
}

.el-textarea__inner:-ms-input-placeholder {
    color: #97a8be
}

.el-textarea__inner::placeholder {
    color: #97a8be
}

.el-textarea__inner:hover {
    border-color: #8391a5
}

.el-textarea__inner:focus {
    outline: 0;
    border-color: #20a0ff
}

.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px
}

.el-button+.el-button {
    margin-left: 10px
}

.el-button:focus,
.el-button:hover {
    color: #20a0ff;
    border-color: #20a0ff
}

.el-button:active {
    color: #1d90e6;
    border-color: #1d90e6;
    outline: 0
}

.el-button::-moz-focus-inner {
    border: 0
}

.el-button [class*=el-icon-]+span {
    margin-left: 5px
}

.el-button.is-loading {
    position: relative;
    pointer-events: none
}

.el-button.is-loading:before {
    pointer-events: none;
    content: ;
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, .35)
}

.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5
}

.el-checkbox,
.el-checkbox__input {
    cursor: pointer;
    display: inline-block;
    position: relative;
    white-space: nowrap
}

.el-button.is-disabled.el-button--text {
    background-color: transparent
}

.el-button.is-disabled.is-plain,
.el-button.is-disabled.is-plain:focus,
.el-button.is-disabled.is-plain:hover {
    background-color: #fff;
    border-color: #d1dbe5;
    color: #bfcbd9
}

.el-button.is-active {
    color: #1d90e6;
    border-color: #1d90e6
}

.el-button.is-plain:focus,
.el-button.is-plain:hover {
    background: #fff;
    border-color: #20a0ff;
    color: #20a0ff
}

.el-button.is-plain:active {
    background: #fff;
    border-color: #1d90e6;
    color: #1d90e6;
    outline: 0
}

.el-button--primary {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff
}

.el-button--primary:focus,
.el-button--primary:hover {
    background: #4db3ff;
    border-color: #4db3ff;
    color: #fff
}

.el-button--primary.is-active,
.el-button--primary:active {
    background: #1d90e6;
    border-color: #1d90e6;
    color: #fff
}

.el-button--primary:active {
    outline: 0
}

.el-button--primary.is-plain {
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d
}

.el-button--primary.is-plain:focus,
.el-button--primary.is-plain:hover {
    background: #fff;
    border-color: #20a0ff;
    color: #20a0ff
}

.el-button--primary.is-plain:active {
    background: #fff;
    border-color: #1d90e6;
    color: #1d90e6;
    outline: 0
}

.el-button--success {
    color: #fff;
    background-color: #13ce66;
    border-color: #13ce66
}

.el-button--success:focus,
.el-button--success:hover {
    background: #42d885;
    border-color: #42d885;
    color: #fff
}

.el-button--success.is-active,
.el-button--success:active {
    background: #11b95c;
    border-color: #11b95c;
    color: #fff
}

.el-button--success:active {
    outline: 0
}

.el-button--success.is-plain {
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d
}

.el-button--success.is-plain:focus,
.el-button--success.is-plain:hover {
    background: #fff;
    border-color: #13ce66;
    color: #13ce66
}

.el-button--success.is-plain:active {
    background: #fff;
    border-color: #11b95c;
    color: #11b95c;
    outline: 0
}

.el-button--warning {
    color: #fff;
    background-color: #f7ba2a;
    border-color: #f7ba2a
}

.el-button--warning:focus,
.el-button--warning:hover {
    background: #f9c855;
    border-color: #f9c855;
    color: #fff
}

.el-button--warning.is-active,
.el-button--warning:active {
    background: #dea726;
    border-color: #dea726;
    color: #fff
}

.el-button--warning:active {
    outline: 0
}

.el-button--warning.is-plain {
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d
}

.el-button--warning.is-plain:focus,
.el-button--warning.is-plain:hover {
    background: #fff;
    border-color: #f7ba2a;
    color: #f7ba2a
}

.el-button--warning.is-plain:active {
    background: #fff;
    border-color: #dea726;
    color: #dea726;
    outline: 0
}

.el-button--danger {
    color: #fff;
    background-color: #ff4949;
    border-color: #ff4949
}

.el-button--danger:focus,
.el-button--danger:hover {
    background: #ff6d6d;
    border-color: #ff6d6d;
    color: #fff
}

.el-button--danger.is-active,
.el-button--danger:active {
    background: #e64242;
    border-color: #e64242;
    color: #fff
}

.el-button--danger:active {
    outline: 0
}

.el-button--danger.is-plain {
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d
}

.el-button--danger.is-plain:focus,
.el-button--danger.is-plain:hover {
    background: #fff;
    border-color: #ff4949;
    color: #ff4949
}

.el-button--danger.is-plain:active {
    background: #fff;
    border-color: #e64242;
    color: #e64242;
    outline: 0
}

.el-button--info {
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff
}

.el-button--info:focus,
.el-button--info:hover {
    background: #73ccff;
    border-color: #73ccff;
    color: #fff
}

.el-button--info.is-active,
.el-button--info:active {
    background: #48ace6;
    border-color: #48ace6;
    color: #fff
}

.el-button--info:active {
    outline: 0
}

.el-button--info.is-plain {
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d
}

.el-button--info.is-plain:focus,
.el-button--info.is-plain:hover {
    background: #fff;
    border-color: #50bfff;
    color: #50bfff
}

.el-button--info.is-plain:active {
    background: #fff;
    border-color: #48ace6;
    color: #48ace6;
    outline: 0
}

.el-button--large {
    padding: 11px 19px;
    font-size: 16px;
    border-radius: 4px
}

.el-button--small {
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 4px
}

.el-button--mini {
    padding: 4px;
    font-size: 12px;
    border-radius: 4px
}

.el-button--text {
    border: none;
    color: #20a0ff;
    background: 0 0;
    padding-left: 0;
    padding-right: 0
}

.el-button--text:focus,
.el-button--text:hover {
    color: #4db3ff
}

.el-button--text:active {
    color: #1d90e6
}

.el-button-group {
    display: inline-block;
    vertical-align: middle
}

.el-button-group .el-button--primary:first-child {
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--primary:last-child {
    border-left-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--primary:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, .5);
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--success:first-child {
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--success:last-child {
    border-left-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--success:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, .5);
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--warning:first-child {
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--warning:last-child {
    border-left-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--warning:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, .5);
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--danger:first-child {
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--danger:last-child {
    border-left-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--danger:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, .5);
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--info:first-child {
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--info:last-child {
    border-left-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button--info:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, .5);
    border-right-color: rgba(255, 255, 255, .5)
}

.el-button-group .el-button {
    float: left;
    position: relative
}

.el-button-group .el-button+.el-button {
    margin-left: 0
}

.el-button-group .el-button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
}

.el-button-group .el-button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
}

.el-button-group .el-button:not(:first-child):not(:last-child) {
    border-radius: 0
}

.el-button-group .el-button:not(:last-child) {
    margin-right: -1px
}

.el-button-group .el-button.is-active,
.el-button-group .el-button:active,
.el-button-group .el-button:focus,
.el-button-group .el-button:hover {
    z-index: 1
}

.el-checkbox {
    color: #1f2d3d;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none
}

.el-checkbox+.el-checkbox {
    margin-left: 15px
}

.el-checkbox__input {
    outline: 0;
    line-height: 1;
    vertical-align: middle
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #20a0ff;
    border-color: #0190fe
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    content: ;
    position: absolute;
    display: block;
    border: 1px solid #fff;
    margin-top: -1px;
    left: 3px;
    right: 3px;
    top: 50%
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner::after {
    display: none
}

.el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #20a0ff
}

.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #20a0ff;
    border-color: #0190fe
}

.el-checkbox__input.is-checked .el-checkbox__inner::after {
    -ms-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1)
}

.el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
    cursor: not-allowed
}

.el-checkbox__input.is-disabled .el-checkbox__inner::after {
    cursor: not-allowed;
    border-color: #eef1f6
}

.el-checkbox__input.is-disabled .el-checkbox__inner+.el-checkbox__label {
    cursor: not-allowed
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #d1dbe5;
    border-color: #d1dbe5
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff
}

.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
    background-color: #d1dbe5;
    border-color: #d1dbe5
}

.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
    border-color: #fff
}

.el-checkbox__input.is-disabled+.el-checkbox__label {
    color: #bbb;
    cursor: not-allowed
}

.el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46)
}

.el-checkbox__inner:hover {
    border-color: #20a0ff
}

.el-checkbox__inner::after {
    box-sizing: content-box;
    content: ;
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 8px;
    left: 5px;
    position: absolute;
    top: 1px;
    -ms-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 4px;
    transition: transform .15s cubic-bezier(.71, -.46, .88, .6) .05s;
    -ms-transform-origin: center;
    transform-origin: center
}

.el-checkbox__original {
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    left: -999px
}

.el-checkbox-button,
.el-checkbox-button__inner {
    position: relative;
    display: inline-block
}

.el-checkbox__label {
    font-size: 12px;
    padding-left: 5px
}

.el-checkbox-button.is-checked .el-checkbox-button__inner {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    box-shadow: -1px 0 0 0 #20a0ff
}

.el-checkbox-button.is-disabled .el-checkbox-button__inner {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
    box-shadow: none
}

.el-checkbox-button__inner,
.el-transfer-panel {
    background: #fff;
    vertical-align: middle;
    box-sizing: border-box
}

.el-checkbox-button.is-focus .el-checkbox-button__inner {
    border-color: #20a0ff
}

.el-checkbox-button:first-child .el-checkbox-button__inner {
    border-left: 1px solid #bfcbd9;
    border-radius: 4px 0 0 4px;
    box-shadow: none!important
}

.el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 0 4px 4px 0
}

.el-checkbox-button__inner {
    line-height: 1;
    white-space: nowrap;
    border: 1px solid #bfcbd9;
    border-left: 0;
    color: #1f2d3d;
    margin: 0;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 0
}

.el-checkbox-button__inner:hover {
    color: #20a0ff
}

.el-checkbox-button__inner [class*=el-icon-] {
    line-height: .9
}

.el-checkbox-button__inner [class*=el-icon-]+span {
    margin-left: 5px
}

.el-checkbox-button__original {
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    visibility: hidden;
    left: -999px
}

.el-checkbox-button--large .el-checkbox-button__inner {
    padding: 11px 19px;
    font-size: 16px;
    border-radius: 0
}

.el-checkbox-button--small .el-checkbox-button__inner {
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 0
}

.el-checkbox-button--mini .el-checkbox-button__inner {
    padding: 4px;
    font-size: 12px;
    border-radius: 0
}

.el-transfer {
    font-size: 12px
}

.el-transfer__buttons {
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px
}

.el-transfer__buttons .el-button {
    display: block;
    margin: 0 auto;
    padding: 8px 12px
}

.el-transfer-panel__item+.el-transfer-panel__item,
.el-transfer__buttons .el-button [class*=el-icon-]+span {
    margin-left: 0
}

.el-transfer__buttons .el-button:first-child {
    margin-bottom: 6px
}

.el-transfer-panel {
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    display: inline-block;
    width: 200px;
    position: relative
}

.el-transfer-panel .el-transfer-panel__header {
    height: 36px;
    line-height: 36px;
    background: #fbfdff;
    margin: 0;
    padding-left: 20px;
    border-bottom: 1px solid #d1dbe5;
    box-sizing: border-box;
    color: #1f2d3d
}

.el-transfer-panel .el-transfer-panel__footer {
    height: 36px;
    background: #fff;
    margin: 0;
    padding: 0;
    border-top: 1px solid #d1dbe5;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1
}

.el-transfer-panel .el-transfer-panel__footer:after {
    display: inline-block;
    content: ;
    height: 100%;
    vertical-align: middle
}

.el-transfer-panel .el-transfer-panel__footer .el-checkbox {
    padding-left: 20px;
    color: #8391a5
}

.el-transfer-panel .el-transfer-panel__empty {
    margin: 0;
    height: 32px;
    line-height: 32px;
    padding: 6px 20px 0;
    color: #8391a5
}

.el-transfer-panel .el-checkbox__label {
    padding-left: 14px
}

.el-transfer-panel .el-checkbox__inner {
    width: 14px;
    height: 14px;
    border-radius: 3px
}

.el-transfer-panel .el-checkbox__inner::after {
    height: 6px;
    width: 3px;
    left: 4px
}

.el-transfer-panel__body {
    padding-bottom: 36px;
    height: 246px
}

.el-transfer-panel__list {
    margin: 0;
    padding: 6px 0;
    list-style: none;
    height: 246px;
    overflow: auto;
    box-sizing: border-box
}

.el-transfer-panel__list.is-filterable {
    height: 214px
}

.el-transfer-panel__item {
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
    display: block
}

.el-transfer-panel__item .el-checkbox__label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    box-sizing: border-box;
    padding-left: 28px
}

.el-transfer-panel__item .el-checkbox__input {
    position: absolute;
    top: 9px
}

.el-transfer-panel__item.el-checkbox {
    color: #48576a
}

.el-transfer-panel__item:hover {
    background: #e4e8f1
}

.el-transfer-panel__filter {
    margin-top: 10px;
    text-align: center;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box
}

.el-transfer-panel__filter .el-input__inner {
    height: 22px;
    width: 100%;
    display: inline-block;
    box-sizing: border-box
}

.el-transfer-panel__filter .el-input__icon {
    right: 10px
}

.el-transfer-panel__filter .el-icon-circle-close {
    cursor: pointer
}

.sy-dialog__header {
    background-color: #20a0ff;
}

.el-table .el-table__body .fa {
    color: #20a0ff;
}

.sy-header-nav {
    background-color: #20a0ff;
}

.sy-footer {
    background-color: #20a0ff;
}

.sy-theme-row>p {
    color: #20a0ff;
}

.sy-menu-item,
.sy-menu-item-o,
.sy-submenu__title {
    color: #20a0ff;
}

.sy-menu-item-o {
    color: #20a0ff;
}

.sy-menu-item-o.is-active {
    background-color: #20a0ff;
}

.sy-menu--horizontal .sy-submenu>.sy-menu {
    border: 1px solid #20a0ff;
}

.sy-menu--horizontal>.sy-menu-item:hover,
.sy-menu--horizontal>.sy-submenu.is-active .sy-submenu__title,
.sy-menu--horizontal>.sy-submenu:hover .sy-submenu__title {
    border-bottom: 5px solid #20a0ff
}

.sy-menu--horizontal.sy-menu--dark .sy-submenu .sy-menu-item.is-active,
.sy-menu-item.is-active,
.sy-menu-item.is-active .left-text {
    color: #20a0ff
}

.sy-submenu.is-active .sy-submenu__title {
    border-bottom-color: #20a0ff
}

.sy-submenu__icon-arrow {
    color: #20a0ff;
}

ul.sy-left-icon-nav>li {
    color: #20a0ff;
}

ul.sy-float-ul-box>li {
    color: #20a0ff;
}

ul.sy-left-icon-nav>li:hover {
    background: #20a0ff;
}

ul.sy-left-icon-nav>li.sy-active-item-icon {
    background: #20a0ff;
}

ul.sy-float-ul-box>li:hover {
    background-color: #20a0ff;
}

.sy-left-nav-icon-color {
    color: #20a0ff;
}

.change-menu-icon {
    color: #20a0ff;
}

.selectUsers .u-top {
    border: 1px solid #d1dbe5;
}

.selectUsers .line {
    border-right: 1px dashed #d1dbe5;
}

.selectUsers .u-top .u-header {
    background: #e4e8f1;
}

.ztree li span.button.chk.radio_false_full_focus {
    cursor: pointer;
    border-color: #20a0ff
}

.ztree li span.button.chk.radio_true_full,
.ztree li span.button.chk.radio_true_full_focus,
.ztree li span.button.chk.radio_true_part {
    border-color: #20a0ff;
    background: #20a0ff;
}

.ztree li span.button.chk.radio_true_part_focus {
    border-color: #20a0ff;
}

.ztree li span.button.chk.checkbox_true_part_focus {
    background-color: #20a0ff;
    border-color: #0190fe
}

.ztree li span.button.chk.checkbox_true_part {
    background-color: #20a0ff;
    border-color: #0190fe
}

.ztree li span.button.chk.checkbox_true_full {
    background-color: #20a0ff;
    border-color: #0190fe;
}

.ztree li span.button.chk.checkbox_true_full_focus {
    background-color: #20a0ff;
    border-color: #0190fe;
}

.ztree li span.button.chk.checkbox_false_full_focus {
    border-color: #20a0ff
}

.sy-login-panel .el-input-group__prepend {
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.sy-login-panel .el-input-group__prepend .fa {
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.sy-tabs .el-tabs__item.is-active {
    color: #20a0ff;
}

.sy-tabs .el-tabs__active-bar {
    background-color: #20a0ff;
}

.sy-desktop-slide-open {
    background-color: #20a0ff;
}

.sy-rule-setBox .sy-rule-setBox__header {
    background-color: #20a0ff;
}

.sy-el-fontTheme {
    color: #20a0ff;
}

.sy-el-leftNavli {
    background-color: #20a0ff;
}

.sy-el-leftNavli:hover {
    background-color: #1c8de0!important;
    ;
}

.sy-el-frontTitle__info {
    color: #20a0ff;
}

.sy-el-fontColor {
    color: #20a0ff;
}

.sy-el-header__tab ul {
    border: 1px solid #20a0ff;
}

.sy-el-header__tab ul li {
    border-right: 1px solid #20a0ff;
}

.sy-el-backgroundColor {
    background-color: #20a0ff;
    color: #fff;
}

.sy-rc .el-tooltip__popper.sy-rc-popper.is-dark,
.sy-rc .header-row-logo .header-row-logo-right .btn select,
.sy-rc .header-row-logo .header-row-logo-right .btn .search-btn,
.sy-rc .el-radio-button__orig-radio:checked+.el-radio-button__inner,
.sy-rc .sy-rc-dropdown,
.sy-rc .border,
.sy-rc .sy-tabs.vertical,
.sy-rc .sy-rc-myrc-confirm-btn:hover,
.sy-rc .sy-rc-myrc-confirm-btn:focus,
.sy-rc .sy-rc .sy-btn-detali-down .el-button--success,
.sy-rc .sy-rc-nav-cont {
    border-color: #20a0ff;
}

.sy-rc .header-row-logo .header-row-logo-right .btn .search-btn,
.sy-rc .header-row-menu,
.sy-rc .header-row-menu .el-menu-demo,
.sy-rc .header-row-menu .el-menu-demo .sy-header-row-menu-item,
.sy-rc .backShijiUnite,
.sy-rc .el-radio-button__orig-radio:checked+.el-radio-button__inner,
.sy-rc .sy-rc-btn-input:checked+span.sy-rc-btn-radio__label,
.sy-rc .bgcol32A525,
.sy-rc .sy-tabs-header,
.sy-rc .sy-rc-header,
.sy-rc .sy-myrc-menu-radio__label,
.sy-rc .sy-hot-rc,
.sy-rc .sy-rc-myrc-confirm-btn,
.sy-rc .sy-myrc-details-header,
.sy-rc .sy-tab-details-header,
.sy-rc .ShowListData .header .title1,
.sy-rc .ShowListData .content .main li a:hover span,
.sy-rc .tab_top .el-radio-button__inner,
.sy-rc .tab_top .el-radio-button__orig-radio:checked+.el-radio-button__inner,
.sy-rc .goTop,
.sy-rc .sy-nav-pub-header,
.sy-rc .sy-btn-course,
.sy-rc .pubCourse .detailLeft .perInfo .li1 span:before,
.sy-rc .pubCourse .detailLeft .treelist:before,
.sy-rc .sy-btn-detali-down .el-button--success,
.sy-rc .Detail .detailLeft .perInfo .li1 span:before,
.sy-rc .Detail .detailLeft .resList .smallList .title:before,
.sy-rc .Detail .detailLeft .resAbout .smallList .title:before,
.sy-rc .logo,
.sy-rc .uploadBtn,
.sy-rc .detailListBtn,
.sy-rc .proListDownBtn,
.sy-rc .stuListDownBtn,
.sy-rc downLoadFile .sy-rc .sy-btn-detail-downLoad,
.sy-rc .pubCourse .detailLeft .treelist span:before,
.sy-rc .imgBoxheader,
.sy-rc .sy-rc-nav-title,
.sy-rc .sy-rc-progress.el-progress .el-progress-bar__inner {
    background-color: #20a0ff;
}

.sy-rc .vertical .sy-tabs-header-input:checked+.sy-tabs-header-item-span span,
.sy-rc .vertical .sy-tabs-header-input:checked+.sy-tabs-header-item-span+span,
.sy-rc .rcFontLv,
.sy-rc .sy-myrc-menu-input:checked+span.sy-myrc-menu-radio__label,
.sy-rc .sy-myrc-details-input:checked+span.sy-myrc-details-radio__label,
.sy-rc .sy-rc-myrc-cancel-btn:hover,
.sy-rc .sy-rc-myrc-cancel-btn:focus,
.sy-rc .sy-lf .fontLv,
.sy-rc .sy-rc-dropdown li.fontLv,
.sy-rc .sy-rc-dropdown .el-dropdown-menu__item:not(.is-disabled):hover,
.sy-rc .sy-tabs.vertical .sy-tabs-header-input:checked+.sy-tabs-header-item-span,
.sy-rc .firstData .mainList .titles,
.sy-rc .sy-nav-pub-header>ul li.active,
.sy-rc .discu .listMain .plTitle .pl li span i,
.sy-rc .discuss .listMain .plTitle .pl li a i,
.sy-rc .li2 .realName,
.sy-rc .Detail .detailLeft .resList .smallList .title i b,
.sy-rc .sy-tabs .sy-tabs-header-input:checked+.sy-tabs-header-item-span,
.sy-rc-nav-cont li:hover a,
.sy-rc-nav-cont li.active a,
.sy-rc .newsInfo .fontLv,
.sy-rc .selectManage,
.sy-rc .imgBoxheader>ul li.active,
.sy-rc .vertical .sy-tabs-header-item:hover span,
.sy-rc .termName+ul li:hover,
.sy-rc .termName+ul li.active {
    color: #20a0ff;
}

.sy-rc .el-radio-button__orig-radio:checked+.el-radio-button__inner,
.sy-rc .tab_top .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    box-shadow: -1px 0 0 0 #20a0ff;
}

.sy-rc .rc-footer .sy-footer,
.sy-rc .sy-myrc-details-input:checked+span.sy-myrc-details-radio__label,
.sy-rc .pubCourse .detailLeft .treelist {
    border-top-color: #20a0ff;
}

.sy-rc .newsTj .sy-lf+.sy-lf,
.sy-rc .sy-rc-btn {
    border-left-color: #20a0ff;
}

.sy-rc .pubCourse .detailLeft .perInfo .li1,
.sy-rc .Detail .detailLeft .perInfo .li1,
.sy-rc .sy-rc-nav-cont li {
    border-bottom-color: #20a0ff;
}

.sy-rc .sy-rc-btn-group {
    border-top-color: #20a0ff;
    border-right-color: #20a0ff;
    border-bottom-color: #20a0ff;
}

.sy-rc .header-row-menu .el-menu-demo .sy-header-row-menu-item:hover,
.sy-rc .header-row-menu .el-menu-demo .sy-header-row-menu-item.is-active,
.sy-rc .sy-tabs .sy-tabs-header-input:checked+.sy-tabs-header-item-span {
    border-bottom-color: #1d90e6;
}

.sy-rc .header-row-menu .el-menu-demo .sy-header-row-menu-item:hover,
.sy-rc .header-row-menu .el-menu-demo .sy-header-row-menu-item.is-active,
.sy-rc .sy-tab-details-input:checked+.title span.sy-tab-details-radio__label,
.sy-rc .sy-nav-pub-header>ul li.active:before,
.sy-rc .sy-btn-detali-down .el-button--success:focus,
.sy-rc .sy-btn-detali-down .el-button--success:hover,
.sy-rc .tab_top .el-radio-button__orig-radio:checked+.el-radio-button__inner,
.sy-rc .sy-pro-menu-input:checked+span.sy-pro-menu-radio__label,
.sy-rc .sy-pro .sy-pro-menu-radio__label {
    background-color: #1d90e6;
}

.sy-rc .sy-tabs .sy-tabs-header-input:checked+.sy-tabs-header-item-span,
.sy-rc .sy-tab-details-input:checked+.title span.sy-tab-details-radio__label {
    border-top-color: #1d90e6;
}

.sy-rc .BoxImgPanel .des {
    background-color: #1d90e6;
}

.sy-rc .imgBoxheader>ul li.active:before {
    background-color: #1d90e6;
}

.sy-rc .BoxImgPanel .des .teacher {
    color: #d1dbe5;
}

.sy-rc .search .leftNav .header {
    background-color: #20a0ff;
}

.sy-rc .search .searchContent>.header {
    background-color: #20a0ff;
}

.sy-rc .tabs.normal {
    background-color: #20a0ff;
    border-top: 3px solid #20a0ff;
}

.sy-rc .tabs.normal .tabItem {
    background-color: #20a0ff;
}

.sy-rc .tabs.card .tabItem.active {
    color: #20a0ff;
}

.sy-rc .tabs.card .tabItem.active::before {
    background-color: #20a0ff;
}

.sy-rc .tabs.normal .tabItem.active {
    color: #20a0ff;
}

.sy-rc .searchPagination .control.active {
    background-color: #20a0ff;
    border-color: #20a0ff;
}

.sy-rc .searchPagination .el-pagination .el-pager li.active {
    background-color: #20a0ff;
    border-color: #20a0ff;
}

.sy-rc .search .leftNav .header .choosePanel .chooseBtn {
    background-color: #20a0ff;
}

.sy-rc .show .icon {
    color: #20a0ff;
}`