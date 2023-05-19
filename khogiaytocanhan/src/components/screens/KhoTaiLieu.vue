<template>
  <div style="padding: 0px 0px; max-width: 1500px; margin: 0px auto;border-radius: 12px" class="pb-3" id="top-header">
    <v-layout wrap>
      <v-flex class="pl-2" style="width: 300px">
        <v-list>
          <v-list-tile
            avatar
            @click="changeMenu(0)"
            class="px-2 py-2"
            style="height: auto; border-bottom: 1px solid #dedede;" 
          >
            <v-list-tile-avatar>
              <v-icon :class="menuActive == 0 ? 'blue white--text' : 'grey lighten-1 white--text'" size="22">folder</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :style="menuActive == 0 ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;' : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'">
                Giấy tờ của tôi
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            avatar
            @click="changeMenu(1)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede;" 
          >
            <v-list-tile-avatar>
              <v-icon :class="menuActive == 1 ? 'blue white--text' : 'grey lighten-1 white--text'" size="22">folder</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :style="menuActive == 1 ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;' : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'">
                Giấy tờ được chia sẻ
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex class="px-2" style="width: calc(100% - 300px );">
        <v-card v-if="!showDetail" class="px-3 py-3" style="width: 100%; background: #ffffff;">
          <v-layout wrap>
            <v-flex>
              <div class="headline mb-3" style="font-size: 20px!important; text-transform: uppercase;color: #0072bc;">
                {{ menuActive == 0 ? 'Giấy tờ của tôi' : 'Giấy tờ được chia sẻ' }}
              </div>
            </v-flex>
            <v-flex style="width: 500px">
              <v-text-field
                solo
                v-model="keywordSearch"
                label="Nhập từ khóa tìm kiếm..."
                append-icon="search"
                @keyup.enter="searchGiayToSoHoa"
                @click:append="searchGiayToSoHoa"
              ></v-text-field>
            </v-flex>
            <v-flex style="max-width: 170px; text-align: right;padding-top: 2px;">
              <v-btn color="#0072bc" small class="mx-0 white--text my-0" @click.stop="showTimKiem" style="">
                <v-icon size="20">
                  filter_alt
                </v-icon> &nbsp;
                Tìm kiếm nâng cao
              </v-btn>
            </v-flex>
          </v-layout>
          <v-card-text class="px-0 pb-0" v-if="showAdvanceSearch">
            <tim-kiem ref="timkiem" :inputSearch="inputSearch" v-on:trigger-search="searchGiayToSoHoa" v-on:trigger-cancel="cancelSearchGiayToSoHoa"></tim-kiem>
          </v-card-text>

          <v-btn v-if="menuActive == 0" color="#0072bc" small class="mx-0 white--text" @click.stop="showCreatedocument">
            <v-icon size="20">
              post_add
            </v-icon> &nbsp;
            Thêm mới giấy tờ
          </v-btn>
          <v-data-table
            :headers="documentListHeader"
            :items="documentApplicantList"
            hide-actions
            class="table-landing table-bordered mt-2"
            style="border-left: 1px solid #dedede"
          >
            <v-progress-linear v-if="loadingTable" slot='progress' color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr v-bind:class="{'active': props.index%2==1}" style="cursor: pointer;" @click="viewThongTinGiayTo(props.item)">
                <td class="text-xs-center py-2" style="width:50px;height:36px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{ documentPage * numberPerPage - numberPerPage + props.index + 1 }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px; min-width:250px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.hasOwnProperty('fileName') ? props.item.fileName : ''}}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.hasOwnProperty('fileNo') ? props.item.fileNo : ''}}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.hasOwnProperty('createDate') ? props.item.createDate : ''}}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.hasOwnProperty('dossierNo') ? props.item.dossierNo : ''}}</span>
                  </div>
                </td>
                <td class="text-xs-center py-2" style="height:36px;min-width:100px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span :style="props.item.status === 1 ? 'color: green' : (props.item.status === 2 ? 'color: red' : 'color: orange')">
                      {{props.item.hasOwnProperty('status') ? getStatus(props.item.status) : ''}}
                    </span>
                  </div>
                </td>
                <td class="text-center py-2" :style="menuActive == 0 ? 'height:36px;min-width:200px': 'height:36px;min-width:150px'">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-tooltip top v-if="!loadingTable && props.item.fileEntryId" class="mr-2">
                    <v-btn @click.stop="viewDocument(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">visibility</v-icon>
                    </v-btn>
                    <span>Xem giấy tờ</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && props.item.fileEntryId" class="mr-2">
                    <v-btn @click.stop="downloadDocument(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">fas fa fa-download</v-icon>
                    </v-btn>
                    <span>Tải xuống</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && menuActive == 1" class="mr-2">
                    <v-btn @click.stop="cloneMyStorage(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">sync_alt</v-icon>
                    </v-btn>
                    <span>Lấy sang kho của tôi</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && menuActive == 0" class="mr-2">
                    <v-btn @click.stop="showEditDocument(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">edit</v-icon>
                    </v-btn>
                    <span>Cập nhật giấy tờ</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && menuActive == 0" class="">
                    <v-btn @click="deleteDocument(props.item)" color="red" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">delete</v-icon>
                    </v-btn>
                    <span>Xóa</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
            <template slot="no-data">
              <div class="text-xs-center mt-2">
                Không có giấy tờ
              </div>
            </template>
          </v-data-table>

          <div class="my-2" v-if="totalDocument > numberPerPage">
            <div class="text-xs-right layout wrap" style="position: relative;">
              <div class="flex pagging-table"> 
                <pagination :total="totalDocument" :page="documentPage" :numberPerPage="numberPerPage" nameRecord="giấy tờ" custom-class="custom-tiny-class" 
                  @tiny:change-page="changePage" ></pagination> 
              </div>
            </div>
          </div>
        </v-card>
        <v-card v-else class="px-3 py-3" style="width: 100%; background: #ffffff;">
          <div class="headline mb-0" style="font-size: 20px!important;">
            <span v-if="typeCreate === 'create'" style="text-transform: uppercase; font-size: 20px;color: #0072bc;font-weight: 500;">THÊM MỚI GIẤY TỜ</span>
            <span v-if="typeCreate === 'update'" style="text-transform: uppercase; font-size: 20px;color: #0072bc;font-weight: 500;">CẬP NHẬT GIẤY TỜ</span>
            <span v-if="typeCreate === 'view'" style="text-transform: uppercase; font-size: 20px;color: #0072bc;font-weight: 500;">THÔNG TIN GIẤY TỜ</span>

            <v-btn flat icon :disabled="loadingAction" @click.native="showDetail = false" style="position: absolute;right: 10px;top: 10px;">
              <v-icon size="28" color="#0072bc">reply</v-icon>
            </v-btn>
          </div>
          <v-card-text v-if="typeCreate == 'view'" class="py-2 px-0">
            <div class="xs12 sm12 pb-2">
              <span class="pr-2 text-bold">Tên giấy tờ: </span>
              <span class="pl-0"> {{documentSelect.fileName}}</span>
            </div>
            <div class="xs12 sm12 pb-2">
              <span class="pr-2 text-bold">Số hiệu giấy tờ: </span>
              <span class="pl-0"> {{documentSelect.fileNo}}</span>
            </div>
            <div class="xs12 sm12 pb-2">
              <span class="pr-2 text-bold">Cơ quan ban hành: </span>
              <span class="pl-0 mr-3"> {{documentSelect.govAgencyName}}</span>
              <span class="pr-2 text-bold">Ngày ban hành: </span>
              <span class="pl-0"> {{documentSelect.issueDate}}</span>
            </div>
            <div class="xs12 sm12 pb-2">
              <span class="pr-2 text-bold">Mẫu giấy tờ: </span>
              <span class="pl-0"> {{documentSelect.fileTemplateNo}}</span>
            </div>
            <div class="xs12 sm12 pb-2">
              <span class="pr-2 text-bold">Mã hồ sơ: </span>
              <span class="pl-0 "> {{documentSelect.fileTemplateNo}}</span>
            </div>
            <div class="xs12 sm12 pb-2">
              <span class="pr-2 text-bold">Người thụ hưởng: </span>
              <span class="pl-0 mr-2"> {{documentSelect.applicantName}}</span>
              <span class="pr-2 text-bold">Số CCCD/CMND: </span>
              <span class="pl-0 "> {{documentSelect.applicantIdNo}}</span>
            </div>
            <div class="xs12 sm12 pb-2">
              <span class="pr-2 text-bold ">Hiệu lực giấy tờ: </span>
              <span class="pl-0 "> {{documentSelect.status}}</span>
            </div>
            <div class="xs12 sm12 pb-2">
              <v-btn color="#0072bc" small class="mx-0 white--text mr-3" @click.stop="viewDocument(documentSelect)">
                <v-icon size="20">visibility</v-icon> &nbsp;Xem file
              </v-btn>
              <v-btn color="#0072bc" small class="mx-0 white--text mr-3" @click.stop="downloadDocument(documentSelect)">
                <v-icon size="18">fas fa fa-download</v-icon> &nbsp;Tải xuống
              </v-btn>
              <v-btn v-if="menuActive == 0" color="#0072bc" small class="mx-0 white--text mr-3" @click.stop="showEditDocument(documentSelect)">
                <v-icon size="20">edit</v-icon> &nbsp;Cập nhật
              </v-btn>
              <v-btn v-if="menuActive == 1" color="#0072bc" small class="mx-0 white--text mr-3" @click.stop="cloneMyStorage(documentSelect)">
                <v-icon size="20">sync_alt</v-icon> &nbsp;Lấy về kho của tôi
              </v-btn>
            </div>
          </v-card-text>
          <v-card-text v-else class="py-1 px-0">
            <v-form id="form-crud" ref="form" v-model="valid" lazy-validation class="px-0 grid-list">
              <v-layout row wrap class="px-0 py-3">
                <v-flex xs12 class="pr-0 pl-0 py-0 mb-3">
                  <div class="mb-1">Test component <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    ref="autocomplete"
                    v-model="selected"
                    :loading="loading"
                    :items="itemsSelectBox"
                    :search-input.sync="keywordSearchSelect"
                    solo
                    flat
                    item-text="fileName"
                    item-value="applicantDataId"
                    return-object
                  >
                    <template v-slot:append-item>
                      <div class="py-2"
                        v-observe-visibility="{
                          callback: visibilityChanged
                        }"
                      >
                      </div>
                    </template>
                  </v-autocomplete>
                </v-flex>
                
                <v-flex xs12 class="pr-0 pl-0 py-0">
                  <div class="mb-1">Mẫu giấy tờ <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="fileTemplateList"
                    v-model="fileTemplateNoCreate"
                    label=""
                    item-text="name"
                    item-value="fileTemplateNo"
                    return-object
                    solo
                    flat
                    :rules="[v => !!v || 'Mẫu giấy tờ là bắt buộc']"
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 class="px-0 py-0">
                  <div class="mb-1">Tên giấy tờ <span style="color: red">(*)</span></div>
                  <v-text-field
                    label=""
                    v-model="fileName"
                    solo
                    flat
                    clearable
                    :rules="[v => !!v || 'Tên giấy tờ là bắt buộc']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 pr-3 py-0">
                  <div class="mb-1">Số hiệu giấy tờ <span style="color: red">(*)</span></div>
                  <v-text-field
                    label=""
                    v-model="fileNo"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[v => !!v || 'Số hiệu giấy tờ là bắt buộc']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 pr-3 py-0">
                  <div class="mb-1">Ngày ban hành</div>
                  <v-text-field
                    label=""
                    v-model="createDate"
                    placeholder="dd/mm/yyyy, ddmmyyyy"
                    @blur="formatDate"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 pr-3 py-0">
                  <div class="mb-1">Ngày hết hạn</div>
                  <v-text-field
                    label=""
                    v-model="expireDate"
                    placeholder="dd/mm/yyyy, ddmmyyyy"
                    @blur="formatExpireDate"
                    solo
                    flat
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 py-0">
                  <div class="mb-1">Hiệu lực <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="statusList"
                    v-model="statusCreate"
                    label=""
                    item-text="tenMuc"
                    item-value="maMuc"
                    solo
                    flat
                    :rules="[v => !!v || 'Hiệu lực giấy tờ là bắt buộc']"
                    required
                  ></v-autocomplete>
                </v-flex>
                
                <v-flex xs12 class="px-0 py-0">
                  <div class="mb-1">Cơ quan ban hành <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="donViList"
                    item-text="name"
                    item-value="value"
                    label=""
                    v-model="govAgencyCreate"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    :rules="[v => !!v || 'Cơ quan ban hành là bắt buộc']"
                    required
                    clearable
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 py-0 pr-3">
                  <div class="mb-1">Loại văn bản điện tử  <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="loaiVanBanList"
                    v-model="loaiVanBanCreate"
                    label=""
                    item-text="tenMuc"
                    item-value="maMuc"
                    solo
                    flat
                    :rules="[v => !!v || 'Loại văn bản là bắt buộc']"
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 py-0 pr-3">
                  <div class="mb-1">Số CMND/CCCD người thụ hưởng <span style="color: red">(*)</span></div>
                  <v-text-field
                    label=""
                    v-model="cmndNguoiThuHuong"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[v => !!v || 'Số CMND/CCCD người thụ hưởng là bắt buộc']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 py-0 pr-3">
                  <div class="mb-1">Tên người thụ hưởng <span style="color: red">(*)</span></div>
                  <v-text-field
                    label=""
                    v-model="tenNguoiThuHuong"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[v => !!v || 'Tên người thụ hưởng là bắt buộc']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 class="px-0 py-0">
                  <div class="mb-1">Mã hồ sơ dịch vụ công</div>
                  <v-text-field
                    label=""
                    v-model="maHoSoDvc"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                  ></v-text-field>
                </v-flex>
                
                <v-flex xs12 class="mt-2">
                  <div class="mb-2">File giấy tờ:</div>
                  <div v-if="fileNameView" class="pb-3" @click="viewDocument(documentSelect)">
                    <v-icon size="18" color="red">fa fa-file-pdf-o</v-icon>
                    <a class="ml-2" style="font-style: italic;font-size: 14px;text-decoration: underline;">{{fileNameView}}</a>
                  </div>
                  <input type="file" id="documentFile" @input="uploadDocumentFile($event)" style="display:none">
                  <v-btn block color="primary" class="mx-0 px-0 mr-4 d-inline-block" dark @click.native="uploadFile()" style="width: 175px">
                    <v-icon size="16">fas fa fa-upload</v-icon> &nbsp; &nbsp;
                    Tải lên giấy tờ
                  </v-btn>
                  <!-- <v-btn block color="primary" class="mx-0 px-0 d-inline-block" dark @click.native="vgca_sign_approved('https://kiemthu-mt-gov-vn-9001.fds.vn')" style="width: 230px">
                    <v-icon size="16">border_color</v-icon> &nbsp; &nbsp;
                    Tải lên và ký duyệt giấy tờ
                  </v-btn> -->
                  <div v-if="fileTemplateNoCreate && fileTemplateNoCreate.fileType">
                    <span style="color:red">(*) </span>
                    <span>File tải lên chấp nhận các định dạng: {{fileTemplateNoCreate.fileType}} .</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-form>
            <v-flex class="text-right">
              <v-btn class="mr-2 white--text" color="red" :disabled="loadingAction" @click.native="showDetail = false">
                <v-icon>reply</v-icon> &nbsp;
                Quay lại
              </v-btn>
              <v-btn v-if="typeCreate === 'create'" :disabled="loadingAction" class="mr-0" color="primary" @click.native="createDocument">
                <v-icon>save</v-icon> &nbsp;
                <span>Thêm mới</span> 
              </v-btn>
              <v-btn v-else :disabled="loadingAction" class="mr-0" color="primary" @click.native="updateDocument">
                <v-icon>save</v-icon> &nbsp;
                <span>Cập nhật</span> 
              </v-btn>
            </v-flex>
          </v-card-text>
        </v-card>
        <v-dialog v-model="dialogPDF" max-width="1200" transition="fade-transition">
          <v-card>
            <v-toolbar flat dark color="primary">
              <v-toolbar-title>Giấy tờ tài liệu</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="dialogPDF = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <iframe id="dialogPDFPreview" src="" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
            </iframe>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogViewFileSign" max-width="1200" transition="fade-transition">
          <v-card>
            <v-toolbar flat dark color="primary">
              <v-toolbar-title></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="dialogViewFileSign = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <iframe id="dialogEsignPreview" :src="pathNameFileESign" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
            </iframe>
          </v-card>
        </v-dialog>
        <div style="display:none">
          <a id="downloadFile" :href="srcDownload" download></a>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import toastr from 'toastr'
  import Pagination from './Pagination.vue'
  import Search from './FormTimKiem.vue'
  Vue.use(toastr)

  toastr.options = {
    'positionClass': 'toast-top-center',
    'timeOut': '5000'
  }
  export default {
    components: {
      'tim-kiem': Search,
      'pagination': Pagination
    },
    data: () => ({
      valid: false,
      donViList: [],
      menuActive: 0,
      loaiVanBanList: [],
      loaiVanBanCreate: '',
      cmndNguoiThuHuong: '',
      tenNguoiThuHuong: '',
      maHoSoDvc: '',
      keywordSearch: '',
      applicantNameCreate: '',
      applicantIdNoCreate: '',
      govAgencyCreate: '',
      createDate: '',
      expireDate: '',
      showDetail: false,
      fileTemplateList: [],
      statusCreate: 1,
      fileTemplateNoCreate: '',
      fileName: '',
      fileNo: '',
      fileUpdate: '',
      fileNameUpdate: '',
      documentSelect: '',
      loadingAction: false,
      showAdvanceSearch: false,
      showApplicantInfo: false,
      inputSearch: {
        applicantName: '',
        applicantIdNo: '',
        fileTemplateNo: '',
        status: '',
        keywordSearch: '',
        fileNoSearch: '',
        name: ''
      },
      dataInputSearch: '',
      loadingTable: false,
      documentApplicantList: [],
      totalDocument: 0,
      documentPage: 1,
      numberPerPage: 15,
      dialogViewFileSign: false,
      pathNameFileESign: '',
      dialogPDF: false,
      isDvc: false,
      maxFileSize: 100,
      typeCreate: 'create',
      fileNameView: '',
      srcDownload: '',
      fileEntryESign: '',
      hasEsign: false,
      statusList: [],
      applicantInfos: '',
      documentListHeader: [
        {
          text: 'STT',
          align: 'center',
          sortable: false
        },
        {
          text: 'Tên giấy tờ',
          align: 'center',
          sortable: false
        },
        {
          text: 'Số hiệu giấy tờ',
          align: 'center',
          sortable: false
        },
        {
          text: 'Ngày tạo',
          align: 'center',
          sortable: false
        },
        {
          text: 'Mã hồ sơ',
          align: 'center',
          sortable: false
        },
        {
          text: 'Tình trạng',
          align: 'center',
          sortable: false
        },
        {
          text: 'Thao tác',
          align: 'center',
          sortable: false
        }
      ],


      loading: false,
      itemsSelectBox: [],
      selected: "",
      keywordSearchSelect: "",
      pageSelectBox: 0,
      totalItemsSelectBox: 0,
      timeOutSearch: ""
    }),
    computed: {
    },
    beforeDestroy () {
    },
    mounted () {
     let vm = this
    },
    beforeCreate() {
    },
    created () {
      let vm = this
      let currentQuery = vm.$router.history.current.query
      vm.getDanhSachGiayToSoHoa()
      vm.getDanhMuc()
      vm.searchItems()
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentQuery = newRoute.query
        vm.showApplicantInfo = false
        vm.getDanhSachGiayToSoHoa()
      },
      fileTemplateNoCreate (val) {
        let vm = this
        if (val && vm.typeCreate === 'create') {
          vm.fileName = val.name
        }
      },
      // ----
      keywordSearchSelect(val) {
        let vm = this
        if (vm.itemsSelectBox.length) {
          if (val && val !== vm.selected) {
            if (vm.timeOutSearch) {
              clearTimeout(vm.timeOutSearch);
            }
            vm.timeOutSearch = setTimeout(function () {
              let exits = vm.itemsSelectBox.find(function (item) {
                return String(item.fileName).toLowerCase().includes(String(val).toLowerCase())
              })
              if (!exits) {
                vm.searchItems()
              }
            }, 1000)
          }
        } else {
          if (vm.timeOutSearch) {
            clearTimeout(vm.timeOutSearch);
          }
          vm.timeOutSearch = setTimeout(function () {
            vm.searchItems()
          }, 1000)
        }     
      }
      // ----
    },
    methods: {
      getDanhMuc () {
        let vm = this
        vm.getDanhSachDonVi()
        vm.getMauGiayTo()
        vm.getHieuLuc()
        vm.getLoaiGiayTo()
      },
      viewThongTinGiayTo (item) {
        let vm = this
        vm.documentSelect = item
        vm.showDetail = true
        vm.typeCreate = 'view'
      },
      getDanhSachDonVi () {
        let vm = this
        let filter = {
          status: 1
        }
        vm.$store.dispatch('getFileItems', filter).then(function (result) {
          if (result.hasOwnProperty('data')) {
            vm.donViList = result.data
          } else {
            vm.donViList = []
          }
        }).catch(function () {
        })
      },
      getMauGiayTo () {
        let vm = this
        let filter = {
          status: 1,
          tenDanhMuc: 'maugiayto'
        }
        vm.$store.dispatch('getDanhMuc', filter).then(function (result) {
          if (result.hasOwnProperty('data')) {
            vm.fileTemplateList = result.data
          } else {
            vm.fileTemplateList = []
          }
        }).catch(function () {
        })
      },
      getHieuLuc () {
        let vm = this
        let filter = {
          status: 1,
          tenDanhMuc: 'hieulucvanban'
        }
        vm.$store.dispatch('getDanhMuc', filter).then(function (result) {
          if (result.hasOwnProperty('data')) {
            vm.statusList = result.data
          } else {
            vm.statusList = []
          }
        }).catch(function () {
        })
      },
      getLoaiGiayTo () {
        let vm = this
        let filter = {
          status: 1,
          tenDanhMuc: 'loaivanbandientu'
        }
        vm.$store.dispatch('getDanhMuc', filter).then(function (result) {
          if (result.hasOwnProperty('data')) {
            vm.loaiVanBanList = result.data
          } else {
            vm.loaiVanBanList = []
          }
        }).catch(function () {
        })
      },
      showTimKiem () {
        this.showAdvanceSearch = !this.showAdvanceSearch
      },
      changeMenu (index) {
        let vm = this
        vm.menuActive = index
        vm.showDetail = false
      },
      uploadFile () {
        let vm = this
        vm.hasEsign = false
        document.getElementById('documentFile').value = ''
        document.getElementById('documentFile').click()
      },
      getDanhMucGiayTo () {
        let vm = this
        let filter = {
          status: 1
        }

        vm.$store.dispatch('getFileItems', filter).then(function (result) {
          if (result.hasOwnProperty('data')) {
            vm.fileTemplateList = result.data
          } else {
            vm.fileTemplateList = []
          }
        }).catch(function () {
        })
      },
      searchGiayToSoHoa (data) {
        let vm = this
        console.log('dataInputSearch', data)
        vm.dataInputSearch = data
        vm.documentPage = 1
        vm.totalDocument = 0
        vm.getDanhSachGiayToSoHoa(data)
      },
      cancelSearchGiayToSoHoa (data) {
        let vm = this
        console.log('dataInputSearch2', data)
        vm.showAdvanceSearch = false
        vm.dataInputSearch = data
        vm.documentPage = 1
        vm.totalDocument = 0
        vm.getDanhSachGiayToSoHoa(data)
      },
      changePage (config) {
        let vm = this
        vm.documentPage = config.page
        vm.getDanhSachGiayToSoHoa(vm.dataInputSearch)
      },
      getDanhSachGiayToSoHoa (dataSearch) {
        let vm = this
        let filter = {
          page: vm.documentPage,
          size: vm.numberPerPage,
          giayToToiSoHoa: '',
          keyword: dataSearch ? dataSearch.dossierNo : '',
          coQuanBanHanh_MaDinhDanh: dataSearch ? dataSearch.govAgencyCode : '',
          mauGiayTo_MaMuc: dataSearch ? dataSearch.fileTemplateNo : '',
          ngayBanHanh_TuNgay: dataSearch ? dataSearch.fromReceiveDateFormatted : '',
          ngayBanHanh_DenNgay: dataSearch ? dataSearch.toReceiveDateFormatted : '',
          hieuLucGiayTo_MaMuc: dataSearch ? dataSearch.status : '',
          trangThaiDuLieu_MaMuc: '',
          orderFields: 'NgayBanHanh',
          orderType: 'asc',

          applicantIdNo: dataSearch ? dataSearch.applicantIdNo : '',
          fileTemplateNo: dataSearch ? dataSearch.fileTemplateNo : '',
          status: dataSearch ? dataSearch.status : '',
          fileNoSearch: dataSearch ? dataSearch.fileNoSearch : '',
          applicantName: dataSearch ? dataSearch.applicantName : '',
          applicantDataType: '',
        }

        vm.loadingTable = true
        vm.$store.dispatch('getApplicantDocument', filter).then(function (result) {
          if (result.hasOwnProperty('data')) {
            vm.documentApplicantList = result.data
          } else {
            vm.documentApplicantList = []
          }
          vm.totalDocument = result['total']
          vm.loadingTable = false
        }).catch(function () {
          vm.loadingTable = false
          vm.documentApplicantList = []
          vm.totalDocument = 0
        })
      },
      validFileUpload (file) {
        let vm = this
        let passed = true
        let getFileType = file.name ? file.name.split('.') : ''
        let fileType = getFileType ? getFileType[getFileType.length - 1] : ''
        let fileTypeAllow = vm.fileTemplateNoCreate && vm.fileTemplateNoCreate.fileType ? vm.fileTemplateNoCreate.fileType.toUpperCase().split(',') : ''
        let fileSizeAllow = vm.fileTemplateNoCreate && vm.fileTemplateNoCreate.size ? vm.fileTemplateNoCreate.size : vm.maxFileSize
        let fileTypeInput = fileTypeAllow ? fileTypeAllow.filter(function (item) {
          return item === fileType.toUpperCase()
        }) : ''
        if ((fileTypeInput && fileTypeInput.length > 0) || !fileTypeAllow) {
          if (Number(file.size) <= fileSizeAllow * 1048576 || !fileSizeAllow) {
            passed = true
          } else {
            passed = false
            toastr.clear()
            toastr.error('Tài liệu tải lên dung lượng tối đa là ' + fileSizeAllow + 'MB')
          }
        } else {
          passed = false
          toastr.clear()
          toastr.error('Tài liệu tải lên chỉ chấp nhận các định dạng ' + vm.fileTemplateNoCreate.fileType)
        }
        return passed
      },
      downloadDocument (item) {
        let vm = this
        vm.srcDownload = ''
        let url = item.filePath
        let filter = {
          applicantDataId: item.applicantDataId
        }
        if (vm.isDvc) {
          vm.$store.dispatch('getFileAttachProxy', filter).then(function (result) {
            vm.srcDownload = result
            setTimeout(function () {
              document.getElementById('downloadFile').click()
            }, 100)
          }).catch(function () {
          })
        } else {
          vm.$store.dispatch('getFileAttach', filter).then(function (result) {
            vm.srcDownload = result
            setTimeout(function () {
              document.getElementById('downloadFile').click()
            }, 100)
          }).catch(function () {
          })
        }
      },
      viewDocument (item) {
        let vm = this
        if (vm.pathNameFileESign) {
          vm.dialogViewFileSign = true
        } else {
          vm.srcDownload = ''
          let filter = {
            applicantDataId: item.applicantDataId
          }
          if (vm.isDvc) {
            vm.$store.dispatch('getFileAttachProxy', filter).then(function (result) {
              let fileType = item.fileExtension.toLowerCase()
              if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'pdf' || fileType === 'gif' ||
                fileType === 'tif' || fileType === 'tiff'
              ) {
                vm.dialogPDF = true
                document.getElementById('dialogPDFPreview').src = result
              } else {
                vm.srcDownload = result
                setTimeout(function () {
                  document.getElementById('downloadFile').click()
                }, 100)
              }
            }).catch(function () {
            })
          } else {
            vm.$store.dispatch('getFileAttach', filter).then(function (result) {
              let fileType = item.fileExtension.toLowerCase()
              if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'pdf' || fileType === 'gif' ||
                fileType === 'tif' || fileType === 'tiff'
              ) {
                vm.dialogPDF = true
                document.getElementById('dialogPDFPreview').src = result
              } else {
                vm.srcDownload = result
                setTimeout(function () {
                  document.getElementById('downloadFile').click()
                }, 100)
              }
            }).catch(function () {
            })
          }
        }
      },
      showEditDocument (item) {
        let vm = this
        vm.updateFile = false
        $('html, body').animate({
            scrollTop: $('#top-header').offset().top,
          },
          100,
          'linear'
        )
        vm.documentSelect = item
        vm.typeCreate = 'update'
        vm.fileNameView = item.fileName
        try {
          vm.fileTemplateNoCreate = vm.fileTemplateList.filter(function (items) {
            return items.fileTemplateNo === item.fileTemplateNo
          })[0]
        } catch (error) {
        }
        vm.statusCreate = item.status
        vm.fileName = item.fileName
        vm.fileNo = item.fileNo
        vm.govAgencyCreate = item.govAgencyName ? item.govAgencyName : ''
        vm.applicantNameCreate = item.applicantName ? item.applicantName : ''
        vm.applicantIdNoCreate = item.applicantIdNo ? item.applicantIdNo : ''
        vm.createDate = item.issueDate ? String(item.issueDate).split(" ")[0] : ''
        vm.expireDate = item.expireDate ? String(item.expireDate).split(" ")[0] : ''
        vm.showDetail = true
      },
      cloneMyStorage (item) {
        let vm = this
      },
      deleteDocument (item) {
        let vm = this
        let x = confirm('Bạn có chắc chắn xóa giấy tờ này?')
        if (x) {
          vm.$store.dispatch('deleteDocument', item).then(function () {
            toastr.clear()
            toastr.success('Yêu cầu thực hiện thành công')
          }).catch(function () {
            toastr.clear()
            toastr.error('Yêu cầu thực hiện thất bại')
          })
        }
      },
      uploadDocumentFile (e) {
        let vm = this
        let files = $('#documentFile')[0].files
        let file = files[0]
        let fileName = ''
        let valid = vm.validFileUpload(file)
        if (valid) {
          vm.updateFile = true
          if (file['name']) {
            fileName = file['name'].replace(/\%/g, '')
            fileName = fileName.replace(/\//g, '')
            fileName = fileName.replace(/\\/g, '')
            fileName = fileName.replace(/\s/g, '')
          }
          vm.fileUpdate = file
          vm.fileNameUpdate = fileName
          vm.fileNameView = fileName
        }

      },
      showCreatedocument () {
        let vm = this
        vm.showDetail = true
        vm.typeCreate = 'create'
        vm.pathNameFileESign = ''
        vm.fileNameView = ''
        vm.fileName = ''
        vm.fileNo = ''
        vm.updateFile = false
        setTimeout(function () {
          // vm.$refs.form.reset()
          vm.$refs.form.resetValidation()
          if (vm.showApplicantInfo) {
            vm.applicantIdNoCreate = vm.applicantInfos.applicantIdNo
            vm.applicantNameCreate = vm.applicantInfos.applicantName
          }
          vm.statusCreate = 1
        }, 200)
      },
      createDocument () {
        let vm = this
        if (!vm.hasEsign) {
          let validFileUpload = true
          if (vm.updateFile) {
            let files = $('#documentFile')[0].files
            let file = files[0]
            validFileUpload = vm.validFileUpload(file)
          }
          if (!validFileUpload) {
            return
          }
          if (vm.$refs.form.validate()) {
            if (vm.fileNameView) {
              vm.loadingAction = true
              let param = {
                headers: {
                  groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }
            
              let dataCreateFile = new FormData()
              let url = '/o/rest/v2/applicantdatas'
              dataCreateFile.append('fileTemplateNo', vm.fileTemplateNoCreate.fileTemplateNo)
              dataCreateFile.append('status', vm.statusCreate ? vm.statusCreate : 0)
              dataCreateFile.append('fileNo', vm.fileNo)
              dataCreateFile.append('fileName', vm.fileName)
              dataCreateFile.append('applicantIdNo', vm.applicantIdNoCreate)
              dataCreateFile.append('applicantName', vm.applicantNameCreate)
              dataCreateFile.append('govAgencyName', vm.govAgencyCreate)
              dataCreateFile.append('file', vm.fileUpdate)
              dataCreateFile.append('issueDate', vm.createDate)
              dataCreateFile.append('expireDate', vm.expireDate)
              dataCreateFile.append('serviceCode', '')
              dataCreateFile.append('templateNo', '')
              dataCreateFile.append('desciption', '')
              dataCreateFile.append('dossierNo', '')

              // {
              //   "TenGiayTo": "string",
              //   "TenLoaiVanBan": {
              //     "MaMuc": "string",
              //     "TenMuc": "string"
              //   },
              //   "SoHieuVanBan": "string",
              //   "NgayBanHanh": "2023-05-11T04:31:59.606Z",
              //   "ThoiHanHieuLuc": "2023-05-11T04:31:59.606Z",
              //   "CoQuanBanHanh": {
              //     "MaDinhDanh": "string",
              //     "TenGoi": "string"
              //   },
              //   "HieuLucVanBan": {
              //     "MaMuc": "string",
              //     "TenMuc": "string"
              //   },
              //   "MaMauGiayTo": {
              //     "MaMuc": "string",
              //     "TenMuc": "string"
              //   },
              //   "HoSoDichVuCong": "string",
              //   "ChuHoSo": {
              //     "MaDinhDanh": "string",
              //     "TenGoi": "string"
              //   },
              //   "LoaiVanBanDienTu": {
              //     "MaMuc": "string",
              //     "TenMuc": "string"
              //   },
              //   "TepDuLieu": [
              //     {
              //       "MaDinhDanh": "string",
              //       "TenTep": "string",
              //       "DinhDangTep": "string",
              //       "KichThuocTep": 0,
              //       "LoaiNguonDuLieu": {
              //         "@type": "string",
              //         "MaMuc": "string",
              //         "TenMuc": "string"
              //       },
              //       "MaHoaDuLieu": "string",
              //       "Ext": "string"
              //     }
              //   ]
              // }

              // let dataPost = JSON.stringify(filter.data)
              // let config = {
              //   method: 'post',
              //   url: '/v1/datasharing/idp/account/' + filter.data.type,
              //   headers: {
              //     'Accept': 'application/json',
              //     'Content-Type': 'application/json'
              //   },
              //   data: dataPost
              // }
              // axios(config).then(function (response) {
              //   let serializable = response.data
              // }).catch(function (error) {
              // })


              
              axios.post(url, dataCreateFile, param).then(result1 => {
                vm.loadingAction = false
                toastr.success('Thêm mới giấy tờ thành công')
                vm.showDetail = false
                setTimeout(function () {
                  vm.getDanhSachGiayToSoHoa()
                }, 200)
              }).catch(xhr => {
                vm.loadingAction = false
                toastr.error('Thêm mới thất bại. Vui lòng thử lại.')
              })
              
            } else {
              toastr.clear()
              toastr.error('Vui lòng đính kèm tài liệu')
            }
          }
        } else {
          vm.createDocumentKySo()
        }
      },
      createDocumentKySo () {
        let vm = this
        if (vm.$refs.form.validate()) {
          if (vm.fileNameView) {
            vm.loadingAction = true
            let param = {
              headers: {
                groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }

            let dataCreateFile = new FormData()
            let url = '/o/rest/v2/applicantdatas'
            dataCreateFile.append('fileTemplateNo', vm.fileTemplateNoCreate.fileTemplateNo)
            dataCreateFile.append('status', vm.statusCreate ? vm.statusCreate : 0)
            dataCreateFile.append('fileNo', vm.fileNo)
            dataCreateFile.append('fileName', vm.fileName)
            dataCreateFile.append('applicantIdNo', vm.applicantIdNoCreate)
            dataCreateFile.append('applicantName', vm.applicantNameCreate)
            dataCreateFile.append('govAgencyName', vm.govAgencyCreate)
            dataCreateFile.append('fileEntryId', vm.fileEntryESign)
            dataCreateFile.append('issueDate', vm.createDate)
            dataCreateFile.append('expireDate', vm.expireDate)
            dataCreateFile.append('serviceCode', '')
            dataCreateFile.append('templateNo', '')
            dataCreateFile.append('desciption', '')
            dataCreateFile.append('file', '')
            dataCreateFile.append('dossierNo', '')
                
            axios.post(url, dataCreateFile, param).then(result1 => {
              vm.loadingAction = false
              toastr.success('Thêm mới tài liệu thành công')
              vm.showDetail = false
              setTimeout(function () {
                vm.getDanhSachGiayToSoHoa()
              }, 200)
            }).catch(xhr => {
              vm.loadingAction = false
              toastr.error('Thêm mới thất bại. Vui lòng thử lại.')
            })
            
          } else {
            toastr.clear()
            toastr.error('Vui lòng đính kèm tài liệu')
          }
        }
      },
      updateDocument () {
        let vm = this
        if (!vm.hasEsign) {
          let validFileUpload = true
          if (vm.updateFile) {
            let files = $('#documentFile')[0].files
            let file = files[0]
            validFileUpload = vm.validFileUpload(file)
          }
          if (!validFileUpload) {
            return
          }
          if (vm.$refs.form.validate()) {
            vm.loadingAction = true
            let param = {
              headers: {
                groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }

            let dataPost = new FormData()
            let url = '/o/rest/v2/applicantdatas/' + vm.documentSelect.applicantDataId
            dataPost.append('fileTemplateNo', vm.fileTemplateNoCreate.fileTemplateNo)
            dataPost.append('status', vm.statusCreate ? vm.statusCreate : 0)
            dataPost.append('fileNo', vm.fileNo)
            dataPost.append('fileName', vm.fileName)
            dataPost.append('applicantIdNo', vm.applicantIdNoCreate)
            dataPost.append('applicantName', vm.applicantNameCreate)
            dataPost.append('govAgencyName', vm.govAgencyCreate)
            dataPost.append('issueDate', vm.createDate)
            dataPost.append('expireDate', vm.expireDate)
            dataPost.append('serviceCode', '')
            dataPost.append('templateNo', '')
            dataPost.append('desciption', '')
            
            if (vm.updateFile) {
              dataPost.append('file', vm.fileUpdate)
            } else {
              dataPost.append('file', '')
            } 
            axios.put(url, dataPost, param).then(result1 => {
              vm.loadingAction = false
              toastr.success('Cập nhật tài liệu thành công')
              vm.showDetail = false
              setTimeout(function () {
                vm.getDanhSachGiayToSoHoa()
              }, 200)
            }).catch(xhr => {
              vm.loadingAction = false
              toastr.error('Cập nhật thất bại. Vui lòng thử lại.')
            })
            
          }
        } else {
          vm.updateDocumentKySo()
        }
      },
      updateDocumentKySo () {
        let vm = this
        if (vm.$refs.form.validate()) {
          vm.loadingAction = true
          let param = {
            headers: {
              groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

          let dataPost = new FormData()
          let url = '/o/rest/v2/applicantdatas/' + vm.documentSelect.applicantDataId
          dataPost.append('fileTemplateNo', vm.fileTemplateNoCreate.fileTemplateNo)
          dataPost.append('status', vm.statusCreate ? vm.statusCreate : 0)
          dataPost.append('fileNo', vm.fileNo)
          dataPost.append('fileName', vm.fileName)
          dataPost.append('applicantIdNo', vm.documentSelect.applicantIdNo)
          dataPost.append('fileEntryId', vm.fileEntryESign)
          dataPost.append('govAgencyName', vm.govAgencyCreate)
          dataPost.append('issueDate', vm.createDate)
          dataPost.append('expireDate', vm.expireDate)
          dataPost.append('serviceCode', '')
          dataPost.append('templateNo', '')
          dataPost.append('desciption', '')
          dataPost.append('file', '')
          axios.put(url, dataPost, param).then(result1 => {
            vm.loadingAction = false
            toastr.success('Cập nhật tài liệu thành công')
            vm.showDetail = false
            setTimeout(function () {
              vm.getDanhSachGiayToSoHoa()
            }, 200)
          }).catch(xhr => {
            vm.loadingAction = false
            toastr.error('Cập nhật thất bại. Vui lòng thử lại.')
          })
          
        }
      },
      vgca_sign_approved() {
        let vm = this
        vm.hasEsign = true
        let prms = {}
        prms['FileUploadHandler'] = window.themeDisplay.getPortalURL() + '/o/rest/v2/vgca/fileupload'
        prms['SessionId'] = ''
        prms['FileName'] = ''
        let signFileCallBack = function (rv) {
          let received_msg = JSON.parse(rv)
          console.log('received_msg', received_msg)
          if (received_msg.Status === 0) {
            let dataSigned
            try {
              dataSigned = JSON.parse(received_msg.FileServer)
              vm.fileEntryESign = dataSigned.fileEntryId
              let urlPdf = dataSigned.url
              if (window.top.location.protocol === 'https:') {
                urlPdf = urlPdf.replace('http:', 'https:')
              }
              urlPdf = urlPdf.replace(':80/', '/')
              vm.pathNameFileESign = urlPdf
              vm.fileNameView = urlPdf
            } catch (error) {
            }
            console.log('dataSigned', dataSigned)
            toastr.clear()
            toastr.success('Giấy tờ đã được ký duyệt')
            vm.dialogViewFileSign = true
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
        let json_prms = JSON.stringify(prms)
        vgca_sign_approved(json_prms, signFileCallBack)
      },
      formatDate () {
        let vm = this
        let lengthDate = String(vm.createDate).trim().length
        let splitDate = String(vm.createDate).split('/')
        if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
          vm.createDate = vm.translateDate(vm.createDate)
        } else if (lengthDate && lengthDate === 8) {
          let date = String(vm.createDate)
          vm.createDate = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
        } else {
          vm.createDate = ''
        }     
      },
      formatExpireDate () {
        let vm = this
        let lengthDate = String(vm.expireDate).trim().length
        let splitDate = String(vm.expireDate).split('/')
        if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
          vm.expireDate = vm.translateDate(vm.expireDate)
        } else if (lengthDate && lengthDate === 8) {
          let date = String(vm.expireDate)
          vm.expireDate = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
        } else {
          vm.expireDate = ''
        }     
      },
      getStatus (val) {
        if (String(val) === '0') {
          return 'Yêu cầu số hóa'
        } else if (String(val) === '1') {
          return 'Có hiệu lực'
        } else if (String(val) === '2') {
          return 'Hết hiệu lực'
        } else if (String(val) === '3') {
          return 'Hủy'
        }
      },

      // -----
      visibilityChanged(e) {
        e && this.loadMoreItems();
      },
      searchItems() {
        // Reset lại danh sách khi tìm kiếm mới
        this.itemsSelectBox = [];
        this.pageSelectBox = 1;
        this.loadMoreItems();
        console.log('run searchItem')
      },
      loadMoreItems() {
        let vm = this
        if (vm.itemsSelectBox.length < vm.totalItemsSelectBox || vm.pageSelectBox == 1) {
          vm.loading = true;
          let filter = {
            applicantIdNo: "125211381",
            start: vm.pageSelectBox * 10 - 10,
            end: vm.pageSelectBox * 10,
            keyword: vm.keywordSearchSelect
          }
          console.log('paramsSearch', filter)
          vm.$store.dispatch('getApplicantDocumentFromDvc', filter).then(function (result) {
            vm.itemsSelectBox = [
              ...vm.itemsSelectBox,
              ...result.data
            ];
            vm.pageSelectBox++;
            vm.totalItemsSelectBox = result['total']
            vm.loading = false
          }).catch(function () {
            vm.loading = false
          })
        }
      }
      // ------
    }
  }
</script>

