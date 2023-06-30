<template>
  <div>
    <v-card flat>
      <div class="d-inline-block" v-if="checkInput === 1 && originality === 3" style="position: absolute;right: 10px;top: -50px">
        <v-radio-group v-model="markCheck" row @change="markAll">
          <v-radio
            label="Tất cả đạt"
            color="success"
            :value="1"
          ></v-radio>
          <v-radio
            label="Tất cả không đạt"
            color="error"
            :value="2"
          ></v-radio>
          <v-radio
            label="Tất cả chưa kiểm tra"
            color="warning"
            :value="0"
          ></v-radio>
        </v-radio-group>
      </div>
      <div class="d-inline-block" v-if="originality === 1 && !onlyView" 
        :style="formCodeInput ? 'position: absolute;left: 165px;top: -37px' : 'position: absolute;left: 210px;top: -37px'">
        <v-tooltip top>
          <v-btn slot="activator" :disabled="loadingFile" icon class="mx-0 my-0" @click.stop="loadFiles()">
            <v-badge>
              <v-icon size="24" color="#004b94">autorenew</v-icon>
            </v-badge>
          </v-btn>
          <span>Tải lại</span>
        </v-tooltip>
      </div>
      <div class="form_alpaca" style="position: relative;overflow: hidden;" v-for="(item, index) in dossierTemplateItemsFilter" v-bind:key="item.partNo">
        <v-expansion-panel expand :value="currentFormView === ('formAlpaca' + item.partNo + id) ? [true] : [false]" class="expaned__list__data">
          <v-expansion-panel-content hide-actions>
            <div slot="header" @click="stateView = false" style="background-color:#fff">
              <div style="align-items: center;background: #fff; padding-left: 25px;" :style="{width: checkStyle(item)}">
                <div class="mr-2" @click.stop="item.hasForm ? loadAlpcaFormClick(item, index) : ''" style="min-width: 20px; display: flex;">
                  <div v-if="render && originality === 3 && (formCodeInput === 'NEW' || formCodeInput === 'NEW_GROUP')" @click='$event.stopPropagation()' class="header__tphs check-template mr-2" style="width: 20px;margin-left: -15px;">
                    <v-checkbox class="my-0 py-0" v-model="item['hasTemplate']" @change="changeHasTemplate(index, item)"></v-checkbox>
                  </div>
                  <div v-if="originality === 3 && tempLienThong" @click='$event.stopPropagation()' class="header__tphs check-template mr-2" style="width: 20px;margin-left: -15px;">
                    <v-checkbox class="my-0 py-0" v-model="item['hasTemplateLienThong']" @change="changeHasTemplateLienThong(index, item)"></v-checkbox>
                  </div>
                  <div class="header__tphs" style="min-width:20px"><span class="text-bold">{{index + 1}}.</span> &nbsp;</div>
                  <div class="header__tphs" style="text-align: justify;">
                    <v-tooltip top style="max-width: 100% !important;" v-if="item.partTip && item.partTip['tip']">
                      <span slot="activator">
                        {{item.partName}}
                        <span v-if="item.required" style="color: red">&nbsp;  (*) </span>
                        <span v-if="item.hasForm" style="color:#004b94">(Bản khai trực tuyến)</span>
                      </span>
                      <span v-if="item.partTip['tip']">{{item.partTip['tip']}}</span>
                    </v-tooltip>
                    <span v-else>
                      {{item.partName}} <span v-if="item.required" style="color: red">&nbsp;  (*) </span>
                      <span v-if="item.hasForm" style="color:#004b94">(Bản khai trực tuyến)</span>
                    </span>
                    <!-- <v-tooltip top v-if="item.hasForm && item.daKhai && ((originality === 1 && item.partType !==2) || originality !== 1)">
                      <i slot="activator" style="color: #0d71bb; font-size: 13px;" class="fa fa-file-text-o" aria-hidden="true"></i>
                      <span>Biểu mẫu trực tuyến (Đã khai)</span>
                    </v-tooltip> -->
                    <!-- <v-tooltip top v-if="item.hasForm && !item.daKhai && ((originality === 1 && item.partType !==2) || originality !== 1)">
                      <i slot="activator" style="color: #0d71bb; font-size: 13px;" class="fa fa-file-o"></i>
                      <span>Biểu mẫu trực tuyến (Chưa khai)</span>
                    </v-tooltip> -->
                    &nbsp;&nbsp;
                    <v-tooltip top v-if="!item.hasForm && item.hasFileTemp">
                      <v-icon v-on:click.stop="downloadFileTemplate(item, index)" slot="activator" style="color: #0d71bb;" size="16" color="primary">save_alt</v-icon>
                      <span>Biểu mẫu điền thủ công</span>
                    </v-tooltip>
                  </div>
                </div>
                <!-- <i v-if="item.hasForm" style="font-size: 10px; color: #0d71bb; margin-left: 10px;">(Form trực tuyến)</i> 
                <span v-if="item.hasForm">&nbsp;-&nbsp;</span> 
                <i v-if="item.hasForm" style="font-size: 10px;color: #0d71bb;">({{item.daKhai ? 'Đã khai' : 'Chưa khai '}})</i> -->
                <div style="display: flex">
                  <v-text-field
                  v-model="item.fileComment"
                  placeholder="Nhập lý do"
                  v-if="checkInput === 1 && item.fileCheck === 2 && item.stateEditFileCheck"
                  :rules="[v => !!v || 'Bạn phải nhập lý do trước khi gửi']"
                  required
                  @keyup.enter="changeFileComment(item, index)"
                  @click.stop=""
                  class="ml-3"
                  ></v-text-field>
                  <v-tooltip top v-if="checkInput === 1 && item.fileCheck === 2 && item.stateEditFileCheck">
                    <v-btn slot="activator" v-on:click.stop="changeFileComment(item, index)" icon class="mx-0 my-0">
                      <v-icon size="16" class="mx-0" color="primary">send</v-icon>
                    </v-btn>
                    <span>Gửi</span>
                  </v-tooltip>
                </div>
                <i class="pl-3" v-if="item.fileComment && !item.stateEditFileCheck" style="font-size: 12px; color: #0d71bb">Lý do không đạt: {{item.fileComment}}</i>
                <v-tooltip top v-if="item.fileComment && !item.stateEditFileCheck && checkInput === 1">
                  <v-icon slot="activator" v-on:click.stop="item.stateEditFileCheck = !item.stateEditFileCheck" style="font-size: 13px; color: #0d71bb; margin-left: 10px; cursor: pointer;">edit</v-icon>
                  <span>Chỉnh sửa lý do</span>
                </v-tooltip>
                <div class="mt-0" v-for="(itemFileView, index) in dossierFilesItems" :key="index" 
                  v-if="item.partNo === itemFileView.dossierPartNo" :style="loadingFile ? 'opacity: 0.6' : ''">
                  <div v-if="originality === 1 && itemFileView.eForm && itemFileView.fileSize !== 0" :style="{width: 'calc(100% - 0px)', 'display': 'flex', 'align-items': 'center', 'background': '#fff', 'padding-left': '15px', 'font-size': '12px', 'margin-bottom': onlyView ? '5px' : '0px'}">
                    <span v-on:click.stop="viewFile2(itemFileView, index)" class="ml-1" style="cursor: pointer;">
                      <v-icon class="mr-1" v-if="itemFileView.fileSize !== 0" :color="getDocumentTypeIcon(itemFileView.fileType)['color']"
                        :size="getDocumentTypeIcon(itemFileView.fileType)['size']">
                        {{getDocumentTypeIcon(itemFileView.fileType)['icon']}}
                      </v-icon>
                      {{'TÀI LIỆU KHAI TRỰC TUYẾN'}} - 
                      <i>{{itemFileView.modifiedDate}}</i>
                    </span>
                    <v-btn title="Tải xuống" icon ripple v-on:click.stop="downloadSingleFile(itemFileView)" class="mx-0 my-0">
                      <v-icon size="14" color="primary">fas fa fa-download</v-icon>
                    </v-btn>

                    <v-btn class="my-0" title="Ký số giấy tờ" flat icon color="indigo"
                      v-if="originality === 1 && !onlyView && showKySo && !kySoSavis && String(itemFileView.fileType).toLowerCase() === 'pdf'" 
                      @click.stop="showSelectDigitalSign(itemFileView, index)"
                    >
                      <v-icon size="18">fa fa-pencil-square-o</v-icon>
                    </v-btn>
                    <!--  -->
                    <v-btn title="Ký số giấy tờ" class="my-0" flat icon color="indigo"
                      v-if="originality === 1 && !onlyView && showKySo && String(itemFileView.fileType).toLowerCase() === 'pdf' && itemFileView.signCheck != 1 && kySoSavis" 
                      @click.stop="kySoPdfUrlSavis(itemFileView, index)"
                    >
                      <v-icon size="18">fa fa-pencil-square-o</v-icon>
                    </v-btn>
                    <v-btn title="Giấy tờ đã được ký số" class="my-0" flat icon color="green"
                      v-if="originality === 1 && showKySo && String(itemFileView.fileType).toLowerCase() === 'pdf' && itemFileView.signCheck == 1 && kySoSavis" 
                    >
                      <v-icon style="color: green !important" size="18">verified</v-icon>
                    </v-btn>

                    <v-menu @click.native.stop right offset-y 
                      transition="slide-x-transition" title="Ký số tài liệu đính kèm" 
                      v-if="originality === 3 && showKySoMotCua && String(itemFileView.fileType).toLowerCase() === 'pdf'">
                      <v-btn slot="activator" flat icon color="indigo">
                        <v-icon size="18">fa fa-pencil-square-o</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'approved')">
                            <v-icon size="18" color="blue">create</v-icon> &nbsp;&nbsp; KÝ PHÊ DUYỆT
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'issued')">
                            <v-icon size="18" color="red">fas fa fa-dot-circle-o</v-icon> &nbsp;&nbsp; ĐÓNG DẤU PHÁT HÀNH
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'income')">
                            <v-icon size="16" color="green">fas fa fa-file-text</v-icon> &nbsp;&nbsp; KÝ SỐ CÔNG VĂN ĐẾN
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'copy')">
                            <v-icon size="16" color="green">fas fa fa-file-text</v-icon> &nbsp;&nbsp; SAO VĂN BẢN ĐIỆN TỬ
                          </v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                    <!--  -->
                    <v-btn title="Lưu giấy tờ vào kho" class="my-0" flat icon color="indigo"
                      v-if="originality === 3 && applicantId && !onlyView && khoTaiLieuCongDan && yeuCauSoHoa" 
                      @click.stop="showAddStorage(item, itemFileView)"
                    >
                      <v-icon size="21" style="color: green">bookmark</v-icon>
                    </v-btn>
                    <!--  -->
                  </div>
                  <div v-if="!itemFileView.eForm" :style="{width: 'calc(100% - 0px)', 'display': 'flex', 'align-items': 'center', 'background': '#fff', 'padding-left': '15px', 'font-size': '12px', 'margin-bottom': onlyView ? '5px' : '0px'}">
                    <span v-on:click.stop="viewFile2(itemFileView, index)" class="ml-1" style="cursor: pointer;">
                      <v-icon class="mr-1" v-if="itemFileView.fileSize !== 0" :color="getDocumentTypeIcon(itemFileView.fileType)['color']"
                        :size="getDocumentTypeIcon(itemFileView.fileType)['size']">
                        {{getDocumentTypeIcon(itemFileView.fileType)['icon']}}
                      </v-icon>
                      {{itemFileView.displayName}} - 
                      <i>{{itemFileView.modifiedDate}}</i>
                    </span>
                    <v-btn title="Xóa" icon ripple v-on:click.stop="deleteSingleFile(itemFileView, index)" class="mx-0 my-0" v-if="!onlyView && checkInput !== 1">
                      <v-icon style="color: red">delete_outline</v-icon>
                    </v-btn>
                    <v-btn title="Tải xuống" icon ripple v-on:click.stop="downloadSingleFile(itemFileView)" class="mx-0 my-0">
                      <v-icon size="14" color="primary">fas fa fa-download</v-icon>
                    </v-btn>
                    <!--  -->
                    <v-tooltip top v-if="originality === 3 && activePdfEditor && String(itemFileView['fileType']).toLocaleLowerCase() === 'pdf'">
                      <v-btn slot="activator" icon ripple v-on:click.stop="showEditorPdf(itemFileView)" class="mx-0 my-0">
                        <v-icon size="14" color="primary">chat</v-icon>
                      </v-btn>
                      <span>Ghi chú trên giấy tờ</span>
                    </v-tooltip>
                    <!--  -->
                    <v-btn title="Ký số giấy tờ đính kèm" class="my-0" flat icon color="indigo"
                      v-if="originality === 1 && !onlyView && showKySo && String(itemFileView.fileType).toLowerCase() === 'pdf' && !kySoSavis && !kySoVnptSmartCa" 
                      @click.stop="showSelectDigitalSign(itemFileView, index)"
                    >
                      <v-icon size="18">fa fa-pencil-square-o</v-icon>
                    </v-btn>
                    <!--  -->
                    <v-btn title="Ký số giấy tờ đính kèm" class="my-0" flat icon color="indigo"
                      v-if="originality === 1 && !onlyView && showKySo && String(itemFileView.fileType).toLowerCase() === 'pdf' && itemFileView.signCheck != 1 && kySoSavis" 
                      @click.stop="kySoPdfUrlSavis(itemFileView, index)"
                    >
                      <v-icon size="18">fa fa-pencil-square-o</v-icon>
                    </v-btn>
                    <v-btn title="Giấy tờ đã được ký số" class="my-0" flat icon color="green"
                      v-if="originality === 1 && showKySo && String(itemFileView.fileType).toLowerCase() === 'pdf' && itemFileView.signCheck == 1 && kySoSavis" 
                    >
                      <v-icon style="color: green !important" size="18">verified</v-icon>
                    </v-btn>
                    <!--  -->
                    <v-btn title="Ký số VNPT Smart CA" class="my-0" flat icon color="indigo"
                      v-if="originality === 1 && kySoVnptSmartCa && String(itemFileView.fileType).toLowerCase() === 'pdf'" 
                      @click.stop="showXacThucVnptSmartCa(itemFileView, index)"
                    >
                      <v-icon size="18">fa fa-pencil-square-o</v-icon>
                    </v-btn>
                    <!--  -->
                    <v-menu @click.native.stop right offset-y 
                      transition="slide-x-transition" title="Ký số tài liệu đính kèm" 
                      v-if="originality === 3 && showKySoMotCua && String(itemFileView.fileType).toLowerCase() === 'pdf'">
                      <v-btn slot="activator" flat icon color="indigo">
                        <v-icon size="18">fa fa-pencil-square-o</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'approved')">
                            <v-icon size="18" color="blue">create</v-icon> &nbsp;&nbsp; KÝ PHÊ DUYỆT
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'issued')">
                            <v-icon size="18" color="red">fas fa fa-dot-circle-o</v-icon> &nbsp;&nbsp; ĐÓNG DẤU PHÁT HÀNH
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'income')">
                            <v-icon size="16" color="green">fas fa fa-file-text</v-icon> &nbsp;&nbsp; KÝ SỐ CÔNG VĂN ĐẾN
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-title @click.stop="vgcaSignAction(itemFileView, index, 'copy')">
                            <v-icon size="16" color="green">fas fa fa-file-text</v-icon> &nbsp;&nbsp; SAO VĂN BẢN ĐIỆN TỬ
                          </v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                    <!--  -->
                    <v-btn title="Lưu giấy tờ vào kho" class="my-0" flat icon color="indigo"
                      v-if="originality === 3 && applicantId && !onlyView && khoTaiLieuCongDan && yeuCauSoHoa" 
                      @click.stop="showAddStorage(item, itemFileView)"
                    >
                      <v-icon size="21" style="color: green">bookmark</v-icon>
                    </v-btn>
                    <!-- <v-btn title="Đã lưu vào kho" class="my-0" flat icon color="green"
                      v-if="originality === 3 && applicantId && !onlyView && khoTaiLieuCongDan && yeuCauSoHoa && giayToDaLuu.indexOf(itemFileView.dossierFileId) == -1" 
                    >
                      <v-icon size="18">task_alt</v-icon>
                    </v-btn> -->
                    <!--  -->
                  </div>
                </div>
                <div v-if="dossierFilesApplicant && dossierFilesApplicant.length" class="mr-3 my-2 py-2" :id="'fileApplicant-'+item.partNo" 
                  style="display:none;max-height: 250px;overflow:auto;border:1px dashed #f3ae75;border-radius: 5px;position:relative">
                  <div v-for="(itemFileView, indexFile) in dossierFilesApplicant" :key="indexFile" v-if="itemFileView.dossierTemplateNo === thongTinHoSo['dossierTemplateNo'] && item.partNo === itemFileView.dossierPartNo" >
                    <div v-if="itemFileView.eForm && itemFileView.fileSize !== 0" :style="{width: 'calc(100% - 0px)', 'display': 'flex', 'align-items': 'center', 'padding-left': '15px', 'font-size': '12px', 'margin-bottom': onlyView ? '5px' : '3px'}">
                      <v-tooltip top style="max-width:100%">
                        <span slot="activator" v-on:click.stop="viewGiayToDaNop(itemFileView)" class="" style="cursor: pointer;">
                          <i style="color: #0d71bb; font-size: 13px;" class="ml-1 fa fa-file-o"></i> &nbsp;
                          {{itemFileView.dossierTemplateNo ? itemFileView.dossierTemplateNo : itemFileView.referenceUid}}.{{itemFileView.fileType}} - 
                          <i>{{itemFileView.modifiedDate}}</i>
                        </span>
                        <span>Bản khai trực tuyến</span>
                      </v-tooltip>
                      <v-progress-circular
                      :width="2"
                      :size="25"
                      color="green"
                      indeterminate
                      v-if="progressUploadPart === itemFileView.dossierFileId"
                      ></v-progress-circular>
                      <v-tooltip top v-if="!onlyView && !progressUploadPart" class="ml-2">
                        <v-btn slot="activator" icon class="mx-0 my-0" @click="attachToDossier(itemFileView, index)">
                          <v-badge>
                            <v-icon size="16" color="orange darken-3">cloud_download</v-icon>
                          </v-badge>
                        </v-btn>
                        <span>Sử dụng giấy tờ này</span>
                      </v-tooltip>
                    </div>
                    <div v-else :style="{width: 'calc(100% - 0px)', 'display': 'flex', 'align-items': 'center', 'padding-left': '15px', 'font-size': '12px', 'margin-bottom': onlyView ? '5px' : '3px'}">
                      <v-tooltip top style="max-width:100%">
                        <span slot="activator" v-on:click.stop="viewGiayToDaNop(itemFileView)" class="" style="cursor: pointer;">
                          <v-icon style="color: #0d71bb" v-if="itemFileView.fileSize !== 0">attach_file</v-icon>
                          {{itemFileView.displayName}} - 
                          <i>{{itemFileView.modifiedDate}}</i>
                        </span>
                        <span>Đính kèm</span>
                      </v-tooltip>
                      <v-progress-circular
                      :width="2"
                      :size="25"
                      color="green"
                      indeterminate
                      v-if="progressUploadPart === itemFileView.dossierFileId"
                      ></v-progress-circular>
                      <v-tooltip top v-if="!onlyView && !progressUploadPart" class="ml-2">
                        <v-btn slot="activator" icon class="mx-0 my-0" @click="attachToDossier(itemFileView, index)">
                          <v-badge>
                            <v-icon size="16" color="orange darken-3">cloud_download</v-icon>
                          </v-badge>
                        </v-btn>
                        <span>Sử dụng giấy tờ này</span>
                      </v-tooltip>
                    </div>
                  </div>
                  <v-btn v-if="!khoTaiLieuCongDan" class="mx-0 my-0" flat icon color="red" style="position:absolute;right:0px;top:0px"
                  @click.stop="showFilesApplicant(item.partNo)"
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
            <v-card flat v-if="item.hasForm">
              <v-card-text style="background-color: rgba(244, 247, 213, 0.19)">
                <v-layout wrap>
                  <v-flex xs12 class="text-xs-right" v-if="!stateView">
                    <div :id="'wrapForm' + item.partNo + id" :style="pstFixed > pstEl && pstFixed < endEl + pstEl ? 'position:fixed;top:5px;z-index:101' : ''">
                      <v-btn color="primary" @click.stop="saveAlpacaForm(item, index)" 
                        v-if="item['editForm'] && item.hasForm && !onlyView && checkInput !== 1 && !item.embed"
                        :disabled="loadingApacal"
                      >
                        <i class="fa fa-spinner" aria-hidden="true" v-if="loadingApacal"></i>
                        <v-icon color="white" v-else>save</v-icon>&nbsp;
                        Lưu lại
                      </v-btn>
                      <v-btn color="primary" @click.stop="previewFormAlpaca(item, index)" v-if="item['editForm'] && item.daKhai && item.hasForm && !item.embed"
                        :disabled="loadingApacal"
                      >
                        <i class="fa fa-spinner" aria-hidden="true" v-if="loadingApacal"></i>
                        <v-icon color="white" v-else>print</v-icon>&nbsp;
                        Xem
                      </v-btn>
                      <v-btn color="primary" @click.stop="editFormAlpaca(item)" v-if="!item['editForm'] && item.hasForm && !onlyView && !item.embed">
                        <v-icon color="white">edit</v-icon>&nbsp;
                        Sửa
                      </v-btn>
                      <v-btn color="primary" @click.stop="deleteSingleFileEform(item, index)" v-if="item.daKhai && item.hasForm && !onlyView && checkInput !== 1"
                        :disabled="loadingApacal"
                      >
                        <i class="fa fa-spinner" aria-hidden="true" v-if="loadingApacal"></i>
                        <v-icon color="white" v-else>delete</v-icon>&nbsp;
                        Xóa
                      </v-btn>
                    </div>
                    <div :id="'formAlpaca' + item.partNo + id" :style='{"pointer-events: none": onlyView}' v-if="item['editForm'] && !item.embed"></div>

                    <div :style='{"pointer-events: none": onlyView}' v-if="item['editForm'] && item.embed">
                      <iframe :id="'formAlpaca' + item.partNo + id" width="100%" height="500px" frameborder="0" src=""></iframe>
                    </div>
                    <!--  -->
                    <iframe v-if="!item['editForm']" :id="'displayPDF' + item.partNo + id" src="" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
                    </iframe>
                    <!--  -->
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <div class="absolute__btn group__thanh_phan mr-1" :style="originality !== 1 ? 'top: 3px' : ''">
          <content-placeholders class="mt-1" v-if="loading">
            <content-placeholders-text :lines="1" />
          </content-placeholders>
          <v-layout row wrap v-else>
            <v-flex style="width: 100px;" class="layout wrap mr-2" v-if="originality !== 1 && !onlyView">
              <v-text-field
                title="Số lượng"
                style="width:100px"
                v-model="dossierTemplateItemsFilter[index]['recordCount']"
                append-icon="add"
                prepend-inner-icon="remove"
                @click:append="increaseCounter(index)"
                @click:prepend-inner="decreaseCounter(index)"
                clear-icon="mdi-close-circle"
                type="number"
                solo
                flat
                height="32"
                class="counter-up-down text-xs-center"
                :style="onlyView ? 'pointer-events: none' : ''"
                @input="changeRecordCount(index)"
              ></v-text-field>
            </v-flex>
            <v-flex style="width: 100px;" class="layout wrap" v-if="originality !== 1 && (item.partType === 1 || item.partType === 3) && !thongTinHoSo.online && checkInput !== 1">
              <v-autocomplete
                :items="fileMarkItems"
                hide-no-data
                v-model="dossierTemplateItemsFilter[index].fileMark"
                :style="onlyView ? 'pointer-events: none' : ''"
                @change="changeFileMark($event, index)"
              ></v-autocomplete>
            </v-flex>
            <v-flex style="width: 130px;" class="layout wrap" v-if="checkInput === 1">
              <v-select
                :items="fileCheckItems"
                item-text="text"
                item-value="value"
                v-model="dossierTemplateItemsFilter[index].fileCheck"
                @change="changeFileCheck($event, index)"
              ></v-select>
            </v-flex>
            <v-flex :style="{width: '40px', 'align-items': 'center', 'margin-left': '10px', 'margin-top': thongTinHoSo.online ? '10px' : '0px'}" class="layout wrap" v-else-if="item.fileCheck > 0">
              <v-tooltip top v-if="item.fileCheck === 1">
                <v-icon slot="activator" size="24" class="mx-0" color="primary">done</v-icon>
                <span>Đạt</span>
              </v-tooltip>
              <v-tooltip top v-else-if="item.fileCheck === 2">
                <v-icon slot="activator" size="24" class="mx-0" color="primary">close</v-icon>
                <span>Không đạt</span>
              </v-tooltip>
            </v-flex>
            <v-flex :style="{width: !onlyView ? (khoTaiLieuCongDan && partNoApplicantHasFile(item.partNo) && item.hasForm ? '170px' : '150px') : 'auto'}" :class="{'text-xs-right' : onlyView}" v-if="checkInput !== 1">
              <input v-if="item['multiple']"
              type="file"
              multiple
              style="display: none"
              :id="'file' + item.partNo"
              @change="onUploadSingleFile($event, item, index)"
              >
              <input v-else
              type="file"
              style="display: none"
              :id="'file' + item.partNo"
              @change="onUploadSingleFile($event, item, index)"
              >
              <input
              type="file"
              style="display: none"
              :id="'fileSavis' + item.partNo"
              @change="changeFileSavis($event, item, index)"
              accept=".pdf,application/pdf"
              >
              <v-tooltip top v-if="item.partType === 3 && originality === 3 && !onlyView">
                <v-btn slot="activator" @click="addFileOther(item)" icon class="mx-0 my-0">
                  <v-icon size="16" class="mx-0" color="primary">add</v-icon>
                </v-btn>
                <span>Thêm giấy tờ khác</span>
              </v-tooltip>
              <v-progress-circular
              :width="2"
              :size="25"
              color="green"
              indeterminate
              v-if="progressUploadPart === item.partNo"
              ></v-progress-circular>

              <v-tooltip top v-if="progressUploadPart !== item.partNo && item.hasForm">
                <v-btn slot="activator" icon class="mx-0 my-0" @click.stop="loadAlpcaFormClick(item, 'viewform', index)">
                  <v-badge>
                    <v-icon v-if="onlyView" size="24" color="#004b94">description</v-icon>
                    <v-icon v-else size="24" color="#004b94">edit</v-icon>
                  </v-badge>
                </v-btn>
                <span v-if="onlyView">Xem bản khai</span>
                <span v-else>Cập nhật bản khai</span>
              </v-tooltip>
              <v-tooltip top v-if="progressUploadPart + id !== item.partNo + id && item.hasForm">
                <v-btn slot="activator" icon class="mx-2 my-0" @click="exportDoc(item, index)">
                  <v-badge>
                    <v-icon size="22" color="#004b94">fas fa fa-file-word-o</v-icon>
                  </v-badge>
                </v-btn>
                <span>Tải xuống văn bản</span>
              </v-tooltip>
              <v-tooltip top v-if="progressUploadPart !== item.partNo && onlyView & item.hasForm && !nghiepvuhanghai">
                <v-btn slot="activator" class="mx-1 my-0" fab dark small color="primary" @click="loadAlpcaFormClick(item)" style="height:25px;width:25px">
                  <v-icon style="font-size: 14px;">visibility</v-icon>
                </v-btn>
                <span>Xem</span>
              </v-tooltip>

              <v-tooltip left v-if="progressUploadPart !== item.partNo && !onlyView && !khoTaiLieuCongDan">
                <v-btn slot="activator" icon class="mx-0 my-0" @click="pickFile(item)">
                  <v-badge>
                    <v-icon size="24" color="#004b94">cloud_upload</v-icon>
                  </v-badge>
                </v-btn>
                <span v-if="!item.partTip['extensions'] && !item.partTip['maxSize']">Tải giấy tờ lên</span>
                <span v-else>Tải giấy tờ lên (Chấp nhận tải lên các định dạng: {{item.partTip['extensions']}}. Tối đa {{item.partTip['maxSize']}} MB)</span>
              </v-tooltip>
              <!--  -->
              <v-tooltip left v-if="progressUploadPart !== item.partNo && !onlyView && !khoTaiLieuCongDan && kySoSavis">
                <v-btn slot="activator" icon class="mx-0 my-0 ml-2" @click="pickFileSavis(item)">
                  <v-badge>
                    <v-icon size="24" color="#004b94">fa-pencil-square-o</v-icon>
                  </v-badge>
                </v-btn>
                <span>Tải lên và ký số giấy tờ</span>
              </v-tooltip>
              <!--  -->
              <v-tooltip top v-if="partNoApplicantHasFile(item.partNo) && !onlyView && !khoTaiLieuCongDan">
                <v-btn slot="activator" icon class="mx-0 my-0" @click="showFilesApplicant(item.partNo)">
                  <v-badge>
                    <v-icon size="24" color="orange darken-3">folder</v-icon>
                  </v-badge>
                </v-btn>
                <span>Giấy tờ đã nộp</span>
              </v-tooltip>

              <!-- Sử dụng kho tài liệu công dân -->
              <v-tooltip left v-if="progressUploadPart !== item.partNo && !onlyView && khoTaiLieuCongDan">
                <v-btn slot="activator" icon class="mx-0 my-0" @click="pickFile(item)">
                  <v-badge>
                    <v-icon size="24" color="#004b94">cloud_upload</v-icon>
                  </v-badge>
                </v-btn>
                <span v-if="!item.partTip['extensions'] && !item.partTip['maxSize']">Tải giấy tờ từ máy</span>
                <span v-else>Tải giấy tờ từ máy (Chấp nhận tải lên các định dạng: {{item.partTip['extensions']}}. Tối đa {{item.partTip['maxSize']}} MB)</span>
              </v-tooltip>
              <v-tooltip class="pl-1 pt-1" top v-if="applicantId && partNoApplicantHasFile(item.partNo) && khoTaiLieuCongDan">
                <v-btn slot="activator" icon class="mx-0 my-0" @click="showDocumentApplicant(item, index)">
                  <v-badge>
                    <v-icon size="20" color="orange darken-3">storage</v-icon>
                  </v-badge>
                </v-btn>
                <span>Giấy tờ trong kho</span>
              </v-tooltip>
              <!-- <v-tooltip class="pl-1 pt-1" top v-if="originality === 3 && applicantId && !onlyView && khoTaiLieuCongDan && yeuCauSoHoa">
                <v-btn :disabled="progress_sohoa" slot="activator" icon class="mx-0 my-0" @click="guiYeuCauSoHoa(item, index)">
                  <v-badge>
                    <v-icon size="20" color="#004b94">share</v-icon>
                  </v-badge>
                </v-btn>
                <span>Yêu cầu số hóa</span>
              </v-tooltip> -->
              <!-- end -->

            </v-flex>
          </v-layout>
        </div>
      </div>
      <div v-if="!partTypes.includes(2) && originality === 3 && !partTypes.includes(6) && !partTypes.includes(7)">
        <v-card flat>
          <v-card-text flat class="py-0 px-3 pl-4">
            <v-form v-model="valid_ghichu" ref="formGhiChuThanhPhan" lazy-validation>
              <div v-if="!onlyView" class="my-2">
                  <v-textarea class="py-0"
                  box
                  v-model="applicantNoteDossier"
                  rows="3"
                  :rules="[rules.varchar5000]"
                  @input="changeApplicantNote"
                  label="Ghi chú"
                  ></v-textarea>
              </div>
              <v-text-field class="my-2"
                v-if="onlyView && applicantNoteDossier"
                v-model="applicantNoteDossier"
                label="Ghi chú"
                readonly
                box
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
      <v-dialog v-model="dialogAddOtherTemp" max-width="400" transition="fade-transition" persistent>
        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Tên giấy tờ</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="cancelDialog">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="pb-0 pt-4">
              <v-layout wrap>
                <v-flex xs12 class="px-2 pb-3 fix__label">
                  <v-text-field
                  label="Tên giấy tờ:"
                  v-model="otherDossierTemplate"
                  :rules="[v => !!v || 'Bạn phải điền tên giấy tờ.']"
                  required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-3" flat="flat" @click.native="cancelDialog" :loading="loadingAddOther">
                Quay lại
                <span slot="loader">Loading...</span>
              </v-btn>
              <v-btn color="primary" flat="flat" @click.native="addOtherTemplate" :loading="loadingAddOther">
                Đồng ý
                <span slot="loader">Loading...</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card>
    <div class="absolute__btn pl-4" style="width: 200px; margin-top: 5px;" v-if="originality === 3 && !onlyView"> 
      <v-checkbox
        class="mt-0"
        label="Chọn tất cả"
        v-model="allFileMark"
        :value="1"
        @change="changeAllFileMark($event)"
      ></v-checkbox>
    </div>
    <v-dialog v-model="dialogPDF" max-width="900" transition="fade-transition" style="overflow: hidden;">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <span v-if="pdfEform">Bản in đã khai trực tuyến</span>
            <span v-else>Tài liệu đính kèm</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogPDF = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <div v-if="dialogPDFLoading" style="
            min-height: 600px;
            text-align: center;
            margin: auto;
            padding: 25%;
        ">
          <v-progress-circular
            :size="100"
            :width="1"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <iframe v-show="!dialogPDFLoading" :id="'dialogPDFPreview' + id" src="" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
        </iframe>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_documentApplicant" scrollable persistent max-width="1300px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Giấy tờ, tài liệu</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialog_documentApplicant = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="py-1" style="min-height: 350px">
          <kho-tai-lieu ref="khotailieu" :index="applicantId" :serverCode="!oneApp && originality == '1' ? thongTinHoSo.serverNo : ''" :fileTemplateNoScope="fileTemplateNoScope" :status="statusApplicantData" :thongTinChuHoSo="thongTinChuHoSo" v-on:trigger-attach="attachFileFromStorage"></kho-tai-lieu>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ký số điện tử -->
    <v-dialog
      v-model="dialogSignDigital"
      max-width="450"
    >
      <v-card>
        <v-card-title class="white--text py-3">LỰA CHỌN DỊCH VỤ KÝ SỐ ĐIỆN TỬ</v-card-title>
        <v-divider class="my-0"></v-divider>
        <v-card-text class="px-0">
          <v-layout wrap>
            <v-flex xs12 sm6 class="text-xs-center" style="cursor: pointer">
              <v-hover>
                <div slot-scope="{ hover }" style="position: relative;">
                  <img class="mb-2" src="/o/opencps-store/js/cli/dvc/app/image/logo-viettel-ca.png" alt="trevor" style="background: #fff;"><br>
                  <span class="text-bold" style="color: #3a877e">KÝ SỐ VIETTEL CA</span>
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex slide-x-transition blue darken-2 display-3 white--text"
                      style="height: 115px;align-items: center;
                      bottom: -10px;
                      background-color: #3a877e26 !important;
                      justify-content: center;
                      position: absolute;
                      width: 100%;"
                    >
                      <div class="d-flex" style="position: absolute; bottom: 0px; width: 100%;">
                        <v-btn small color="indigo" class="white--text" @click="getHashStringFile">
                          <v-icon style="color: #fff !important">edit</v-icon> &nbsp;&nbsp; KÝ TOKEN
                        </v-btn>
                        <v-btn small color="red" class="white--text" @click="signSimCa(fileKySo, indexFileSelect)">
                          <v-icon style="color: #fff !important">sim_card</v-icon> &nbsp;&nbsp; KÝ SIM CA
                        </v-btn>
                      </div>
                    </div>
                  </v-expand-transition>
                </div>
              </v-hover>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center" style="cursor: pointer">
              <v-hover>
                <div slot-scope="{ hover }" style="position: relative;height: 100%;">
                  <img class="mb-2" src="/o/opencps-store/js/cli/dvc/app/image/logo-kyso-bancoyeu.png" alt="trevor" style="background: #fff;"><br>
                  <span class="text-bold" style="color: #0071bd;" v-if="!hover">KÝ SỐ BAN CƠ YẾU CHÍNH PHỦ</span>
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="slide-x-transition blue darken-2 display-3 white--text"
                      style="height: 115px;align-items: center;
                      bottom: -10px;
                      background-color: #1976d22e !important;
                      justify-content: center;
                      position: absolute;
                      width: 100%;"
                    >
                      <div class="d-flex" style="position: absolute; bottom: 0px; width: 100%;">
                        <v-btn small color="indigo" class="white--text" @click="vgcaSignAction (fileKySo, indexFileSelect, 'approved')">
                          <v-icon style="color: #fff !important">edit</v-icon> &nbsp;&nbsp; KÝ DUYỆT
                        </v-btn>
                        <v-btn small color="red" class="white--text" @click="vgcaSignAction (fileKySo, indexFileSelect, 'issued')">
                          <v-icon style="color: #fff !important">fas fa fa-dot-circle-o</v-icon> &nbsp;&nbsp; ĐÓNG DẤU PHÁT HÀNH
                        </v-btn>
                      </div>
                    </div>
                  </v-expand-transition>
                </div>
              </v-hover>
              
            </v-flex>
            <!--  -->
            <!-- <v-flex xs12 class="text-xs-center mt-3" style="cursor: pointer" @click="kySoPdfUrlSavis(fileKySo, indexFileSelect)">
              <img class="mb-2" src="/o/opencps-store/js/cli/dvc/app/image/logo-savis.svg" alt="trevor" style="background: #fff;height: 30px;"><br>
              <span class="text-bold" style="font-size: 14px;color: #d7181f;">KÝ SỐ SAVIS</span>
            </v-flex> -->
            <!--  -->
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ký số điện tử -->
    <v-dialog
      v-model="dialogInputMobile"
      max-width="350"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px">NHẬP SỐ SIM CA THỰC HIỆN KÝ SỐ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogInputMobile = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex xs12 class="text-xs-center" style="cursor: pointer">
              <v-text-field class="my-2 mb-0 mx-2" 
                v-model="mobileCA"
                box
                placeholder="0868919191, 0972919191, ..."
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mr-0" style="width: 125px" color="primary" @click="submitSignSimCa()" :loading="loadingAction"
          :disabled="loadingAction">
            <v-icon>save</v-icon> &nbsp;
            Đồng ý
            <span slot="loader">Đang chờ ký số</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="dialog_editor_pdf" fullscreen hide-overlay scrollable transition="dialog-bottom-transition">
      <v-card v-if="activePdfEditor && showViewerPdfEditor">
        <v-card-text>
          <div id="content-pdf-editor">
            <div class="toolbar">
              <button class="cursor" type="button" data-tooltype="cursor">➚</button>

              <div class="spacer"></div>

              <button class="rectangle" type="button"  data-tooltype="area" style="margin-right: 8px">&nbsp;</button>
              <button class="highlight" type="button" data-tooltype="highlight" style="margin-right: 8px">&nbsp;</button>
              <button class="strikeout" type="button" data-tooltype="strikeout">&nbsp;</button>

              <div class="spacer"></div>

              <button class="text" type="button" data-tooltype="text" style="font-weight: bold;"></button>
              <select class="text-size mx-2"></select>
              <div class="text-color"></div>

              <div class="spacer"></div>

              <button class="pen" type="button" data-tooltype="draw">✎</button>
              <select class="pen-size mx-2"></select>
              <div class="pen-color"></div>

              <div class="spacer"></div>

              <button style="display: none" class="comment" type="button" data-tooltype="point">🗨</button>

              <div style="display: none" class="spacer"></div>

              <select class="scale mx-2">
                <option value=".5">50%</option>
                <option value="1">100%</option>
                <option value="1.33">133%</option>
                <option value="1.5">150%</option>
                <option value="2">200%</option>
              </select>

              <a href="javascript://" class="rotate-ccw mx-2">⟲</a>
              <a href="javascript://" class="rotate-cw mx-2">⟳</a>

              <div class="spacer"></div>

              <a href="javascript://" style="display: none" class="clear" title="Clear">×</a>
              <v-btn v-if="!onlyView" color="primary" class="mx-2" @click="saveEditor" style="color: #0167d3!important;margin-top: -4px; height: 26px;">
                <v-icon>save</v-icon>&nbsp; Lưu &nbsp;
              </v-btn>
              <v-btn style="background-color: transparent !important;border-color: transparent !important;" class="right" icon @click="closeEditorPdf">
                <v-icon>close</v-icon>
              </v-btn>
            </div>
            <div id="content-wrapper" style="right: 0;">
              <div id="viewer" class="pdfViewer" style="background-color: #eee;"></div>
            </div>
            <div id="comment-wrapper" style="display: none">
              <h4>Comments</h4>
              <div class="comment-list">
                <div class="comment-list-container">
                  <div class="comment-list-item">No comments</div>
                </div>
                <form class="comment-list-form" style="display:none;">
                  <input type="text" placeholder="Add a Comment"/>
                </form>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  -->
    <!-- ký số điện tử -->
    <v-dialog
      v-model="dialogSelectCa"
      max-width="450"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px">Lựa chọn chứng thư số</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogSelectCa = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex class="px-3 py-2" v-for="(item, index) in listCaSavis" :key="index" xs12 style="cursor: pointer, border-bottom: 1px solid #dedede"
              @click="submitSignSavis(item)"
            >
              <p style="cursor: pointer !important;">{{index+1}}. {{item.subjectDn.split("CN=")[1].split(",")[0]}}</p>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      v-model="dialogSelectAnhChuKySo"
      max-width="450"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px">Tải lên ảnh hiển thị trên chữ ký</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn icon dark @click.native="dialogSelectAnhChuKySo = false">
            <v-icon>close</v-icon>
          </v-btn> -->
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex class="px-3 py-2" xs12 style="cursor: pointer, border-bottom: 1px solid #dedede"
            >
              <!-- <input
                type="file"
                id="fileAnhChuKySavis"
                @input="changeFileAnhChuKySavis()"
              > -->
              <input type="file" accept="image/*" id="fileAnhChuKySavis" @input="changeFileAnhChuKySavis($event)" style="display:none">
              <v-btn outline  flat color="primary" class="mx-0 px-0 d-inline-block" @click.native="selectAnhHienThiKySo()" style="width: 100%">
                <v-icon size="16">fas fa fa-upload</v-icon> &nbsp; &nbsp;
                Tải lên
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-3" flat="flat" @click.native="cancelFileAnhChuKySavis">
            Bỏ qua
          </v-btn>
          <!-- <v-btn color="primary" flat="flat" @click.native="addOtherTemplate" :loading="loadingAddOther">
            Đồng ý
            <span slot="loader">Loading...</span>
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
        v-model="processingSavis"
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            <span>{{mssProcessingSavis}}</span>
            
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
    </v-dialog>
    <!-- Vnpt Smart Ca -->
    <v-dialog
      v-model="dialogXacThucVnptSmartCa"
      max-width="550"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px">XÁC THỰC NGƯỜI DÙNG VNPT SMART CA</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogXacThucVnptSmartCa = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap v-if="!detailUserSmartVnpt">
            <v-flex xs12 class="text-xs-center" style="">
              <img style="width: 100px;" class="mb-2" src="/o/opencps-store/js/cli/dvc/app/image/logo-vnpt-ca.svg" alt="trevor"><br>
            </v-flex>
            <v-flex xs12 class="mt-2" style="cursor: pointer">
              <p class="mx-3">Tên đăng nhập</p>
              <v-text-field class="my-2 mb-0 mx-3"
                v-model="userNameSmartCa"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="" style="cursor: pointer">
              <p class="mx-3">Mật khẩu</p>
              <v-text-field class="my-2 mb-0 mx-3" 
                v-model="passWordSmartCa"
                box
                type="password"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap v-else>
            <v-flex xs12 class="" style="cursor: pointer">
              <p class="mx-3 mb-3" style="text-align: center; font-size: 16px;">
                <span class="text-bold" style="color: green">XÁC THỰC THÀNH CÔNG</span>
              </p>
              <p class="mx-3">
                <span>Họ và tên: </span>
                <span class="text-bold">{{userSignSmartVnpt.fullName}}</span>
              </p>
              <p class="mx-3">
                <span>Số điện thoại: </span>
                <span class="text-bold">{{userSignSmartVnpt.phone}}</span>
              </p>
              <p class="mx-3">
                <span>Email: </span>
                <span class="text-bold">{{userSignSmartVnpt.email}}</span>
              </p>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pb-3 pt-0">
          <v-spacer></v-spacer>
          <v-btn v-if="!detailUserSmartVnpt" class="mr-2 white--text" style="width: 125px" color="#00204a" @click="submitLoginCaVnpt()" :loading="loadingAction"
          :disabled="loadingAction">
            <v-icon>save</v-icon> &nbsp;
            Đồng ý
          </v-btn>
          <v-btn v-else class="mr-2 white--text" style="width: 125px" color="#00204a" @click="sendRequestSignVnptSmartCa()" :loading="loadingAction"
          :disabled="loadingAction">
            <v-icon>fa fa-pencil-square-o</v-icon> &nbsp;
            Ký số
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      v-model="dialogChoKyVnptSmartCa"
      max-width="550"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px"> CHỜ KÝ SỐ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogChoKyVnptSmartCa = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex xs12 class="mt-2" style="font-size: 14px;">
              <p class="mx-3">
                Yêu cầu ký số tài liệu đã được gửi. Vui lòng thực hiện ký số trên thiết bị.
              </p>
              <p class="mx-3 mt-2">
                Xác nhận 
                <span class="text-bold"> "ĐÃ KÝ SỐ" </span>
                sau khi thực hiện.
              </p>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 white--text" style="width: 125px" color="#00204a" @click="getTransInfo()" :loading="loadingAction"
          :disabled="loadingAction">
            <v-icon>done_all</v-icon> &nbsp;
            ĐÃ KÝ SỐ
            <span slot="loader">Đang kiểm tra</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="dialog_add_giayto" scrollable persistent max-width="900px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Lưu giấy tờ vào kho kết quả TTHC</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialog_add_giayto = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="py-1">
          <v-form ref="form" v-model="validFormStorage" lazy-validation class="py-3 px-0 grid-list">
            <v-layout row wrap class="px-0 py-3">
              <v-flex xs12>
                <v-text-field label="Tên giấy tờ" v-model="tenGiayToStorage" box></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Số hiệu giấy tờ" v-model="soHieuGiayToStorage" box></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="px-0 pr-3">
                <v-text-field
                  label="Ngày cấp"
                  v-model="createDateStorage"
                  placeholder="dd/mm/yyyy, ddmmyyyy"
                  @blur="formatDate"
                  box
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 class="px-0 pr-3">
                <v-text-field
                  label="Ngày hết hạn"
                  v-model="expireDateStorage"
                  placeholder="dd/mm/yyyy, ddmmyyyy"
                  @blur="formatExpireDate"
                  box
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="primary" @click.native="dialog_add_giayto = false"
            :loading="progress_sohoa"
            :disabled="progress_sohoa"
          >
            <v-icon>clear</v-icon> &nbsp;
            Thoát
          </v-btn>
          <v-btn class="mr-3" color="primary" @click.native="addApplicantData"
            :loading="progress_sohoa"
            :disabled="progress_sohoa"
          >
            <v-icon>save</v-icon> &nbsp;
            Đồng ý
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      v-model="dialogTaiSavis"
      max-width="550"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px"> CÔNG CỤ KÝ SỐ CHƯA ĐƯỢC CÀI ĐẶT</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogTaiSavis = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex xs12 class="mt-2" style="font-size: 14px;">
              <p class="mx-3">
                Vui lòng cài đặt công cụ ký số Savis phiên bản mới nhất.
              </p>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 white--text" style="width: 125px" color="primary" @click="downloadSavisMsi()" >
            <v-icon size="14" style="color: #ffffff !important">fas fa fa-download</v-icon> &nbsp;
            Tải bản cài đặt
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="dialog_formscript_tphs" scrollable persistent fullscreen>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <div style="font-size: 16px;">THÔNG TIN HỘI THẢO</div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialog_formscript_tphs = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="py-1">
          <form-thanh-phan-ho-so ref="formThanhPhanHoSo" :dataInput="formDataTphs" :mauNhap="mauNhapForm" :readonly="onlyView"
            :thongtinhoso="thongTinHoSo"
          >
          </form-thanh-phan-ho-so>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="primary" @click.native="dialog_formscript_tphs = false"
            :loading="loadingSubmitFormTphs"
            :disabled="loadingSubmitFormTphs"
          >
            <v-icon>clear</v-icon> &nbsp;
            Thoát
          </v-btn>
          <v-btn class="mr-4" color="primary" @click.native="submitFormTphs" v-if="!onlyView"
            :loading="loadingSubmitFormTphs"
            :disabled="loadingSubmitFormTphs"
          >
            <v-icon>save</v-icon> &nbsp;
            Đồng ý
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <div style="display:none">
      <a id="downloadCaiDatSavis" :href="srcDownloadSavis" download></a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import toastr from 'toastr'
