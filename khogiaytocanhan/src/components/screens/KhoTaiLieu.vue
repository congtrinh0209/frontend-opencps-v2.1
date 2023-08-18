<template>
  <div style="padding: 0px 0px; max-width: 1500px; margin: 0px auto;border-radius: 12px" class="pb-3" id="top-header">
    <v-layout wrap>
      <v-flex class="pl-2" style="width: 300px">
        <v-list>
          <v-btn color="#0072bc" small class="mx-0 my-0 white--text" @click.stop="showCreatedocument"
            style="height: 36px;width: 100%"
          >
            <v-icon size="24">
              post_add
            </v-icon> &nbsp;
            <span style="line-height: 36px;font-size: 14px;">THÊM MỚI GIẤY TỜ</span>
          </v-btn>
          <v-list-tile
            avatar
            @click="changeMenu(0)"
            class="px-2 py-2"
            style="height: auto; border-bottom: 1px solid #dedede;" 
          >
            <v-list-tile-avatar>
              <v-icon :class="menuActive == 0 ? 'blue white--text' : 'grey lighten-1 white--text'" size="22">folder_shared</v-icon>
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
              <v-icon :class="menuActive == 1 ? 'blue white--text' : 'grey lighten-1 white--text'" size="22">
                lock
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :style="menuActive == 1 ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;' : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'">
                Giấy tờ không chia sẻ
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            avatar
            @click="changeMenu(2)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede;" 
          >
            <v-list-tile-avatar>
              <v-icon :class="menuActive == 2 ? 'blue white--text' : 'grey lighten-1 white--text'" size="22">
                fas fa fa-share-square-o
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :style="menuActive == 2 ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;' : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'">
                Giấy tờ chia sẻ
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            avatar
            @click="changeMenu(3)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede;" 
          >
            <v-list-tile-avatar>
              <v-icon :class="menuActive == 3 ? 'blue white--text' : 'grey lighten-1 white--text'" size="22">share</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :style="menuActive == 3 ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;' : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'">
                Giấy tờ được chia sẻ
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            avatar
            @click="changeMenu(4)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede;" 
          >
            <v-list-tile-avatar>
              <v-icon :class="menuActive == 4 ? 'blue white--text' : 'grey lighten-1 white--text'" size="22">delete</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :style="menuActive == 4 ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;' : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'">
                Giấy tờ đã xóa
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
                <span v-if="menuActive == 0">Giấy tờ của tôi</span>
                <span v-else-if="menuActive == 1">Giấy tờ không chia sẻ</span>
                <span v-else-if="menuActive == 2">Giấy tờ chia sẻ</span>
                <span v-else-if="menuActive == 3">Giấy tờ được chia sẻ</span>
                <span v-else>Giấy tờ đã xóa</span>
              </div>
            </v-flex>
            <v-flex style="width: 500px">
              <v-text-field
                solo
                v-model="keywordSearch"
                label="Nhập từ khóa tìm kiếm..."
                append-icon="search"
                @keyup.enter="searchKeyword"
                @click:append="searchKeyword"
              ></v-text-field>
            </v-flex>
            <v-flex style="max-width: 170px; text-align: right;padding-top: 2px;">
              <v-btn color="#0072bc" small class="mx-0 white--text my-0" @click.stop="showTimKiem" style="">
                <v-icon size="20">
                  filter_list
                </v-icon> &nbsp;
                Tìm kiếm nâng cao
              </v-btn>
            </v-flex>
          </v-layout>
          <v-card-text class="px-0 pb-0" v-if="showAdvanceSearch">
            <tim-kiem ref="timkiem" :inputSearch="inputSearch" v-on:trigger-search="searchGiayToSoHoa" v-on:trigger-cancel="cancelSearchGiayToSoHoa"></tim-kiem>
          </v-card-text>
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
                    <span>{{ (documentPage + 1) * numberPerPage - numberPerPage + props.index + 1 }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px; min-width:250px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.TenGiayTo }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px;min-width: 120px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.SoHieuVanBan}}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px;min-width: 150px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <div class="mb-1">
                      <b>{{props.item.ChuHoSo['TenGoi']}}</b>
                    </div>
                    <span>{{props.item.ChuHoSo['MaDinhDanh']}}</span>
                  </div>
                </td>
                <td class="text-xs-center py-2" style="height:36px;min-width: 120px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{ convertDate(props.item.NgayBanHanh) }}</span>
                  </div>
                </td>
                
                <td class="text-xs-center py-2" style="height:36px;min-width:100px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>
                      {{props.item.HieuLucVanBan['TenMuc']}}
                    </span>
                  </div>
                </td>
                <td class="text-center py-2" style="height:36px;min-width:150px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-tooltip top v-if="!loadingTable && menuActive == 3" class="mr-2">
                    <v-btn :disabled="loadingAction" @click.stop="cloneMyStorage(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">sync_alt</v-icon>
                    </v-btn>
                    <span>Lấy về kho của tôi</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && menuActive == 1" class="mr-2">
                    <v-btn @click.stop="showEditDocument(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">edit</v-icon>
                    </v-btn>
                    <span>Cập nhật giấy tờ</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && menuActive == 1" class="">
                    <v-btn @click.stop="deleteDocument(props.item)" color="red" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">delete</v-icon>
                    </v-btn>
                    <span>Xóa</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && menuActive == 4" class="">
                    <v-btn :disabled="loadingAction" @click.stop="restoreDocument(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">restore_page</v-icon>
                    </v-btn>
                    <span>Khôi phục</span>
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
                <pagination :total="totalDocument" :page="documentPage + 1" :numberPerPage="numberPerPage" nameRecord="giấy tờ" custom-class="custom-tiny-class" 
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
          <v-card-text v-if="typeCreate == 'view'" style="font-size: 14px;" class="py-2 px-0">
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Tên giấy tờ: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.TenGiayTo}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Số hiệu giấy tờ: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.SoHieuVanBan}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Cơ quan ban hành: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.CoQuanBanHanh['TenGoi']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Ngày ban hành: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{convertDate(documentSelect.NgayBanHanh)}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Mẫu giấy tờ: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.MaMauGiayTo['MaMuc']}} - {{documentSelect.MaMauGiayTo['TenMuc']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Mã hồ sơ: </v-flex>
              <v-flex class="pl-0 " style="width: calc(100% - 160px);"> {{documentSelect.HoSoDichVuCong['MaDinhDanh']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Người thụ hưởng: </v-flex>
              <v-flex class="pl-0 mr-2" style="width: calc(100% - 160px);"> {{documentSelect.ChuHoSo['TenGoi']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Số CCCD/CMND, MST: </v-flex>
              <v-flex class="pl-0 " style="width: calc(100% - 160px);">{{documentSelect.ChuHoSo['MaDinhDanh']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 md12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold " style="width: 150px;">Hiệu lực giấy tờ: </v-flex>
              <v-flex class="pl-0 "  style="width: calc(100% - 160px);"> {{documentSelect.HieuLucVanBan['TenMuc']}}</v-flex>
            </v-flex>
            <div class="xs12 md12 py-2" v-if="documentSelect &&documentSelect.TepDuLieu && documentSelect.TepDuLieu.length">
              <span class="pr-2 text-bold ">Tệp giấy tờ: </span>
              <div v-for="(itemFileView, indexFile) in documentSelect.TepDuLieu" :key="indexFile" class="my-2">
                <span v-on:click.stop="viewDocument(itemFileView)" class="ml-1" style="cursor: pointer;text-decoration: underline;">
                  <v-icon class="mr-1" :color="getDocumentTypeIcon(itemFileView.Ext)['color']"
                    :size="getDocumentTypeIcon(itemFileView.Ext)['size']">
                    {{getDocumentTypeIcon(itemFileView.Ext)['icon']}}
                  </v-icon>
                  <span>{{itemFileView.TenTep}}.{{itemFileView.Ext}}</span>
                </span>
                <v-btn class="my-0" title="Xem tệp" flat icon color="indigo" :loading="loadingPdf" :disabled="loadingPdf"
                  @click.stop="viewDocument(itemFileView, index)"
                >
                  <v-icon size="22">visibility</v-icon>
                </v-btn>
                <v-btn title="Tải xuống" color="indigo" flat icon v-on:click.stop="downloadDocument(itemFileView)"  :loading="loadingPdf" :disabled="loadingPdf" class="mx-0 my-0">
                  <v-icon size="14" color="primary">fas fa fa-download</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="xs12 md12 pb-2">
              <v-btn class="mx-0" color="red" dark @click.native="showDetail = false">
                <v-icon>reply</v-icon>&nbsp;
                Quay lại
              </v-btn>
            </div>
          </v-card-text>
          <v-card-text v-else class="py-1 px-0">
            <v-form id="form-crud" ref="form" v-model="valid" lazy-validation class="px-0 grid-list">
              <v-layout row wrap class="px-0 py-3">                
                <v-flex xs12 class="pr-0 pl-0 py-0">
                  <div class="mb-1 text-bold">Mẫu giấy tờ <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="fileTemplateList"
                    v-model="fileTemplateNoCreate"
                    ref="autocomplete"
                    :loading="loading"
                    :search-input.sync="keywordSearchSelect"
                    item-text="TenMuc"
                    item-value="MaMuc"
                    return-object
                    clearable
                    solo
                    flat
                    :rules="[v => !!v || 'Mẫu giấy tờ là bắt buộc']"
                    required
                  >
                    <template slot="selection" slot-scope="{ item }">
                      <b class="labelCodeItemSelect">{{item.MaMuc}}</b>&nbsp;-&nbsp;{{item.TenMuc}}
                    </template>
                    <template slot="item" slot-scope="{ item }">
                      <b>{{item.MaMuc}}</b>&nbsp;-&nbsp;{{item.TenMuc}}
                    </template>
                    <template v-slot:append-item>
                      <div class="py-2" v-if="isShow"
                        v-observe-visibility="{
                          callback: visibilityChanged
                        }"
                      >
                      </div>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 class="px-0 py-0">
                  <div class="mb-1 text-bold">Tên giấy tờ <span style="color: red">(*)</span></div>
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
                <v-flex xs12 md3 class="px-0 pr-3 py-0">
                  <div class="mb-1 text-bold">Số hiệu giấy tờ <span style="color: red">(*)</span></div>
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
                <v-flex xs12 md3 class="px-0 pr-3 py-0">
                  <div class="mb-1 text-bold">Ngày ban hành</div>
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
                <v-flex xs12 md3 class="px-0 pr-3 py-0">
                  <div class="mb-1 text-bold">Thời hạn hiệu lực</div>
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
                <v-flex xs12 md3 class="px-0 py-0">
                  <div class="mb-1 text-bold">Hiệu lực <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="statusList"
                    v-model="statusCreate"
                    label=""
                    item-text="TenMuc"
                    item-value="MaMuc"
                    solo
                    flat
                    :rules="[v => !!v || 'Hiệu lực giấy tờ là bắt buộc']"
                    required
                    return-object
                  ></v-autocomplete>
                </v-flex>
                
                <v-flex xs12 class="px-0 py-0">
                  <div class="mb-1 text-bold">Cơ quan ban hành <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="donViList"
                    v-model="govAgencyCreate"
                    ref="autocomplete1"
                    :loading="loadingDonVi"
                    :search-input.sync="keywordSearchDonVi"
                    item-text="TenGoi"
                    item-value="MaDinhDanh"
                    return-object
                    :rules="[v => !!v || 'Cơ quan ban hành là bắt buộc']"
                    required
                    clearable
                    solo
                    flat
                  >
                    <template v-slot:append-item>
                      <div class="py-2" v-if="isShowDonVi"
                        v-observe-visibility="{
                          callback: visibilityChangedDonVi
                        }"
                      >
                      </div>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 md6 class="px-0 py-0 pr-3">
                  <div class="mb-1 text-bold">Mã đối tượng thụ hưởng <span style="color: red">(*)</span></div>
                  <v-text-field
                    label=""
                    v-model="cmndNguoiThuHuong"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[v => !!v || 'Số CMND/CCCD, mã số thuế đối tượng thụ hưởng là bắt buộc']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6 class="px-0 py-0">
                  <div class="mb-1 text-bold">Tên đối tượng thụ hưởng <span style="color: red">(*)</span></div>
                  <v-text-field
                    label=""
                    v-model="tenNguoiThuHuong"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[v => !!v || 'Tên đối tượng thụ hưởng là bắt buộc']"
                    required
                  ></v-text-field>
                </v-flex>
                <!-- <v-flex xs12 md4 class="px-0 py-0">
                  <div class="mb-1 text-bold">Loại đối tượng thụ hưởng  <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="[
                      {name: 'Cá nhân', value: 'CANHAN'},
                      {name: 'Tổ chức, doanh nghiệp', value: 'DONVIKINHDOANH'}
                    ]"
                    v-model="loaiDoiTuongThuHuong"
                    label=""
                    item-text="name"
                    item-value="value"
                    solo
                    flat
                    return-object
                  ></v-autocomplete>
                </v-flex> -->
                <v-flex xs12 md6 class="px-0 py-0 pr-3">
                  <div class="mb-1 text-bold">Loại giấy tờ <span style="color: red">(*)</span></div>
                  <v-autocomplete
                    :items="loaiVanBanList"
                    v-model="loaiVanBanCreate"
                    label=""
                    item-text="TenMuc"
                    item-value="MaMuc"
                    solo
                    flat
                    :rules="[v => !!v || 'Loại giấy tờ là bắt buộc']"
                    required
                    return-object
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 md6 class="px-0 py-0">
                  <div class="mb-1 text-bold">Chia sẻ giấy tờ <span style="color: red">(*)</span></div>
                  <!-- <v-autocomplete
                    :items="trangThaiChiaSeList"
                    v-model="trangThaiChiaSeCreate"
                    label=""
                    item-text="TenMuc"
                    item-value="MaMuc"
                    solo
                    flat
                    :rules="[v => !!v || 'Trạng thái chia sẻ là bắt buộc']"
                    required
                    return-object
                  ></v-autocomplete> -->
                  <v-radio-group class="my-0" v-model="trangThaiChiaSeCreate" row>
                    <v-radio label="Có" :value="1"></v-radio>
                    <v-radio label="Không" :value="0"></v-radio>
                  </v-radio-group>
                </v-flex>
                <!-- <v-flex xs12 md3 class="px-0 py-0">
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
                </v-flex> -->
                
                <v-flex xs12 class="mt-2">
                  <div class="mb-2 text-bold">Tệp giấy tờ <span style="color: red">(*)</span></div>
                  <div v-for="(itemFileView, indexFile) in tepDinhKem" :key="indexFile" class="my-2">
                    <span v-on:click.stop="viewDocument(itemFileView)" class="ml-1" style="cursor: pointer;text-decoration: underline;">
                      <v-icon class="mr-1" :color="getDocumentTypeIcon(itemFileView.Ext)['color']"
                        :size="getDocumentTypeIcon(itemFileView.Ext)['size']">
                        {{getDocumentTypeIcon(itemFileView.Ext)['icon']}}
                      </v-icon>
                      {{itemFileView.TenTep}}.{{itemFileView.Ext}}
                    </span>
                    <v-btn class="my-0" title="Xem tệp" flat icon color="indigo" :loading="loadingPdf" :disabled="loadingPdf"
                      @click.stop="viewDocument(itemFileView, index)"
                    >
                      <v-icon size="22">visibility</v-icon>
                    </v-btn>
                    <v-btn title="Tải xuống" color="indigo" flat icon v-on:click.stop="downloadDocument(itemFileView)" :loading="loadingPdf" :disabled="loadingPdf" class="mx-0 my-0">
                      <v-icon size="16" color="primary">fas fa fa-download</v-icon>
                    </v-btn>
                    <v-btn title="Xóa" color="red" flat icon v-on:click.stop="deleteTepDinhKem(itemFileView, indexFile)" class="mx-0 my-0">
                      <v-icon size="20" color="red">delete</v-icon>
                    </v-btn>
                  </div>
                  <!-- <input type="file" id="documentFile" multiple @input="uploadDocumentFile($event)" style="display:none">
                  <v-btn block color="primary" class="mx-0 px-0 mr-4 d-inline-block" dark @click.native="uploadFile()" style="width: 175px">
                    <v-icon size="16">fas fa fa-upload</v-icon> &nbsp; &nbsp;
                    Tải lên tệp giấy tờ
                  </v-btn> -->
                  <div class="upload-wrap" style="
                    justify-content: center;
                    align-items: center;
                    height: 200px;
                    border: 2px dashed #959ca0;
                    border-radius: 10px;
                    padding: 15px
                  ">
                    <div
                      class="drop-zone"
                      @dragover.prevent
                      @dragenter="dragging = true"
                      @dragleave="dragging = false"
                      @drop="handleDrop"
                      @click.stop="uploadFile"
                      style="display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        cursor: pointer
                      "
                    >
                      <div>
                        <div v-for="(itemFileView, indexFile) in tepUpload" :key="indexFile" class="my-2 px-2 py-1"
                          style="display: flex; border: 1px solid #d7d7d7; width: 500px; margin: 0 auto; align-items: center;justify-content: center;"
                        >
                          <span class="ml-1" style="cursor: pointer;text-decoration: underline;">
                            <v-icon class="mr-2" :color="getDocumentTypeIcon(itemFileView.Ext)['color']"
                              :size="16">
                              {{getDocumentTypeIcon(itemFileView.Ext)['icon']}}
                            </v-icon>
                            <span style="font-size: 16px">{{itemFileView.TenTep}}</span>
                          </span>
                          <v-btn title="Xóa" color="red" flat icon v-on:click.stop="deleteTepUpload(itemFileView, indexFile)" class="mx-0 my-0">
                            <v-icon size="20" color="red">close</v-icon>
                          </v-btn>
                        </div>
                      </div>
                      <div>
                        <span v-if="dragging">Thả tệp vào đây</span>
                        <div v-else>
                          <div style="text-align: center;margin-bottom: 10px;">
                            <v-icon size="48" color="#0072bc">
                              fas fa fa-cloud-upload
                            </v-icon>
                          </div>
                          <span style="font-size: 14px;color: #0072bc">Kéo và thả tệp vào đây hoặc nhấp để chọn tệp</span>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref="fileInput"
                      style="display: none" id="documentFile" multiple @input="uploadDocumentFile($event)"
                    />
                  </div>
                  <!-- <div v-if="fileTemplateNoCreate && fileTemplateNoCreate.fileType">
                    <span style="color:red">(*) </span>
                    <span>File tải lên chấp nhận các định dạng: {{fileTemplateNoCreate.fileType}} .</span>
                  </div> -->
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
        <v-dialog v-model="dialogPDF" fullscreen transition="fade-transition">
          <v-card>
            <v-toolbar flat dark color="primary">
              <v-toolbar-title>Tệp dữ liệu</v-toolbar-title>
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
      dragging: false,
      valid: false,
      donViList: [],
      menuActive: 0,
      loaiVanBanList: [],
      loaiVanBanCreate: '',
      trangThaiChiaSeList: [
        {'TenMuc': 'Không chia sẻ', 'MaMuc': 0},
        {'TenMuc': 'Chia sẻ', 'MaMuc': 1}
      ],
      trangThaiChiaSeCreate: 0,
      cmndNguoiThuHuong: '',
      tenNguoiThuHuong: '',
      maHoSoDvc: '',
      loaiDoiTuongThuHuong: '',
      keywordSearch: '',
      applicantNameCreate: '',
      applicantIdNoCreate: '',
      govAgencyCreate: '',
      createDate: '',
      expireDate: '',
      showDetail: false,
      fileTemplateList: [],
      statusCreate: '',
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
      documentPage: 0,
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
          text: 'Người thụ hưởng',
          align: 'center',
          sortable: false
        },
        {
          text: 'Ngày ban hành',
          align: 'center',
          sortable: false
        },
        {
          text: 'Hiệu lực giấy tờ',
          align: 'center',
          sortable: false
        },
        {
          text: 'Thao tác',
          align: 'center',
          sortable: false
        }
      ],
      applicantName: '',
      applicantIdNo: '',
      applicantType: '',
      loadingPdf: false,
      tepDinhKem: [],
      tepUpload: [],


      loading: false,
      itemsSelectBox: [],
      selected: "",
      keywordSearchSelect: "",
      pageSelectBox: 0,
      totalItemsSelectBox: 0,
      timeOutSearch: "",
      isShow: true,

      loadingDonVi: false,
      keywordSearchDonVi: "",
      timeOutSearch1: "",
      isShowDonVi: false,
      pageSelectDonVi: 0,
      totalItemsSelectDonVi: 0
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
      let param = {
        headers: {
          groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : ''
        }
      }
      axios.get('/o/v1/opencps/users/' + window.themeDisplay.getUserId(), param).then(function(response) {
        console.log('responseUser', response.data)
        vm.getDanhMuc()
        try {
          vm.applicantName = response.data['applicantName']
          vm.applicantIdNo = response.data['applicantIdNo']
          vm.applicantType = response.data['applicantType']
        } catch (error) {
        }
        vm.getDanhSachGiayToSoHoa()
      })
      .catch(function(error) {
      })
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
          vm.fileName = val.TenMuc
        }
      },
      // ----
      keywordSearchSelect(val) {
        let vm = this
        if (vm.fileTemplateList.length) {
          if (val && val !== vm.fileTemplateNoCreate['TenMuc']) {
            if (vm.timeOutSearch) {
              clearTimeout(vm.timeOutSearch);
            }
            vm.timeOutSearch = setTimeout(function () {
              let exits = vm.fileTemplateList.find(function (item) {
                return String(item.TenMuc).toLowerCase().includes(String(val).toLowerCase())
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
      },
      keywordSearchDonVi(val) {
        let vm = this
        if (vm.donViList.length) {
          if (val && val !== vm.govAgencyCreate['TenGoi']) {
            if (vm.timeOutSearch1) {
              clearTimeout(vm.timeOutSearch1);
            }
            vm.timeOutSearch1 = setTimeout(function () {
              let exits = vm.donViList.find(function (item) {
                return String(item.TenGoi).toLowerCase().includes(String(val).toLowerCase())
              })
              if (!exits) {
                vm.searchItemsDonVi()
              }
            }, 1000)
          }
        } else {
          if (vm.timeOutSearch1) {
            clearTimeout(vm.timeOutSearch1);
          }
          vm.timeOutSearch1 = setTimeout(function () {
            vm.searchItemsDonVi()
          }, 1000)
        }     
      }
      // ----
    },
    methods: {
      handleDrop(event) {
        event.preventDefault()
        this.dragging = false
        this.handleDragFiles(event.dataTransfer.files)
      },
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
          page: 0,
          size: 100
        }
        vm.$store.dispatch('getDonVi', filter).then(function (result) {
          if (result.hasOwnProperty('content')) {
            vm.donViList = result.content
          } else {
            vm.donViList = []
          }
        }).catch(function () {
        })
      },
      getMauGiayTo () {
        let vm = this
        let filter1 = {
          page: 0,
          size: 20,
          tenDanhMuc: 'mathanhphanhoso'
        }
        let filter2 = {
          page: 0,
          size: 20,
          tenDanhMuc: 'magiaytoketqua'
        }
        let req1 = vm.$store.dispatch('getDanhMuc', filter1)
        let req2 = vm.$store.dispatch('getDanhMuc', filter2)
        let arrAction = [req1, req2]
        Promise.all(arrAction).then(results => {
          let res = results[0]['content'].concat(results[1]['content'])
          vm.fileTemplateList = res
        }).catch(xhr => {
          vm.fileTemplateList = []
        })
      },
      getHieuLuc () {
        let vm = this
        let filter = {
          page: 0,
          size: 100,
          tenDanhMuc: 'hieulucvanban'
        }
        vm.$store.dispatch('getDanhMuc', filter).then(function (result) {
          if (result.hasOwnProperty('content')) {
            vm.statusList = result.content
          } else {
            vm.statusList = []
          }
        }).catch(function () {
        })
      },
      getLoaiGiayTo () {
        let vm = this
        let filter = {
          page: 0,
          size: 100,
          tenDanhMuc: 'loaivanbandientu'
        }
        vm.$store.dispatch('getDanhMuc', filter).then(function (result) {
          if (result.hasOwnProperty('content')) {
            vm.loaiVanBanList = result.content
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
        vm.resetTimKiem()
        vm.searchGiayToSoHoa()
      },
      uploadFile () {
        document.getElementById('documentFile').value = ''
        document.getElementById('documentFile').click()
      },
      searchGiayToSoHoa (data) {
        let vm = this
        let dataSearch = Object.assign(data ? data : {}, {keyword: vm.keywordSearch })
        console.log('dataInputSearch', dataSearch)
        vm.dataInputSearch = dataSearch
        vm.documentPage = 0
        vm.totalDocument = 0
        vm.getDanhSachGiayToSoHoa(dataSearch)
      },
      searchKeyword () {
        let vm = this
        let dataFormSearch = {}
        if (vm.$refs.timkiem) {
          dataFormSearch = vm.$refs.timkiem.getDataOutPut()
        }
        let dataSearch = Object.assign(dataFormSearch, {keyword: vm.keywordSearch})
        console.log('dataInputSearch', dataSearch)
        vm.dataInputSearch = dataSearch
        vm.documentPage = 0
        vm.totalDocument = 0
        vm.getDanhSachGiayToSoHoa(dataSearch)
      },
      cancelSearchGiayToSoHoa () {
        let vm = this
        vm.showAdvanceSearch = false
      },
      changePage (config) {
        let vm = this
        vm.documentPage = config.page -1
        vm.getDanhSachGiayToSoHoa(vm.dataInputSearch)
      },
      getDanhSachGiayToSoHoa (dataSearch) {
        let vm = this
        let share = ''
        switch (vm.menuActive) {
          case 0:
          share = '0,1'
            break;
          case 1:
          share = '0'
            break;
          case 2:
          share = '1'
            break;
          case 3:
          share = '2'
            break;
          case 4:
          share = '3'
            break;
          default:
            share = ''
            break;
        }
        let filter = {
          page: vm.documentPage,
          size: vm.numberPerPage,
          keyword: dataSearch ? dataSearch.keyword : '',
          coQuanBanHanh_MaDinhDanh: dataSearch ? dataSearch.govAgencyCode : '',
          mauGiayTo_MaMuc: dataSearch ? dataSearch.fileTemplateNo : '',
          ngayBanHanh_TuNgay: dataSearch ? dataSearch.fromReceiveDateFormatted : '',
          ngayBanHanh_DenNgay: dataSearch ? dataSearch.toReceiveDateFormatted : '',
          hieuLucGiayTo_MaMuc: dataSearch ? dataSearch.status : '',
          orderFields: 'ThoiGianTao',
          orderType: 'desc',
          cccd: vm.applicantIdNo,
          receiveDvcqg: dataSearch && dataSearch.hasOwnProperty('receiveDvcqg') ? dataSearch.receiveDvcqg : false,
          collection: 'giaytocanhantochuc'
        }
        if (vm.menuActive === 4) {
          filter['trangThaiDuLieu_MaMuc'] = '04'
        } else {
          filter['trangThaiChiaSe'] = share
        }

        vm.loadingTable = true
        vm.$store.dispatch('getGiayToKhoCaNhan', filter).then(function (result) {
        // vm.$store.dispatch('getGiayToKhoCaNhan_HeThongKhoGT', filter).then(function (result) {
          vm.documentApplicantList = result.content
          vm.totalDocument = result['totalElements']
          vm.loadingTable = false
        }).catch(function () {
          vm.loadingTable = false
          vm.documentApplicantList = []
          vm.totalDocument = 0
        })
      },
      resetTimKiem () {
        let vm = this
        vm.keywordSearch = ''
        if (vm.$refs.timkiem) {
          vm.$refs.timkiem.resetForm()
        }
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
        if (vm.loadingPdf) {
          return
        }
        vm.srcDownload = ''
        let filter = {
          id: item.MaDinhDanh,
          collection: 'giaytoluutruso'
        }
        vm.loadingPdf = true
        vm.$store.dispatch('getTepDuLieu', filter).then(function (result) {
          vm.loadingPdf = false
          vm.srcDownload = result
          setTimeout(function () {
            document.getElementById('downloadFile').click()
          }, 100)
        }).catch(function () {
          vm.loadingPdf = false
        })
      },
      viewDocument (item) {
        let vm = this
        if (vm.loadingPdf) {
          return
        }
        vm.srcDownload = ''
        let filter = {
          id: item.MaDinhDanh,
          collection: 'giaytoluutruso'
        }
        vm.loadingPdf = true
        vm.$store.dispatch('getTepDuLieu', filter).then(function (result) {
          vm.loadingPdf = false
          let fileType = item.Ext.toLowerCase()
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
          vm.loadingPdf = false
        })
      },
      deleteTepDinhKem (tep, index) {
        let vm = this
        vm.tepDinhKem.splice(index, 1)
      },
      deleteTepUpload (tep, index) {
        let vm = this
        vm.tepUpload.splice(index, 1)
      },
      showEditDocument (item) {
        let vm = this
        vm.documentSelect = item
        vm.typeCreate = 'update'
        vm.fileTemplateNoCreate = item.MaMauGiayTo
        vm.statusCreate = item.HieuLucVanBan
        vm.fileName = item.TenGiayTo
        vm.fileNo = item.SoHieuVanBan
        vm.govAgencyCreate = item.CoQuanBanHanh
        vm.loaiVanBanCreate = item.LoaiVanBanDienTu
        vm.cmndNguoiThuHuong = item.ChuHoSo['MaDinhDanh'] && item.ChuHoSo['MaDinhDanh'].split(':')[1] ? item.ChuHoSo['MaDinhDanh'].split(':')[1] : item.ChuHoSo['MaDinhDanh']
        vm.tenNguoiThuHuong = item.ChuHoSo['TenGoi']
        vm.tepDinhKem = item.TepDuLieu
        vm.trangThaiChiaSeCreate = item.TrangThaiChiaSe
        vm.createDate = vm.convertDate(item.NgayBanHanh)
        vm.expireDate = vm.convertDate(item.ThoiHanHieuLuc)
        vm.tepUpload = []
        // if (item.ChuHoSo['MaDinhDanh'] && item.ChuHoSo['MaDinhDanh'].split(':')[0] === 'DONVIKINHDOANH') {
        //   vm.loaiDoiTuongThuHuong = 'DONVIKINHDOANH'
        // } else {
        //   vm.loaiDoiTuongThuHuong = 'CANHAN'
        // }
        let exitsTemplate = vm.fileTemplateList.find(function (val) {
          return val.MaMuc === item.MaMauGiayTo['MaMuc']
        })
        if (!exitsTemplate) {
          vm.fileTemplateList.unshift(item.MaMauGiayTo)
        }
        let exitsCoQuan = vm.donViList.find(function (val) {
          return val.MaDinhDanh === item.CoQuanBanHanh['MaDinhDanh']
        })
        if (!exitsCoQuan) {
          vm.donViList.unshift(item.CoQuanBanHanh)
        }
        
        vm.showDetail = true
      },
      cloneMyStorage (item) {
        let vm = this
        // let filter = {
        //   "MaDinhDanh": item.MaDinhDanh,
        //   "CCCDMST": vm.applicantIdNo,
        //   "collection": 'giaytocanhantochuc'
        // }
        // vm.loadingAction = true
        // vm.$store.dispatch('cloneMyStorage', filter).then(function (result) {
        //   vm.loadingAction = false
        //   toastr.success('Yêu cầu thực hiện thành công')
        // }).catch(function () {
        //   vm.loadingAction = false
        //   toastr.error('Yêu cầu thực hiện thất bại. Vui lòng thử lại.')
        // })

        let filter = {
          primKey: vm.documentSelect.primKey,
          data: Object.assign(vm.documentSelect, {TrangThaiChiaSe: 0}),
          collection: 'giaytocanhantochuc'
        }
        // vm.$store.dispatch('updateGiayToLuTru_HeThongKhoGT', filter).then(function (result) {
        vm.$store.dispatch('updateGiayToLuTru', filter).then(function (result) {
          vm.loadingAction = false
          toastr.success('Lấy giấy tờ thành công.')
          vm.showDetail = false
          setTimeout(function () {
            vm.getDanhSachGiayToSoHoa()
          }, 200)
        }).catch(function () {
          vm.loadingAction = false
          toastr.error('Lấy giấy tờ thất bại. Vui lòng thử lại.')
        })
      },
      deleteDocument (item) {
        let vm = this
        let x = confirm('Bạn có chắc chắn xóa giấy tờ này?')
        if (x) {
          let filter = {
            primKey: item.primKey,
            data: Object.assign(item, {TrangThaiDuLieu: {
              "MaMuc": "04","TenMuc":"Hủy bỏ"
            }}),
            collection: 'giaytocanhantochuc'
          }
          // vm.$store.dispatch('updateGiayToLuTru_HeThongKhoGT', filter).then(function (result) {
          vm.$store.dispatch('updateGiayToLuTru', filter).then(function (result) {
            toastr.clear()
            toastr.success('Yêu cầu thực hiện thành công')
            vm.getDanhSachGiayToSoHoa(vm.dataInputSearch)
          }).catch(function () {
            toastr.clear()
            toastr.error('Yêu cầu thực hiện thất bại')
          })
        }
      },
      restoreDocument () {
        let vm = this
        vm.loadingAction = true
        let filter = {
          primKey: item.primKey,
          data: Object.assign(item, {TrangThaiDuLieu: {
            "MaMuc": "02","TenMuc":"Chính thức"
          }}),
          collection: 'giaytocanhantochuc'
        }
        vm.$store.dispatch('updateGiayToLuTru', filter).then(function (result) {
          vm.loadingAction = false
          toastr.clear()
          toastr.success('Yêu cầu thực hiện thành công')
          vm.getDanhSachGiayToSoHoa(vm.dataInputSearch)
        }).catch(function () {
          vm.loadingAction = false
          toastr.clear()
          toastr.error('Yêu cầu thực hiện thất bại')
        })
      },
      handleDragFiles (files) {
        let vm = this
        console.log('filessss', files)
        let arrTep = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          let ext = file['name'].split(".")
          arrTep.push(
            {
              File: file,
              Ext: ext[ext.length - 1],
              KichThuocTep: file['size'],
              TenTep: file['name'],
              FileInput: true
            }
          )
        }
        vm.tepUpload = arrTep
      },
      uploadDocumentFile (e) {
        let vm = this
        let files = $('#documentFile')[0].files
        let arrTep = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          let ext = file['name'].split(".")
          arrTep.push(
            {
              File: file,
              Ext: ext[ext.length - 1],
              KichThuocTep: file['size'],
              TenTep: file['name'],
              FileInput: true
            }
          )
        }
        vm.tepUpload = arrTep
      },
      showCreatedocument () {
        let vm = this
        vm.tenNguoiThuHuong = vm.applicantName
        vm.cmndNguoiThuHuong = vm.applicantIdNo
        vm.fileTemplateNoCreate = ''
        vm.createDate = ''
        vm.expireDate = ''
        vm.statusCreate = ''
        vm.govAgencyCreate = ''
        vm.loaiVanBanCreate = ''
        vm.tepDinhKem = []
        vm.tepUpload = []
        vm.showDetail = true
        vm.typeCreate = 'create'
        vm.pathNameFileESign = ''
        vm.fileNameView = ''
        vm.fileName = ''
        vm.fileNo = ''
        vm.trangThaiChiaSeCreate = 0
        // vm.loaiDoiTuongThuHuong = vm.applicantType === 'citizen' ? 'CANHAN' : 'DONVIKINHDOANH'
      },
      createDocument () {
        let vm = this
        if (vm.$refs.form.validate()) {
          if (vm.tepUpload.length) {
            vm.loadingAction = true
            
            let arrReq = []
            vm.tepUpload.forEach(element => {
              let filter = {
                file: element['File'],
                collection: 'giaytocanhantochuc'
              }
              arrReq.push(vm.$store.dispatch('uploadTep', filter))
            });
            Promise.all(arrReq).then(values => {
              let tepMapping = values
              console.log('tepMapping', tepMapping)
              let dataCreate = {
                "TenGiayTo": vm.fileName,
                "SoHieuVanBan": vm.fileNo,
                "NgayBanHanh": vm.convertDateIso(vm.createDate),
                "ThoiHanHieuLuc": vm.convertDateIso(vm.expireDate),
                "CoQuanBanHanh": {
                  "MaDinhDanh": vm.govAgencyCreate ? vm.govAgencyCreate['MaDinhDanh'] : '',
                  "TenGoi": vm.govAgencyCreate ? vm.govAgencyCreate['TenGoi'] : ''
                },
                "HieuLucVanBan": {
                  "MaMuc": vm.statusCreate ? vm.statusCreate['MaMuc'] : '',
                  "TenMuc": vm.statusCreate ? vm.statusCreate['TenMuc'] : ''
                },
                "MaMauGiayTo": {
                  "MaMuc": vm.fileTemplateNoCreate ? vm.fileTemplateNoCreate['MaMuc'] : '',
                  "TenMuc": vm.fileTemplateNoCreate ? vm.fileTemplateNoCreate['TenMuc'] : ''
                },
                "ChuHoSo": {
                  "MaDinhDanh": vm.cmndNguoiThuHuong,
                  "TenGoi": vm.tenNguoiThuHuong
                },
                "LoaiVanBanDienTu": {
                  "MaMuc": vm.loaiVanBanCreate['MaMuc'],
                  "TenMuc": vm.loaiVanBanCreate['TenMuc']
                },
                "ChuKhoLuuTru": {
                  "MaDinhDanh": vm.applicantIdNo,
                  "TenGoi": vm.applicantName
                },
                "TrangThaiChiaSe": vm.trangThaiChiaSeCreate,
                "TepDuLieu": tepMapping,
                "MaDinhDanh": "",
                "HoSoDichVuCong": {
                  "MaDinhDanh": ""
                },
                "SoLanTaiSuDung": 0,
                "TenLoaiVanBan": {
                  "MaMuc": "",
                  "TenMuc": ""
                },
                "TrichYeuVanBan": "",
                "HoSoLuuTruSo": {
                  "MaDinhDanh": ""
                },
                "SoThuTu": 0,
                "ThuMucLuuTru": {
                  "MaDinhDanh": "",
                  "TenThuMuc": ""
                },
                "TrangThaiDuLieu": {
                  "MaMuc": "02",
                  "TenMuc": "Chính thức"
                },
                "PhanVungDuLieu": {
                  "MaMuc": "",
                  "TenMuc": ""
                }
              }
              let filter = {
                data: dataCreate,
                collection: 'giaytocanhantochuc'
              }
              // vm.$store.dispatch('addGiayToLuTru_HeThongKhoGT', filter).then(function (result) {
              vm.$store.dispatch('addGiayToLuTru', filter).then(function (result) {
                vm.loadingAction = false
                toastr.success('Thêm mới giấy tờ thành công')
                vm.showDetail = false
                setTimeout(function () {
                  vm.getDanhSachGiayToSoHoa()
                }, 200)
              }).catch(function () {
                vm.loadingAction = false
                toastr.error('Thêm mới thất bại. Vui lòng thử lại.')
              })
            }).catch(function () {
              vm.loadingAction = false
            })
          } else {
            toastr.clear()
            toastr.error('Vui lòng đính kèm tài liệu')
          }
        }
      },
      updateDocument () {
        let vm = this
        if (vm.$refs.form.validate()) {
          if (vm.tepDinhKem.length || vm.tepUpload.length) {
            vm.loadingAction = true
            let arrReq = []
            vm.tepUpload.forEach(element => {
              let filter = {
                file: element['File'],
                tepdulieu: {
                  "TenTep": element['TenTep'],
                  "LoaiNguonDuLieu":{"MaMuc":"","TenMuc":""}
                },
                collection: 'giaytocanhantochuc'
              }
              arrReq.push(vm.$store.dispatch('uploadTep', filter))
            });
            Promise.all(arrReq).then(values => {
              let tepMapping = vm.tepDinhKem.concat(values)
              let dataCreate = {
                "TenGiayTo": vm.fileName,
                "SoHieuVanBan": vm.fileNo,
                "NgayBanHanh": vm.convertDateIso(vm.createDate),
                "ThoiHanHieuLuc": vm.convertDateIso(vm.expireDate),
                "CoQuanBanHanh": {
                  "MaDinhDanh": vm.govAgencyCreate['MaDinhDanh'],
                  "TenGoi": vm.govAgencyCreate['TenGoi']
                },
                "HieuLucVanBan": {
                  "MaMuc": vm.statusCreate['MaMuc'],
                  "TenMuc": vm.statusCreate['TenMuc']
                },
                "MaMauGiayTo": {
                  "MaMuc": vm.fileTemplateNoCreate['MaMuc'],
                  "TenMuc": vm.fileTemplateNoCreate['TenMuc']
                },
                "ChuHoSo": {
                  // "MaDinhDanh": vm.loaiDoiTuongThuHuong + ':' + vm.cmndNguoiThuHuong,
                  "MaDinhDanh": vm.cmndNguoiThuHuong,
                  "TenGoi": vm.tenNguoiThuHuong
                },
                "LoaiVanBanDienTu": {
                  "MaMuc": vm.loaiVanBanCreate['MaMuc'],
                  "TenMuc": vm.loaiVanBanCreate['TenMuc']
                },
                "ChuKhoLuuTru": {
                  // "MaDinhDanh": vm.applicantType === 'citizen' ?  'CaNhan:'+vm.applicantIdNo : 'DonViKinhDoanh:'+vm.applicantIdNo,
                  "MaDinhDanh": vm.applicantIdNo,
                  "TenGoi": vm.applicantName
                },
                "TepDuLieu": tepMapping,
                "TrangThaiChiaSe": vm.trangThaiChiaSeCreate
              }
              let filter = {
                primKey: vm.documentSelect.primKey,
                data: Object.assign(vm.documentSelect, dataCreate),
                collection: 'giaytocanhantochuc'
              }
              // vm.$store.dispatch('updateGiayToLuTru_HeThongKhoGT', filter).then(function (result) {
              vm.$store.dispatch('updateGiayToLuTru', filter).then(function (result) {
                vm.loadingAction = false
                toastr.success('Cập nhật giấy tờ thành công')
                vm.showDetail = false
                setTimeout(function () {
                  vm.getDanhSachGiayToSoHoa()
                }, 200)
              }).catch(function () {
                vm.loadingAction = false
                toastr.error('Cập nhật giấy tờ thất bại. Vui lòng thử lại.')
              })
            }).catch(function () {
            })
          } else {
            toastr.clear()
            toastr.error('Vui lòng đính kèm tệp')
          }
        }
      },
      vgca_sign_approved() {
        let vm = this
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
      translateDate (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
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
      convertDate (date) {
        if (!date) {
          return ''
        }
        let date1 = new Date(date)
        return `${date1.getDate().toString().padStart(2, '0')}/${(date1.getMonth() + 1).toString().padStart(2, '0')}/${date1.getFullYear()}`
      },
      convertDateIso (dateString) {
        if (!dateString) {
          return ''
        }
        let parts = dateString.split('/')
        let day = parts[0]
        let month = parts[1]
        let year = parts[2]
        let date = new Date(`${year}-${month}-${day}`)
        let isoDate = date.toISOString()
        return isoDate
      },
      convertMaDinhDanh (mdd) {
        if (!mdd) {
          return ""
        }
        let cccd = mdd.split(":")[1]
        return cccd
      },
      getDocumentTypeIcon (type) {
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

      // -----
      visibilityChanged(e) {
        e && this.loadMoreItems();
      },
      visibilityChangedDonVi (e) {
        e && this.loadMoreItemsDonVi();
      },
      searchItems() {
        this.fileTemplateList = [];
        this.pageSelectBox = 0;
        this.loadMoreItems();
      },
      searchItemsDonVi() {
        this.donViList = [];
        this.pageSelectDonVi = 0;
        this.loadMoreItemsDonVi();
      },
      loadMoreItems() {
        let vm = this
        if (vm.fileTemplateList.length < vm.totalItemsSelectBox || vm.pageSelectBox == 0) {
          // vm.loading = true;
          vm.isShow = false
          let filter1 = {
            page: vm.pageSelectBox,
            size: 10,
            tenDanhMuc: 'mathanhphanhoso',
            keyword: vm.keywordSearchSelect ? vm.keywordSearchSelect : ''
          }
          let filter2 = {
            page: vm.pageSelectBox,
            size: 10,
            tenDanhMuc: 'magiaytoketqua',
            keyword: vm.keywordSearchSelect ? vm.keywordSearchSelect : ''
          }
          let req1 = vm.$store.dispatch('getDanhMuc', filter1)
          let req2 = vm.$store.dispatch('getDanhMuc', filter2)
          let arrAction = [req1, req2]
          Promise.all(arrAction).then(results => {
            let res = results[0]['content'].concat(results[1]['content'])
            vm.fileTemplateList = vm.fileTemplateList.concat(res);
            vm.isShow = true
            vm.pageSelectBox++;
            vm.totalItemsSelectBox = results[0]['totalElements'] + results[1]['totalElements']
            vm.loading = false
            if (vm.$refs.autocomplete) {
              vm.$refs.autocomplete.onScroll()
            }
          }).catch(xhr => {
            vm.loading = false
          })
        }
      },
      loadMoreItemsDonVi() {
        let vm = this
        if (vm.donViList.length < vm.totalItemsSelectDonVi || vm.pageSelectDonVi == 0) {
          // vm.loadingDonVi = true;
          vm.isShowDonVi = false
          let filter = {
            page: vm.pageSelectDonVi,
            size: 20,
            keyword: vm.keywordSearchDonVi ? vm.keywordSearchDonVi : ''
          }
          vm.$store.dispatch('getDonVi', filter).then(results => {
            let res = results['content']
            vm.donViList = vm.donViList.concat(res);
            vm.isShowDonVi = true
            vm.pageSelectDonVi++
            vm.totalItemsSelectDonVi = results['totalElements']
            vm.loadingDonVi = false
            if (vm.$refs.autocomplete1) {
              vm.$refs.autocomplete1.onScroll()
            }
          }).catch(xhr => {
            vm.loadingDonVi = false
          })
        }
      }
      // ------
    }
  }
</script>

