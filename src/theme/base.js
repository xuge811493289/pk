export default `@charset "UTF-8";#app {
  font-family: , Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  font-size: 12px;
  overflow: auto;
  color: #666;
}




.fade-enter-active,
.fade-leave-active {
  
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}


body>textarea {
    display: none;
}

.relative {
    position: relative;
}




.el-table .el-table__body .fa {
    color: #20a0ff;
    font-size: 16px
}

.el-table .el-table__body .fa:hover {
    opacity: .8;
}

.el-table .el-table__body .fa-pencil-square-o {
    color: #20a0ff;
}

.el-table .el-table__body .el-icon-delete {
    color: #ff4949;
    font-size: 16px
}




.el-pagination {
    white-space: nowrap;
    padding: 2px 0px;
    color: #48576a
}




.el-select__tags-text {
    display: inline-block;
    width: 65px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
}


/* .el-select:after {
    content: ;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    width: 20px;
    height: 20px;
    margin: auto 0;
    background: #fff;
} */

.el-select .el-input .el-input__icon {
    z-index: 10;
}




.sy-sc-app-container {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
}

.sy-app-container {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #FAFCFB;
}

.sy-home-header {
    position: absolute;
    top: 0px;
    height: 60px;
    width: 100%;
    background-color: #f5f7fa;
    box-sizing: border-box;
}

.sy-home-body {
    position: absolute;
    top: 60px;
    bottom: 40px;
    width: 100%;
    background-color: #FAFCFB;
    box-sizing: border-box;
}




.sy-home-body .sy-home-body-left {
    box-sizing: border-box;
    position: absolute;
    width: 230px;
    height: 100%;
}




.sy-home-body .sy-home-body-right {
    box-sizing: border-box;
    position: absolute;
    left: 230px;
    right: 0px;
    height: 100%;
}

.sy-home-footer {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
}




.sy-menu-item-o.is-active .sy-left-nav-icon-color {
    color: #fff;
}



















.change-menu-icon>i {
    transition: transform .4s;
    transform-origin: 50% 50%;
}

.iocn-rotate-l {
    -ms-transform: rotate(180deg);
    transform: rotateZ(180deg)
}

.xing:after {
    display: inline-block;
    color: red;
    vertical-align: middle;
    content: ;
    color: #ff4949;
    margin-right: 4px;
}

.header-title {
    color: #fff;
    text-shadow: 5px 5px 5px #FF0000;
}

.change-menu-icon {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    z-index: 1000;
    color: #20a0ff;
    cursor: pointer;
}

.app-top-nav {
    position: absolute;
    top: 0;
    height: 60px;
    width: 100%;
    left: 0;
}

.sy-app-footer {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
}


/* @media screen and (max-width:1120px) and (min-width:720px){
    .app-left-nav{
      width: 230px;
    }
    .app-container{
      left: 230px;
    }
  }
  @media screen and (max-width:720px){
    .app-left-nav{
      width: 155px;
    }
    .app-container{
      left: 155px;
    }
  }
  @media screen and (max-width:320px){
    .app-left-nav{
      width: 40px;
    }
    .app-container{
      left: 40px;
    }
  } */

.sy-up {
    position: absolute;
    top: 0;
    height: 40px;
    width: 100%;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
}

.sy-down {
    position: absolute;
    top: 40px;
    width: 100%;
    bottom: 0px;
    box-sizing: border-box;
    padding: 0 10px;
    overflow-x: auto;
}




.app-container-box {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

.app-container-box .box-header {
    text-align: right;
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    height: 45px;
}

.app-container-box .box-table {
    position: absolute;
    top: 65px;
    left: 20px;
    right: 20px;
    bottom: 65px;
    overflow: hidden;
}

.app-container-box .box-footer {
    position: absolute;
    height: 45px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    overflow: hidden;
}

.app-container-box .pagination {
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 45px;
    box-sizing: border-box;
    padding-top: 10px;
}




.sy-row {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
}

.sy-col {
    float: left;
    vertical-align: top;
    box-sizing: border-box;
}

.sy-1 {
    width: 5%;
}

.sy-2 {
    width: 10%;
}

.sy-3 {
    width: 15%;
}

.sy-4 {
    width: 20%;
}

.sy-5 {
    width: 25%;
}

.sy-6 {
    width: 30%;
}

.sy-7 {
    width: 35%;
}

.sy-8 {
    width: 40%;
}

.sy-9 {
    width: 45%;
}

.sy-10 {
    width: 50%;
}

.sy-11 {
    width: 55%;
}

.sy-12 {
    width: 60%;
}

.sy-13 {
    width: 65%;
}

.sy-14 {
    width: 70%;
}

.sy-15 {
    width: 75%;
}

.sy-16 {
    width: 80%;
}

.sy-17 {
    width: 85%;
}

.sy-18 {
    width: 90%;
}

.sy-19 {
    width: 95%;
}

.sy-20 {
    width: 100%;
}




.border {
    border: 1px solid #ccc;
}

.full-parent {
    position: relative;
    height: 100%;
    margin: 0 10px;
    overflow: hidden;
    overflow-x: auto;
    overflow-y: auto;
}

.full-parent-height {
    position: absolute;
    height: 100%;
    left: 10px;
    right: 10px;
    width: auto;
}

.line-height-56 {
    line-height: 40px;
}

.pagination-mf {
    margin-top: 4px;
    float: right;
}

.padding-top-13 {
    padding-top: 13px;
}

.padding-top-5 {
    padding-top: 5px;
}

.padding-bottom-5 {
    padding-bottom: 5px;
}

.pt5 {
    padding-top: 5px;
}

.pt10 {
    padding-top: 10px;
}

.pl5 {
    padding-left: 5px
}

.pl10 {
    padding-left: 10px
}

.pl15 {
    padding-left: 15px
}

.pl30 {
    padding-left: 30px
}

.pr10 {
    padding-right: 10px
}

.mt5 {
    margin-top: 5px
}

.mb5 {
    margin-bottom: 5px
}

.mr5 {
    margin-right: 5px;
}

.mr10 {
    margin-right: 10px;
}

.right {
    text-align: right;
}

.left {
    text-align: left;
}

.center {
    text-align: center;
}

.sy-lf {
    float: left
}

.sy-rf {
    float: right
}

.clear {
    clear: both;
}

.fontLv {
    color: #32A525
}

.fontRed {
    color: red
}

.fontWhite {
    color: #fff
}

.fontGray {
    color: #ccc
}

.fontBlack {
    color: #333
}

.bgGary {
    background: #EDEDED
}

.positionRelative {
    position: relative;
}

.hg30 {
    line-height: 30px
}




.sy-icon-xing .el-form-item__label:before {
    content: ;
    display: inline-block;
    vertical-align: middle;
    color: #ff4949;
    margin-right: 4px;
}




.open-hide {
    position: absolute;
    top: 40%;
    left: 0;
    cursor: pointer;
    z-index: 500;
}




.sy-top {
    position: absolute;
    top: 0;
    height: 45px;
    width: 100%;
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 15px;
}

.sy-body {
    position: absolute;
    top: 45px;
    width: 100%;
    bottom: 45px;
    box-sizing: border-box;
    padding: 15px;
}

.sy-bottom {
    position: absolute;
    height: 45px;
    width: 100%;
    bottom: 0;
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 15px;
}




.sy-span-resAuth {
    display: inline-block;
    width: 90%;
    font-size: 12px;
}

.sy-span-resAuth:hover>.sy-span-resBtn {
    display: inline-block;
}

.sy-span-resBtn {
    display: none;
    margin-left: 20px;
}

.sy-span-kpconf {
    display: inline-block;
    width: 90%;
    font-size: 14px;
}

span.sy-span-kpconf:hover>span.sy-span-resBtn {
    
    display: inline-block;
}

.resTree .el-tree-node__expand-icon {
    vertical-align: 0px;
}




.sy-tabs-divide .el-tabs__header {
    margin-bottom: 0px;
    background: #EEF1F6;
}

.sy-tabs-divide .el-tabs__item {
    height: 40px;
    line-height: 40px;
}

.sy-div-transBox .el-transfer-panel {
    width: 45%;
    height: 100%;
}

.sy-tabs-divide .el-tabs__content {
    position: absolute;
    top: 40px;
    left: 0px;
    bottom: 0px;
    right: 0px;
}

.sy-tabs-divide .el-tabs__content .el-tab-pane {
    height: 100%;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__header {
    height: 40.8px;
    line-height: 45px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__body {
    box-sizing: border-box;
    height: 100%;
    padding-bottom: 0px;
    padding-top: 40.8px;
    position: relative;
    top: -40.8px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__list {
    height: 100%;
    padding: 6px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__filter {
    position: absolute;
    top: -33.4px;
    width: 40%;
    right: 8%;
    margin-top: 0px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__footer {
    height: 40.8px;
    border-top: 0px;
    top: 0px;
    line-height: 40.8px;
    border-bottom: 1px solid #D1DBE5;
    background: #FBFDFF;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__footer .el-checkbox {
    padding-left: 26px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__footer .el-checkbox__label {
    display: none;
}

.sy-div-transBox .el-transfer__buttons {
    padding: 0px;
    width: 10%;
    padding-top: 20%;
}

.sy-div-divideImport .el-input__inner {
    padding-right: 27px;
}

.el-submenu__title {
    border-bottom: 1px solid #ddd;
}

.sy-div-transBox .el-transfer-panel:first-child {
    float: right;
}

.sy-div-transBox .el-transfer-panel:last-child {
    float: left;
}




.sy-about-top {
    height: 45px;
    line-height: 45px;
}

.sy-about-top .sy-about-logo {
    vertical-align: middle;
}

.sy-about-logo-text {
    font-size: 18px;
    font-weight: bold;
}

.sy-about-cont {
    padding: 20px 0 50px;
}

.sy-about-cont p {
    margin: 0;
    line-height: 25px;
}

.sy-about-cont p span+span {
    display: block;
    margin-left: 70px;
    vertical-align: top;
}

.sy-about-foot {
    line-height: 25px;
    border-top: 1px solid #48576a;
    padding-top: 10px
}




.el-table {
    
}

.el-table::before {
    
}

.el-table::after {
    
}




.kpTree .el-tree-node__expand-icon {
    vertical-align: 0px;
}

.newNodeForm .el-checkbox:nth-child(1) {
    margin-left: 15px;
}

.newNodeForm .el-checkbox {
    margin-bottom: 8px;
}




.sy-tabs {
    position: absolute;
    height: 40px;
    width: 100%;
    background-color: #FBFCFC;
    border-bottom: 1px solid rgb(221, 221, 221);
}

.sy-tabs .el-tabs__header {
    margin: 0
}

.sy-tabs .el-tabs__item.is-active {
    color: #20a0ff;
    font-weight: bold
}

.sy-tabs .el-tabs__active-bar {
    background-color: #20a0ff;
    height: 2px;
    bottom: 2px;
}

.sy-tabs-body {
    position: absolute;
    top: 40px;
    left: 0;
    bottom: 0;
    width: 100%;
}




.sy-checkBox-appCenter .el-checkbox:nth-child(3) {
    margin-left: 0;
}




.newNodeForm .el-form-item__error {
    padding-left: 17px;
}




.el-tree {
    border: none;
}

.sy-condition {
    font-size: 12px;
    font-weight: normal;
    padding-right: 10px;
}




.dialogs .el-form-item__label {
    padding: 0;
    line-height: 3;
}

.el-table__row .table-radio .el-radio__label {
    display: none;
}




.sy-form-sign .el-form-item__error {
    padding-top: 4px;
}




.sy-import {
    font-size: 14px;
}

.sy-import .sy-import-title {
    display: block;
    padding: 10px 0;
    font-weight: 700;
    font-size: 15px;
}

.sy-import .sy-import-button,
.sy-import .sy-import-file-name {
    vertical-align: middle;
    height: 30px;
}

.sy-import .sy-import-button {
    margin-left: 15px;
}

.sy-import .sy-import-file-name {
    display: inline-block;
    padding: 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.sy-import .sy-import-file-name .fa {
    float: right;
    height: 28px;
    width: 28px;
    line-height: 28px;
    color: #fb9a53;
    text-align: center;
    vertical-align: middle;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #EEF1F6;
    font-size: 16px;
    transition: all 3s;
}

.sy-import .sy-import-file-name:hover .fa {
    text-indent: 2px;
}

.sy-import .sy-import-file-name:hover .fa:before {
    content: ;
}

.sy-import .sy-import-file-name-div {
    display: inline-block;
    float: left;
    min-width: 169px;
    height: 100%;
    line-height: 28px;
    overflow: hidden;
    text-align: left;
    padding: 0px 5px;
}

.sy-import .sy-import-msg {
    height: 200px;
    line-height: 30px;
    overflow-y: auto;
}

.sy-import .sy-import-parms {
    line-height: 30px;
    padding-left: 28px;
}

.sy-import .sy-import-parms .sy-import-parms-body {
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.sy-import .sy-import-parms .sy-import-parms-body .sy-import-parms-body-header,
.sy-import .sy-import-parms .sy-import-parms-body .sy-import-parms-body-footer {
    padding: 7px 10px;
}

.sy-import .sy-import-parms .sy-import-parms-body .sy-import-parms-body-body {
    border-top: 1px solid #bfcbd9;
    border-bottom: 1px solid #bfcbd9;
    padding: 10px;
}

.sy-import .sy-import-msg .sy-import-msg-div {
    padding-left: 2em;
}

.sy-import .sy-import-msg .sy-import-msg-div .fail,
.sy-import .sy-import-msg .sy-import-msg-div .success,
.sy-import-info .sy-import-info-node .fa {
    font-size: 16px;
    vertical-align: top;
    display: inline-block;
    line-height: 30px;
    width: 25px;
    text-align: left;
    color: green;
    font-family: element-icons!important;
}

.sy-import .sy-import-msg .sy-import-msg-div .fail {
    color: red;
}

.sy-import .sy-import-msg .sy-import-msg-div .success:before {
    content: ;
}

.sy-import .sy-import-msg .sy-import-msg-div .fail:before {
    content: ;
}

.sy-import .sy-import-info {
    line-height: 30px;
    padding-left: 2em;
}

.sy-import .sy-import-info .sy-import-info-node .fa {
    color: #fb9a53;
}

.sy-import .sy-import-info .sy-import-info-node .fa:before {
    content: ;
}




.sy-form-ip .el-form-item__error {
    padding-top: 4px;
}




.dateForm .el-form-item__error {
    padding-top: 4px;
}




.sy-courses-dialog .el-table__body-wrapper .cell {
    padding: 0px 5px;
}

.sy-courses-dialog .el-table__body-wrapper .cell .el-form-item,
.sy-courses-dialog .el-table__body-wrapper .cell .el-form-item__content {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-bottom: 0px;
}

.sy-courses-update-dialog .el-form-item__error {
    padding: 0px;
}

.fa {
    font-size: 16px;
}

.cp {
    cursor: pointer;
}

.vam {
    vertical-align: middle;
}

.ztree.sy-course-tree li span.button.course_type:before,
.ztree.sy-course-tree li span.button.ico_close.course_type:before {
    content: ;
    font-size: 16px;
}

.ztree.sy-course-tree li span.button.ico_open.course_type:before {
    content: ;
    font-size: 16px;
}

.ztree.sy-course-tree li span.button.course:before,
.ztree.sy-course-tree li span.button.ico_close.course:before,
.ztree.sy-course-tree li span.button.ico_open.course:before {
    content: ;
    font-size: 16px;
}

.ztree.sy-course-tree li span.button.ico_docu.course:before {
    content: ;
    font-size: 16px;
}




.sy-div-radioClass .el-radio-group .el-radio {
    padding: 5px 0px;
}

.sy-div-radioClass .el-radio-group .el-radio:nth-of-type(1) {
    margin-left: 15px;
}

.sy-div-transBox .el-transfer {
    height: 100%;
    position: relative;
}

.sy-div-transBox .el-transfer__buttons .el-button:first-child {
    position: relative;
    top: 37px;
    margin-bottom: 0px;
}

.sy-div-transBox .el-transfer__buttons .el-button:last-child {
    position: relative;
    top: -37px;
}

.sy-div-transBox .el-transfer__buttons .el-icon-arrow-right:before {
    content: ;
}

.sy-div-transBox .el-transfer__buttons .el-icon-arrow-left:before {
    content: ;
}




.sy-dialog .el-form-item__error {
    padding-top: 1px;
}




.sy-btn-oprate-group {
    display: inline-block;
    height: 17px;
    line-height: 17px;
}

.sy-btn-oprate-group .el-icon-plus,
.sy-btn-oprate-group .fa-pencil-square-o,
.sy-btn-oprate-group .el-icon-delete {
    cursor: pointer;
    vertical-align: middle;
}

.sy-btn-oprate-group .el-icon-plus {
    color: green;
    font-size: 15px
}

.sy-btn-oprate-group .fa.fa-pencil-square-o {
    margin: 0 5px;
    font-size: 17px;
}




.sy-empty-text {
    position: absolute;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    text-align: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}

.sy-base-eduAffair-table .el-table__fixed {
    width: 222px !important;
}#app {
  font-family: , Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  font-size: 12px;
  overflow: auto;
  color: #666;
}




.fade-enter-active,
.fade-leave-active {
  
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}


body>textarea {
    display: none;
}

.relative {
    position: relative;
}




.el-table .el-table__body .fa {
    color: #20a0ff;
    font-size: 16px
}

.el-table .el-table__body .fa:hover {
    opacity: .8;
}

.el-table .el-table__body .fa-pencil-square-o {
    color: #20a0ff;
}

.el-table .el-table__body .el-icon-delete {
    color: #ff4949;
    font-size: 16px
}




.el-pagination {
    white-space: nowrap;
    padding: 2px 0px;
    color: #48576a
}




.el-select__tags-text {
    display: inline-block;
    width: 65px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
}


/* .el-select:after {
    content: ;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    width: 20px;
    height: 20px;
    margin: auto 0;
    background: #fff;
} */

.el-select .el-input .el-input__icon {
    z-index: 10;
}




.sy-sc-app-container {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
}

.sy-app-container {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #FAFCFB;
}

.sy-home-header {
    position: absolute;
    top: 0px;
    height: 60px;
    width: 100%;
    background-color: #f5f7fa;
    box-sizing: border-box;
}

.sy-home-body {
    position: absolute;
    top: 60px;
    bottom: 40px;
    width: 100%;
    background-color: #FAFCFB;
    box-sizing: border-box;
}




.sy-home-body .sy-home-body-left {
    box-sizing: border-box;
    position: absolute;
    width: 230px;
    height: 100%;
}




.sy-home-body .sy-home-body-right {
    box-sizing: border-box;
    position: absolute;
    left: 230px;
    right: 0px;
    height: 100%;
}

.sy-home-footer {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
}




.sy-menu-item-o.is-active .sy-left-nav-icon-color {
    color: #fff;
}



















.change-menu-icon>i {
    transition: transform .4s;
    transform-origin: 50% 50%;
}

.iocn-rotate-l {
    -ms-transform: rotate(180deg);
    transform: rotateZ(180deg)
}

.xing:after {
    display: inline-block;
    color: red;
    vertical-align: middle;
    content: ;
    color: #ff4949;
    margin-right: 4px;
}

.header-title {
    color: #fff;
    text-shadow: 5px 5px 5px #FF0000;
}

.change-menu-icon {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    z-index: 1000;
    color: #20a0ff;
    cursor: pointer;
}

.app-top-nav {
    position: absolute;
    top: 0;
    height: 60px;
    width: 100%;
    left: 0;
}

.sy-app-footer {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
}


/* @media screen and (max-width:1120px) and (min-width:720px){
    .app-left-nav{
      width: 230px;
    }
    .app-container{
      left: 230px;
    }
  }
  @media screen and (max-width:720px){
    .app-left-nav{
      width: 155px;
    }
    .app-container{
      left: 155px;
    }
  }
  @media screen and (max-width:320px){
    .app-left-nav{
      width: 40px;
    }
    .app-container{
      left: 40px;
    }
  } */

.sy-up {
    position: absolute;
    top: 0;
    height: 40px;
    width: 100%;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
}

.sy-down {
    position: absolute;
    top: 40px;
    width: 100%;
    bottom: 0px;
    box-sizing: border-box;
    padding: 0 10px;
    overflow-x: auto;
}




.app-container-box {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

.app-container-box .box-header {
    text-align: right;
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    height: 45px;
}

.app-container-box .box-table {
    position: absolute;
    top: 65px;
    left: 20px;
    right: 20px;
    bottom: 65px;
    overflow: hidden;
}

.app-container-box .box-footer {
    position: absolute;
    height: 45px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    overflow: hidden;
}

.app-container-box .pagination {
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 45px;
    box-sizing: border-box;
    padding-top: 10px;
}




.sy-row {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
}

.sy-col {
    float: left;
    vertical-align: top;
    box-sizing: border-box;
}

.sy-1 {
    width: 5%;
}

.sy-2 {
    width: 10%;
}

.sy-3 {
    width: 15%;
}

.sy-4 {
    width: 20%;
}

.sy-5 {
    width: 25%;
}

.sy-6 {
    width: 30%;
}

.sy-7 {
    width: 35%;
}

.sy-8 {
    width: 40%;
}

.sy-9 {
    width: 45%;
}

.sy-10 {
    width: 50%;
}

.sy-11 {
    width: 55%;
}

.sy-12 {
    width: 60%;
}

.sy-13 {
    width: 65%;
}

.sy-14 {
    width: 70%;
}

.sy-15 {
    width: 75%;
}

.sy-16 {
    width: 80%;
}

.sy-17 {
    width: 85%;
}

.sy-18 {
    width: 90%;
}

.sy-19 {
    width: 95%;
}

.sy-20 {
    width: 100%;
}




.border {
    border: 1px solid #ccc;
}

.full-parent {
    position: relative;
    height: 100%;
    margin: 0 10px;
    overflow: hidden;
    overflow-x: auto;
    overflow-y: auto;
}

.full-parent-height {
    position: absolute;
    height: 100%;
    left: 10px;
    right: 10px;
    width: auto;
}

.line-height-56 {
    line-height: 40px;
}

.pagination-mf {
    margin-top: 4px;
    float: right;
}

.padding-top-13 {
    padding-top: 13px;
}

.padding-top-5 {
    padding-top: 5px;
}

.padding-bottom-5 {
    padding-bottom: 5px;
}

.pt5 {
    padding-top: 5px;
}

.pt10 {
    padding-top: 10px;
}

.pl5 {
    padding-left: 5px
}

.pl10 {
    padding-left: 10px
}

.pl15 {
    padding-left: 15px
}

.pl30 {
    padding-left: 30px
}

.pr10 {
    padding-right: 10px
}

.mt5 {
    margin-top: 5px
}

.mb5 {
    margin-bottom: 5px
}

.mr5 {
    margin-right: 5px;
}

.mr10 {
    margin-right: 10px;
}

.right {
    text-align: right;
}

.left {
    text-align: left;
}

.center {
    text-align: center;
}

.sy-lf {
    float: left
}

.sy-rf {
    float: right
}

.clear {
    clear: both;
}

.fontLv {
    color: #32A525
}

.fontRed {
    color: red
}

.fontWhite {
    color: #fff
}

.fontGray {
    color: #ccc
}

.fontBlack {
    color: #333
}

.bgGary {
    background: #EDEDED
}

.positionRelative {
    position: relative;
}

.hg30 {
    line-height: 30px
}




.sy-icon-xing .el-form-item__label:before {
    content: ;
    display: inline-block;
    vertical-align: middle;
    color: #ff4949;
    margin-right: 4px;
}




.open-hide {
    position: absolute;
    top: 40%;
    left: 0;
    cursor: pointer;
    z-index: 500;
}




.sy-top {
    position: absolute;
    top: 0;
    height: 45px;
    width: 100%;
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 15px;
}

.sy-body {
    position: absolute;
    top: 45px;
    width: 100%;
    bottom: 45px;
    box-sizing: border-box;
    padding: 15px;
}

.sy-bottom {
    position: absolute;
    height: 45px;
    width: 100%;
    bottom: 0;
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 15px;
}




.sy-span-resAuth {
    display: inline-block;
    width: 90%;
    font-size: 12px;
}

.sy-span-resAuth:hover>.sy-span-resBtn {
    display: inline-block;
}

.sy-span-resBtn {
    display: none;
    margin-left: 20px;
}

.sy-span-kpconf {
    display: inline-block;
    width: 90%;
    font-size: 14px;
}

span.sy-span-kpconf:hover>span.sy-span-resBtn {
    
    display: inline-block;
}

.resTree .el-tree-node__expand-icon {
    vertical-align: 0px;
}




.sy-tabs-divide .el-tabs__header {
    margin-bottom: 0px;
    background: #EEF1F6;
}

.sy-tabs-divide .el-tabs__item {
    height: 40px;
    line-height: 40px;
}

.sy-div-transBox .el-transfer-panel {
    width: 45%;
    height: 100%;
}

.sy-tabs-divide .el-tabs__content {
    position: absolute;
    top: 40px;
    left: 0px;
    bottom: 0px;
    right: 0px;
}

.sy-tabs-divide .el-tabs__content .el-tab-pane {
    height: 100%;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__header {
    height: 40.8px;
    line-height: 45px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__body {
    box-sizing: border-box;
    height: 100%;
    padding-bottom: 0px;
    padding-top: 40.8px;
    position: relative;
    top: -40.8px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__list {
    height: 100%;
    padding: 6px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__filter {
    position: absolute;
    top: -33.4px;
    width: 40%;
    right: 8%;
    margin-top: 0px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__footer {
    height: 40.8px;
    border-top: 0px;
    top: 0px;
    line-height: 40.8px;
    border-bottom: 1px solid #D1DBE5;
    background: #FBFDFF;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__footer .el-checkbox {
    padding-left: 26px;
}

.sy-div-transBox .el-transfer-panel .el-transfer-panel__footer .el-checkbox__label {
    display: none;
}

.sy-div-transBox .el-transfer__buttons {
    padding: 0px;
    width: 10%;
    padding-top: 20%;
}

.sy-div-divideImport .el-input__inner {
    padding-right: 27px;
}

.el-submenu__title {
    border-bottom: 1px solid #ddd;
}

.sy-div-transBox .el-transfer-panel:first-child {
    float: right;
}

.sy-div-transBox .el-transfer-panel:last-child {
    float: left;
}




.sy-about-top {
    height: 45px;
    line-height: 45px;
}

.sy-about-top .sy-about-logo {
    vertical-align: middle;
}

.sy-about-logo-text {
    font-size: 18px;
    font-weight: bold;
}

.sy-about-cont {
    padding: 20px 0 50px;
}

.sy-about-cont p {
    margin: 0;
    line-height: 25px;
}

.sy-about-cont p span+span {
    display: block;
    margin-left: 70px;
    vertical-align: top;
}

.sy-about-foot {
    line-height: 25px;
    border-top: 1px solid #48576a;
    padding-top: 10px
}




.el-table {
    
}

.el-table::before {
    
}

.el-table::after {
    
}




.kpTree .el-tree-node__expand-icon {
    vertical-align: 0px;
}

.newNodeForm .el-checkbox:nth-child(1) {
    margin-left: 15px;
}

.newNodeForm .el-checkbox {
    margin-bottom: 8px;
}




.sy-tabs {
    position: absolute;
    height: 40px;
    width: 100%;
    background-color: #FBFCFC;
    border-bottom: 1px solid rgb(221, 221, 221);
}

.sy-tabs .el-tabs__header {
    margin: 0
}

.sy-tabs .el-tabs__item.is-active {
    color: #20a0ff;
    font-weight: bold
}

.sy-tabs .el-tabs__active-bar {
    background-color: #20a0ff;
    height: 2px;
    bottom: 2px;
}

.sy-tabs-body {
    position: absolute;
    top: 40px;
    left: 0;
    bottom: 0;
    width: 100%;
}




.sy-checkBox-appCenter .el-checkbox:nth-child(3) {
    margin-left: 0;
}




.newNodeForm .el-form-item__error {
    padding-left: 17px;
}




.el-tree {
    border: none;
}

.sy-condition {
    font-size: 12px;
    font-weight: normal;
    padding-right: 10px;
}




.dialogs .el-form-item__label {
    padding: 0;
    line-height: 3;
}

.el-table__row .table-radio .el-radio__label {
    display: none;
}




.sy-form-sign .el-form-item__error {
    padding-top: 4px;
}




.sy-import {
    font-size: 14px;
}

.sy-import .sy-import-title {
    display: block;
    padding: 10px 0;
    font-weight: 700;
    font-size: 15px;
}

.sy-import .sy-import-button,
.sy-import .sy-import-file-name {
    vertical-align: middle;
    height: 30px;
}

.sy-import .sy-import-button {
    margin-left: 15px;
}

.sy-import .sy-import-file-name {
    display: inline-block;
    padding: 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.sy-import .sy-import-file-name .fa {
    float: right;
    height: 28px;
    width: 28px;
    line-height: 28px;
    color: #fb9a53;
    text-align: center;
    vertical-align: middle;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #EEF1F6;
    font-size: 16px;
    transition: all 3s;
}

.sy-import .sy-import-file-name:hover .fa {
    text-indent: 2px;
}

.sy-import .sy-import-file-name:hover .fa:before {
    content: ;
}

.sy-import .sy-import-file-name-div {
    display: inline-block;
    float: left;
    min-width: 169px;
    height: 100%;
    line-height: 28px;
    overflow: hidden;
    text-align: left;
    padding: 0px 5px;
}

.sy-import .sy-import-msg {
    height: 200px;
    line-height: 30px;
    overflow-y: auto;
}

.sy-import .sy-import-parms {
    line-height: 30px;
    padding-left: 28px;
}

.sy-import .sy-import-parms .sy-import-parms-body {
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.sy-import .sy-import-parms .sy-import-parms-body .sy-import-parms-body-header,
.sy-import .sy-import-parms .sy-import-parms-body .sy-import-parms-body-footer {
    padding: 7px 10px;
}

.sy-import .sy-import-parms .sy-import-parms-body .sy-import-parms-body-body {
    border-top: 1px solid #bfcbd9;
    border-bottom: 1px solid #bfcbd9;
    padding: 10px;
}

.sy-import .sy-import-msg .sy-import-msg-div {
    padding-left: 2em;
}

.sy-import .sy-import-msg .sy-import-msg-div .fail,
.sy-import .sy-import-msg .sy-import-msg-div .success,
.sy-import-info .sy-import-info-node .fa {
    font-size: 16px;
    vertical-align: top;
    display: inline-block;
    line-height: 30px;
    width: 25px;
    text-align: left;
    color: green;
    font-family: element-icons!important;
}

.sy-import .sy-import-msg .sy-import-msg-div .fail {
    color: red;
}

.sy-import .sy-import-msg .sy-import-msg-div .success:before {
    content: ;
}

.sy-import .sy-import-msg .sy-import-msg-div .fail:before {
    content: ;
}

.sy-import .sy-import-info {
    line-height: 30px;
    padding-left: 2em;
}

.sy-import .sy-import-info .sy-import-info-node .fa {
    color: #fb9a53;
}

.sy-import .sy-import-info .sy-import-info-node .fa:before {
    content: ;
}




.sy-form-ip .el-form-item__error {
    padding-top: 4px;
}




.dateForm .el-form-item__error {
    padding-top: 4px;
}




.sy-courses-dialog .el-table__body-wrapper .cell {
    padding: 0px 5px;
}

.sy-courses-dialog .el-table__body-wrapper .cell .el-form-item,
.sy-courses-dialog .el-table__body-wrapper .cell .el-form-item__content {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-bottom: 0px;
}

.sy-courses-update-dialog .el-form-item__error {
    padding: 0px;
}

.fa {
    font-size: 16px;
}

.cp {
    cursor: pointer;
}

.vam {
    vertical-align: middle;
}

.ztree.sy-course-tree li span.button.course_type:before,
.ztree.sy-course-tree li span.button.ico_close.course_type:before {
    content: ;
    font-size: 16px;
}

.ztree.sy-course-tree li span.button.ico_open.course_type:before {
    content: ;
    font-size: 16px;
}

.ztree.sy-course-tree li span.button.course:before,
.ztree.sy-course-tree li span.button.ico_close.course:before,
.ztree.sy-course-tree li span.button.ico_open.course:before {
    content: ;
    font-size: 16px;
}

.ztree.sy-course-tree li span.button.ico_docu.course:before {
    content: ;
    font-size: 16px;
}




.sy-div-radioClass .el-radio-group .el-radio {
    padding: 5px 0px;
}

.sy-div-radioClass .el-radio-group .el-radio:nth-of-type(1) {
    margin-left: 15px;
}

.sy-div-transBox .el-transfer {
    height: 100%;
    position: relative;
}

.sy-div-transBox .el-transfer__buttons .el-button:first-child {
    position: relative;
    top: 37px;
    margin-bottom: 0px;
}

.sy-div-transBox .el-transfer__buttons .el-button:last-child {
    position: relative;
    top: -37px;
}

.sy-div-transBox .el-transfer__buttons .el-icon-arrow-right:before {
    content: ;
}

.sy-div-transBox .el-transfer__buttons .el-icon-arrow-left:before {
    content: ;
}




.sy-dialog .el-form-item__error {
    padding-top: 1px;
}




.sy-btn-oprate-group {
    display: inline-block;
    height: 17px;
    line-height: 17px;
}

.sy-btn-oprate-group .el-icon-plus,
.sy-btn-oprate-group .fa-pencil-square-o,
.sy-btn-oprate-group .el-icon-delete {
    cursor: pointer;
    vertical-align: middle;
}

.sy-btn-oprate-group .el-icon-plus {
    color: green;
    font-size: 15px
}

.sy-btn-oprate-group .fa.fa-pencil-square-o {
    margin: 0 5px;
    font-size: 17px;
}




.sy-empty-text {
    position: absolute;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    text-align: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}

.sy-base-eduAffair-table .el-table__fixed {
    width: 222px !important;
}`