import KhoTaiLieu from '../TiepNhan/KhoTaiLieu'
import FormThanhPhanHoSo from '../FormDHQG'
 // 
  // import docxtemplater from 'docxtemplater'
  // import PizZip from "pizzip";
  // import PizZipUtils from "pizzip/utils/index.js";
  // import angularParser from "docxtemplater/js/expressions";
  // import { saveAs } from "file-saver";
  // function loadFile(url, callback) {
  //   PizZipUtils.getBinaryContent(url, callback);
  // }
  // 
toastr.options = {
  'closeButton': true,
  'timeOut': '5000'
}
export default {
  props: {
    onlyView: {
      type: Boolean,
      default: () => false
    },
    id: {
      type: String,
      default: () => 'nm'
    },
    partTypes: {
      type: Array,
      default: () => [1, 3]
    },
    checkInput: {
      type: Number,
      default: () => 0
    },
    formCodeInput: {
      type: String,
      default: () => ''
    },
    tempLienThong: {
      type: Boolean,
      default: () => false
    },
    expandEform: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    'kho-tai-lieu': KhoTaiLieu,
    'form-thanh-phan-ho-so': FormThanhPhanHoSo
  },
  data: () => ({
    mauNhapForm: '',
    docxTemplateUrl: '',
    formDataTphs: '',
    thanhPhanFormUpdate: '',
    indexThanhPhanFormUpdate: '',
    dialog_formscript_tphs: false,
    loadingSubmitFormTphs: false,
    dialog_add_giayto: false,
    validFormStorage: true,
    partKhoGiayTo: '',
    fileKhoGiayTo: '',
    tenGiayToStorage: '',
    soHieuGiayToStorage: '',
    createDateStorage: '',
    expireDateStorage: '',
    giayToDaLuu: '',
    access_token_vnpt: '',
    userSignSmartVnpt: '',
    tranId_vnpt: '',
    userNameSmartCa: '',
    passWordSmartCa: '',
    detailUserSmartVnpt: false,
    fileKySoSavis: '',
    fileImageSignPdf: '',
    dialogSelectCa: false,
    listCaSavis: [],
    dialogSelectAnhChuKySo: false,
    hasAnhChuKySo: false,
    processingSavis: false,
    mssProcessingSavis: '',
    signSavisPdfUrl: false,
    srcDownloadSavis: '',
    dialogTaiSavis: false,
    activePdfEditor: false,
    showViewerPdfEditor: false,
    dialog_editor_pdf: false,
    valid_ghichu: false,
    dossierTemplateItems: [],
    dossierMarksItems: [],
    dossierFilesItems: [],
    thongTinHoSo: {},
    valid: true,
    stateView: false,
    dialogAddOtherTemp: false,
    loadingAddOther: false,
    loadingApacal: false,
    otherDossierTemplate: '',
    sheet: false,
    partView: '',
    dossierFileIdView: '',
    stateEdit: false,
    progressUploadPart: '',
    dialogPDF: false,
    dialogPDFLoading: true,
    loadingFile: false,
    stateAddFileOther: false,
    dossierTemplatesItemSelect: {},
    fileViews: [],
    pdfEform: false,
    sampleCount: 0,
    serviceInfoId: 0,
    fileMarkItems: [
      {
        text: 'Không có',
        value: 0
      }, {
        text: 'Bản chụp',
        value: 1
      }, {
        text: 'Bản sao',
        value: 2
      }, {
        text: 'Bản gốc',
        value: 3
      }, {
        text: 'Bản dịch',
        value: 4
      }
    ],
    markCheck: '',
    fileCheckItems: [{
      text: 'Chưa kiểm tra',
      value: 0
    }, {
      text: 'Đạt',
      value: 1
    }, {
      text: 'Không đạt',
      value: 2
    }],
    fileTemplateItems: [],
    fileTemplateNoString: '',
    dossierFilesApplicant: [],
    stateViewResult: true,
    currentFormView: '',
    pstFixed: 0,
    pstEl: 0,
    endEl: 0,
    applicantNoteDossier: '',
    doChange: {},
    dossierTemplateLienThong: [],
    receiveMessage: '',
    dialog_documentApplicant: false,
    dossierPartAttach: '',
    indexPart: '',
    rules: {
      required: (value) => !!value || 'Thông tin bắt buộc',
      cmndHoChieu: (value) => {
        const pattern = /^(?![0-9]{4,12})[0-9a-zA-Z]{4,12}$/
        return pattern.test(value) || 'Gồm các ký tự 0-9, a-z và ít nhất 4-12 ký tự'
      },
      email: (value) => {
        value = value.trim()
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Địa chỉ Email không hợp lệ'
      },
      passWord: (value) => {
        const pattern = /^(?![0-9]{6,})[0-9a-zA-Z]{6,}$/
        return pattern.test(value) || 'Gồm các ký tự 0-9, a-z và ít nhất 6 ký tự'
      },
      telNo: (value) => {
        const pattern = /^([0-9]{0,})$/
        if(typeof value === 'string'){
          value = value.trim()
        }
        return pattern.test(value) || 'Gồm các ký tự 0-9'
      },
      varchar50: (val) => {
        if(val){
          val = String(val).trim()
          return val.length <= 50 ? true : 'Không được nhập quá 50 ký tự'   
        } else {
          return true
        }  
      },
      varchar100: (val) => {
        if(val){
          val = String(val).trim()
          return val.length <= 100 ? true : 'Không được nhập quá 100 ký tự'   
        } else {
          return true
        }
      },
      varchar255: (val) => {
        if(val){
          val = String(val).trim()
          return val.length <= 255 ? true : 'Không được nhập quá 255 ký tự'   
        } else {
          return true
        }  
      },
      varchar500: (val) => {
        if(val){
          val = String(val).trim()
          return val.length <= 500 ? true : 'Không được nhập quá 500 ký tự'   
        } else {
          return true
        }  
      },
      varchar5000: (val) => {
        if(val){
          val = String(val).trim()
          return val.length <= 5000 ? true : 'Không được nhập quá 5000 ký tự'   
        } else {
          return true
        }
      },
    },
    khoTaiLieuCongDan: false,
    allFileMark: false,
    render: true,
    showKySo: false,
    showKySoMotCua: false,
    dialogSignDigital: false,
    dialogXacThucVnptSmartCa: false,
    dialogChoKyVnptSmartCa: false,
    fileKySo: '',
    indexFileSelect: '',
    fileEditor: '',
    statusApplicantData: '',
    fileTemplateNoScope: '',
    nghiepvuhanghai: false,
    yeuCauSoHoa: false,
    mobileCA: '',
    dialogInputMobile: false,
    loadingAction: false,
    kySoSavis: false,
    kySoVnptSmartCa: false,
    oneApp: false
  }),
  created () {
    let vm = this
    vm.receiveMessage = function (event) {
      vm.saveAlpacaFormCallBack(event)
    }
    try {
      vm.oneApp = oneApp
    } catch (error) {
    }
    try {
      vm.kySoVnptSmartCa = kySoVnptSmartCa
    } catch (error) {
    }
    try {
      vm.kySoSavis = kySoSavis
    } catch (error) {
    }
    try {
      vm.srcDownloadSavis = srcDownloadSavis
    } catch (error) {
    }
    try {
      vm.khoTaiLieuCongDan = khoTaiLieuCongDan
    } catch (error) {
    }
    try {
      vm.showKySo = showKySoDvc
    } catch (error) {
    }
    try {
      vm.showKySoMotCua = showKySoMotCua
    } catch (error) {
    }
    try {
      vm.activePdfEditor = activePdfEditor
    } catch (error) {
    }
    try {
      // check bắt buộc với tp eform
      vm.requiredEform = requiredEform
    } catch (error) {
    }
    try {
      // check bắt buộc với tp eform
      vm.nghiepvuhanghai = nghiepvuhanghai
    } catch (error) {
    }
    try {
      vm.yeuCauSoHoa = yeuCauSoHoa
    } catch (error) {
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    originality () {
      let vm = this
      return vm.getOriginality()
    },
    initDataResource () {
      return this.$store.getters.loadingInitData
    },
    dossierTemplateItemsFilter () {
      let vm = this
      let dossierTemplate = vm.dossierTemplateItems
      if (dossierTemplate.length > 0) {
        let filter1 = dossierTemplate.filter(function (item) {
          return vm.partTypes.includes(item.partType) && vm.checkVisibleTemp(item, 0)
        })
        // check
        let filterCheckInput = filter1
        if (String(vm.checkInput) === '1') {
          filterCheckInput = filter1.filter(function (item) {
            return item['fileMark'] !== 0
          })
        }
        console.log('filter1', filter1)
        console.log('partTypes', vm.partTypes)
        console.log('dossierTemplate', dossierTemplate)
        console.log('dossierTemplateItemsFilter111', filterCheckInput)
        return filterCheckInput
      }
    },
    applicantBussinessExit () {
      return this.$store.getters.getApplicantBussinessExit
    },
    applicantId () {
      return this.$store.getters.getApplicantIdNo
    },
    applicantNote () {
      return this.$store.getters.getApplicantNote
    },
    userLoginInfomation () {
      return this.$store.getters.getUserLogin
    },
    thongTinChuHoSo () {
      return this.$store.getters.thongTinChuHoSo
    }
  },
  mounted () {
    var vm = this
    vm.page = 1
    vm.$nextTick(function () {
    })
  },
  beforeDestroy() {
    let vm = this
  	window.removeEventListener('message', vm.receiveMessage)
    window.addEventListener('message', vm.resetMessage)
    console.log('beforeDestroy')
  },
  destroyed () {
    try {
      let vm = this
  	  window.removeEventListener('message', vm.receiveMessage)
      window.addEventListener('message', vm.resetMessage)
      console.log('destroy')
    } catch (error) {
    }
  },
  watch: {
    applicantBussinessExit (val) {
      let vm = this
      if (val && vm.fileTemplateNoString && !vm.khoTaiLieuCongDan) {
        vm.getDossierFileApplicants(val, vm.fileTemplateNoString)
      }
      if (vm.khoTaiLieuCongDan) {
        vm.getDossierFileApplicants(val)
      }
    },
    applicantId (val) {
      let vm = this
      if (val && vm.fileTemplateNoString) {
        vm.getDossierFileApplicants(val, vm.fileTemplateNoString)
      }
      if (vm.khoTaiLieuCongDan) {
        vm.getDossierFileApplicants(val)
      }
    },
    dossierTemplateItemsFilter () {
      let vm = this
      for (let key in vm.dossierTemplateItemsFilter) {
        vm.doChange[key] = ''
      }
      console.log('dossierTemplateItemsFilter222', vm.dossierTemplateItemsFilter)
    }
  },
  methods: {
    submitFormTphs() {
      let vm = this
      vm.$refs.formThanhPhanHoSo.submitTaoBaoCao()
      let formData = vm.$store.getters.getFormData
      console.log('formThanhPhanHoSo', formData)
      let validate = vm.$refs.formThanhPhanHoSo.validateForm()
      if (validate) {
        for (const key in formData) {
          if (formData[key] == undefined) {
            formData[key] = ''
          }
        }
        
        var fileFind = vm.dossierFilesItems.find(itemFile => {
          // return itemFile.dossierPartNo === item.partNo && itemFile.eForm && itemFile.fileSize!==0
          return itemFile.dossierPartNo === vm.thanhPhanFormUpdate.partNo && itemFile.eForm
        })
        if (fileFind) {
          fileFind['dossierId'] = vm.thongTinHoSo.dossierId
          fileFind['id'] = vm.id
          fileFind['formData'] = formData
          vm.loadingApacal = true
          vm.$store.dispatch('putFormNghiepVu', fileFind).then(resData => {
            setTimeout(function () {
              vm.loadingApacal = false
              toastr.clear()
              toastr.success('Thực hiện thành công')
              vm.loadFiles()
              vm.dialog_formscript_tphs = false
            }, 1000)
            vm.dossierTemplateItemsFilter[vm.indexThanhPhanFormUpdate]['passRequired'] = true
          }).catch(reject => {
            vm.loadingApacal = false
          })
        } else {
          console.log('vm.thanhPhanFormUpdate1', vm.thanhPhanFormUpdate)
          vm.thanhPhanFormUpdate['dossierId'] = vm.thongTinHoSo.dossierId
          vm.thanhPhanFormUpdate['id'] = vm.id
          vm.thanhPhanFormUpdate['formData'] = formData
          console.log('vm.thanhPhanFormUpdate2', vm.thanhPhanFormUpdate)
          vm.loadingApacal = true
          vm.$store.dispatch('postEformNghiepVu', vm.thanhPhanFormUpdate).then(resPostEform => {
            console.log('resole', resPostEform)
            setTimeout(function () {
              vm.loadingApacal = false
              toastr.clear()
              toastr.success('Thực hiện thành công')
              vm.dossierTemplateItemsFilter[vm.indexThanhPhanFormUpdate].daKhai = true
              vm.loadFiles()
              vm.dialog_formscript_tphs = false
            }, 1000)
            vm.dossierTemplateItemsFilter[vm.indexThanhPhanFormUpdate]['passRequired'] = true
            
          }).catch(reject => {
            vm.loadingApacal = false
          })
        }
      }
    },
    exportDoc (part, index) {
      let vm = this
      part['templateFileNo'] = vm.thongTinHoSo.dossierTemplateNo
      vm.$store.dispatch('loadFormScript', part).then(resScript => {
        /* eslint-disable */
        let eformScript = ''
        try {
          eformScript = eval('(' + resScript + ')')
        } catch (error) {
        }
        /* eslint-disable */
        if (eformScript && eformScript.hasOwnProperty('eformDHQG') && eformScript.eformDHQG) {
          vm.docxTemplateUrl = eformScript.docxTemplateUrl

          let dataDoc = {}
          let fileFind = vm.dossierFilesItems.find(itemFile => {
            return itemFile.dossierPartNo === part.partNo && itemFile.eForm
          })
          if (fileFind) {
            dataDoc = JSON.parse(fileFind.formData)
          }
          console.log('dataDoc', dataDoc)
          if (!vm.docxTemplateUrl) {
            toastr.clear()
            toastr.error('Chưa có mẫu văn bản')
            return
          }
          loadFile(vm.docxTemplateUrl, function(
            error,
            content
          ) {
            if (error) {
              throw error;
            }
            const zip = new PizZip(content);
            const doc = new docxtemplater(zip, { 
              paragraphLoop: true, 
              linebreaks: true, 
              parser: angularParser
            });
            doc.setData(dataDoc);
            try {
              doc.render();
            } catch (error) {
              function replaceErrors(key, value) {
                if (value instanceof Error) {
                  return Object.getOwnPropertyNames(value).reduce(function(
                    error,
                    key
                  ) {
                    error[key] = value[key];
                    return error;
                  },
                  {});
                }
                return value;
              }
              console.log(JSON.stringify({ error: error }, replaceErrors));
              if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors
                  .map(function(error) {
                    return error.properties.explanation;
                  })
                  .join("\n");
                console.log("errorMessages", errorMessages);
              }
              throw error;
            }
            const out = doc.getZip().generate({
              type: "blob",
              mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            saveAs(out, "hoithao.docx");
          });
        }
      })
    },
    formatDate () {
      let vm = this
      let lengthDate = String(vm.createDateStorage).trim().length
      let splitDate = String(vm.createDateStorage).split('/')
      if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
        vm.createDateStorage = vm.translateDate(vm.createDateStorage)
      } else if (lengthDate && lengthDate === 8) {
        let date = String(vm.createDateStorage)
        vm.createDateStorage = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
      } else {
        vm.createDateStorage = ''
      }     
    },
    formatExpireDate () {
      let vm = this
      let lengthDate = String(vm.expireDateStorage).trim().length
      let splitDate = String(vm.expireDateStorage).split('/')
      if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
        vm.expireDateStorage = vm.translateDate(vm.expireDateStorage)
      } else if (lengthDate && lengthDate === 8) {
        let date = String(vm.expireDateStorage)
        vm.expireDateStorage = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
      } else {
        vm.expireDateStorage = ''
      }     
    },
    translateDate (date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
    },
    showAddStorage (part, file) {
      let vm = this
      vm.soHieuGiayToStorage = ''
      vm.createDateStorage = ''
      vm.expireDateStorage = ''
      vm.dialog_add_giayto = true
      vm.partKhoGiayTo = part
      vm.fileKhoGiayTo = file
      vm.tenGiayToStorage = part.partName
    },
    addApplicantData () {
      let vm = this
      vm.progress_sohoa = true
      let param = {
        headers: {
          groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let dataCreateFile = new FormData()
      let url = '/o/rest/v2/applicantdatas'
      dataCreateFile.append('fileTemplateNo', vm.partKhoGiayTo.fileTemplateNo)
      dataCreateFile.append('status', 1)
      dataCreateFile.append('fileNo', vm.soHieuGiayToStorage)
      dataCreateFile.append('fileName', vm.partKhoGiayTo.partName)
      dataCreateFile.append('applicantIdNo', vm.applicantId)
      dataCreateFile.append('file', '')
      dataCreateFile.append('fileEntryId', vm.fileKhoGiayTo.hasOwnProperty('fileEntryId') ? vm.fileKhoGiayTo.fileEntryId : '')
      dataCreateFile.append('applicantName', vm.thongTinChuHoSo['applicantName'] ? vm.thongTinChuHoSo['applicantName'] : '')
      dataCreateFile.append('govAgencyName', vm.thongTinHoSo.govAgencyName)
      dataCreateFile.append('serviceCode', vm.thongTinHoSo['serviceCode'])
      dataCreateFile.append('templateNo', vm.partKhoGiayTo.fileTemplateNo)
      dataCreateFile.append('issueDate', vm.createDateStorage)
      dataCreateFile.append('expireDate', vm.expireDateStorage)
      dataCreateFile.append('desciption', '')
      dataCreateFile.append('dossierNo', '')
      
      axios.post(url, dataCreateFile, param).then(result1 => {
        vm.progress_sohoa = false
        vm.dialog_add_giayto = false
        toastr.success('Lưu giấy tờ vào kho thành công')
        let fileLuu = vm.fileKhoGiayTo + ','
        vm.giayToDaLuu += fileLuu
      }).catch(xhr => {
        vm.progress_sohoa = false
      })
    },
    showValid () {
      var vm = this
      let result = {
        validForm: vm.$refs.formGhiChuThanhPhan.validate(),
      }
      return result
    },
    markAll () {
      let vm = this
      if (vm.dossierTemplateItemsFilter && vm.markCheck !== '') {
        vm.dossierTemplateItemsFilter.forEach(function (value, index) {
          if (value.partType === 1 && value.fileMark && !value.recordCountDefault) {
            value['dossierId'] = vm.thongTinHoSo.dossierId
            value['fileCheck'] = vm.markCheck
            value['fileComment'] = ''
            value['checkInput'] = vm.checkInput
            vm.$store.dispatch('postDossierMark', value)
          }
        })
      }
    },
    resetCounterTemplate ({commit, state}, data) {
      var vm = this
      vm.dossierTemplateItems.forEach(val => {
        if (val.partNo === data.partNo) {
          if (val.hasForm) {
            val.count = 1
          } else {
            val.count = 0
          }
        }
      })
    },
    recountFileTemplates () {
      var vm = this
      vm.dossierTemplateItems.forEach(itemTemplate => {
        itemTemplate.count = 0
        vm.dossierFilesItems.forEach(itemFile => {
          if (itemTemplate.partNo === itemFile.dossierPartNo && !itemFile.eForm) {
            itemTemplate.count ++
          }
        })
      })
    },
    initData (data) {
      var vm = this
      vm.$store.dispatch('getDocumentType').then(function (result) {
        let sortItems = function (items) {
          function compare(a, b) {
            if (a.itemCode < b.itemCode)
              return -1
            if (a.itemCode > b.itemCode)
              return 1
            return 0
          }
          return items.sort(compare)
        }
        if (result) {
          let items = sortItems(result)
          vm.fileMarkItems = []
          for (let key in items) {
            vm.fileMarkItems.push({
              text: items[key]['itemName'],
              value: items[key]['itemCode']
            })
          }
        }
      })
      vm.thongTinHoSo = data
      vm.applicantNoteDossier = data['applicantNote'] && String(data['applicantNote']).indexOf('<br>[') < 0 ? data['applicantNote'] : ''
      var arrTemp = []
      if (data['sampleCount'] !== null && data['sampleCount'] !== undefined && data['sampleCount'] !== 'undefined') {
        vm.sampleCount = data['sampleCount']
      }
      arrTemp.push(vm.$store.dispatch('loadDossierTemplates', data))
      arrTemp.push(vm.$store.dispatch('loadDossierMark', data))
      arrTemp.push(vm.$store.dispatch('loadDossierFiles', data.dossierId))
      arrTemp.push(vm.$store.dispatch('getServiceInfo', {
        serviceInfoId: data.serviceCode
      }))
      Promise.all(arrTemp).then(values => {
        var dossierTemplates = values[0]['dossierParts']
        var dossierMarks = values[1]
        var dossierFiles = values[2]
        var fileTemplates = []
        if (values[3].hasOwnProperty('serviceInfoId')) {
          vm.serviceInfoId = values[3].serviceInfoId
        }
        if (values[3].fileTemplates) {
          if (Array.isArray(values[3].fileTemplates)) {
            fileTemplates = values[3].fileTemplates
          } else {
            fileTemplates.push(values[3].fileTemplates)
          }
        }
        var dossierTemplateItems = vm.mergeDossierTemplateVsDossierFiles(dossierTemplates, dossierFiles)
        dossierTemplateItems = vm.mergeDossierTemplateVsDossierMark(dossierTemplateItems, dossierMarks)
        dossierTemplateItems = vm.mergeDossierTemplateVsFileTemplates(dossierTemplateItems, fileTemplates)
        vm.dossierFilesItems = dossierFiles
        vm.dossierMarksItems = dossierMarks
        vm.fileTemplateItems = fileTemplates
        vm.dossierTemplateItems = dossierTemplateItems
        console.log('dossierTemplateItems555', vm.dossierTemplateItems)
        // 
        vm.saveMark()
        // console.log('vm.dossierTemplateItems', vm.dossierTemplateItems)
        if ((vm.partTypes.includes(2) || vm.partTypes.includes(7)) && vm.dossierTemplateItems.length > 0 && !vm.tempLienThong) {
          let dossierTemplateKQ = []
          vm.dossierTemplateItems.forEach(item => {
            let hasKQ = vm.dossierFilesItems.find(file => {
              return (item.partNo === file.dossierPartNo && (item.partType === 2 || item.partType === 7))
            })
            if (hasKQ) {
              dossierTemplateKQ.push(item)
            }
          })
          vm.dossierTemplateItems = dossierTemplateKQ
        }
        vm.changeStateViewResult()
        setTimeout(function (argument) {
          vm.genAllAlpacaForm(dossierFiles, dossierTemplateItems)
          vm.recountFileTemplates()
        }, 500)
        let fileTemplateNoArr = []
        vm.dossierTemplateLienThong = []
        for (let key in vm.dossierTemplateItems) {
          if (vm.dossierTemplateItems[key]['fileTemplateNo']) {
            fileTemplateNoArr.push(vm.dossierTemplateItems[key]['fileTemplateNo'])
          }
          // 
          if (vm.tempLienThong && vm.dossierTemplateItems[key]['hasTemplateLienThong']) {
            vm.dossierTemplateLienThong.push(vm.dossierTemplateItems[key]['partNo'])
          }
        }
        vm.$store.commit('setDossierTemplateLienThong', vm.dossierTemplateLienThong)
        if (vm.khoTaiLieuCongDan) {
          vm.getDossierFileApplicants(vm.applicantId, vm.fileTemplateNoString)
        }
        if (fileTemplateNoArr.length > 0 && !vm.khoTaiLieuCongDan) {
          vm.fileTemplateNoString = fileTemplateNoArr.toString()
          // setTimeout(function () {
            if (vm.applicantId && !vm.onlyView && !vm.khoTaiLieuCongDan) {
              vm.getDossierFileApplicants(vm.applicantId, vm.fileTemplateNoString)
            }
          // }, 500)
        }
        // autoExpand form
        setTimeout(function () {
          try {
            if (vm.expandEform && vm.currentFormView === '') {
              console.log('expandEform', vm.expandEform)
              console.log('dossierTemplateItemsFilter', vm.dossierTemplateItemsFilter)
              let tpEform = vm.dossierTemplateItemsFilter.filter(function (item) {
                return item.partNo === 'TP01'
              })[0]
              console.log('tpEform', tpEform)
              vm.loadAlpcaFormClick(tpEform)
            }
          } catch (error) {
          }
        }, 1000)
        // 
      }).catch(reject => {
      })
      console.log('onlyView,checkInput', vm.onlyView, vm.checkInput, vm.progressUploadPart)
    },
    genAllAlpacaForm (dossierFiles, dossierTemplateItems) {
      var vm = this
      if (dossierFiles.length > 0 && dossierFiles.filter(file => {
          return file.eForm && file.size
        }).length > 0
      ) {
        var dossierFilesEform = dossierFiles.filter(file => {
          return file.eForm
        })
        var dossierTemplatesHasForm = dossierTemplateItems.filter(template => {
          return template.hasForm && vm.partTypes.includes(template.partType)
        })
        if (dossierFilesEform.length > 0) {
          // dossierFilesEform.forEach(itemFiles => {
          //   if (itemFiles.eForm) {
          //     vm.$store.dispatch('loadAlpcaForm', itemFiles)
          //   }
          // })
        } else {
          dossierTemplateItems.forEach(val => {
            if (val.hasForm && vm.partTypes.includes(val.partType)) {
              val['templateFileNo'] = vm.thongTinHoSo.dossierTemplateNo
              vm.showAlpacaJSFORM(val)
            }
          })
        }
        if (dossierTemplatesHasForm.length !== dossierFilesEform.length) {
          dossierTemplatesHasForm.forEach(template => {
            let indexFromFile = dossierFilesEform.findIndex(item => {
              return template.partNo === item.dossierPartNo
            })
            if (indexFromFile === -1) {
              template['templateFileNo'] = vm.thongTinHoSo.dossierTemplateNo
              vm.showAlpacaJSFORM(template)
            }
          })
        }
      } else {
        dossierTemplateItems.forEach(val => {
          if (val.hasForm && vm.partTypes.includes(val.partType)) {
            val['templateFileNo'] = vm.thongTinHoSo.dossierTemplateNo
            vm.showAlpacaJSFORM(val)
          }
        })
      }
    },
    postDossierMark (item, index) {
      var vm = this
      item['dossierId'] = vm.thongTinHoSo.dossierId
      vm.$store.dispatch('postDossierMark', item).then(resultMark => {
      }).catch(reject => {
      })
      //   dossierTemplates.forEach(function (val, index) {
        //     if (val.partType === 1) {
        //       val['dossierId'] = vm.dossierId
        //       listDossierMark.push(vm.$store.dispatch('postDossierMark', val))
        //     }
        //   })
    },
    mergeDossierTemplateVsDossierFiles (dossierTemplates, dossierFiles) {
      var vm = this
      if (dossierFiles.length !== 0) {
        dossierTemplates.forEach(template => {
          template['editForm'] = true
          template['daKhai'] = false
          template['passRequired'] = false
          dossierFiles.forEach(dossierFile => {
            if (template.partNo === dossierFile.dossierPartNo) {
              template['passRequired'] = true
            }
          })
          var itemFindEfom = dossierFiles.find(file => {
            return template.partNo === file.dossierPartNo && vm.partTypes.includes(template.partType) && file.eForm && !file.removed && file.fileSize !== 0
          })
          var itemFindEfomAttack = dossierFiles.find(file => {
            return template.partNo === file.dossierPartNo && vm.partTypes.includes(template.partType) && !file.eForm && !file.removed && file.fileSize !== 0
          })
          if (itemFindEfom) {
            template['daKhai'] = true
            template['hasForm'] = true
            template['referenceUid'] = itemFindEfom['referenceUid']
          } else {
            if (!vm.requiredEform) {
              if (itemFindEfomAttack) {
                template['passRequired'] = true
              } else {
                template['passRequired'] = false
              }
            } else {
              if (itemFindEfomAttack && ((template['hasForm'] && template['multiple']) || !template['hasForm'])) {
                template['passRequired'] = true
              } else {
                template['passRequired'] = false
              }
            }
          }
        })
      } else {
        dossierTemplates.forEach(template => {
          if (template.hasForm) {
            template['daKhai'] = false
            template['passRequired'] = false
            template['editForm'] = true
          }
        })
      }
      return dossierTemplates
    },
    mergeDossierTemplateVsDossierMark (dossierTemplates, dossierMarks) {
      let vm = this
      if (dossierMarks.length !== 0) {
        dossierTemplates.map(itemTemplate => {
          itemTemplate['count'] = 0
          itemTemplate['stateEditFileCheck'] = false
          let fileMarkFind = dossierMarks.find(fileMark => {
            return fileMark.dossierPartNo === itemTemplate.partNo
          })
          if (fileMarkFind !== null && fileMarkFind !== undefined) {
            itemTemplate['fileMark'] = fileMarkFind.fileMark
            itemTemplate['fileComment'] = fileMarkFind.fileComment
            itemTemplate['fileCheck'] = fileMarkFind.fileCheck
            itemTemplate['recordCount'] = fileMarkFind.recordCount
            itemTemplate['fileMarkDefault'] = fileMarkFind.fileMark
            itemTemplate['hasTemplate'] = String(fileMarkFind.fileMark) !== '0' || itemTemplate.partType === 2
            if (itemTemplate['hasTemplate'] && !itemTemplate['recordCount']) {
              itemTemplate['recordCount'] = 1
            } else if (!itemTemplate['hasTemplate']) {
              itemTemplate['recordCount'] = 0
            }
            itemTemplate['hasTemplateLienThong'] = itemTemplate['hasTemplate']
          } else {
            itemTemplate['fileMark'] = 0
            itemTemplate['fileComment'] = ''
            itemTemplate['fileCheck'] = 0
            itemTemplate['recordCount'] = 0
            itemTemplate['hasTemplate'] = false
            itemTemplate['hasTemplateLienThong'] = itemTemplate['hasTemplate']
          }
          return itemTemplate
        })
      } else {
        if (dossierTemplates) {
          dossierTemplates.forEach(itemTemplate => {
            itemTemplate['stateEditFileCheck'] = false
            itemTemplate['count'] = 0
            itemTemplate['fileMark'] = 0
            itemTemplate['fileComment'] = ''
            itemTemplate['fileCheck'] = 0
            itemTemplate['stateEditFileCheck'] = false
          })
        }
      }
      console.log('mergeDossierTemplateVsDossierMark', dossierTemplates)
      return dossierTemplates
    },
    mergeDossierTemplateVsFileTemplates (dossierTemplates, fileTemplates) {
      if (fileTemplates.length !== 0) {
        dossierTemplates.map(itemTemplate => {
          let fileTemp = fileTemplates.find(fileTemplate => {
            return fileTemplate.fileTemplateNo === itemTemplate.fileTemplateNo
          })
          if (fileTemp !== null && fileTemp !== undefined) {
            itemTemplate['hasFileTemp'] = fileTemp.fileTemplateNo
          } else {
            itemTemplate['hasFileTemp'] = ''
          }
          return itemTemplate
        })
      } else {
        if (dossierTemplates) {
          dossierTemplates.forEach(itemTemplate => {
            itemTemplate['hasFileTemp'] = ''
          })
        }
      }
      console.log('mergeDossierTemplateVsFileTemplates', dossierTemplates)
      return dossierTemplates
    },
    showAlpacaJSFORM (item, isPending) {
      console.log('showAlpacaJSFORM', item)
      let vm = this
      item['dossierId'] = vm.thongTinHoSo.dossierId
      item['editForm'] = true
      vm.$store.dispatch('loadFormScript', item).then(resScript => {
        /* eslint-disable */
        let eformScript = ''
        try {
          eformScript = eval('(' + resScript + ')')
        } catch (error) {
        }
        /* eslint-disable */
        if (eformScript && eformScript.hasOwnProperty('eformEmbed') && eformScript.eformEmbed) {
          console.log('chuHoSoA2', vm.thongTinChuHoSo)
          item.embed = true
          let deliverableType = item.deliverableType ? item.deliverableType : ''
          let paramsEmbed = {
            userId: window.themeDisplay.getUserId(),
            userEmail: vm.originality === 1 ? vm.userLoginInfomation.applicantContactEmail : vm.userLoginInfomation.employeeEmail,
            referenceUid: vm.thongTinHoSo.referenceUid,
            code: vm.thongTinHoSo.referenceUid,
            dossierStatus: vm.thongTinHoSo.dossierStatus,
            dossierSubStatus: vm.thongTinHoSo.dossierSubStatus,
            tp: item.partNo,
            token: localStorage.getItem('jwt_token'),
            dossierNo: vm.thongTinHoSo.dossierNo,
            submitDate: vm.thongTinHoSo.submitDate,
            govAgencyCode: vm.thongTinHoSo.govAgencyCode,
            govAgencyName: vm.thongTinHoSo.govAgencyName,
            dossierTemplateNo: vm.thongTinHoSo.dossierTemplateNo,
            dossierId: vm.thongTinHoSo.dossierId
          }
          if (vm.thongTinHoSo.dossierStatus === '' || vm.thongTinHoSo.dossierStatus === 'new') {
            paramsEmbed = Object.assign(paramsEmbed, {
              applicantIdNo: vm.thongTinChuHoSo['applicantIdNo'],
              applicantName: vm.thongTinChuHoSo['applicantName'],
              address: vm.thongTinChuHoSo['address'],
              cityCode: vm.thongTinChuHoSo['cityCode'],
              cityName: vm.thongTinChuHoSo['cityName'],
              districtCode: vm.thongTinChuHoSo['districtCode'],
              districtName: vm.thongTinChuHoSo['districtName'],
              wardCode: vm.thongTinChuHoSo['wardCode'],
              wardName: vm.thongTinChuHoSo['wardName'],
              contactEmail: vm.thongTinChuHoSo['contactEmail'],
              contactTelNo: vm.thongTinChuHoSo['contactTelNo'],
              userType: vm.thongTinChuHoSo['userType'] == '1' ? 'citizen' : 'business'
            })
          }
          if (vm.onlyView) {
            paramsEmbed['view_mode'] = 'view'
          }
          let fileTemplateNoEmbed = item.fileTemplateNo
          // check theo formCode cấu hình
          if (eformScript && eformScript.hasOwnProperty('formCode') && eformScript.formCode) {
            fileTemplateNoEmbed = eformScript.formCode
          }
          // 
          let urlEmbed = eformScript.eformEmbed + '/' + fileTemplateNoEmbed + '___' + deliverableType + '?originURL=' + encodeURIComponent(document.location.origin)
          for (let key in paramsEmbed) {
            urlEmbed += ('&' + key + '=' + paramsEmbed[key])
          }
          setTimeout(function () {
            document.getElementById('formAlpaca' + item.partNo + vm.id).src = ''
            setTimeout(function () {
              document.getElementById('formAlpaca' + item.partNo + vm.id).src = urlEmbed
            }, 50)
          }, 300)
        } else if (eformScript && eformScript.hasOwnProperty('eformDHQG') && eformScript.eformDHQG) {
          vm.mauNhapForm = eformScript.mauNhap
          
        } else {
          item.embed = false
          vm.$store.dispatch('loadFormData', item).then(resData => {
            if (isPending) {
              resData = item.formData
            }
            window.$('div[id="formAlpaca' + item.partNo + vm.id + '"]').empty()
            let formScript, formData
            /* eslint-disable */
            if (resScript) {
              formScript = eval('(' + resScript + ')')
            } else {
              formScript = {}
            }
            if (resData) {
              formData = eval('(' + resData + ')')
              item['loaded'] = true
            } else {
              formData = {}
            }
            // option 
            formData.templateNo_hidden = item.partNo
            formData.dossierId_hidden = vm.thongTinHoSo.dossierId
            formData.dossierStatus_hidden = vm.thongTinHoSo.dossierStatus
            formData.dossierSubStatus_hidden = vm.thongTinHoSo.dossierSubStatus
            formData.fileTemplateNo_hidden = item.fileTemplateNo
            formData.deliverableType_hidden = item.deliverableType ? item.deliverableType : ''
            formData.userEmailAddress_hidden = vm.originality === 1 ? vm.userLoginInfomation.applicantContactEmail : vm.userLoginInfomation.employeeEmail
            formData.referenceUid = vm.thongTinHoSo.referenceUid
            // 
            console.log('data_input postMessage', formScript)
            /* eslint-disable */
            formScript.data = formData
            window.$('div[id="formAlpaca' + item.partNo + vm.id + '"]').alpaca(formScript)
          })
        }
        
      })
    },
    saveAlpacaForm (item, index) {
      var vm = this
      var fileFind = vm.dossierFilesItems.find(itemFile => {
        // return itemFile.dossierPartNo === item.partNo && itemFile.eForm && itemFile.fileSize!==0
        return itemFile.dossierPartNo === item.partNo && itemFile.eForm
      })
      if (fileFind) {
        fileFind['dossierId'] = vm.thongTinHoSo.dossierId
        fileFind['id'] = vm.id
        vm.loadingApacal = true
        vm.$store.dispatch('putAlpacaForm', fileFind).then(resData => {
          setTimeout(function () {
            vm.loadingApacal = false
            toastr.clear()
            toastr.success('Thực hiện thành công')
            vm.loadFiles()
          }, 3000)
          vm.dossierTemplateItemsFilter[index]['passRequired'] = true
        }).catch(reject => {
          vm.loadingApacal = false
        })
      } else {
        item['dossierId'] = vm.thongTinHoSo.dossierId
        item['id'] = vm.id
        vm.loadingApacal = true
        vm.$store.dispatch('postEform', item).then(resPostEform => {
          console.log('resole', resPostEform)
          setTimeout(function () {
            vm.loadingApacal = false
            toastr.clear()
            toastr.success('Thực hiện thành công')
            vm.dossierTemplateItemsFilter[index].daKhai = true
            vm.loadFiles()
          }, 3000)
          vm.dossierTemplateItemsFilter[index]['passRequired'] = true
          
        }).catch(reject => {
          vm.loadingApacal = false
        })
      }
    },
    saveAlpacaFormCallBack (data) {
      let vm = this
      console.log('dataTBTV', data)
      let dataOutPut = ''
      try {
        dataOutPut = data.data ? JSON.parse(data.data) : ''
      } catch (error) {
        dataOutPut = ''
      }
      console.log('data_output new_eform_2', dataOutPut)
      if (dataOutPut && dataOutPut.hasOwnProperty('tp') && dataOutPut.tp) {
        let fileFind = vm.dossierFilesItems.find(itemFile => {
          // return itemFile.dossierPartNo === dataOutPut.tp && itemFile.eForm && itemFile.fileSize!==0
          return itemFile.dossierPartNo === dataOutPut.tp && itemFile.eForm
        })
        console.log('fileFind', vm.dossierFilesItems, fileFind)
        if (vm.loadingApacal) {
          return
        }
        if (fileFind) {
          console.log('item put 5555', fileFind)
          fileFind['dossierId'] = vm.thongTinHoSo.dossierId
          fileFind['id'] = vm.id
          fileFind['formData'] = dataOutPut
          vm.loadingApacal = true
          console.log('dataTBTV', fileFind['formData'])
          vm.$store.dispatch('putAlpacaFormCallBack', fileFind).then(resData => {
            let index = vm.dossierTemplateItemsFilter.findIndex(item => item.partNo === dataOutPut.tp);
            vm.dossierTemplateItemsFilter[index]['passRequired'] = true
            setTimeout(function () {
              vm.loadingApacal = false
              toastr.clear()
              toastr.success('Thực hiện thành công')
              // gen lại sau cập nhật
              vm.dossierTemplateItemsFilter[index].daKhai = true
              vm.showAlpacaJSFORM(vm.dossierTemplateItemsFilter[index])
              vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
                vm.dossierFilesItems = resFiles
              }).catch(reject => {
              })
            }, 1000)
            
          }).catch(reject => {
            vm.loadingApacal = false
            toastr.clear()
            toastr.error('Yêu cầu của bạn thực hiện thất bại')
          })
        } else {
          dataOutPut['dossierId'] = vm.thongTinHoSo.dossierId
          dataOutPut['id'] = vm.id
          vm.loadingApacal = true
          
          vm.$store.dispatch('postEformCallBack', dataOutPut).then(resPostEform => {
            let index = vm.dossierTemplateItemsFilter.findIndex(item => item.partNo === dataOutPut.tp)
            setTimeout(function () {
              vm.loadingApacal = false
              toastr.clear()
              toastr.success('Thực hiện thành công')
              vm.dossierTemplateItemsFilter[index].daKhai = true
              // gen lại sau cập nhật
              console.log('dossierTemplateItemsFilter-1', vm.dossierTemplateItemsFilter[index])
              vm.showAlpacaJSFORM(vm.dossierTemplateItemsFilter[index])
              vm.dossierTemplateItemsFilter[index]['passRequired'] = true
              vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
                vm.dossierFilesItems = resFiles
              }).catch(reject => {
              })
            }, 1000)
          }).catch(reject => {
            vm.loadingApacal = false
            toastr.clear()
            toastr.error('Yêu cầu của bạn thực hiện thất bại.')
          })
        }
      }
    },
    onDeleteAttackFiles (item) {
      var vm = this
      console.log('delete')
      let x = confirm('Bạn có muốn xóa toàn bộ file trong thành phần hồ sơ này?')
      if (x) {
        vm.dossierTemplateItemsFilter.forEach(val => {
          if (val.dossierPartNo === item.partNo) {
            val['dossierId'] = vm.thongTinHoSo.dossierId
            vm.$store.dispatch('deleteAttackFiles', val).then(function (result) {
              vm.resetCounterTemplate(item)
              vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId)
            }).catch(function (xhr) {
            })
          }
        })
      }
    },
    changeApplicantNote () {
      let vm = this
      vm.$store.commit('setApplicantNote', vm.applicantNoteDossier)
    },
    pickFile (item) {
      var vm = this
      vm.stateAddFileOther = false
      document.getElementById('file' + item.partNo).value = ''
      document.getElementById('file' + item.partNo).click()
    },
    onUploadSingleFile (e, data, index) {
      var vm = this
      vm.dossierTemplatesItemSelect = data
      vm.progressUploadPart = data.partNo
      data['dossierId'] = vm.thongTinHoSo.dossierId
      data['dossierTemplateNo'] = vm.thongTinHoSo.dossierTemplateNo
      if (data.partType !== 3) {
        vm.$store.dispatch('uploadSingleFile', data).then(function (result) {
          vm.progressUploadPart = ''
          vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
            vm.dossierFilesItems = result
            vm.recountFileTemplates()
          })
          if (vm.dossierTemplateItemsFilter[index]['hasForm'] && vm.requiredEform && !vm.dossierTemplateItemsFilter[index]['multiple']) {
            return
          }
          vm.dossierTemplateItemsFilter[index]['passRequired'] = true
        }).catch(function (data) {
          vm.progressUploadPart = ''
          vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
            vm.dossierFilesItems = result
            vm.recountFileTemplates()
          })
          if (vm.dossierTemplateItemsFilter[index]['hasForm'] && vm.requiredEform && !vm.dossierTemplateItemsFilter[index]['multiple']) {
            return
          }
          if (data.length > 0) {
            vm.dossierTemplateItemsFilter[index]['passRequired'] = true
          }
        })
      } else {
        if (window.$('input[id="file' + data.partNo + '"]')[0].files.length === 0) {
          vm.progressUploadPart = ''
          return
        }
        vm.partView = data.partNo
        vm.stateView = true
        vm.dialogAddOtherTemp = true
      }
    },
    kySoPdfUrlSavis (item, index) {
      let vm = this
      vm.fileKySo = item
      vm.indexFileSelect = index
      vm.signSavisPdfUrl = item
      vm.dialogSignDigital = false
      document.getElementById('fileAnhChuKySavis').value = ''
      vm.dialogSelectAnhChuKySo = true
    },
    pickFileSavis (item) {
      let vm = this
      vm.signSavisPdfUrl = false
      vm.stateAddFileOther = false
      document.getElementById('fileSavis' + item.partNo).value = ''
      document.getElementById('fileSavis' + item.partNo).click()
    },
    changeFileSavis (e, data, index) {
      var vm = this
      vm.dossierTemplatesItemSelect = data
      data['dossierId'] = vm.thongTinHoSo.dossierId
      data['dossierTemplateNo'] = vm.thongTinHoSo.dossierTemplateNo
      if (data.partType !== 3) {
        let files = $('input[id="fileSavis' + data.partNo + '"]')[0].files
        let file = files[0]
        let fileName = file['name']
        if (file['name']) {
          fileName = file['name'].replace(/\%/g, '')
          fileName = fileName.replace(/\//g, '')
          fileName = fileName.replace(/\\/g, '')
        }
        let fileType = file.type
        vm.fileKySoSavis = {
          file: file,
          fileName: fileName,
          fileType: fileType
        }
        console.log('fileKySoSavis', vm.fileKySoSavis)
        
        if (fileType == 'application/pdf') {
          document.getElementById('fileAnhChuKySavis').value = ''
          vm.dialogSelectAnhChuKySo = true
        } else {
          vm.getCertSavis()
        }

        // document.getElementById('fileAnhChuKySavis').value = ''
        // document.getElementById('fileAnhChuKySavis').click()
      } else {
        if (window.$('input[id="fileSavis' + data.partNo + '"]')[0].files.length === 0) {
          vm.progressUploadPart = ''
          return
        }
        vm.partView = data.partNo
        vm.stateView = true
        vm.dialogAddOtherTemp = true
      }
    },
    selectAnhHienThiKySo () {
      document.getElementById('fileAnhChuKySavis').click()
    },
    changeFileAnhChuKySavis () {
      let vm = this
      let files = $('input[id="fileAnhChuKySavis"]')[0].files
      let file = files[0]
      let fileName = file['name']
      if (file['name']) {
        fileName = file['name'].replace(/\%/g, '')
        fileName = fileName.replace(/\//g, '')
        fileName = fileName.replace(/\\/g, '')
      }
      vm.fileImageSignPdf = {
        file: file,
        fileName: fileName
      }
      vm.hasAnhChuKySo = true
      vm.dialogSelectAnhChuKySo = false
      vm.getCertSavis()
    },
    getCertSavis () {
      let vm = this
      let param = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let url = 'http://127.0.0.1:14423/api/v1/certs'
      vm.mssProcessingSavis = 'Đang lấy danh sách chứng thư số'
      vm.processingSavis = true
      axios.get(url, param).then(result1 => {
        vm.processingSavis = false
        try {
          vm.listCaSavis = result1.data.data.filter(function(item) {
            return item.crlDistributionPoint != null
          })
        } catch (error) {
          vm.listCaSavis = []
        }
        if (vm.listCaSavis && vm.listCaSavis.length) {
          vm.dialogSelectCa = true
        } else {
          toastr.error('Không có chứng thư số. Vui lòng cắm token ký số')
          vm.processingSavis = false
        }
      }).catch(xhr => {
        toastr.error('Lấy chứng thư số không thành công')
        vm.dialogTaiSavis = true
        vm.processingSavis = false
      })  
    },
    cancelFileAnhChuKySavis () {
      let vm = this
      vm.hasAnhChuKySo = false
      vm.dialogSelectAnhChuKySo = false
      vm.getCertSavis()
    },
    submitSignSavis (item) {
      let vm = this
      if (vm.signSavisPdfUrl) {
        vm.kySavisUrlPdf(item)
      } else {
        vm.kySavisUploadPdf(item)
      }
    },
    kySavisUrlPdf (cert) {
      let vm = this
      let fileUrl = window.location.origin + '/o/rest/v2/dossiers/' + vm.thongTinHoSo['dossierId'] + '/files/' + vm.signSavisPdfUrl['referenceUid'] + '/preview.pdf'
      let param = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let form = new FormData()
      let url = 'http://127.0.0.1:14423/api/v1/sign/pdf'
      form.append("serial", cert.serial)
      form.append("file", "");
      form.append("fileUrl", fileUrl);
      form.append("isVisible", true);
      form.append("page", "1");
      form.append("llx", "150");
      form.append("lly", "792");
      form.append("urx", "0");
      form.append("ury", "750");
      form.append("detectString", "");
      form.append("detail", "1,6");
      form.append("reason", "");
      form.append("location", "");
      form.append("contactInfo", "");
      if (vm.hasAnhChuKySo) {
        form.append("image", vm.fileImageSignPdf.file, vm.fileImageSignPdf.fileName);
      } else {
        let fileFix = new File([
          new Blob(["/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCABkAGQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z"])
        ], "fileAnh");
        form.append("image", fileFix, "fileAnh")
      }
      vm.dialogSelectCa = false
      vm.mssProcessingSavis = 'Đang thực hiện ký số'
      vm.processingSavis = true
      axios.post(url, form, param).then(result1 => {
        console.log('result-savis', result1)
        let fileBase64 = ''
        if (result1.data.code == 200) {
          fileBase64 = result1.data.data
          // 
          let param = {
            headers: {
              groupId: window.themeDisplay.getScopeGroupId(),
              Token: window.Liferay ? window.Liferay.authToken : ''
            }
          }
          let dataPost = new URLSearchParams()
          dataPost.append('fileName', vm.signSavisPdfUrl.hasOwnProperty('eForm') && vm.signSavisPdfUrl.eForm ? 'TaiLieuKhaiTrucTuyen.pdf' : vm.signSavisPdfUrl.displayName )
          dataPost.append('fileBase64', fileBase64)
          dataPost.append('dossierFileId', vm.signSavisPdfUrl.dossierFileId)
          
          let url = '/o/rest/v2/signature/' + vm.thongTinHoSo.dossierId + '/savis'
          axios.post(url, dataPost, param).then(function (response) {
            let signFileName = response.data.signFileName
            // updateFileKy
            let param = {
              headers: {
                groupId: window.themeDisplay.getScopeGroupId(),
                Token: window.Liferay ? window.Liferay.authToken : ''
              }
            }
            let dataPost = new URLSearchParams()
            dataPost.append('signFileName', signFileName)
            dataPost.append('dossierPartNo', vm.dossierTemplatesItemSelect.partNo)
            dataPost.append('dossierTemplateNo', vm.thongTinHoSo.dossierTemplateNo)
            dataPost.append('dossierFileId', vm.signSavisPdfUrl.dossierFileId)
            let url = '/o/rest/v2/defaultsignature/'+ vm.thongTinHoSo.dossierId +'/savis/fileupload'
            axios.post(url, dataPost, param).then(function (response) {
              toastr.success('Ký số thành công')
              vm.progressUploadPart = ''
              vm.processingSavis = false
              vm.updateSignCheck(vm.fileKySo.dossierFileId)
            }).catch(function (error) {
              vm.progressUploadPart = ''
              toastr.error('Ký số thất bại')
              vm.processingSavis = false
            })
            // 
          }).catch(function (error) {
            toastr.error('Ký số thất bại')
            vm.processingSavis = false
          })
        } else {
          toastr.error('Ký số thất bại')
          vm.processingSavis = false
        }
      }).catch(xhr => {
        toastr.error('Ký số thất bại')
        vm.processingSavis = false
      })
    },
    kySavisUploadPdf (cert) {
      let vm = this
      let param = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
      }
      let form = new FormData()
      let url = ''
      form.append("serial", cert.serial)
      if (vm.fileKySoSavis.fileType == 'application/pdf') {
        url = 'http://127.0.0.1:14423/api/v1/sign/pdf'
        form.append("file", vm.fileKySoSavis.file, vm.fileKySoSavis.fileName);
        form.append("fileUrl", "");
        form.append("isVisible", true);
        form.append("page", "1");
        form.append("llx", "150");
        form.append("lly", "792");
        form.append("urx", "0");
        form.append("ury", "750");
        form.append("detectString", "");
        form.append("detail", "1,6");
        form.append("reason", "");
        form.append("location", "");
        form.append("contactInfo", "");
        if (vm.hasAnhChuKySo) {
          form.append("image", vm.fileImageSignPdf.file, vm.fileImageSignPdf.fileName);
        } else {
          let fileFix = new File([
            new Blob(["/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAQDAwQDAwQEAwQFBAQFBgoHBgYGBg0JCggKDw0QEA8NDw4RExgUERIXEg4PFRwVFxkZGxsbEBQdHx0aHxgaGxr/2wBDAQQFBQYFBgwHBwwaEQ8RGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhr/wAARCABkAGQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z"])
          ], "fileAnh");
          form.append("image", fileFix, "fileAnh")
        }
      } else {
        url = 'http://127.0.0.1:14423/api/v1/sign/binary'
        form.append("file", vm.fileKySoSavis.file, vm.fileKySoSavis.fileName);
        form.append("fileUrl", "");
      }
      vm.dialogSelectCa = false
      vm.mssProcessingSavis = 'Đang thực hiện ký số'
      vm.processingSavis = true
      axios.post(url, form, param).then(result1 => {
        console.log('result-savis', result1)
        let fileBase64 = ''
        if (result1.data.code == 200) {
          fileBase64 = result1.data.data
          // 
          let param = {
            headers: {
              groupId: window.themeDisplay.getScopeGroupId(),
              Token: window.Liferay ? window.Liferay.authToken : ''
            }
          }
          let dataPost = new URLSearchParams()
          dataPost.append('fileName', vm.fileKySoSavis.fileName)
          dataPost.append('fileBase64', fileBase64)
          let url = '/o/rest/v2/signature/' + vm.thongTinHoSo.dossierId + '/savis'
          axios.post(url, dataPost, param).then(function (response) {
            // 
            let signFileName = response.data.signFileName
            let param = {
              headers: {
                groupId: window.themeDisplay.getScopeGroupId(),
                Token: window.Liferay ? window.Liferay.authToken : ''
              }
            }
            let dataPost = new URLSearchParams()
            dataPost.append('signFileName', signFileName)
            dataPost.append('dossierPartNo', vm.dossierTemplatesItemSelect.partNo)
            dataPost.append('dossierTemplateNo', vm.thongTinHoSo.dossierTemplateNo)
            let url = '/o/rest/v2/defaultsignature/'+ vm.thongTinHoSo.dossierId +'/savis/fileupload'
            axios.post(url, dataPost, param).then(function (response) {
              toastr.success('Tải lên và ký số thành công')
              vm.progressUploadPart = ''
              vm.processingSavis = false
              try {
                vm.updateSignCheck(response.data.dossierFileId)
              } catch (error) {
              }
            }).catch(function () {
              toastr.error('Ký số thất bại')
              vm.processingSavis = false
            })
            // 
          }).catch(function (error) {
            toastr.error('Ký số thất bại')
            vm.processingSavis = false
          })
        } else {
          toastr.error('Ký số thất bại')
          vm.progressUploadPart = ''
          vm.processingSavis = false
        }
      }).catch(xhr => {
        toastr.error('Ký số thất bại')
        vm.progressUploadPart = ''
        vm.processingSavis = false
      })
    },
    loadAlpcaForm (data) {
      let vm = this
      //
      let fileFind = vm.dossierFilesItems.find(itemFile => {
        return itemFile.dossierPartNo === data.partNo && itemFile.eForm
      })
      if (fileFind) {
        fileFind['id'] = vm.id
        vm.$store.dispatch('loadAlpcaForm', fileFind)
      } else {
        vm.dossierTemplateItemsFilter.forEach(val => {
          if (val.hasForm && data.partNo === val.partNo) {
            val['templateFileNo'] = vm.thongTinHoSo.dossierTemplateNo
            vm.showAlpacaJSFORM(val)
          }
        })
      }
    },
    
    loadAlpcaFormClick (data, viewform, index) {
      let vm = this
      let path = vm.dossierTemplateItemsFilter.find(function (item) {
        return item.hasForm && data.partNo == item.partNo
      })
      path['templateFileNo'] = vm.thongTinHoSo.dossierTemplateNo
      path['dossierId'] = vm.thongTinHoSo.dossierId
      path['editForm'] = true
      vm.$store.dispatch('loadFormScript', path).then(resScript => {
        /* eslint-disable */
        let eformScript = ''
        try {
          eformScript = eval('(' + resScript + ')')
        } catch (error) {
        }
        /* eslint-disable */
        if (eformScript && eformScript.hasOwnProperty('eformDHQG') && eformScript.eformDHQG) {
          vm.mauNhapForm = eformScript.mauNhap
          vm.docxTemplateUrl = eformScript.docxTemplateUrl
          vm.dialog_formscript_tphs = true
          vm.thanhPhanFormUpdate = data
          vm.indexThanhPhanFormUpdate = index

          vm.$store.dispatch('getListDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
            let listDossierFiles = result
            if (listDossierFiles && listDossierFiles.length) {
              let fileTp = listDossierFiles.find(function (item) {
                return item.dossierPartNo == data.partNo
              })
              if (fileTp) {
                vm.formDataTphs = JSON.parse(fileTp.formData)
                setTimeout(function () {
                  vm.$refs.formThanhPhanHoSo.initForm('update')
                }, 200)
              } else {
                setTimeout(function () {
                  vm.$refs.formThanhPhanHoSo.initForm('create')
                }, 200)
              }
            } else {
              setTimeout(function () {
                vm.$refs.formThanhPhanHoSo.initForm('create')
              }, 200)
            }
          })
          // vm.$store.dispatch('loadFormData', path).then(resData => {
          //   console.log('FormData', eval('(' + resData + ')'))
          //   if (resData) {
          //     vm.formDataTphs = eval('(' + resData + ')')
          //     setTimeout(function () {
          //       vm.$refs.formThanhPhanHoSo.initForm('update')
          //     }, 200)
          //   } else {
          //     setTimeout(function () {
          //       vm.$refs.formThanhPhanHoSo.initForm('create')
          //     }, 200)
          //   }
          // }).catch(function () {
          //   setTimeout(function () {
          //     vm.$refs.formThanhPhanHoSo.initForm('create')
          //   }, 200)
          // })
          
        }
      })
    },
    editFormAlpaca (item) {
      let vm = this
      item['editForm'] = true
      /* eslint-disable */
      let fileFind = vm.dossierFilesItems.find(itemFile => {
        return itemFile.dossierPartNo === item.partNo && itemFile.eForm
      })
      let eformScript = eval('(' + fileFind.formScript + ')')
      console.log('eformScript', eformScript)
      /* eslint-disable */
      if (eformScript && eformScript.hasOwnProperty('eformEmbed') && eformScript.eformEmbed) {
        console.log('chuHoSoA1', vm.thongTinChuHoSo)
        item.embed = true
        let deliverableType = item.deliverableType ? item.deliverableType : ''
        let paramsEmbed = {
          userId: window.themeDisplay.getUserId(),
          userEmail: vm.originality === 1 ? vm.userLoginInfomation.applicantContactEmail : vm.userLoginInfomation.employeeEmail,
          referenceUid: vm.thongTinHoSo.referenceUid,
          code: vm.thongTinHoSo.referenceUid,
          dossierStatus: vm.thongTinHoSo.dossierStatus,
          dossierSubStatus: vm.thongTinHoSo.dossierSubStatus,
          tp: item.partNo,
          token: localStorage.getItem('jwt_token'),
          dossierNo: vm.thongTinHoSo.dossierNo,
          submitDate: vm.thongTinHoSo.submitDate,
          govAgencyCode: vm.thongTinHoSo.govAgencyCode,
          govAgencyName: vm.thongTinHoSo.govAgencyName,
          dossierTemplateNo: vm.thongTinHoSo.dossierTemplateNo,
          dossierId: vm.thongTinHoSo.dossierId
        }
        if (vm.thongTinHoSo.dossierStatus === '' || vm.thongTinHoSo.dossierStatus === 'new') {
          paramsEmbed = Object.assign(paramsEmbed, {
            applicantIdNo: vm.thongTinChuHoSo['applicantIdNo'],
            applicantName: vm.thongTinChuHoSo['applicantName'],
            address: vm.thongTinChuHoSo['address'],
            cityCode: vm.thongTinChuHoSo['cityCode'],
            cityName: vm.thongTinChuHoSo['cityName'],
            districtCode: vm.thongTinChuHoSo['districtCode'],
            districtName: vm.thongTinChuHoSo['districtName'],
            wardCode: vm.thongTinChuHoSo['wardCode'],
            wardName: vm.thongTinChuHoSo['wardName'],
            contactEmail: vm.thongTinChuHoSo['contactEmail'],
            contactTelNo: vm.thongTinChuHoSo['contactTelNo'],
            userType: vm.thongTinChuHoSo['userType'] == '1' ? 'citizen' : 'business'
          })
        }
        if (vm.onlyView) {
          paramsEmbed['view_mode'] = 'view'
        }
        let fileTemplateNoEmbed = item.fileTemplateNo
        // check theo formCode cấu hình
        if (eformScript && eformScript.hasOwnProperty('formCode') && eformScript.formCode) {
          fileTemplateNoEmbed = eformScript.formCode
        }
        //
        let urlEmbed = eformScript.eformEmbed + '/' + fileTemplateNoEmbed + '___' + deliverableType + '?originURL=' + encodeURIComponent(document.location.origin)
        for (let key in paramsEmbed) {
          urlEmbed += ('&' + key + '=' + paramsEmbed[key])
        }
        
        setTimeout(function () {
          document.getElementById('formAlpaca' + item.partNo + vm.id).src = urlEmbed
        }, 300)
      } else {
        item.embed = false
        setTimeout (function () {
          let fileFind = vm.dossierFilesItems.find(itemFile => {
            return itemFile.dossierPartNo === item.partNo && itemFile.eForm
          })
          fileFind['id'] = vm.id
          vm.$store.dispatch('loadAlpcaForm', fileFind)
        }, 200)
      }
      
    },
    deleteSingleFileEform (item, index) {
      var vm = this
      let x = confirm('Bạn có chắc chắn xóa file?')
      if (x) {
        vm.dossierFilesItems.forEach(file => {
          if (file.dossierPartNo === item.partNo && file.eForm) {
            file['dossierId'] = vm.thongTinHoSo.dossierId
            vm.$store.dispatch('deleteDossierFile', file).then(resFile => {
              vm.dossierTemplateItemsFilter[index].daKhai = false
              vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
                vm.dossierFilesItems = result
                vm.recountFileTemplates()
                // 
                item['editForm'] = true
                setTimeout(function () {
                  vm.loadAlpcaForm(item)
                }, 200)
                // 
                if (vm.dossierFilesItems.length !== 0) {
                  var fileViewsTemp = vm.dossierFilesItems.filter(file => {
                    return file.dossierPartNo === item.partNo
                  })
                  if (fileViewsTemp) {
                    vm.dossierTemplateItemsFilter[index]['passRequired'] = true
                  } else {
                    vm.dossierTemplateItemsFilter[index]['passRequired'] = false
                  }
                } else {
                  vm.dossierTemplateItemsFilter[index]['passRequired'] = false
                }
                if (vm.dossierTemplateItemsFilter[index]['hasForm'] && vm.requiredEform && !vm.dossierTemplateItemsFilter[index]['multiple']) {
                  vm.dossierTemplateItemsFilter[index]['passRequired'] = false
                }
              })
            })
          }
        })
      }
    },
    previewFileEfom (item, index) {
      var vm = this
      vm.dossierFilesItems.forEach(file => {
        if (file.dossierPartNo === item.partNo && file.eForm && !file.removed) {
          file['dossierId'] = vm.thongTinHoSo.dossierId
          vm.dialogPDFLoading = true
          vm.dialogPDF = true
          if (!vm.onlyView) {
            file['id'] = vm.id
            vm.$store.dispatch('putAlpacaForm', file).then(resData => {
              setTimeout(function () {
                vm.$store.dispatch('viewFile', file).then(result => {
                  vm.dialogPDFLoading = false
                  document.getElementById('dialogPDFPreview' + vm.id).src = result
                })
              }, 1000)
            }).catch(reject => {
              toastr.clear()
              toastr.error('Yêu cầu của bạn thực hiện thất bại.')
            })
          } else {
            vm.$store.dispatch('viewFile', file).then(result => {
              vm.dialogPDFLoading = false
              if (file['eForm']) {
                vm.pdfEform = true
              } else {
                vm.pdfEform = false
              }
              document.getElementById('dialogPDFPreview' + vm.id).src = result
            })
          }
        }
      })
    },
    previewFormAlpaca (item, index) {
      let vm = this
      vm.dossierFilesItems.forEach(file => {
        if (file.dossierPartNo === item.partNo && file.eForm && !file.removed) {
          file['dossierId'] = vm.thongTinHoSo.dossierId
          if (!vm.onlyView) {
            //
            let eformScript = eval('(' + file.formScript + ')')
            // console.log('eformScript preview', eformScript)
            if (eformScript && eformScript.hasOwnProperty('eformEmbed') && eformScript.eformEmbed) {
              item['editForm'] = false
              setTimeout(function () {
                vm.$store.dispatch('viewFile', file).then(result => {
                  document.getElementById('displayPDF' + file.dossierPartNo + vm.id).src = result
                })
              }, 500)
            } else {
              //
              file['id'] = vm.id
              vm.$store.dispatch('putAlpacaForm', file).then(resData => {
                item['editForm'] = false
                setTimeout(function () {
                  vm.$store.dispatch('viewFile', file).then(result => {
                    document.getElementById('displayPDF' + file.dossierPartNo + vm.id).src = result
                  })
                }, 500)          
              }).catch(reject => {
                toastr.clear()
                toastr.error('Yêu cầu của bạn thực hiện thất bại.')
              })
            }
            
          } else {
            item['editForm'] = false
            vm.$store.dispatch('viewFile', file).then(result => {
              if (file['eForm']) {
                vm.pdfEform = true
              } else {
                vm.pdfEform = false
              }
              document.getElementById('displayPDF' + item.dossierPartNo + vm.id).src = result
            })
          }
        }
      })
    },
    deleteSingleFile (item, index) {
      var vm = this
      let x = confirm('Bạn có chắc chắn xóa file đính kèm ?')
      if (x) {
        item['dossierId'] = vm.thongTinHoSo.dossierId
        vm.$store.dispatch('deleteDossierFile', item).then(resFile => {
          // toastr.success('Yêu cầu của bạn được thực hiện thành công.')
          vm.fileViews.splice(index, 1)
          // vm.stateView = true
          vm.partView = item.dossierPartNo
          vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
            vm.dossierFilesItems = result
            // vm.recountFileTemplates()
            vm.setDaKhai(item)
          })
        }).catch(reject => {
          toastr.clear()
          toastr.error('Yêu cầu của bạn thực hiện thất bại.')
        })
      }
    },
    downloadSingleFile (data) {
      let vm = this
      let url = vm.initDataResource.dossierApi + '/' + vm.thongTinHoSo.dossierId + '/files/' + data.referenceUid
      window.location.assign(url)
    },
    viewFile (data) {
      var vm = this
      vm.dossierFilesItems.forEach(val => {
        val['dossierId'] = vm.thongTinHoSo.dossierId
        if (val.dossierPartNo === data.partNo) {
          this.$store.dispatch('viewFile', val)
        }
      })
    },
    viewFileAlpaca (file) {
      let vm = this
      let counter = 0
      vm.loadingApacal = true
      let callServer = function() {
        setTimeout(function () {
          vm.$store.dispatch('viewFile', file).then(result => {
            if (result === 'pending' && counter <= 10) {
              counter += 1
              callServer()
            } else {
              if (counter > 10) {
                vm.loadingApacal = false
              } else {
                vm.loadingApacal = false
                setTimeout(function () {
                  document.getElementById('displayPDF' + file.dossierPartNo + vm.id).src = result
                }, 100)
              }
            }
          }).catch (function () {
            vm.loadingApacal = false
          })
        }, 1000)
      }
      callServer()
    },
    setDaKhai (itemFile) {
      var vm = this
      let indexFile = vm.dossierFilesItems.findIndex(file => {
        return file.dossierPartNo === itemFile.dossierPartNo
      })
      if (indexFile === -1) {
        for (var i = 0; i < vm.dossierTemplateItemsFilter.length; i++) {
          if (vm.dossierTemplateItemsFilter[i].partNo === itemFile.dossierPartNo) {
            vm.dossierTemplateItemsFilter[i]['passRequired'] = false
            break
          }
        }
      } else {
        for (var i = 0; i < vm.dossierTemplateItemsFilter.length; i++) {
          if (vm.dossierTemplateItemsFilter[i].partNo === itemFile.dossierPartNo) {
            vm.dossierTemplateItemsFilter[i]['passRequired'] = true
            break
          }
        }
      }
    },
    checkPartType3 () {
      var vm = this
      if (vm.dossierTemplateItems.length !== 0) {
        for (var i = 0; i < vm.dossierTemplateItems.length; i++) {
          if (vm.dossierTemplateItems[i].partType === 3) {
            return true
          }
        }
      }
      return false
    },
    viewFile2 (data, index) {
      var vm = this
      if (data.fileSize === 0) {
        return
      }
      if (data['eForm']) {
        vm.pdfEform = true
      } else {
        vm.pdfEform = false
      }
      if (data.fileType === 'doc' || data.fileType === 'docx' || data.fileType === 'xlsx' || data.fileType === 'xls' || data.fileType === 'zip' || data.fileType === 'rar' || data.fileType === 'txt' || data.fileType === 'mp3' || data.fileType === 'mp4') {
        var url = vm.initDataResource.dossierApi + '/' + vm.thongTinHoSo.dossierId + '/files/' + data.referenceUid
        window.location.assign(url)
      } else {
        data['dossierId'] = vm.thongTinHoSo.dossierId
        if (data.referenceUid) {
          vm.dialogPDFLoading = true
          vm.dialogPDF = true
          if (vm.dossierFilesItems[index].hasOwnProperty('pdfSigned') && vm.dossierFilesItems[index]['pdfSigned']) {
            vm.dialogPDFLoading = false
            document.getElementById('dialogPDFPreview' + vm.id).src = vm.dossierFilesItems[index]['pdfSigned']
          } else {
            vm.$store.dispatch('viewFile', data).then(result => {
              vm.dialogPDFLoading = false
              document.getElementById('dialogPDFPreview' + vm.id).src = result
            })
          }
        } else {
          toastr.clear()
          toastr.error('File dữ liệu không tồn tại')
        }
      }
    },
    attachToDossier (file, index) {
      let vm = this
      console.log(file, index)
      file['dossierId'] = vm.thongTinHoSo.dossierId
      if (file.partType !== 3) {
        vm.progressUploadPart = file.dossierFileId
        vm.$store.dispatch('copyFile', file).then(function (result) {
          vm.progressUploadPart = ''
          vm.dossierTemplateItemsFilter[index]['passRequired'] = true
          vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
            vm.dossierFilesItems = result
            vm.recountFileTemplates()
          })
        }).catch(function (xhr) {
          vm.progressUploadPart = ''
          toastr.error('Đính kèm tài liệu thất bại')
        })
      }
    },
    viewGiayToDaNop (data) {
      var vm = this
      if (data.fileSize === 0) {
        return
      }
      if (data['eForm']) {
        vm.pdfEform = true
      } else {
        vm.pdfEform = false
      }
      if (data.fileType === 'doc' || data.fileType === 'docx' || data.fileType === 'xlsx' || data.fileType === 'xls' || data.fileType === 'zip' || data.fileType === 'rar' || data.fileType === 'txt' || data.fileType === 'mp3' || data.fileType === 'mp4') {
        var url = vm.initDataResource.dossierApi + '/' + data.dossierId + '/files/' + data.referenceUid
        window.location.assign(url)
      } else {
        if (data.referenceUid) {
          vm.dialogPDFLoading = true
          vm.dialogPDF = true
          vm.$store.dispatch('viewFile', data).then(result => {
            vm.dialogPDFLoading = false
            document.getElementById('dialogPDFPreview' + vm.id).src = result
          })
        } else {
          toastr.clear()
          toastr.error('File dữ liệu không tồn tại')
        }
      }
    },
    viewFileWithPartNo (item) {
      var vm = this
      if (vm.dossierFilesItems) {
        var fileViewsTemp = vm.dossierFilesItems.filter(file => {
          return file.dossierPartNo === item.partNo && !file.eForm
        })
        if (fileViewsTemp) {
          vm.fileViews = fileViewsTemp
          // vm.sheet = true
          if (vm.partView !== item.partNo) {
            vm.stateView = true
            vm.partView = item.partNo
          } else {
            vm.stateView = !vm.stateView
            vm.partView = item.partNo
          }
        } else {
          return
        }
      }
      return
    },
    saveMark () {
      let vm = this
      // console.log('save mark', vm.dossierTemplateItems)
      if (!vm.onlyView && !vm.thongTinHoSo['dossierStatus']) {
        if (vm.dossierTemplateItemsFilter) {
          vm.dossierTemplateItemsFilter.forEach(function (value, index) {
            if (value.partType === 1 && value.fileMark && !value.recordCountDefault) {
              value['dossierId'] = vm.thongTinHoSo.dossierId
              vm.$store.dispatch('postDossierMark', value)
            }
          })
        }
      }
    },
    changeFileMark (event, index) {
      let vm = this
      if (!vm.onlyView) {
        let item = vm.dossierTemplateItemsFilter[index]
        item['dossierId'] = vm.thongTinHoSo.dossierId
        item['fileMark'] = event
        item['checkInput'] = vm.checkInput
        vm.$store.dispatch('postDossierMark', item)
        vm.dossierTemplateItemsFilter[index].fileMark = event
        vm.dossierTemplateItemsFilter[index].hasTemplate = String(vm.dossierTemplateItemsFilter[index].fileMark) !== '0'
        if (event === 0) {
          vm.dossierTemplateItemsFilter[index].recordCount = 0
        }
      }
    },
    changeHasTemplate (index, item) {
      let vm = this
      item['dossierId'] = vm.thongTinHoSo.dossierId
      setTimeout(function () {
        if (item['hasTemplate']) {
          item.fileMark = item.fileMarkDefault ? item.fileMarkDefault : 3
          item.recordCount = 1
        } else {
          item.fileMark = 0
          item.recordCount = 0
        }
        vm.$store.dispatch('postDossierMark', item)
      }, 100)
    },
    changeHasTemplateLienThong (index, item) {
      let vm = this
      setTimeout(() => {
        if (item['hasTemplateLienThong']) {
          vm.dossierTemplateLienThong.push(item.partNo)
          vm.$store.commit('setDossierTemplateLienThong', vm.dossierTemplateLienThong)
        } else {
          let a = vm.dossierTemplateLienThong.filter(function(item1) {
            return item1 !== item.partNo
          })
          vm.dossierTemplateLienThong = a
          vm.$store.commit('setDossierTemplateLienThong', vm.dossierTemplateLienThong)
        }
      }, 100);
    },
    changeFileCheck (event, index) {
      var vm = this
      // console.log('event=====', event)
      let item = vm.dossierTemplateItemsFilter[index]
      item['dossierId'] = vm.thongTinHoSo.dossierId
      item['fileCheck'] = event
      item['checkInput'] = vm.checkInput
      if (event === 2) {
        item['stateEditFileCheck'] = true
        return
      } else {
        item['fileComment'] = ''
      }
      // console.log('item-check-------', item)
      vm.$store.dispatch('postDossierMark', item)
      vm.dossierTemplateItemsFilter[index].fileCheck = event
    },
    changeFileComment (item, index) {
      var vm = this
      // console.log('item-------', item)
      if (item.fileComment === null || item.fileComment === undefined || item.fileComment === '') {
        return
      }
      item['dossierId'] = vm.thongTinHoSo.dossierId
      item['fileComment'] = item.fileComment
      item['checkInput'] = vm.checkInput
      item['stateEditFileCheck'] = !item['stateEditFileCheck']
      // console.log('item-comment-------', item)
      vm.$store.dispatch('postDossierMark', item)
      vm.dossierTemplateItemsFilter[index].fileComment = item.fileComment
    },
    checkStyle (item) {
      var vm = this
      if (vm.checkInput === 1) {
        return 'calc(100% - 140px)'
      } else {
        let divPx = 0
        if (vm.originality !== 1 && (item.partType === 1 || item.partType === 3) && !vm.thongTinHoSo.online && vm.checkInput !== 1) {
          if (!vm.onlyView) {
            divPx += 240
          } else {
            divPx += 140
          }
        }
        if (item.fileCheck > 0 && !vm.thongTinHoSo.online) {
          divPx += 20
        }
        if (item.fileCheck > 0 && vm.thongTinHoSo.online) {
          divPx += 40
        }
        if (!vm.onlyView) {
          divPx += 90
        }
        if (vm.khoTaiLieuCongDan) {
          divPx += 80
        }
        return 'calc(100% - ' + divPx + 'px)'
      }
    },
    checkVisibleTemp (item, index) {
      var vm = this
      if (!vm.onlyView) {
        return true
      }
      if (item.partType === 3) {
        if (vm.dossierFilesItems.length > 0) {
          let indexFile = vm.dossierFilesItems.findIndex(file => {
            return file.dossierPartNo === item.partNo
          })
          if (indexFile === -1) {
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      } else {
        return true
      }
    },
    changeStateViewResult () {
      var vm = this
      if (vm.dossierFilesItems.length > 0) {
        let index = vm.dossierFilesItems.findIndex(file => {
          return (file.dossierPartType === 2 || file.dossierPartType === 7)
        })
        if (index !== -1) {
          vm.$emit('tp:change-state-view-result', true)
        } else {
          vm.$emit('tp:change-state-view-result', false)
        }
      } else {
        if (vm.partTypes.includes(2) || vm.partTypes.includes(7)) {
          vm.$emit('tp:change-state-view-result', false)
        }
      }
    },
    changeOtherDossierTemp (data) {
      var vm = this
      if (vm.originality === 3 && vm.stateAddFileOther) {
        vm.loadingAddOther = true
        vm.$store.dispatch('uploadSingleOtherFile', {
          dossierId: vm.thongTinHoSo.dossierId,
          displayName: data,
          partNo: vm.dossierTemplatesItemSelect.partNo
        }).then(resFile => {
          vm.loadingAddOther = false
          vm.dialogAddOtherTemp = false
          vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result2 => {
            vm.dossierFilesItems = result2
          })
        }).catch(reject => {
          vm.loadingAddOther = false
        })
      } else {
        // console.log('dossierTemplatesItemSelect ', vm.dossierTemplatesItemSelect)
        let params = vm.dossierTemplatesItemSelect
        params['dossierId'] = vm.thongTinHoSo.dossierId
        params['displayName'] = data
        params['dossierTemplateNo'] = vm.thongTinHoSo.dossierTemplateNo
        vm.$store.dispatch('uploadSingleFile', params).then(function (result1) {
          vm.progressUploadPart = ''
          vm.dialogAddOtherTemp = false
          // console.log('success!!!!!!!!!!!!!!')
          vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result2 => {
            vm.dossierFilesItems = result2
            vm.recountFileTemplates()
            if (vm.stateView && vm.dossierFilesItems) {
              var fileViewsTemp = vm.dossierFilesItems.filter(file => {
                return file.dossierPartNo === vm.dossierTemplatesItemSelect.partNo && !file.eForm
              })
              if (fileViewsTemp) {
                vm.fileViews = fileViewsTemp
              }
            }
          })
        }).catch(function (xhr) {
          vm.progressUploadPart = ''
        })
      }
    },
    downloadFileTemplate (item, index) {
      var vm = this
      if (vm.fileTemplateItems.length > 0) {
        let fileFind = vm.fileTemplateItems.find(file => {
          return item.fileTemplateNo === file.fileTemplateNo
        })
        if (fileFind) {
          let url = vm.initDataResource.serviceInfoApi + '/' + vm.serviceInfoId + '/filetemplates/' + fileFind.fileTemplateNo
          window.location.assign(url)
        } else {
          console.log('ko thay file')
        }
      }
    },
    addOtherTemplate () {
      var vm = this
      if (vm.$refs.form.validate()) {
        // console.log('add')
        vm.changeOtherDossierTemp(vm.otherDossierTemplate)
      }
    },
    editDisplayName (item, index) {
      var vm = this
      if (vm.dossierFileIdView !== item.dossierFileId) {
        vm.dossierFileIdView = item.dossierFileId
        vm.stateEdit = true
      } else {
        vm.dossierFileIdView = item.dossierFileId
        vm.stateEdit = !vm.stateEdit
      }
    },
    cancelDialog () {
      var vm = this
      vm.dialogAddOtherTemp = false
      vm.progressUploadPart = ''
    },
    addFileOther (item) {
      var vm = this
      vm.dialogAddOtherTemp = true
      vm.stateAddFileOther = true
      vm.dossierTemplatesItemSelect = item
    },
    validDossierTemplate () {
      var vm = this
      if (vm.dossierTemplateItemsFilter.length > 0) {
        for (var i = 0; i < vm.dossierTemplateItemsFilter.length; i++) {
          if (vm.dossierTemplateItemsFilter[i]['required'] && !vm.dossierTemplateItemsFilter[i]['passRequired'] && vm.partTypes.includes(vm.dossierTemplateItemsFilter[i].partType)) {
            let message = 'Chú ý :' + vm.dossierTemplateItemsFilter[i].partName + ' là thành phần bắt buộc!'
            toastr.clear()
            toastr.error(message)
            return false
          }
        }
        return true
      } else {
        return true
      }
    },
    changeDisplayName (item, index) {
      var vm = this
      let params = {
        dossierId: vm.thongTinHoSo.dossierId,
        value: value
      }
      vm.$store.dispatch('changeDisplayNameFile', params).then(result => {
        vm.fileViews[index].displayName = result.displayName
        vm.stateEdit = false
      }).catch(reject => {
        console.log('error')
      })
    },
    getDossierFileApplicants (applicantIdNo, fileTemplateNo) {
      var vm = this
      let filter = {
        dossierId: vm.thongTinHoSo.dossierId,
        applicantIdNo: applicantIdNo,
        fileTemplateNo: fileTemplateNo,
        serverCode: vm.thongTinHoSo.serverNo
      }
      if (applicantIdNo) {
        if (!vm.khoTaiLieuCongDan) {
          vm.$store.dispatch('getDossierFilesApplicants', filter).then(result => {
            vm.dossierFilesApplicant = result
          }).catch(reject => {
            console.log('error')
          })
        } else {
          filter['templateNo'] = vm.thongTinHoSo.dossierTemplateNo
          if (vm.oneApp || vm.originality == 3) {
            vm.$store.dispatch('getDossierFilesApplicantsVer2', filter).then(result => {
              vm.dossierFilesApplicant = result
              console.log('hasFile', vm.dossierFilesApplicant)
            }).catch(reject => {
              console.log('error')
            })
          } else {
            vm.$store.dispatch('getDossierFilesApplicantsVer2Proxy', filter).then(result => {
              vm.dossierFilesApplicant = result
              console.log('hasFile', vm.dossierFilesApplicant)
            }).catch(reject => {
              console.log('error')
            })
          }
          
        }
      }
    },
    showFilesApplicant (partNo) {
      let vm = this
      if ($('#fileApplicant-' + partNo).is(':visible')) {
        $('#fileApplicant-' + partNo).hide()
      } else {
        $('#fileApplicant-' + partNo).show()
      }
    },
    checkKQhasFile (item) {
      var vm = this
      if (vm.partTypes.includes(2)) {
        var hasFile = vm.dossierFilesItems.find(file => {
          return item.partNo === file.dossierPartNo
        })
        if (hasFile) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    checkSoHoa (partNo) {
      let vm = this
      let hasFile = vm.dossierFilesApplicant.find(file => {
        return (file.partNo === partNo && file.yeucausohoa)
      })
      if (hasFile) {
        return true
      } else {
        return false
      }
    },
    partNoApplicantHasFile (partNo) {
      let vm = this
      let hasFile = vm.dossierFilesApplicant.find(file => {
        return file.partNo === partNo
      })
      // console.log('hasFile', hasFile)
      if (hasFile && hasFile.hasOwnProperty('applicantDataModels') && hasFile.applicantDataModels) {
        let fileArr = Array.isArray(hasFile.applicantDataModels) ? hasFile.applicantDataModels : [hasFile.applicantDataModels]
        console.log('fileArrApplicant', fileArr)
        let hasFileStatus1 = fileArr.find(file => {
          return file.status == 1
        })
        console.log('hasFileStatus1', hasFileStatus1)
        if (hasFileStatus1) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    changeRecordCount (index) {
      let vm = this
      if (!vm.onlyView) {
        vm.dossierTemplateItemsFilter[index].recordCount = vm.dossierTemplateItemsFilter[index]['recordCount'] ? vm.dossierTemplateItemsFilter[index]['recordCount'] : ''
        function changeRecord () {
          vm.doChange[index] = setTimeout(function () {
            if (!vm.onlyView && Number(vm.dossierTemplateItemsFilter[index]['recordCount']) >= 0) {
              let item = Object.assign({}, vm.dossierTemplateItemsFilter[index], {dossierId: vm.thongTinHoSo.dossierId})  
              vm.$store.dispatch('postDossierMark', item)
            }
          }, 1000)
        }
        clearTimeout(vm.doChange[index])
        changeRecord()
      }
    },
    increaseCounter (index) {
      let vm = this
      vm.dossierTemplateItemsFilter[index].recordCount = vm.dossierTemplateItemsFilter[index]['recordCount'] ? vm.dossierTemplateItemsFilter[index]['recordCount'] : ''
      vm.dossierTemplateItemsFilter[index]['recordCount'] = Number(vm.dossierTemplateItemsFilter[index]['recordCount']) + 1
      function changeRecord () {
        vm.doChange[index] = setTimeout(function () {
          if (!vm.onlyView && Number(vm.dossierTemplateItemsFilter[index]['recordCount']) >= 0) {
            let item = Object.assign({}, vm.dossierTemplateItemsFilter[index], {dossierId: vm.thongTinHoSo.dossierId})  
            vm.$store.dispatch('postDossierMark', item)
          }
        }, 1000)
      }
      clearTimeout(vm.doChange[index])
      changeRecord()
    },
    decreaseCounter (index) {
      let vm = this
      vm.dossierTemplateItemsFilter[index].recordCount = vm.dossierTemplateItemsFilter[index]['recordCount'] ? vm.dossierTemplateItemsFilter[index]['recordCount'] : ''
      vm.dossierTemplateItemsFilter[index]['recordCount'] = vm.dossierTemplateItemsFilter[index]['recordCount'] ? Number(vm.dossierTemplateItemsFilter[index]['recordCount']) - 1 : vm.dossierTemplateItemsFilter[index]['recordCount']
      function changeRecord () {
        vm.doChange[index] = setTimeout(function () {
          if (!vm.onlyView && Number(vm.dossierTemplateItemsFilter[index]['recordCount']) >= 0) {
            let item = Object.assign({}, vm.dossierTemplateItemsFilter[index], {dossierId: vm.thongTinHoSo.dossierId})  
            vm.$store.dispatch('postDossierMark', item)
          }
        }, 1000)
      }
      clearTimeout(vm.doChange[index])
      changeRecord()
    },
    attachFileFromStorage (data) {
      let vm = this
      let filePath = new URL(data.filePath)
      let filter = {
        dossierId: vm.thongTinHoSo.dossierId,
        dossierTemplateNo: vm.thongTinHoSo.dossierTemplateNo,
        partNo: vm.dossierPartAttach.partNo,
        filePath: filePath.pathname,
        fileName: data.fileName,
        fileType: data.fileExtension,
        fileEntryId: data.fileEntryId,
        // fileName: String(data.fileName).replace(/\s/g, '')
      }
      console.log('data storage', filter)
      if (vm.dossierPartAttach.partType !== 3) {
        vm.$store.dispatch('copyFileFromStorage', filter).then(function (result) {
          vm.dialog_documentApplicant = false
          vm.dossierTemplateItemsFilter[vm.indexPart]['passRequired'] = true
          vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
            vm.dossierFilesItems = result
            vm.recountFileTemplates()
          })
        }).catch(function (xhr) {
          vm.dialog_documentApplicant = false
          toastr.error('Đính kèm tài liệu thất bại')
        })
      }
    },
    getDocumentTypeIcon (type) {
      let vm = this
      let typeDoc = 'doc,docx'
      let typeExcel = 'xls,xlsx'
      let typeImage = 'png,jpg,jpeg'
      if (type) {
        if (typeDoc.indexOf(String(type).toLowerCase()) >= 0) {
          return {
            icon: 'fas fa fa-file-word-o',
            color: 'blue',
            size: 14
          }
        } else if (typeExcel.indexOf(String(type).toLowerCase()) >= 0) {
          return {
            icon: 'fas fa fa-file-excel-o',
            color: 'green',
            size: 14
          }
        } else if (String(type).toLowerCase() === 'pdf') {
          return {
            icon: 'fa fa-file-pdf-o',
            color: 'red',
            size: 14
          }
        } else if (typeImage.indexOf(String(type).toLowerCase()) >= 0) {
          return {
            icon: 'fas fa fa-file-image-o',
            color: 'primary',
            size: 14
          }
        } else {
          return {
            icon: 'fas fa fa-paperclip',
            color: '',
            size: 14
          }
        }
      } else {
        return ''
      }
    },
    showDocumentApplicant (part, index) {
      let vm = this
      vm.fileTemplateNoScope = part.fileTemplateNo
      vm.statusApplicantData = 1
      vm.dossierPartAttach = part
      vm.indexPart = index
      vm.dialog_documentApplicant = true
      setTimeout(function () {
        vm.$refs.khotailieu.initData()
      }, 200)
    },
    guiYeuCauSoHoa (part, index) {
      let vm = this
      vm.progress_sohoa = true
      let param = {
        headers: {
          groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let dataCreateFile = new FormData()
      let url = '/o/rest/v2/applicantdatas'
      dataCreateFile.append('fileTemplateNo', part.fileTemplateNo)
      dataCreateFile.append('status', 0)
      dataCreateFile.append('fileNo', '')
      dataCreateFile.append('fileName', part.partName)
      dataCreateFile.append('applicantIdNo', vm.applicantId)
      dataCreateFile.append('file', '')

      dataCreateFile.append('applicantName', vm.thongTinChuHoSo['applicantName'] ? vm.thongTinChuHoSo['applicantName'] : '')
      dataCreateFile.append('govAgencyName', vm.thongTinHoSo.govAgencyName)
      dataCreateFile.append('serviceCode', vm.thongTinHoSo['serviceCode'])
      dataCreateFile.append('templateNo', part.fileTemplateNo)
      dataCreateFile.append('issueDate', '')
      dataCreateFile.append('expireDate', '')
      dataCreateFile.append('desciption', '')
      dataCreateFile.append('dossierNo', '')
      
      axios.post(url, dataCreateFile, param).then(result1 => {
        vm.progress_sohoa = false
        toastr.success('Yêu cầu số hóa đã được gửi')
      }).catch(xhr => {
        vm.progress_sohoa = false
      })      
    },
    changeAllFileMark (event) {
      let vm = this
      if (vm.dossierTemplateItemsFilter) {
        vm.render = false
        vm.dossierTemplateItemsFilter.forEach(function (item, index) {
          vm.dossierTemplateItemsFilter[index]['dossierId'] = vm.thongTinHoSo.dossierId
          if (event) {
            vm.dossierTemplateItemsFilter[index].fileMark = String(vm.dossierTemplateItemsFilter[index].fileMarkDefault) === '0' ? 3 : vm.dossierTemplateItemsFilter[index].fileMarkDefault
            vm.dossierTemplateItemsFilter[index].recordCount = 1
            vm.dossierTemplateItemsFilter[index].hasTemplate = true
          } else {
            vm.dossierTemplateItemsFilter[index].fileMark = 0
            vm.dossierTemplateItemsFilter[index].recordCount = 0
            vm.dossierTemplateItemsFilter[index].hasTemplate = false
          }
          vm.$store.dispatch('postDossierMark', vm.dossierTemplateItemsFilter[index])
        })
      }
      vm.render = true
    },
    vgcaSignAction (item, index, typeSign) {
      let vm = this
      vm.dialogSignDigital = false
      console.log('file ký duyệt', item, index)
      let signFileCallBack = function (rv) {
        let received_msg = JSON.parse(rv)
        if (received_msg.Status === 0) {
          let dataSigned
          try {
            dataSigned = JSON.parse(received_msg.FileServer)
          } catch (error) {
          }
          console.log('dataSigned', dataSigned)
          let filterUpdateFile = {
            dossierId: vm.thongTinHoSo['dossierId'],
            fileEntries: dataSigned.fileEntryId,
            dossierFiles: item.dossierFileId
          }
          vm.$store.dispatch('updateFileKySoPlugin', filterUpdateFile).then(function () {
            toastr.clear()
            toastr.success('Tài liệu đã được ký duyệt')
            vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(result => {
              vm.dossierFilesItems = result
            })
          })
        } else {
          if (received_msg.Message) {
            toastr.clear()
            toastr.error(received_msg.Message)
          } else {
            toastr.clear()
            toastr.error('Ký duyệt không thành công')
          }
        }
      }
      let prms = {}
      prms['FileUploadHandler'] = window.themeDisplay.getPortalURL() + '/o/rest/v2/vgca/fileupload'
      prms['SessionId'] = ''
      prms['FileName'] = window.themeDisplay.getPortalURL() + '/o/rest/v2/dossiers/' + vm.thongTinHoSo['dossierId'] + '/files/' + item['referenceUid'] + '/preview.pdf'

      let json_prms = JSON.stringify(prms)
      if (typeSign === 'approved') {
        vgca_sign_approved(json_prms, signFileCallBack)
      } else if (typeSign === 'issued') {
        vgca_sign_issued(json_prms, signFileCallBack)
      } else if (typeSign === 'income') {
        vgca_sign_income(json_prms, signFileCallBack)
      } else {
        vgca_sign_copy(json_prms, signFileCallBack)
      }

    },
    showSelectDigitalSign (file, index) {
      let vm = this
      vm.dialogSignDigital = true
      vm.fileKySo = file
      vm.indexFileSelect = index
      console.log('fileKySo', vm.fileKySo)
    },
    loadFiles () {
      let vm = this
      vm.loadingFile = true
      setTimeout(function () {
        vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
          vm.loadingFile = false
          vm.dossierFilesItems = resFiles
        }).catch(reject => {
          vm.loadingFile = false
        })
      }, 100)
    },
    getHashStringFile () {
      let vm = this
      if (VtPluginSocket) {
        VtPluginSocket.initPlugin()
      } else {
        toastr.error('Máy chưa cài đặt Viettel-CA SignPlugin')
      }
      async function getCertRunSign() {
        VtPluginSocket.getCert()
      }
      getCertRunSign().then(function () {
        vm.fileKySo['certChain'] = certChainUserVtCa
        vm.fileKySo['dossierId'] = vm.thongTinHoSo.dossierId
        vm.$store.dispatch('getHashStringFile', vm.fileKySo).then(res => {
          let base64HashFile, fileName, fileEntryId
          try {
            base64HashFile = res.base64Hash
            fileName = res.fileName
            fileEntryId = res.fileEntryId
          } catch (error) {
          }
          console.log('base64HashFile', res)
          if (base64HashFile) {
            // HashOpt: loai ma hash (0: SHA-1; 1:MD5; 2:SHA256)
            async function signHashVtCa() {
              VtPluginSocket.signHash(base64HashFile, 0) /** chuỗi hash đã có chữ ký */
            }
            signHashVtCa().then(function () {
              let fileSignReturn = signatureBase64VtCa
              console.log('fileSignReturn', fileSignReturn)
              let dataInsertSignature = {
                fileName: fileName,
                fileEntryId: fileEntryId,
                signatureBase64: fileSignReturn
              }
              vm.$store.dispatch('insertSignatureVtCa', dataInsertSignature).then(res => {
                let dataUploadFile = {
                  signedFileName: res['signedFileName'] ? res['signedFileName'] : ''
                }
                
                vm.$store.dispatch('uploadSignatureVtCa', dataUploadFile).then(res => {
                  let dataSigned
                  try {
                    dataSigned = JSON.parse(res.FileServer)
                  } catch (error) {
                  }
                  let dataUpdateFile = {
                    fileEntryIdStr: dataSigned ? dataSigned['fileEntryId'] : '',
                    dossierFileIdStr: vm.fileKySo.dossierFileId
                  }
                  vm.$store.dispatch('updateSignatureVtCa', dataUpdateFile).then(res => {
                    toastr.success('Thực hiện ký số thành công')
                    vm.dialogSignDigital = false
                    vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
                      vm.dossierFilesItems = resFiles
                    }).catch(reject => {
                    })
                  }).catch(function() {
                    toastr.error('Lỗi trong quá trình cập nhật tài liệu ký số')
                  })
                }).catch(function() {
                  toastr.error('Lỗi trong quá trình cập nhật tài liệu ký số')
                })
              }).catch(function() {
                toastr.error('Lỗi trong quá trình cập nhật tài liệu ký số')
              })
            })
            
          } else {
            toastr.error('Tải tài liệu ký số lên không thành công')
          }
          
        }).catch(reject => {
          toastr.error('Tải tài liệu ký số lên không thành công')
        })
      })
      
    },
    signSimCa (file, index) {
      let vm = this
      vm.dialogSignDigital = false
      vm.dialogInputMobile = true
    },
    submitSignSimCa () {
      let vm = this
      if (vm.mobileCA) {
        toastr.success('Yêu cầu đã được gửi. Vui lòng xác nhận ký số trên thiết bị.')
        let dataInsertSignature = {
          dossierId: vm.thongTinHoSo['dossierId'],
          referenceUid: vm.fileKySo.referenceUid,
          mobile: '84' + String(vm.mobileCA).substring(1)
        }
        vm.loadingAction = true
        vm.$store.dispatch('signatureVtSimCa', dataInsertSignature).then(res => {
          console.log('resSimCA', res)
          vm.loadingAction = false
          if (res.message == 'success' && res.status == '200' && res['signedFileName']) {
            let dataUploadFile = {
              signedFileName: res['signedFileName'] ? res['signedFileName'] : ''
            }
            vm.$store.dispatch('uploadSignatureVtCa', dataUploadFile).then(res => {
              let dataSigned
              try {
                dataSigned = JSON.parse(res.FileServer)
                let dataUpdateFile = {
                  fileEntryIdStr: dataSigned ? dataSigned['fileEntryId'] : '',
                  dossierFileIdStr: vm.fileKySo.dossierFileId
                }
                vm.$store.dispatch('updateSignatureVtCa', dataUpdateFile).then(res => {
                  toastr.success('Thực hiện ký số thành công')
                  vm.dialogInputMobile = false
                  vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
                    vm.dossierFilesItems = resFiles
                  }).catch(reject => {
                  })
                }).catch(function() {
                  toastr.error('Lỗi trong quá trình cập nhật tài liệu ký số')
                })
              } catch (error) {
              }
            }).catch(function() {
              toastr.error('Tải tài liệu ký số lên không thành công')
            })
          } else {
            toastr.clear()
            toastr.error('Thực hiện ký số thất bại. Vui lòng thử lại.')
          }
        }).catch(function () {
          vm.loadingAction = false
        })
      }
    },
    showEditorPdf (file) {
      let vm = this
      vm.showViewerPdfEditor = true
      $(".toolbar .text-color").html("")
      $(".toolbar .pen-color").html("")
      if (typeof(Storage) !== "undefined") {
        for(let key in localStorage) {
          if (key.indexOf('/preview.pdf/') > 0) {
            localStorage.removeItem(key)
          }
        }
      } else {
      }
      vm.fileEditor = file
      let urlPreview = window.themeDisplay.getPortalURL() + '/o/rest/v2/dossiers/' + vm.thongTinHoSo['dossierId'] + '/files/' + file['referenceUid'] + '/preview.pdf'
      let defaultEditor = {}
      defaultEditor[urlPreview + '/text/size'] = '14'
      defaultEditor[urlPreview + '/text/color'] = '#EF4437'
      defaultEditor[urlPreview + '/pen/size'] = '1'
      defaultEditor[urlPreview + '/pen/color'] = '#EF4437'
      defaultEditor[urlPreview + '/tooltype'] = 'text'
      defaultEditor[urlPreview + '/scale'] = '1.33'
      defaultEditor[urlPreview + '/rotate'] = '0'
      if (vm.fileEditor['signInfo']) {
        defaultEditor[urlPreview + '/annotations'] = vm.fileEditor['signInfo']
      }
      
      if (typeof(Storage) !== "undefined") {
        for(let key in defaultEditor) {
          localStorage.setItem(key, defaultEditor[key])
        }
      } else {
      }
      vm.dialog_editor_pdf = true
      
      setTimeout(function () {
        initPdf(urlPreview)
      }, 200)
    },
    saveEditor() {
      let vm = this
      console.log('fileEditor', vm.fileEditor)
      let x = confirm('Bạn có chắc chắn lưu các ghi chú cho giấy tờ này?')
      if (x) {
        let urlPreview = window.themeDisplay.getPortalURL() + '/o/rest/v2/dossiers/' + vm.thongTinHoSo['dossierId'] + '/files/' + vm.fileEditor['referenceUid'] + '/preview.pdf'
        if (typeof(Storage) !== "undefined") {
          let anotations = localStorage.getItem(urlPreview + '/annotations')
          // call save annotation sau khi update anotation -> get lại dossierFile + close dialog
          let filter = {
            dossierFileId: vm.fileEditor.dossierFileId,
            annotation: anotations
          }
          vm.$store.dispatch('saveEditor', filter).then(function (result) {
            vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
              vm.dossierFilesItems = resFiles
            }).catch(reject => {
            })
            vm.dialog_editor_pdf = false
            vm.showViewerPdfEditor = false
          }).catch(function () {
            toastr.error('Lưu ghi chú thất bại')
          })          
        } else {
        }
      }
    },
    closeEditorPdf() {
      let vm = this
      if (!vm.onlyView) {
        let x = confirm('Bạn có muốn lưu các ghi chú cho giấy tờ này?')
        if (x) {
          let urlPreview = window.themeDisplay.getPortalURL() + '/o/rest/v2/dossiers/' + vm.thongTinHoSo['dossierId'] + '/files/' + vm.fileEditor['referenceUid'] + '/preview.pdf'
          if (typeof(Storage) !== "undefined") {
            let anotations = localStorage.getItem(urlPreview + '/annotations')
            // call save annotation sau khi update anotation -> get lại dossierFile + close dialog
            let filter = {
              dossierFileId: vm.fileEditor.dossierFileId,
              annotation: anotations
            }
            vm.$store.dispatch('saveEditor', filter).then(function (result) {
              vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
                vm.dossierFilesItems = resFiles
              }).catch(reject => {
              })
              vm.dialog_editor_pdf = false
              vm.showViewerPdfEditor = false
            }).catch(function () {
              toastr.error('Lưu ghi chú thất bại')
            })
          }
        } else {
          vm.dialog_editor_pdf = false
          vm.showViewerPdfEditor = false
        }
      } else {
        vm.dialog_editor_pdf = false
        vm.showViewerPdfEditor = false
      }
      
    },
    resetMessage () {
      return
    },
    showXacThucVnptSmartCa (file, index) {
      let vm = this
      let token = vm.$cookies.get('access_token_vnpt_smartca')
      vm.fileKySo = file
      vm.indexFileSelect = index
      console.log('fileKySo', vm.fileKySo)
      if (token) {
        vm.access_token_vnpt = token
        vm.sendRequestSignVnptSmartCa()
      } else {
        vm.dialogXacThucVnptSmartCa = true
        vm.detailUserSmartVnpt = false
      }
    },
    submitLoginCaVnpt () {
      let vm = this
      if (String(vm.userNameSmartCa).trim() && String(vm.passWordSmartCa).trim()) {
        let param = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'groupId': window.themeDisplay.getScopeGroupId()
          }
        }
        let dataPost = new URLSearchParams()
        dataPost.append('username', vm.userNameSmartCa)
        dataPost.append('password', vm.passWordSmartCa)
        let url = '/o/rest/v2/signature/smartCA/token'
        vm.loadingAction = true
        axios.post(url, dataPost, param).then(function (response) {
          vm.loadingAction = false
          if (response.data.hasOwnProperty('message') && response.data.message) {
            let dataJson = JSON.parse(response.data.message)
            vm.access_token_vnpt = dataJson.access_token
            vm.$cookies.set('access_token_vnpt_smartca', dataJson.access_token, dataJson.expires_in)
            vm.getUserInfoSmartCa()
          } else {
            toastr.error('Tên đăng nhập hoặc mật khẩu không chính xác')
          }
        }).catch(function () {
          vm.loadingAction = false
          toastr.error('Tên đăng nhập hoặc mật khẩu không chính xác')
        })
      }
    },
    getUserInfoSmartCa () {
      let vm = this
      let options = {
        headers: {
          groupId: window.themeDisplay.getScopeGroupId(),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let dataPutdossier = new URLSearchParams()
      dataPutdossier.append('token', vm.access_token_vnpt)

      axios.post('/o/rest/v2/signature/smartCA/userInfo', dataPutdossier, options).then(function (response) {
        if (response.data.hasOwnProperty('message') && response.data.message) {
          let dataJson = JSON.parse(response.data.message)
          vm.userSignSmartVnpt = dataJson.content
          vm.detailUserSmartVnpt = true
          window.localStorage.setItem('userNameSignSmartVnpt', vm.userSignSmartVnpt.fullName)
        }
      }).catch(function () {

      })
    },
    sendRequestSignVnptSmartCa () {
      let vm = this
      let options = {
        headers: {
          groupId: window.themeDisplay.getScopeGroupId(),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let dataPutdossier = new URLSearchParams()
      dataPutdossier.append('dossierFileIdStr', vm.fileKySo.dossierFileId)
      dataPutdossier.append('token', vm.access_token_vnpt)
      dataPutdossier.append('fullName', vm.userSignSmartVnpt ? vm.userSignSmartVnpt.fullName : window.localStorage.getItem('userNameSignSmartVnpt'))
      axios.post('/o/rest/v2/signature/smartCA/signHash', dataPutdossier, options).then(function (response) {
        if (response.hasOwnProperty('data') && response.data) {
          vm.tranId_vnpt = response.data.tranId
          vm.dialogXacThucVnptSmartCa = false
          vm.dialogChoKyVnptSmartCa = true
        }
      }).catch(function (xhr) {
        toastr.error('Quá trình ký số thất bại')
      })
    },
    getTransInfo () {
      let vm = this
      let options = {
        headers: {
          groupId: window.themeDisplay.getScopeGroupId(),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let dataPutdossier = new URLSearchParams()
      dataPutdossier.append('tranId', vm.tranId_vnpt)
      dataPutdossier.append('token', vm.access_token_vnpt)
      vm.loadingAction = true
      axios.post('/o/rest/v2/signature/smartCA/getTranInfo', dataPutdossier, options).then(function (response) {
        let dataFile = response.hasOwnProperty('data') ? response.data : ''
        if (dataFile && dataFile != null) {
          let signFileNameStr = dataFile.signFileNameStr
          let dossierFileIdStr = dataFile.dossierFileIdStr
          vm.updateSignedVnptCa(signFileNameStr, dossierFileIdStr)
          vm.dialogChoKyVnptSmartCa = false
        } else {
          toastr.error('Vui lòng thực hiện ký số trên thiết bị')
        }
        vm.loadingAction = false
      }).catch(function() {
        vm.loadingAction = false
        toastr.error('Quá trình ký số thất bại')
      })
    },
    updateSignedVnptCa (signFileNameStr, dossierFileIdStr) {
      let vm = this
      let options = {
        headers: {
          groupId: window.themeDisplay.getScopeGroupId(),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let dataPutdossier = new URLSearchParams()
      dataPutdossier.append('signFileNameStr', signFileNameStr)
      dataPutdossier.append('dossierFileIdStr', dossierFileIdStr)

      axios.post('/o/rest/v2/defaultsignature/smartca/fileupload', dataPutdossier, options).then(function (response) {
        toastr.success('Giấy tờ đã được ký số')
        vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
          vm.dossierFilesItems = resFiles
        }).catch(reject => {
        })
      }).catch(function () {
        toastr.error('Lỗi cập nhật tài liệu')
      })
    },
    updateSignCheck (fileId) {
      let vm = this
      let options = {
        headers: {
          groupId: window.themeDisplay.getScopeGroupId(),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      axios.post('/o/rest/v2/dossiers/' + fileId + '/signCheck/1', {}, options).then(function (response) {
        vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
          vm.dossierFilesItems = resFiles
        }).catch(reject => {
        })
      }).catch(function() {
        vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
          vm.dossierFilesItems = resFiles
        }).catch(reject => {
        })
      })
    },
    downloadSavisMsi () {
      let vm = this
      vm.dialogTaiSavis = false
      document.getElementById('downloadCaiDatSavis').click()
    }
  }
}
</script>
