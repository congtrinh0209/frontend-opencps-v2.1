<template>
  <div
    style="
      padding: 0px 0px;
      max-width: 1500px;
      margin: 0px auto;
      border-radius: 12px;
    "
    class="pb-3"
    id="top-header"
  >
    <v-layout wrap>
      <v-flex class="pl-2" style="width: 300px">
        <v-list>
          <v-btn
            color="#0072bc"
            small
            class="mx-0 my-0 white--text"
            @click.stop="showCreatedocument"
            style="height: 36px; width: 100%"
          >
            <v-icon size="24"> post_add </v-icon> &nbsp;
            <span style="line-height: 36px; font-size: 14px"
              >THÊM MỚI GIẤY TỜ</span
            >
          </v-btn>
          <v-list-tile
            avatar
            @click="changeMenu(0)"
            class="px-2 py-2"
            style="height: auto; border-bottom: 1px solid #dedede"
          >
            <v-list-tile-avatar>
              <v-icon
                :class="
                  menuActive == 0
                    ? 'blue white--text'
                    : 'grey lighten-1 white--text'
                "
                size="22"
                >folder_shared</v-icon
              >
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title
                :style="
                  menuActive == 0
                    ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;'
                    : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'
                "
              >
                Giấy tờ của tôi
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            avatar
            @click="changeMenu(1)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede"
          >
            <v-list-tile-avatar>
              <v-icon
                :class="
                  menuActive == 1
                    ? 'blue white--text'
                    : 'grey lighten-1 white--text'
                "
                size="22"
              >
                lock
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title
                :style="
                  menuActive == 1
                    ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;'
                    : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'
                "
              >
                Giấy tờ không chia sẻ
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            avatar
            @click="changeMenu(2)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede"
          >
            <v-list-tile-avatar>
              <v-icon
                :class="
                  menuActive == 2
                    ? 'blue white--text'
                    : 'grey lighten-1 white--text'
                "
                size="22"
              >
                fas fa fa-share-square-o
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title
                :style="
                  menuActive == 2
                    ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;'
                    : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'
                "
              >
                Giấy tờ chia sẻ
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            avatar
            @click="changeMenu(3)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede"
          >
            <v-list-tile-avatar>
              <v-icon
                :class="
                  menuActive == 3
                    ? 'blue white--text'
                    : 'grey lighten-1 white--text'
                "
                size="22"
                >share</v-icon
              >
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title
                :style="
                  menuActive == 3
                    ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;'
                    : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'
                "
              >
                Giấy tờ được chia sẻ
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            avatar
            @click="changeMenu(4)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede"
          >
            <v-list-tile-avatar>
              <v-icon
                :class="
                  menuActive == 4
                    ? 'blue white--text'
                    : 'grey lighten-1 white--text'
                "
                size="22"
                >delete</v-icon
              >
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title
                :style="
                  menuActive == 4
                    ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;'
                    : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'
                "
              >
                Giấy tờ đã xóa
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            avatar
            @click="changeMenu(5)"
            class="px-2 py-2"
            style="height: auto !important; border-bottom: 1px solid #dedede"
          >
            <v-list-tile-avatar>
              <v-icon
                :class="
                  menuActive == 5
                    ? 'blue white--text'
                    : 'grey lighten-1 white--text'
                "
                size="22"
                >list_alt</v-icon
              >
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title
                :style="
                  menuActive == 5
                    ? 'text-transform: uppercase; font-size: 14px;padding-left: 15px;color: #0072bc;font-weight: 500;'
                    : 'text-transform: uppercase; font-size: 14px;padding-left: 15px;'
                "
              >
                Thông tin kho
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>

      <v-flex class="px-2" style="width: calc(100% - 300px)">
        <v-card
          v-if="!showDetail && menuActive !== 5"
          class="px-3 py-3"
          style="width: 100%; background: #ffffff"
        >
          <v-layout wrap>
            <v-flex style="max-width: fit-content">
              <div
                class="headline mb-3 pr-2"
                style="
                  font-size: 20px !important;
                  text-transform: uppercase;
                  color: #0072bc;
                "
              >
                <span v-if="menuActive == 0">Giấy tờ của tôi</span>
                <span v-else-if="menuActive == 1">Giấy tờ không chia sẻ</span>
                <span v-else-if="menuActive == 2">Giấy tờ chia sẻ</span>
                <span v-else-if="menuActive == 3">Giấy tờ được chia sẻ</span>
                <span v-else>Giấy tờ đã xóa</span>
              </div>
            </v-flex>

            <v-flex style="padding-left: 10px">
              <v-text-field
                solo
                v-model="keywordSearch"
                label="Nhập từ khóa tìm kiếm..."
                append-icon="search"
                @keyup.enter="searchKeyword"
                @click:append="searchKeyword"
              ></v-text-field>
            </v-flex>
            <v-flex
              style="
                text-align: right;
                padding-top: 2px;
                padding-left: 10px;
                max-width: fit-content;
              "
            >
              <v-btn
                color="#0072bc"
                small
                class="mx-0 white--text my-0"
                @click.stop="showTimKiem"
                style=""
              >
                <v-icon size="20"> filter_list </v-icon> &nbsp; Tìm kiếm nâng
                cao
              </v-btn>
            </v-flex>
            <v-flex
              style="
                text-align: right;
                padding-top: 2px;
                padding-left: 10px;
                max-width: fit-content;
              "
              v-if="menuActive !== 1 && menuActive !== 2"
            >
              <v-btn
                color="#0072bc"
                small
                class="mx-0 white--text my-0"
                @click="dialog = true"
                :disabled="selected.length > 1 ? false : true"
              >
                <v-icon size="20">{{ showIconComputed }} </v-icon>
                &nbsp;
                {{ showTextComputed }}
              </v-btn>
            </v-flex>
          </v-layout>
          <v-card-text class="px-0 pb-0" v-if="showAdvanceSearch">
            <tim-kiem
              ref="timkiem"
              :menuActive="menuActive"
              :inputSearch="inputSearch"
              v-on:trigger-search="searchGiayToSoHoa"
              v-on:trigger-cancel="cancelSearchGiayToSoHoa"
            ></tim-kiem>
          </v-card-text>
          <v-data-table
            hide-actions
            :headers="
              menuActive !== 1 && menuActive !== 2
                ? documentListHeaderSelectedOption
                : documentListHeader
            "
            :items="documentApplicantList"
            class="table-landing table-bordered mt-2"
            style="border-left: 1px solid #dedede"
          >
            <v-progress-linear
              v-if="loadingTable"
              slot="progress"
              color="blue"
              indeterminate
            ></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr
                v-bind:class="{ active: props.index % 2 == 1 }"
                style="cursor: pointer"
                @click="viewThongTinGiayTo(props.item)"
              >
                <td
                  @click.stop=""
                  v-if="menuActive !== 1 && menuActive !== 2"
                  class="text-xs-center py-2"
                >
                  <div class="checkbox-wrapper-29">
                    <label class="checkbox">
                      <input
                        v-model="selected"
                        :key="props.item.primKey"
                        :value="props.item"
                        type="checkbox"
                        class="checkbox__input"
                        @change="handleChangeCheckbox"
                      />
                      <span class="checkbox__label"></span>
                    </label>
                  </div>
                </td>
                <td
                  class="text-xs-center py-2"
                  style="width: 50px; height: 36px"
                >
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{
                      (documentPage + 1) * numberPerPage -
                      numberPerPage +
                      props.index +
                      1
                    }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height: 36px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{ props.item.TenGiayTo }}</span>
                  </div>
                </td>
                <td
                  class="text-xs-left py-2"
                  style="height: 36px; min-width: 120px"
                >
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{ props.item.SoHieuVanBan }}</span>
                  </div>
                </td>
                <td
                  class="text-xs-left py-2"
                  style="height: 36px; min-width: 150px"
                >
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <div class="mb-1">
                      <b>{{ props.item.ChuHoSo["TenGoi"] }}</b>
                    </div>
                    <span>{{ props.item.ChuHoSo["MaDinhDanh"] }}</span>
                  </div>
                </td>
                <td
                  class="text-xs-center py-2"
                  style="height: 36px; min-width: 120px"
                >
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{ convertDate(props.item.NgayBanHanh) }}</span>
                  </div>
                </td>

                <td
                  class="text-xs-center py-2"
                  style="height: 36px; min-width: 100px"
                >
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>
                      {{ props.item.HieuLucVanBan["TenMuc"] }}
                    </span>
                  </div>
                </td>
                <td
                  class="text-center py-2"
                  style="height: 36px; min-width: 100px"
                >
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-tooltip
                    top
                    v-if="!loadingTable && menuActive == 3"
                    class="mr-2"
                  >
                    <v-btn
                      :disabled="loadingAction"
                      @click.stop="cloneMyStorage(props.item)"
                      color="#0072bc"
                      slot="activator"
                      flat
                      icon
                      class="mx-0 my-0"
                    >
                      <v-icon size="22">sync_alt</v-icon>
                    </v-btn>
                    <span>Lấy về kho của tôi</span>
                  </v-tooltip>
                  <v-tooltip
                    top
                    v-if="!loadingTable && menuActive == 1"
                    class="mr-2"
                  >
                    <v-btn
                      @click.stop="showEditDocument(props.item)"
                      color="#0072bc"
                      slot="activator"
                      flat
                      icon
                      class="mx-0 my-0"
                    >
                      <v-icon size="22">edit</v-icon>
                    </v-btn>
                    <span>Cập nhật giấy tờ</span>
                  </v-tooltip>
                  <v-tooltip
                    top
                    v-if="
                      (!loadingTable && menuActive == 1) ||
                      (!loadingTable && menuActive === 0)
                    "
                    class=""
                  >
                    <v-btn
                      @click.stop="deleteDocument(props.item)"
                      color="red"
                      slot="activator"
                      flat
                      icon
                      class="mx-0 my-0"
                    >
                      <v-icon size="22">delete</v-icon>
                    </v-btn>
                    <span>Xóa</span>
                  </v-tooltip>
                  <v-tooltip
                    top
                    v-if="!loadingTable && menuActive == 4"
                    class=""
                  >
                    <v-btn
                      :disabled="loadingAction"
                      @click.stop="restoreDocument(props.item)"
                      color="#0072bc"
                      slot="activator"
                      flat
                      icon
                      class="mx-0 my-0"
                    >
                      <v-icon size="22">restore_page</v-icon>
                    </v-btn>
                    <span>Khôi phục</span>
                  </v-tooltip>
                  <v-tooltip
                    top
                    v-if="!loadingTable && menuActive == 2"
                    class=""
                  >
                    <v-btn
                      @click.stop="cancelShareDocument"
                      :disabled="loadingAction"
                      color="red"
                      slot="activator"
                      flat
                      icon
                      class="mx-0 my-0"
                    >
                      <v-icon size="22">cancel</v-icon>
                    </v-btn>
                    <span>Ngừng chia sẻ</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
            <template slot="no-data">
              <div class="text-xs-center mt-2">Không có giấy tờ</div>
            </template>
          </v-data-table>

          <div class="my-2" v-if="totalDocument > numberPerPage">
            <div class="text-xs-right layout wrap" style="position: relative">
              <div class="flex pagging-table">
                <pagination
                  :total="totalDocument"
                  :page="documentPage + 1"
                  :numberPerPage="numberPerPage"
                  nameRecord="giấy tờ"
                  custom-class="custom-tiny-class"
                  @tiny:change-page="changePage"
                ></pagination>
              </div>
            </div>
          </div>
        </v-card>
        <v-card
          v-if="showDetail"
          class="px-3 py-3"
          style="width: 100%; background: #ffffff"
        >
          <div class="headline mb-0" style="font-size: 20px !important">
            <span
              v-if="typeCreate === 'create'"
              style="
                text-transform: uppercase;
                font-size: 20px;
                color: #0072bc;
                font-weight: 500;
              "
              >THÊM MỚI GIẤY TỜ</span
            >
            <span
              v-if="typeCreate === 'update'"
              style="
                text-transform: uppercase;
                font-size: 20px;
                color: #0072bc;
                font-weight: 500;
              "
              >CẬP NHẬT GIẤY TỜ</span
            >
            <span
              v-if="typeCreate === 'view'"
              style="
                text-transform: uppercase;
                font-size: 20px;
                color: #0072bc;
                font-weight: 500;
              "
              >THÔNG TIN GIẤY TỜ</span
            >

            <v-btn
              flat
              icon
              :disabled="loadingAction"
              @click.native="handleCancelModalCreate"
              style="position: absolute; right: 10px; top: 10px"
            >
              <v-icon size="28" color="#0072bc">reply</v-icon>
            </v-btn>
          </div>
          <v-card-text
            v-if="typeCreate == 'view'"
            style="font-size: 14px"
            class="py-2 px-0"
          >
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Tên giấy tờ:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">
                {{ documentSelect.TenGiayTo }}</v-flex
              >
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Số hiệu giấy tờ:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">
                {{ documentSelect.SoHieuVanBan }}</v-flex
              >
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Cơ quan ban hành:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">
                {{ documentSelect.CoQuanBanHanh["TenGoi"] }}</v-flex
              >
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Ngày ban hành:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">
                {{ convertDate(documentSelect.NgayBanHanh) }}</v-flex
              >
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Mẫu giấy tờ:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">
                {{ documentSelect.MaMauGiayTo["MaMuc"] }} -
                {{ documentSelect.MaMauGiayTo["TenMuc"] }}</v-flex
              >
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Mã hồ sơ:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">
                {{ documentSelect.HoSoDichVuCong["MaDinhDanh"] }}</v-flex
              >
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Người thụ hưởng:
              </v-flex>
              <v-flex class="pl-0 mr-2" style="width: calc(100% - 160px)">
                {{ documentSelect.ChuHoSo["TenGoi"] }}</v-flex
              >
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Số CCCD/CMND, MST:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">{{
                documentSelect.ChuHoSo["MaDinhDanh"]
              }}</v-flex>
            </v-flex>
            <v-flex
              class="xs12 md12 pb-2 layout wrap"
              style="
                padding: 10px 0;
                border-bottom: 1px dashed #dadada;
                align-items: center;
              "
            >
              <v-flex class="pr-2 text-bold" style="width: 150px"
                >Hiệu lực giấy tờ:
              </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px)">
                {{ documentSelect.HieuLucVanBan["TenMuc"] }}</v-flex
              >
            </v-flex>
            <div
              class="xs12 md12 py-2"
              v-if="
                documentSelect &&
                documentSelect.TepDuLieu &&
                documentSelect.TepDuLieu.length
              "
            >
              <span class="pr-2 text-bold">Tệp giấy tờ: </span>
              <div
                v-for="(itemFileView, indexFile) in documentSelect.TepDuLieu"
                :key="indexFile"
                class="my-2"
              >
                <span
                  v-on:click.stop="viewDocument(itemFileView)"
                  class="ml-1"
                  style="cursor: pointer; text-decoration: underline"
                >
                  <v-icon
                    class="mr-1"
                    :color="getDocumentTypeIcon(itemFileView.Ext)['color']"
                    :size="getDocumentTypeIcon(itemFileView.Ext)['size']"
                  >
                    {{ getDocumentTypeIcon(itemFileView.Ext)["icon"] }}
                  </v-icon>
                  <span>{{ itemFileView.TenTep }}.{{ itemFileView.Ext }}</span>
                </span>
                <v-btn
                  class="my-0"
                  title="Xem tệp"
                  flat
                  icon
                  color="indigo"
                  :loading="loadingPdf"
                  :disabled="loadingPdf"
                  @click.stop="viewDocument(itemFileView, index)"
                >
                  <v-icon size="22">visibility</v-icon>
                </v-btn>
                <v-btn
                  title="Tải xuống"
                  color="indigo"
                  flat
                  icon
                  v-on:click.stop="downloadDocument(itemFileView)"
                  :loading="loadingPdf"
                  :disabled="loadingPdf"
                  class="mx-0 my-0"
                >
                  <v-icon size="14" color="primary">fas fa fa-download</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="xs12 md12 pb-2">
              <v-btn
                class="mx-0"
                color="red"
                dark
                @click.native="showDetail = false"
              >
                <v-icon>reply</v-icon>&nbsp; Quay lại
              </v-btn>
            </div>
          </v-card-text>
          <v-card-text v-else class="py-1 px-0">
            <v-form
              id="form-crud"
              ref="form"
              v-model="valid"
              lazy-validation
              class="px-0 grid-list"
            >
              <v-layout row wrap class="px-0 py-3">
                <v-flex xs12 class="pr-0 pl-0 py-0">
                  <div class="mb-1 text-bold">
                    Mẫu giấy tờ <span style="color: red">(*)</span>
                  </div>
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
                    :rules="[(v) => !!v || 'Mẫu giấy tờ là bắt buộc']"
                    required
                  >
                    <template slot="selection" slot-scope="{ item }">
                      <b class="labelCodeItemSelect">{{ item.MaMuc }}</b
                      >&nbsp;-&nbsp;{{ item.TenMuc }}
                    </template>
                    <template slot="item" slot-scope="{ item }">
                      <b>{{ item.MaMuc }}</b
                      >&nbsp;-&nbsp;{{ item.TenMuc }}
                    </template>
                    <template v-slot:append-item>
                      <div
                        class="py-2"
                        v-if="isShow"
                        v-observe-visibility="{
                          callback: visibilityChanged,
                        }"
                      ></div>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 class="px-0 py-0">
                  <div class="mb-1 text-bold">
                    Tên giấy tờ <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    label=""
                    v-model="fileName"
                    solo
                    flat
                    clearable
                    :rules="[(v) => !!v || 'Tên giấy tờ là bắt buộc']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 class="px-0 pr-3 py-0">
                  <div class="mb-1 text-bold">
                    Số hiệu giấy tờ <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    label=""
                    v-model="fileNo"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[(v) => !!v || 'Số hiệu giấy tờ là bắt buộc']"
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
                  <div class="mb-1 text-bold">
                    Hiệu lực <span style="color: red">(*)</span>
                  </div>
                  <v-autocomplete
                    :items="statusList"
                    v-model="statusCreate"
                    label=""
                    item-text="TenMuc"
                    item-value="MaMuc"
                    solo
                    flat
                    :rules="[(v) => !!v || 'Hiệu lực giấy tờ là bắt buộc']"
                    required
                    return-object
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12 class="px-0 py-0">
                  <div class="mb-1 text-bold">
                    Cơ quan ban hành <span style="color: red">(*)</span>
                  </div>
                  <v-autocomplete
                    :items="donViList"
                    v-model="govAgencyCreate"
                    ref="autocomplete1"
                    :loading="loadingDonVi"
                    :search-input.sync="keywordSearchDonVi"
                    item-text="TenGoi"
                    item-value="MaDinhDanh"
                    return-object
                    :rules="[(v) => !!v || 'Cơ quan ban hành là bắt buộc']"
                    required
                    clearable
                    solo
                    flat
                  >
                    <template v-slot:append-item>
                      <div
                        class="py-2"
                        v-if="isShowDonVi"
                        v-observe-visibility="{
                          callback: visibilityChangedDonVi,
                        }"
                      ></div>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 md6 class="px-0 py-0 pr-3">
                  <div class="mb-1 text-bold">
                    Mã đối tượng thụ hưởng <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    label=""
                    v-model="cmndNguoiThuHuong"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[
                      (v) =>
                        !!v ||
                        'Số CMND/CCCD, mã số thuế đối tượng thụ hưởng là bắt buộc',
                    ]"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6 class="px-0 py-0">
                  <div class="mb-1 text-bold">
                    Tên đối tượng thụ hưởng <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    label=""
                    v-model="tenNguoiThuHuong"
                    solo
                    flat
                    height="32"
                    min-height="32"
                    clearable
                    :rules="[
                      (v) => !!v || 'Tên đối tượng thụ hưởng là bắt buộc',
                    ]"
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
                  <div class="mb-1 text-bold">
                    Loại giấy tờ <span style="color: red">(*)</span>
                  </div>
                  <v-autocomplete
                    :items="loaiVanBanList"
                    v-model="loaiVanBanCreate"
                    label=""
                    item-text="TenMuc"
                    item-value="MaMuc"
                    solo
                    flat
                    :rules="[(v) => !!v || 'Loại giấy tờ là bắt buộc']"
                    required
                    return-object
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 md6 class="px-0 py-0">
                  <div class="mb-1 text-bold">
                    Chia sẻ giấy tờ <span style="color: red">(*)</span>
                  </div>
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
                  <v-radio-group
                    class="my-0"
                    v-model="trangThaiChiaSeCreate"
                    row
                  >
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
                  <div class="mb-2 text-bold">
                    Tệp giấy tờ <span style="color: red">(*)</span>
                  </div>
                  <div
                    v-for="(itemFileView, indexFile) in tepDinhKem"
                    :key="indexFile"
                    class="my-2"
                  >
                    <span
                      v-on:click.stop="viewDocument(itemFileView)"
                      class="ml-1"
                      style="cursor: pointer; text-decoration: underline"
                    >
                      <v-icon
                        class="mr-1"
                        :color="getDocumentTypeIcon(itemFileView.Ext)['color']"
                        :size="getDocumentTypeIcon(itemFileView.Ext)['size']"
                      >
                        {{ getDocumentTypeIcon(itemFileView.Ext)["icon"] }}
                      </v-icon>
                      {{ itemFileView.TenTep }}.{{ itemFileView.Ext }}
                    </span>
                    <v-btn
                      class="my-0"
                      title="Xem tệp"
                      flat
                      icon
                      color="indigo"
                      :loading="loadingPdf"
                      :disabled="loadingPdf"
                      @click.stop="viewDocument(itemFileView, index)"
                    >
                      <v-icon size="22">visibility</v-icon>
                    </v-btn>
                    <v-btn
                      title="Tải xuống"
                      color="indigo"
                      flat
                      icon
                      v-on:click.stop="downloadDocument(itemFileView)"
                      :loading="loadingPdf"
                      :disabled="loadingPdf"
                      class="mx-0 my-0"
                    >
                      <v-icon size="16" color="primary"
                        >fas fa fa-download</v-icon
                      >
                    </v-btn>
                    <v-btn
                      title="Xóa"
                      color="red"
                      flat
                      icon
                      v-on:click.stop="
                        deleteTepDinhKem(itemFileView, indexFile)
                      "
                      class="mx-0 my-0"
                    >
                      <v-icon size="20" color="red">delete</v-icon>
                    </v-btn>
                  </div>
                  <!-- <input type="file" id="documentFile" multiple @input="uploadDocumentFile($event)" style="display:none">
                  <v-btn block color="primary" class="mx-0 px-0 mr-4 d-inline-block" dark @click.native="uploadFile()" style="width: 175px">
                    <v-icon size="16">fas fa fa-upload</v-icon> &nbsp; &nbsp;
                    Tải lên tệp giấy tờ
                  </v-btn> -->
                  <div
                    class="upload-wrap"
                    style="
                      justify-content: center;
                      align-items: center;
                      height: 200px;
                      border: 2px dashed #959ca0;
                      border-radius: 10px;
                      padding: 15px;
                    "
                  >
                    <div
                      class="drop-zone"
                      @dragover.prevent
                      @dragenter="dragging = true"
                      @dragleave="dragging = false"
                      @drop="handleDrop"
                      @click.stop="uploadFile"
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                      "
                    >
                      <div>
                        <div
                          v-for="(itemFileView, indexFile) in tepUpload"
                          :key="indexFile"
                          class="my-2 px-2 py-1"
                          style="
                            display: flex;
                            border: 1px solid #d7d7d7;
                            width: 500px;
                            margin: 0 auto;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          <span
                            @click.stop="viewTepUpload(itemFileView)"
                            class="ml-1"
                            style="cursor: pointer; text-decoration: underline"
                          >
                            <v-icon
                              class="mr-2"
                              :color="
                                getDocumentTypeIcon(itemFileView.Ext)['color']
                              "
                              :size="16"
                            >
                              {{
                                getDocumentTypeIcon(itemFileView.Ext)["icon"]
                              }}
                            </v-icon>
                            <span style="font-size: 16px">{{
                              itemFileView.TenTep
                            }}</span>
                          </span>
                          <v-btn
                            title="Xóa"
                            color="red"
                            flat
                            icon
                            class="mx-0 my-0 ml-2"
                            v-on:click.stop="
                              deleteTepUpload(itemFileView, indexFile)
                            "
                          >
                            <v-icon size="20" color="red">close</v-icon>
                          </v-btn>

                          <v-btn
                            title="Ký số giấy tờ"
                            class="my-0 ml-2"
                            flat
                            icon
                            color="indigo"
                            v-if="
                              String(itemFileView.Ext).toLowerCase() ===
                                'pdf' && !itemFileView.Signed
                            "
                            @click.stop="showKySo(itemFileView, indexFile)"
                          >
                            <v-icon size="20">fa fa-pencil-square-o</v-icon>
                          </v-btn>
                          <v-btn
                            title="Giấy tờ đã được ký số"
                            class="my-0 ml-2"
                            flat
                            icon
                            color="green"
                            v-if="
                              String(itemFileView.Ext).toLowerCase() ===
                                'pdf' && itemFileView.Signed
                            "
                          >
                            <v-icon style="color: green !important" size="18"
                              >check_circle</v-icon
                            >
                          </v-btn>
                        </div>
                      </div>
                      <div>
                        <span v-if="dragging">Thả tệp vào đây</span>
                        <div v-else>
                          <div style="text-align: center; margin-bottom: 10px">
                            <v-icon size="48" color="#0072bc">
                              fas fa fa-cloud-upload
                            </v-icon>
                          </div>
                          <span style="font-size: 14px; color: #0072bc"
                            >Kéo và thả tệp vào đây hoặc nhấp để chọn tệp (dung
                            lượng tệp tối đa tải lên là :
                            {{ numberData }})</span
                          >
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref="fileInput"
                      style="display: none"
                      id="documentFile"
                      multiple
                      @input="uploadDocumentFile($event)"
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
              <v-btn
                class="mr-2 white--text"
                color="red"
                :disabled="loadingAction"
                @click.native="handleCancelModalCreate"
              >
                <v-icon>reply</v-icon> &nbsp; Quay lại
              </v-btn>
              <v-btn
                v-if="typeCreate === 'create'"
                :disabled="loadingAction"
                class="mr-0"
                color="primary"
                @click.native="createDocument"
              >
                <v-icon>save</v-icon> &nbsp;
                <span>Thêm mới</span>
              </v-btn>
              <v-btn
                v-else
                :disabled="loadingAction"
                class="mr-0"
                color="primary"
                @click.native="updateDocument"
              >
                <v-icon>save</v-icon> &nbsp;
                <span>Cập nhật</span>
              </v-btn>
            </v-flex>
          </v-card-text>
        </v-card>
        <v-card v-else-if="!showDetail && menuActive == 5">
          <div
            class="headline mb-3 px-2 pt-3"
            style="
              font-size: 20px !important;
              text-transform: uppercase;
              color: #0072bc;
            "
          >
            <span>Thông tin kho</span>
          </div>

          <div class="body-content px-2 d-flex">
            <div class="body-content-item" style="flex: 1">
              <div class="body-content-item__text d-flex">
                <p style="color: #333; font-size: 14px; flex: none !important">
                  - Dung lượng được cấp:
                </p>
                <p
                  class="ml-2"
                  style="color: #246; font-weight: 500; font-size: 14px"
                >
                  {{
                    dataCapacity ? dataCapacity.TongDungLuongToiDaChoPhep : ""
                  }}
                </p>
              </div>
              <div class="body-content-item__text d-flex align-center">
                <p style="color: #333; font-size: 14px; flex: none !important">
                  - Dung lượng đã sử dụng:
                </p>
                <p
                  style="color: #246; font-weight: 500; font-size: 14px"
                  class="ml-2"
                >
                  {{ showCapacity }}
                </p>
              </div>
              <div class="body-content-item__text d-flex align-center">
                <p style="color: #333; font-size: 14px; flex: none !important">
                  - Dung lượng tối đa của tệp tải lên:
                </p>
                <p
                  style="color: #246; font-weight: 500; font-size: 14px"
                  class="ml-2"
                >
                  {{
                    dataCapacity ? dataCapacity.DungLuongToiDaFileTaiLen : ""
                  }}
                </p>
              </div>
            </div>

            <div class="body-content-item" style="flex: 1">
              <h3>Phần trăm dung lượng đã sử dụng</h3>
              <div class="my-4" :style="genCss">
                <div
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 115px;
                    height: 115px;
                    background: #333;
                    border-radius: 50%;
                    font-size: 1.85em;
                    font-weight: 300;
                    color: rgba(255, 255, 255, 0.75);
                  "
                >
                  {{ percent >= 100 ? 100 : percent }}%
                </div>
              </div>
            </div>
          </div>
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
            <iframe
              id="dialogPDFPreview"
              src=""
              type="application/pdf"
              width="100%"
              height="100%"
              style="overflow: auto; min-height: 600px"
              frameborder="0"
            >
            </iframe>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogViewFileSign"
          max-width="1200"
          transition="fade-transition"
        >
          <v-card>
            <v-toolbar flat dark color="primary">
              <v-toolbar-title>Giấy tờ đính kèm</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="dialogViewFileSign = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <iframe
              id="dialogEsignPreview"
              :src="pathNameFileESign"
              type="application/pdf"
              width="100%"
              height="100%"
              style="overflow: auto; min-height: 600px"
              frameborder="0"
            >
            </iframe>
          </v-card>
        </v-dialog>
        <div style="display: none">
          <a id="downloadFile" :href="srcDownload" download></a>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title>
          <p style="font-size: 16px; color: #0072bc">
            {{ showTitleDialogComputed }}
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#FF5252"
            small
            class="white--text"
            variant="text"
            @click="dialog = false"
          >
            Hủy
          </v-btn>
          <v-btn
            color="#0072bc"
            small
            class="white--text"
            variant="text"
            @click="handleClickSelected"
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <!-- ký số điện tử -->
    <v-dialog v-model="dialogInputMobile" max-width="550" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px"
            >THÔNG TIN TÀI KHOẢN CHỮ KÝ SỐ CÔNG CỘNG</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogInputMobile = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex xs12 class="px-3" style="cursor: pointer">
              <div>
                Chọn nhà cung cấp chữ ký số:
                <span style="color: red"> (*)</span>
              </div>
              <v-autocomplete
                :items="dsCungCapCA"
                hide-no-data
                v-model="donViCapCA"
                item-text="name"
                item-value="value"
                box
                class="my-2"
              ></v-autocomplete>
              <div>
                Mã số thuế / Số CMND/CCCD, hộ chiếu<span style="color: red">
                  (*)</span
                >:
              </div>
              <v-text-field
                class="mt-2"
                v-model="userIdMySign"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="text-xs-center mb-3">
              <v-btn
                :loading="loadingAction"
                :disabled="loadingAction"
                class="mr-0"
                style="width: 100px"
                color="primary"
                @click="getCertMySign()"
              >
                <v-icon>save</v-icon> &nbsp; Xác nhận
              </v-btn>
            </v-flex>
            <v-flex xs12 class="px-3 mb-4" v-if="listCertMySign.length">
              <div style="display: flex; align-items: center">
                <v-icon size="20" color="#5a770d" class="mr-2"
                  >double_arrow</v-icon
                >
                <span
                  style="
                    text-transform: uppercase;
                    color: #5a770d;
                    font-weight: 500;
                    font-size: 14px;
                  "
                  >Chọn chứng thư số:</span
                >
              </div>
              <v-flex
                class="py-2 mt-2"
                v-for="(item, index) in listCertMySign"
                :key="index"
                xs12
                style="border: 1px dotted #5a770d; background: #5a770d24"
                @click="
                  !chonViTriKySo ? submitMySign(item) : showPdfCoordinate(item)
                "
              >
                <div
                  style="
                    cursor: pointer !important;
                    text-decoration: underline;
                    padding-left: 15px;
                    margin-bottom: 0px;
                  "
                >
                  <v-icon class="mr-2" size="18">edit</v-icon>
                  <span style="font-size: 14px">{{ item.cert_id }}</span>
                  <p style="font-size: 14px">
                    {{ strToJson(item.cert_subject)["CN"] }} -
                    {{ strToJson(item.cert_subject)["L"] }} -
                    {{ strToJson(item.cert_subject)["ST"] }} -
                    {{ strToJson(item.cert_subject)["C"] }}
                  </p>
                </div>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="dialogChoKySoBatDongBo" max-width="550" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px"> CHỜ KÝ SỐ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="cancelProcessKySo">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex xs12 class="mt-2" style="font-size: 16px">
              <div class="mb-2 mx-3">
                <v-progress-linear :indeterminate="true"></v-progress-linear>
              </div>
              <p class="mx-3">
                Yêu cầu ký số tài liệu đã được gửi. Vui lòng thực hiện ký số
                trên thiết bị.
              </p>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="py-3 px-3" style="justify-content: center">
          <v-btn
            class="mr-2 white--text"
            style="width: 125px"
            color="primary"
            @click="cancelProcessKySo"
          >
            <v-icon>clear</v-icon> &nbsp; HỦY BỎ
            <span slot="loader">Đang kiểm tra</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      v-model="dialogPdfCoordinate"
      fullscreen
      transition="fade-transition"
    >
      <v-card>
        <v-toolbar flat dark color="primary">
          <v-toolbar-title>Chọn vị trí đặt chữ ký số</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogPdfCoordinate = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <pdf-coordinate
          ref="pdfCoordinate"
          :urlPdf="urlPdf"
          :bas64Pdf="base64Pdf"
          @submitCoordinate="submitCoordinatePdf"
        ></pdf-coordinate>
      </v-card>
    </v-dialog>
    <!--  -->
    <DialogConfirm :fnCancel="handleCancelClick" />
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import toastr from "toastr";
import Pagination from "./Pagination.vue";
import Search from "./FormTimKiem.vue";
import DialogConfirm from "../DialogConfirm.vue";
import PdfCoordinate from "./PdfCoordinate.vue";

Vue.use(toastr);

toastr.options = {
  positionClass: "toast-top-center",
  timeOut: "5000",
};
export default {
  components: {
    "pdf-coordinate": PdfCoordinate,
    "tim-kiem": Search,
    pagination: Pagination,
    DialogConfirm,
  },
  data: () => ({
    percent: 0,
    dialog: false,
    dialogPdfCoordinate: false,
    base64Pdf: "",
    urlPdf: "",
    chonViTriKySo: false,
    dragging: false,
    valid: false,
    donViList: [],
    menuActive: 0,
    loaiVanBanList: [],
    loaiVanBanCreate: "",
    trangThaiChiaSeList: [
      { TenMuc: "Không chia sẻ", MaMuc: 0 },
      { TenMuc: "Chia sẻ", MaMuc: 1 },
    ],
    trangThaiChiaSeCreate: 0,
    cmndNguoiThuHuong: "",
    tenNguoiThuHuong: "",
    maHoSoDvc: "",
    loaiDoiTuongThuHuong: "",
    keywordSearch: "",
    applicantNameCreate: "",
    applicantIdNoCreate: "",
    govAgencyCreate: "",
    createDate: "",
    expireDate: "",
    showDetail: false,
    fileTemplateList: [],
    statusCreate: "",
    fileTemplateNoCreate: "",
    fileName: "",
    fileNo: "",
    fileUpdate: "",
    fileNameUpdate: "",
    documentSelect: "",
    loadingAction: false,
    showAdvanceSearch: false,
    showApplicantInfo: false,
    inputSearch: {
      applicantName: "",
      applicantIdNo: "",
      fileTemplateNo: "",
      status: "",
      keywordSearch: "",
      fileNoSearch: "",
      name: "",
    },
    dataInputSearch: "",
    loadingTable: false,
    documentApplicantList: [],
    totalDocument: 0,
    documentPage: 0,
    numberPerPage: 15,
    dialogViewFileSign: false,
    pathNameFileESign: "",
    dialogPDF: false,
    isDvc: false,
    maxFileSize: 100,
    typeCreate: "create",
    fileNameView: "",
    srcDownload: "",
    fileEntryESign: "",
    statusList: [],
    applicantInfos: "",
    documentListHeader: [
      {
        text: "STT",
        align: "center",
        sortable: false,
      },
      {
        text: "Tên giấy tờ",
        align: "center",
        sortable: false,
      },
      {
        text: "Số hiệu giấy tờ",
        align: "center",
        sortable: false,
      },
      {
        text: "Người thụ hưởng",
        align: "center",
        sortable: false,
      },
      {
        text: "Ngày ban hành",
        align: "center",
        sortable: false,
      },
      {
        text: "Hiệu lực giấy tờ",
        align: "center",
        sortable: false,
      },
      {
        text: "Thao tác",
        align: "center",
        sortable: false,
      },
    ],
    applicantName: "",
    applicantIdNo: "",
    applicantType: "",
    loadingPdf: false,
    tepDinhKem: [],
    tepUpload: [],

    loading: false,
    itemsSelectBox: [],
    selected: [],
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
    totalItemsSelectDonVi: 0,

    dataCapacity: null,
    checkbox: true,
    numberData: "",

    dialogInputMobile: false,
    dialogChoKySoBatDongBo: false,
    userIdMySign: "",
    dsCungCapCA: [
      { name: "Viettel CA", value: "Viettel-CA" },
      { name: "VNPT CA", value: "VNPT-CA" },
      { name: "FPT CA", value: "FPT-CA" },
      { name: "BKAV CA", value: "BkavCA" },
      { name: "Nacencom", value: "CA2" },
      { name: "MISA CA", value: "MISA-CA" },
    ],
    donViCapCA: "",
    listCertMySign: [],
    transactionInfo: "",
    certSelected: "",
    tepKySo: null,
    indexTepUpload: null,
  }),
  computed: {
    showCapacity() {
      const vm = this;

      if (vm.dataCapacity) {
        return `${vm.dataCapacity.TongDungLuongDaSuDung} bytes`;
      } else return "";
    },
    documentListHeaderSelectedOption() {
      const vm = this;
      return [
        {
          text: (
            <div class="checkbox-wrapper-29">
              <label class="checkbox">
                <input
                  type="checkbox"
                  onChange={this.handleChange}
                  class="checkbox__input"
                />
                <span class="checkbox__label"></span>
              </label>
            </div>
          ),
          align: "center",
          sortable: false,
        },
        ...vm.documentListHeader,
      ];
    },
    showIconComputed() {
      const vm = this;
      switch (vm.menuActive) {
        case 3:
          return "sync_alt";
        case 4:
          return "restore_page";

        default:
          return "delete";
      }
    },
    showTextComputed() {
      const vm = this;
      switch (vm.menuActive) {
        case 3:
          return "Lấy giấy tờ về kho";
        case 4:
          return "Khôi phục giấy tờ";

        default:
          return "Xóa giấy tờ";
      }
    },
    showTitleDialogComputed() {
      const vm = this;
      switch (vm.menuActive) {
        case 3:
          return "Bạn có chắc chắn lấy những giấy tờ đã chọn về kho của mình?";
        case 4:
          return "Bạn có chắc chắn khôi phục những giấy tờ đã chọn?";

        default:
          return "Bạn có chắc chắn xóa những giấy tờ đã chọn?";
      }
    },
    genCss() {
      const vm = this;
      return `position: relative;
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                  background-image: conic-gradient(#b5838d ${vm.percent}%, #ffcdb2 0);
                  overflow: hidden;`;
    },
  },
  beforeDestroy() {},
  mounted() {
    let vm = this;
  },
  beforeCreate() {},
  created() {
    let vm = this;
    try {
      if (dsCungCapCA) {
        vm.dsCungCapCA = dsCungCapCA;
      }
    } catch (error) {}
    try {
      if (chonViTriKySo) {
        vm.chonViTriKySo = chonViTriKySo;
      }
    } catch (error) {}
    let param = {
      headers: {
        groupId: window.themeDisplay
          ? window.themeDisplay.getScopeGroupId()
          : "",
      },
    };
    axios
      .get("/o/v1/opencps/users/" + window.themeDisplay.getUserId(), param)
      .then(function (response) {
        console.log("responseUser", response.data, vm.inputSearch);
        vm.getDanhMuc();
        try {
          vm.applicantName = response.data["applicantName"];
          vm.applicantIdNo = response.data["applicantIdNo"];
          vm.applicantType = response.data["applicantType"];
        } catch (error) {}
        vm.getDanhSachGiayToSoHoa(vm.dataInputSearch);
      })
      .catch(function (error) {});
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      let vm = this;
      let currentQuery = newRoute.query;
      vm.showApplicantInfo = false;
      vm.getDanhSachGiayToSoHoa();
    },
    fileTemplateNoCreate(val) {
      let vm = this;
      if (val && vm.typeCreate === "create") {
        vm.fileName = val.TenMuc;
      }
    },
    // ----
    keywordSearchSelect(val) {
      let vm = this;
      if (vm.fileTemplateList.length) {
        if (val && val !== vm.fileTemplateNoCreate["TenMuc"]) {
          if (vm.timeOutSearch) {
            clearTimeout(vm.timeOutSearch);
          }
          vm.timeOutSearch = setTimeout(function () {
            let exits = vm.fileTemplateList.find(function (item) {
              return String(item.TenMuc)
                .toLowerCase()
                .includes(String(val).toLowerCase());
            });
            if (!exits) {
              vm.searchItems();
            }
          }, 1000);
        }
      } else {
        if (vm.timeOutSearch) {
          clearTimeout(vm.timeOutSearch);
        }
        vm.timeOutSearch = setTimeout(function () {
          vm.searchItems();
        }, 1000);
      }
    },
    keywordSearchDonVi(val) {
      let vm = this;
      if (vm.donViList.length) {
        if (val && val !== vm.govAgencyCreate["TenGoi"]) {
          if (vm.timeOutSearch1) {
            clearTimeout(vm.timeOutSearch1);
          }
          vm.timeOutSearch1 = setTimeout(function () {
            let exits = vm.donViList.find(function (item) {
              return String(item.TenGoi)
                .toLowerCase()
                .includes(String(val).toLowerCase());
            });
            if (!exits) {
              vm.searchItemsDonVi();
            }
          }, 1000);
        }
      } else {
        if (vm.timeOutSearch1) {
          clearTimeout(vm.timeOutSearch1);
        }
        vm.timeOutSearch1 = setTimeout(function () {
          vm.searchItemsDonVi();
        }, 1000);
      }
    },
    // ----
    menuActive(val) {
      const vm = this;
      const getInputDom = vm.$el.querySelector(".checkbox__input");
      if (getInputDom) getInputDom.checked = false;
      if (val === 5) vm.getCapacity();
    },
    dialogInputMobile(val) {
      setTimeout(function () {
        if (val) {
          let myElements = document.querySelectorAll(".v-menu__content");
          for (let i = 0; i < myElements.length; i++) {
            myElements[i].style.position = "fixed";
          }
        } else {
          let myElements = document.querySelectorAll(".v-menu__content");
          for (let i = 0; i < myElements.length; i++) {
            myElements[i].style.position = "absolute";
          }
        }
      }, 300);
    },
  },
  methods: {
    handleCancelModalCreate() {
      const vm = this;
      vm.showDetail = false;
      if (vm.menuActive === 5) vm.getCapacity();
    },
    showKySo(file, index) {
      let vm = this;
      console.log("fileKySo", file);
      vm.dialogInputMobile = true;
      vm.tepKySo = file;
      vm.indexTepUpload = index;
    },
    base64ToPdfBlob(base64String) {
      let byteArray = atob(base64String);
      let arrayBuffer = new ArrayBuffer(byteArray.length);
      let uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteArray.length; i++) {
        uint8Array[i] = byteArray.charCodeAt(i);
      }
      let blob = new Blob([uint8Array], { type: "application/pdf" });
      return blob;
    },
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    },
    viewTepUpload(file) {
      let vm = this;
      let pdfUrl = "";
      if (file.Signed) {
        let blob = vm.base64ToPdfBlob(file.FileSigned);
        pdfUrl = URL.createObjectURL(blob);
        console.log("pdfUrl", pdfUrl);
        vm.pathNameFileESign = pdfUrl;
        vm.dialogViewFileSign = true;
      } else {
        var selectedFile = file["File"];
        if (selectedFile) {
          let base64 = "";
          let getBase64 = async () => {
            base64 = await vm.convertFileToBase64(selectedFile);
            let blob = vm.base64ToPdfBlob(base64.split(",")[1]);
            pdfUrl = URL.createObjectURL(blob);
            console.log("pdfUrl", pdfUrl);
            vm.pathNameFileESign = pdfUrl;
            vm.dialogViewFileSign = true;
          };
          getBase64();
        }
      }
    },
    getCertMySign() {
      let vm = this;
      if (String(vm.userIdMySign).trim()) {
        let user = {
          user_id: String(vm.userIdMySign).trim(),
          ca_name: vm.donViCapCA,
          serial_number: "",
        };
        vm.loadingAction = true;
        vm.$store
          .dispatch("getCertMySign", user)
          .then((res) => {
            vm.loadingAction = false;
            vm.listCertMySign = [];
            try {
              vm.listCertMySign = res.data.user_certificates;
            } catch (error) {}
            if (!vm.listCertMySign.length) {
              toastr.error("Không có thông tin chứng thư số");
            }
          })
          .catch(function () {
            vm.loadingAction = false;
            toastr.error("Không có thông tin chứng thư số");
          });
      }
    },
    showPdfCoordinate(cert) {
      let vm = this;
      vm.certSelected = cert;
      let getBase64 = async () => {
        let base64 = await vm.convertFileToBase64(vm.tepKySo.File);
        vm.base64Pdf = base64.split(",")[1];
        vm.dialogPdfCoordinate = true;
        setTimeout(function () {
          vm.$refs.pdfCoordinate.init();
        }, 200);
      };
      getBase64();
    },
    submitCoordinatePdf(position) {
      let vm = this;
      vm.dialogPdfCoordinate = false;
      console.log("coordSubmit", position);
      vm.submitMySign(vm.certSelected, position);
    },
    base64ToFileObject(base64String, fileName) {
      var sliceSize = 1024;
      var byteCharacters = atob(base64String);
      var byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      let blob = new Blob(byteArrays, { type: "application/pdf" });
      return new File([blob], fileName, { type: "application/pdf" });
    },
    submitMySign(item, position) {
      let vm = this;
      vm.certSelected = item;
      if (vm.loadingAction) {
        return;
      }
      let dataInsertSignature = {
        user_id: String(vm.userIdMySign).trim(),
        ca_name: vm.donViCapCA,
        serial_number: item.serial_number,
        cert_data: item.cert_data,
        file: vm.tepKySo.File,
        x: position ? position["coordinate"][0] : 0,
        y: position ? position["coordinate"][1] : 0,
        width: position ? position["coordinate"][2] : 0,
        height: position ? position["coordinate"][3] : 0,
        page: position ? position["page"] : 1,
      };
      vm.loadingAction = true;
      toastr.success(
        "Yêu cầu đã được gửi. Vui lòng thực hiện ký số trên thiết bị."
      );
      vm.dialogChoKySoBatDongBo = true;
      vm.dialogInputMobile = false;
      vm.$store
        .dispatch("signatureMySign", dataInsertSignature)
        .then((res) => {
          vm.loadingAction = false;
          toastr.clear();
          toastr.success("Thực hiện ký số thành công");
          vm.dialogChoKySoBatDongBo = false;
          vm.tepUpload[vm.indexTepUpload].FileSigned = res.file;
          vm.tepUpload[vm.indexTepUpload].Signed = true;
          vm.tepUpload[vm.indexTepUpload].File = vm.base64ToFileObject(
            res.file,
            vm.tepUpload[vm.indexTepUpload]["TenTep"] + "_Signed.pdf"
          );
          console.log("tepDaKySo", vm.tepUpload[vm.indexTepUpload]);
        })
        .catch(function () {
          vm.loadingAction = false;
          vm.dialogChoKySoBatDongBo = false;
          setTimeout(function () {
            toastr.error("Gửi yêu cầu ký số thất bại");
          }, 300);
        });
    },
    cancelProcessKySo() {
      let vm = this;
      vm.dialogChoKySoBatDongBo = false;
      vm.loadingAction = false;
    },
    handleCancelClick() {
      const vm = this;
      vm.loadingAction = false;
    },
    handleChangeCheckbox() {
      const vm = this;
      const getInputDom = vm.$el.querySelector(".checkbox__input");
      if (getInputDom) {
        if (vm.documentApplicantList.length === vm.selected.length)
          getInputDom.checked = true;
        else getInputDom.checked = false;
      }
    },
    handleChange() {
      const vm = this;
      if (vm.documentApplicantList.length === vm.selected.length) {
        vm.selected = [];
      } else {
        vm.selected = [...vm.documentApplicantList];
      }
    },
    getCapacity() {
      const vm = this;
      const filter = {
        cccd: vm.applicantIdNo,
      };

      vm.$store
        .dispatch("getCapacityAction", filter)
        .then((data) => {
          vm.dataCapacity = { ...data };
          const number =
            (vm.convertToGigabyte(data.TongDungLuongDaSuDung + "bytes") * 100) /
            vm.convertToGigabyte(data.TongDungLuongToiDaChoPhep);
          if (data.DungLuongToiDaFileTaiLen)
            vm.numberData = data.DungLuongToiDaFileTaiLen;
          console.log(
            "respon:...",
            vm.convertToGigabyte(data.TongDungLuongDaSuDung + "bytes"),
            vm.convertToGigabyte(data.TongDungLuongToiDaChoPhep)
          );
          vm.percent = Math.ceil(number);
          if (vm.percent >= 80 && vm.percent <= 90 && !vm.showDetail)
            toastr.error("Bạn sắp sử dụng hết dung lượng");
          if (vm.percent >= 100 && !vm.showDetail)
            toastr.error("Bạn đã sử dụng hết dung lượng");
        })
        .catch((err) => (vm.numberData = ""));
    },
    handleClickSelected() {
      const vm = this;
      vm.dialog = false;
      try {
        if (vm.selected.length > 1) {
          for (let i = 0; i < vm.selected.length; i++) {
            const item = vm.selected[i];

            if (vm.menuActive === 0) {
              let filter = {
                primKey: item.primKey,
                data: Object.assign(item, {
                  TrangThaiDuLieu: {
                    MaMuc: "04",
                    TenMuc: "Hủy bỏ",
                  },
                }),
                collection: "giaytocanhantochuc",
              };
              vm.$store
                .dispatch("updateGiayToLuTru", filter)
                .then(function (result) {
                  if (i === vm.selected.length - 1) {
                    toastr.success("Yêu cầu thực hiện thành công");
                    toastr.clear();
                    vm.selected = [];
                    vm.getDanhSachGiayToSoHoa(vm.dataInputSearch);
                  }
                })
                .catch(function () {
                  toastr.clear();
                });
            } else if (vm.menuActive === 3) {
              let filter = {
                primKey: item.primKey,
                data: Object.assign(item, { TrangThaiChiaSe: 0 }),
                collection: "giaytocanhantochuc",
              };

              vm.$store
                .dispatch("updateGiayToLuTru", filter)
                .then(function (result) {
                  vm.loadingAction = false;
                  vm.showDetail = false;
                  if (i === vm.selected.length - 1) {
                    toastr.success("Yêu cầu thực hiện thành công");
                    toastr.clear();
                    vm.selected = [];
                    vm.getDanhSachGiayToSoHoa(vm.dataInputSearch);
                  }
                })
                .catch(function () {
                  vm.loadingAction = false;
                });
            } else {
              let filter = {
                primKey: item.primKey,
                data: Object.assign(item, {
                  TrangThaiDuLieu: {
                    MaMuc: "02",
                    TenMuc: "Chính thức",
                  },
                }),
                collection: "giaytocanhantochuc",
              };
              vm.$store
                .dispatch("updateGiayToLuTru", filter)
                .then(function (result) {
                  vm.loadingAction = false;
                  toastr.clear();
                  if (i === vm.selected.length - 1) {
                    toastr.success("Yêu cầu thực hiện thành công");
                    vm.selected = [];
                    vm.getDanhSachGiayToSoHoa(vm.dataInputSearch);
                  }
                })
                .catch(function () {
                  vm.loadingAction = false;
                  toastr.clear();
                });
            }
          }
        }
      } catch (error) {
        toastr.error("Yêu cầu thực hiện thất bại");
      }
    },
    convertToGigabyte(param) {
      const unit = [
        { title: "kb", value: 9.5 * Math.pow(10, -7) },
        { title: "mb", value: 0.0009765625 },
        { title: "tb", value: 1000 },
        { title: "zb", value: 1.37439 * Math.pow(10, 11) },
        { title: "pb", value: 1e15 },
        { title: "eb", value: 1.073742 * Math.pow(10, 9) },
        { title: "yb", value: 1.1258999068426 * Math.pow(10, 15) },
        { title: "bytes", value: 9.3132257461548 * Math.pow(10, -10) },
        { title: "g", value: 1 },
        { title: "gb", value: 1 },
      ];
      let result = 0;

      for (let i = 0; i < unit.length; i++) {
        const item = unit[i];
        if (param.toLowerCase().includes(item.title)) {
          const index = param.toLowerCase().indexOf(item.title);
          const number = param.slice(0, index);
          result = +number * item.value;
          break;
        }
      }
      return result;
    },
    convertToByte(param) {
      const unit = [
        { title: "kb", value: 1024 },
        { title: "mb", value: 1.048576 * Math.pow(10, 6) },
        { title: "tb", value: 1.099512 * Math.pow(10, 12) },
        { title: "zb", value: 1.1805916207174 * Math.pow(10, 21) },
        { title: "pb", value: Math.pow(10, 15) },
        { title: "eb", value: Math.pow(10, 18) },
        { title: "yb", value: 1.2089258196146 * Math.pow(10, 24) },
        { title: "bytes", value: 1 },
        { title: "g", value: 1.342177 * Math.pow(10, 8) },
        { title: "gb", value: 1.342177 * Math.pow(10, 8) },
      ];
      let result = 0;

      for (let i = 0; i < unit.length; i++) {
        const item = unit[i];
        if (param.toLowerCase().includes(item.title)) {
          const index = param.toLowerCase().indexOf(item.title);
          const number = param.slice(0, index);
          result = number * item.value;
          break;
        }
      }
      return result;
    },
    cancelShareDocument() {
      const vm = this;
    },
    handleDrop(event) {
      const vm = this;
      event.preventDefault();
      vm.dragging = false;
      const files = event.dataTransfer.files;
      const sizeNumberData = Math.ceil(vm.convertToByte(vm.numberData));
      console.log("vm.numberData", vm.numberData, sizeNumberData);
      if (vm.numberData) {
        if (files[0].size <= sizeNumberData) {
          vm.handleDragFiles(files);
        } else {
          toastr.error("Kích thước tệp không được vượt quá " + vm.numberData);
        }
      } else {
        vm.handleDragFiles(files);
      }
    },
    getDanhMuc() {
      let vm = this;
      vm.getDanhSachDonVi();
      vm.getMauGiayTo();
      vm.getHieuLuc();
      vm.getLoaiGiayTo();
    },
    viewThongTinGiayTo(item) {
      let vm = this;
      vm.documentSelect = item;
      vm.showDetail = true;
      vm.typeCreate = "view";
    },
    getDanhSachDonVi() {
      let vm = this;
      let filter = {
        page: 0,
        size: 100,
      };
      vm.$store
        .dispatch("getDonVi", filter)
        .then(function (result) {
          if (result.hasOwnProperty("content")) {
            vm.donViList = result.content;
          } else {
            vm.donViList = [];
          }
        })
        .catch(function () {});
    },
    getMauGiayTo() {
      let vm = this;
      let filter1 = {
        page: 0,
        size: 20,
        tenDanhMuc: "mathanhphanhoso",
      };
      let filter2 = {
        page: 0,
        size: 20,
        tenDanhMuc: "magiaytoketqua",
      };
      let req1 = vm.$store.dispatch("getDanhMuc", filter1);
      let req2 = vm.$store.dispatch("getDanhMuc", filter2);
      let arrAction = [req1, req2];
      Promise.all(arrAction)
        .then((results) => {
          let res = results[0]["content"].concat(results[1]["content"]);
          vm.fileTemplateList = res;
        })
        .catch((xhr) => {
          vm.fileTemplateList = [];
        });
    },
    getHieuLuc() {
      let vm = this;
      let filter = {
        page: 0,
        size: 100,
        tenDanhMuc: "hieulucvanban",
      };
      vm.$store
        .dispatch("getDanhMuc", filter)
        .then(function (result) {
          if (result.hasOwnProperty("content")) {
            vm.statusList = result.content;
          } else {
            vm.statusList = [];
          }
        })
        .catch(function () {});
    },
    getLoaiGiayTo() {
      let vm = this;
      let filter = {
        page: 0,
        size: 100,
        tenDanhMuc: "loaivanbandientu",
      };
      vm.$store
        .dispatch("getDanhMuc", filter)
        .then(function (result) {
          if (result.hasOwnProperty("content")) {
            vm.loaiVanBanList = result.content;
          } else {
            vm.loaiVanBanList = [];
          }
        })
        .catch(function () {});
    },
    showTimKiem() {
      this.showAdvanceSearch = !this.showAdvanceSearch;
    },
    changeMenu(index) {
      let vm = this;
      vm.menuActive = index;
      if (index !== 5) {
        vm.selected = [];
        vm.showDetail = false;
        vm.resetTimKiem();
        vm.searchGiayToSoHoa();
      }
    },
    uploadFile() {
      document.getElementById("documentFile").value = "";
      document.getElementById("documentFile").click();
    },
    searchGiayToSoHoa(data) {
      let vm = this;
      let dataSearch = Object.assign(data ? data : {}, {
        keyword: vm.keywordSearch,
      });
      console.log("dataInputSearch", dataSearch);
      vm.dataInputSearch = dataSearch;
      vm.documentPage = 0;
      vm.totalDocument = 0;
      vm.getDanhSachGiayToSoHoa(dataSearch);
    },
    searchKeyword() {
      let vm = this;
      let dataFormSearch = {};
      if (vm.$refs.timkiem) {
        dataFormSearch = vm.$refs.timkiem.getDataOutPut();
      }
      let dataSearch = Object.assign(dataFormSearch, {
        keyword: vm.keywordSearch,
      });
      console.log("dataInputSearch", dataSearch);
      vm.dataInputSearch = dataSearch;
      vm.documentPage = 0;
      vm.totalDocument = 0;
      vm.getDanhSachGiayToSoHoa(dataSearch);
    },
    cancelSearchGiayToSoHoa() {
      let vm = this;
      vm.showAdvanceSearch = false;
    },
    changePage(config) {
      let vm = this;
      vm.documentPage = config.page - 1;
      vm.getDanhSachGiayToSoHoa(vm.dataInputSearch);
    },
    getDanhSachGiayToSoHoa(dataSearch) {
      let vm = this;
      let share = "";
      switch (vm.menuActive) {
        case 0:
          share = "0,1";
          break;
        case 1:
          share = "0";
          break;
        case 2:
          share = "1";
          break;
        case 3:
          share = "2";
          break;
        case 4:
          share = "3";
          break;
        default:
          share = "";
          break;
      }
      let text = "";

      if (dataSearch)
        text = dataSearch.soHieuGiayTo || dataSearch.keyword || "";

      let filter = {
        page: vm.documentPage,
        size: vm.numberPerPage,
        keyword: text,
        coQuanBanHanh_MaDinhDanh: dataSearch ? dataSearch.govAgencyCode : "",
        mauGiayTo_MaMuc: dataSearch ? dataSearch.fileTemplateNo : "",
        ngayBanHanh_TuNgay: dataSearch
          ? dataSearch.fromReceiveDateFormatted
          : "",
        ngayBanHanh_DenNgay: dataSearch
          ? dataSearch.toReceiveDateFormatted
          : "",
        hieuLucGiayTo_MaMuc: dataSearch ? dataSearch.status : "",
        orderFields: "ThoiGianTao",
        orderType: "desc",
        cccd: vm.applicantIdNo,
        receiveDvcqg:
          dataSearch && dataSearch.hasOwnProperty("receiveDvcqg")
            ? dataSearch.receiveDvcqg
            : false,
        collection: "giaytocanhantochuc",
        hoSoDichVuCong: dataSearch ? dataSearch.maHoSoDvc : "",
      };
      if (vm.menuActive === 4) {
        filter["trangThaiDuLieu_MaMuc"] = "04";
      } else {
        filter["trangThaiChiaSe"] = share;
      }

      vm.loadingTable = true;
      vm.$store
        .dispatch("getGiayToKhoCaNhan", filter)
        .then(function (result) {
          // vm.$store.dispatch('getGiayToKhoCaNhan_HeThongKhoGT', filter).then(function (result) {
          vm.documentApplicantList = result.content;
          vm.totalDocument = result["totalElements"];
          vm.loadingTable = false;
        })
        .catch(function () {
          vm.loadingTable = false;
          vm.documentApplicantList = [];
          vm.totalDocument = 0;
        });
    },
    resetTimKiem() {
      let vm = this;
      vm.keywordSearch = "";
      if (vm.$refs.timkiem) {
        vm.$refs.timkiem.resetForm();
      }
    },
    validFileUpload(file) {
      let vm = this;
      let passed = true;
      let getFileType = file.name ? file.name.split(".") : "";
      let fileType = getFileType ? getFileType[getFileType.length - 1] : "";
      let fileTypeAllow =
        vm.fileTemplateNoCreate && vm.fileTemplateNoCreate.fileType
          ? vm.fileTemplateNoCreate.fileType.toUpperCase().split(",")
          : "";
      let fileSizeAllow =
        vm.fileTemplateNoCreate && vm.fileTemplateNoCreate.size
          ? vm.fileTemplateNoCreate.size
          : vm.maxFileSize;
      let fileTypeInput = fileTypeAllow
        ? fileTypeAllow.filter(function (item) {
            return item === fileType.toUpperCase();
          })
        : "";
      if ((fileTypeInput && fileTypeInput.length > 0) || !fileTypeAllow) {
        if (Number(file.size) <= fileSizeAllow * 1048576 || !fileSizeAllow) {
          passed = true;
        } else {
          passed = false;
          toastr.clear();
          toastr.error(
            "Tài liệu tải lên dung lượng tối đa là " + fileSizeAllow + "MB"
          );
        }
      } else {
        passed = false;
        toastr.clear();
        toastr.error(
          "Tài liệu tải lên chỉ chấp nhận các định dạng " +
            vm.fileTemplateNoCreate.fileType
        );
      }
      return passed;
    },
    downloadDocument(item) {
      let vm = this;
      if (vm.loadingPdf) {
        return;
      }
      vm.srcDownload = "";
      let filter = {
        id: item.MaDinhDanh,
        collection: "giaytoluutruso",
      };
      vm.loadingPdf = true;
      vm.$store
        .dispatch("getTepDuLieu", filter)
        .then(function (result) {
          vm.loadingPdf = false;
          vm.srcDownload = result;
          setTimeout(function () {
            document.getElementById("downloadFile").click();
          }, 100);
        })
        .catch(function () {
          vm.loadingPdf = false;
        });
    },
    viewDocument(item) {
      let vm = this;
      if (vm.loadingPdf) {
        return;
      }
      vm.srcDownload = "";
      let filter = {
        id: item.MaDinhDanh,
        collection: "giaytoluutruso",
      };
      vm.loadingPdf = true;
      vm.$store
        .dispatch("getTepDuLieu", filter)
        .then(function (result) {
          vm.loadingPdf = false;
          let fileType = item.Ext.toLowerCase();
          if (
            fileType === "png" ||
            fileType === "jpg" ||
            fileType === "jpeg" ||
            fileType === "pdf" ||
            fileType === "gif" ||
            fileType === "tif" ||
            fileType === "tiff"
          ) {
            vm.dialogPDF = true;
            document.getElementById("dialogPDFPreview").src = result;
          } else {
            vm.srcDownload = result;
            setTimeout(function () {
              document.getElementById("downloadFile").click();
            }, 100);
          }
        })
        .catch(function () {
          vm.loadingPdf = false;
        });
    },
    deleteTepDinhKem(tep, index) {
      let vm = this;
      vm.tepDinhKem.splice(index, 1);
    },
    deleteTepUpload(tep, index) {
      let vm = this;
      vm.tepUpload.splice(index, 1);
    },
    showEditDocument(item) {
      let vm = this;
      vm.documentSelect = item;
      vm.typeCreate = "update";
      vm.fileTemplateNoCreate = item.MaMauGiayTo;
      vm.statusCreate = item.HieuLucVanBan;
      vm.fileName = item.TenGiayTo;
      vm.fileNo = item.SoHieuVanBan;
      vm.govAgencyCreate = item.CoQuanBanHanh;
      vm.loaiVanBanCreate = item.LoaiVanBanDienTu;
      vm.cmndNguoiThuHuong =
        item.ChuHoSo["MaDinhDanh"] && item.ChuHoSo["MaDinhDanh"].split(":")[1]
          ? item.ChuHoSo["MaDinhDanh"].split(":")[1]
          : item.ChuHoSo["MaDinhDanh"];
      vm.tenNguoiThuHuong = item.ChuHoSo["TenGoi"];
      vm.tepDinhKem = item.TepDuLieu;
      vm.trangThaiChiaSeCreate = item.TrangThaiChiaSe;
      vm.createDate = vm.convertDate(item.NgayBanHanh);
      vm.expireDate = vm.convertDate(item.ThoiHanHieuLuc);
      vm.tepUpload = [];
      // if (item.ChuHoSo['MaDinhDanh'] && item.ChuHoSo['MaDinhDanh'].split(':')[0] === 'DONVIKINHDOANH') {
      //   vm.loaiDoiTuongThuHuong = 'DONVIKINHDOANH'
      // } else {
      //   vm.loaiDoiTuongThuHuong = 'CANHAN'
      // }
      let exitsTemplate = vm.fileTemplateList.find(function (val) {
        return val.MaMuc === item.MaMauGiayTo["MaMuc"];
      });
      if (!exitsTemplate) {
        vm.fileTemplateList.unshift(item.MaMauGiayTo);
      }
      let exitsCoQuan = vm.donViList.find(function (val) {
        return val.MaDinhDanh === item.CoQuanBanHanh["MaDinhDanh"];
      });
      if (!exitsCoQuan) {
        vm.donViList.unshift(item.CoQuanBanHanh);
      }

      vm.showDetail = true;
    },
    cloneMyStorage(item) {
      let vm = this;
      console.log("item:...", item, vm.documentSelect);
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

      // let filter = {
      //   primKey: vm.documentSelect.primKey,
      //   data: Object.assign(vm.documentSelect, { TrangThaiChiaSe: 0 }),
      //   collection: "giaytocanhantochuc",
      // };
      // vm.$store.dispatch('updateGiayToLuTru_HeThongKhoGT', filter).then(function (result) {

      vm.loadingAction = true;

      const payload = {
        cb: () => {
          let filter = {
            primKey: item.primKey,
            data: Object.assign(item, { TrangThaiChiaSe: 0 }),
            collection: "giaytocanhantochuc",
          };
          vm.$store
            .dispatch("updateGiayToLuTru", filter)
            .then(function (result) {
              vm.loadingAction = false;
              toastr.success("Lấy giấy tờ thành công.");
              vm.showDetail = false;
              setTimeout(function () {
                vm.getDanhSachGiayToSoHoa();
              }, 200);
            })
            .catch(function () {
              vm.loadingAction = false;
              toastr.error("Lấy giấy tờ thất bại. Vui lòng thử lại.");
            });
        },
        title: "Bạn có chắc chắn lấy giấy tờ này về kho của mình ?",
      };
      vm.$store.commit("SET_STATE_DIALOG", payload);
    },
    deleteDocument(item) {
      let vm = this;
      let x = confirm("Bạn có chắc chắn xóa giấy tờ này?");
      if (x) {
        let filter = {
          primKey: item.primKey,
          data: Object.assign(item, {
            TrangThaiDuLieu: {
              MaMuc: "04",
              TenMuc: "Hủy bỏ",
            },
          }),
          collection: "giaytocanhantochuc",
        };
        // vm.$store.dispatch('updateGiayToLuTru_HeThongKhoGT', filter).then(function (result) {
        vm.$store
          .dispatch("updateGiayToLuTru", filter)
          .then(function (result) {
            toastr.clear();
            toastr.success("Yêu cầu thực hiện thành công");
            vm.getDanhSachGiayToSoHoa(vm.dataInputSearch);
          })
          .catch(function () {
            toastr.clear();
            toastr.error("Yêu cầu thực hiện thất bại");
          });
      }
    },
    restoreDocument(item) {
      let vm = this;
      vm.loadingAction = true;

      const payload = {
        cb: () => {
          let filter = {
            primKey: item.primKey,
            data: Object.assign(item, {
              TrangThaiDuLieu: {
                MaMuc: "02",
                TenMuc: "Chính thức",
              },
            }),
            collection: "giaytocanhantochuc",
          };
          vm.$store
            .dispatch("updateGiayToLuTru", filter)
            .then(function (result) {
              vm.loadingAction = false;
              toastr.clear();
              toastr.success("Yêu cầu thực hiện thành công");
              vm.getDanhSachGiayToSoHoa(vm.dataInputSearch);
            })
            .catch(function () {
              vm.loadingAction = false;
              toastr.clear();
              toastr.error("Yêu cầu thực hiện thất bại");
            });
        },
        title: "Bạn có chắc chắn khôi phục giấy tờ này?",
      };
      vm.$store.commit("SET_STATE_DIALOG", payload);
    },
    handleDragFiles(files) {
      let vm = this;
      console.log("filessss", files);
      let arrTep = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let ext = file["name"].split(".");
        arrTep.push({
          File: file,
          Ext: ext[ext.length - 1],
          KichThuocTep: file["size"],
          TenTep: file["name"],
          FileInput: true,
          Signed: false,
          FileSigned: null,
        });
      }
      vm.tepUpload = arrTep;
    },
    uploadDocumentFile(e) {
      let vm = this;
      let files = $("#documentFile")[0].files;
      let upload = function () {
        let arrTep = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          let ext = file["name"].split(".");
          arrTep.push({
            File: file,
            Ext: ext[ext.length - 1],
            KichThuocTep: file["size"],
            TenTep: file["name"],
            FileInput: true,
          });
        }
        vm.tepUpload = arrTep;
      };
      if (vm.numberData) {
        const sizeNumberData = Math.ceil(vm.convertToByte(vm.numberData));
        if (files[0].size < sizeNumberData) {
          upload();
        } else {
          toastr.error("Kích thước tệp không được vượt quá " + vm.numberData);
        }
      } else {
        upload();
      }
    },
    showCreatedocument() {
      let vm = this;
      vm.tenNguoiThuHuong = vm.applicantName;
      vm.cmndNguoiThuHuong = vm.applicantIdNo;
      vm.fileTemplateNoCreate = "";
      vm.createDate = "";
      vm.expireDate = "";
      vm.statusCreate = "";
      vm.govAgencyCreate = "";
      vm.loaiVanBanCreate = "";
      vm.tepDinhKem = [];
      vm.tepUpload = [];
      vm.showDetail = true;
      vm.typeCreate = "create";
      vm.pathNameFileESign = "";
      vm.fileNameView = "";
      vm.fileName = "";
      vm.fileNo = "";
      vm.trangThaiChiaSeCreate = 0;
      vm.getCapacity();
      // vm.loaiDoiTuongThuHuong = vm.applicantType === 'citizen' ? 'CANHAN' : 'DONVIKINHDOANH'
    },
    createDocument() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        const payload = {
          cb: () => {
            if (vm.tepUpload.length) {
              vm.loadingAction = true;

              let arrReq = [];
              vm.tepUpload.forEach((element) => {
                let filter = {
                  file: element["File"],
                  collection: "giaytocanhantochuc",
                };
                arrReq.push(vm.$store.dispatch("uploadTep", filter));
              });
              Promise.all(arrReq)
                .then((values) => {
                  let tepMapping = values;
                  console.log("tepMapping", tepMapping);
                  let dataCreate = {
                    TenGiayTo: vm.fileName,
                    SoHieuVanBan: vm.fileNo,
                    NgayBanHanh: vm.convertDateIso(vm.createDate),
                    ThoiHanHieuLuc: vm.convertDateIso(vm.expireDate),
                    CoQuanBanHanh: {
                      MaDinhDanh: vm.govAgencyCreate
                        ? vm.govAgencyCreate["MaDinhDanh"]
                        : "",
                      TenGoi: vm.govAgencyCreate
                        ? vm.govAgencyCreate["TenGoi"]
                        : "",
                    },
                    HieuLucVanBan: {
                      MaMuc: vm.statusCreate ? vm.statusCreate["MaMuc"] : "",
                      TenMuc: vm.statusCreate ? vm.statusCreate["TenMuc"] : "",
                    },
                    MaMauGiayTo: {
                      MaMuc: vm.fileTemplateNoCreate
                        ? vm.fileTemplateNoCreate["MaMuc"]
                        : "",
                      TenMuc: vm.fileTemplateNoCreate
                        ? vm.fileTemplateNoCreate["TenMuc"]
                        : "",
                    },
                    ChuHoSo: {
                      MaDinhDanh: vm.cmndNguoiThuHuong,
                      TenGoi: vm.tenNguoiThuHuong,
                    },
                    LoaiVanBanDienTu: {
                      MaMuc: vm.loaiVanBanCreate["MaMuc"],
                      TenMuc: vm.loaiVanBanCreate["TenMuc"],
                    },
                    ChuKhoLuuTru: {
                      MaDinhDanh: vm.applicantIdNo,
                      TenGoi: vm.applicantName,
                    },
                    TrangThaiChiaSe: vm.trangThaiChiaSeCreate,
                    TepDuLieu: tepMapping,
                    MaDinhDanh: "",
                    HoSoDichVuCong: {
                      MaDinhDanh: "",
                    },
                    SoLanTaiSuDung: 0,
                    TenLoaiVanBan: {
                      MaMuc: "",
                      TenMuc: "",
                    },
                    TrichYeuVanBan: "",
                    HoSoLuuTruSo: {
                      MaDinhDanh: "",
                    },
                    SoThuTu: 0,
                    ThuMucLuuTru: {
                      MaDinhDanh: "",
                      TenThuMuc: "",
                    },
                    TrangThaiDuLieu: {
                      MaMuc: "02",
                      TenMuc: "Chính thức",
                    },
                    PhanVungDuLieu: {
                      MaMuc: "",
                      TenMuc: "",
                    },
                  };
                  let filter = {
                    data: dataCreate,
                    collection: "giaytocanhantochuc",
                  };
                  // vm.$store.dispatch('addGiayToLuTru_HeThongKhoGT', filter).then(function (result) {
                  vm.$store
                    .dispatch("addGiayToLuTru", filter)
                    .then(function (result) {
                      vm.loadingAction = false;
                      toastr.success("Thêm mới giấy tờ thành công");
                      vm.showDetail = false;
                      setTimeout(function () {
                        vm.getDanhSachGiayToSoHoa();
                      }, 200);
                    })
                    .catch(function () {
                      vm.loadingAction = false;
                      toastr.error("Thêm mới thất bại. Vui lòng thử lại.");
                    });
                })
                .catch(function () {
                  vm.loadingAction = false;
                });
            } else {
              toastr.clear();
              toastr.error("Vui lòng đính kèm tài liệu");
            }
          },
          title: "Bạn có chắc chắn tải tài liệu này lên kho của mình không?",
        };
        vm.$store.commit("SET_STATE_DIALOG", payload);
      }
    },
    updateDocument() {
      let vm = this;
      if (vm.$refs.form.validate()) {
        if (vm.tepDinhKem.length || vm.tepUpload.length) {
          vm.loadingAction = true;
          let arrReq = [];
          vm.tepUpload.forEach((element) => {
            let filter = {
              file: element["File"],
              tepdulieu: {
                TenTep: element["TenTep"],
                LoaiNguonDuLieu: { MaMuc: "", TenMuc: "" },
              },
              collection: "giaytocanhantochuc",
            };
            arrReq.push(vm.$store.dispatch("uploadTep", filter));
          });
          Promise.all(arrReq)
            .then((values) => {
              let tepMapping = vm.tepDinhKem.concat(values);
              let dataCreate = {
                TenGiayTo: vm.fileName,
                SoHieuVanBan: vm.fileNo,
                NgayBanHanh: vm.convertDateIso(vm.createDate),
                ThoiHanHieuLuc: vm.convertDateIso(vm.expireDate),
                CoQuanBanHanh: {
                  MaDinhDanh: vm.govAgencyCreate["MaDinhDanh"],
                  TenGoi: vm.govAgencyCreate["TenGoi"],
                },
                HieuLucVanBan: {
                  MaMuc: vm.statusCreate["MaMuc"],
                  TenMuc: vm.statusCreate["TenMuc"],
                },
                MaMauGiayTo: {
                  MaMuc: vm.fileTemplateNoCreate["MaMuc"],
                  TenMuc: vm.fileTemplateNoCreate["TenMuc"],
                },
                ChuHoSo: {
                  // "MaDinhDanh": vm.loaiDoiTuongThuHuong + ':' + vm.cmndNguoiThuHuong,
                  MaDinhDanh: vm.cmndNguoiThuHuong,
                  TenGoi: vm.tenNguoiThuHuong,
                },
                LoaiVanBanDienTu: {
                  MaMuc: vm.loaiVanBanCreate["MaMuc"],
                  TenMuc: vm.loaiVanBanCreate["TenMuc"],
                },
                ChuKhoLuuTru: {
                  // "MaDinhDanh": vm.applicantType === 'citizen' ?  'CaNhan:'+vm.applicantIdNo : 'DonViKinhDoanh:'+vm.applicantIdNo,
                  MaDinhDanh: vm.applicantIdNo,
                  TenGoi: vm.applicantName,
                },
                TepDuLieu: tepMapping,
                TrangThaiChiaSe: vm.trangThaiChiaSeCreate,
              };
              let filter = {
                primKey: vm.documentSelect.primKey,
                data: Object.assign(vm.documentSelect, dataCreate),
                collection: "giaytocanhantochuc",
              };
              // vm.$store.dispatch('updateGiayToLuTru_HeThongKhoGT', filter).then(function (result) {
              vm.$store
                .dispatch("updateGiayToLuTru", filter)
                .then(function (result) {
                  vm.loadingAction = false;
                  toastr.success("Cập nhật giấy tờ thành công");
                  vm.showDetail = false;
                  setTimeout(function () {
                    vm.getDanhSachGiayToSoHoa();
                  }, 200);
                })
                .catch(function () {
                  vm.loadingAction = false;
                  toastr.error("Cập nhật giấy tờ thất bại. Vui lòng thử lại.");
                });
            })
            .catch(function () {});
        } else {
          toastr.clear();
          toastr.error("Vui lòng đính kèm tệp");
        }
      }
    },
    formatDate() {
      let vm = this;
      let lengthDate = String(vm.createDate).trim().length;
      let splitDate = String(vm.createDate).split("/");
      if (
        lengthDate &&
        lengthDate > 4 &&
        splitDate.length === 3 &&
        splitDate[2]
      ) {
        vm.createDate = vm.translateDate(vm.createDate);
      } else if (lengthDate && lengthDate === 8) {
        let date = String(vm.createDate);
        vm.createDate =
          date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4, 8);
      } else {
        vm.createDate = "";
      }
    },
    formatExpireDate() {
      let vm = this;
      let lengthDate = String(vm.expireDate).trim().length;
      let splitDate = String(vm.expireDate).split("/");
      if (
        lengthDate &&
        lengthDate > 4 &&
        splitDate.length === 3 &&
        splitDate[2]
      ) {
        vm.expireDate = vm.translateDate(vm.expireDate);
      } else if (lengthDate && lengthDate === 8) {
        let date = String(vm.expireDate);
        vm.expireDate =
          date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4, 8);
      } else {
        vm.expireDate = "";
      }
    },
    translateDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    getStatus(val) {
      if (String(val) === "0") {
        return "Yêu cầu số hóa";
      } else if (String(val) === "1") {
        return "Có hiệu lực";
      } else if (String(val) === "2") {
        return "Hết hiệu lực";
      } else if (String(val) === "3") {
        return "Hủy";
      }
    },
    convertDate(date) {
      if (!date) {
        return "";
      }
      let date1 = new Date(date);
      return `${date1.getDate().toString().padStart(2, "0")}/${(
        date1.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date1.getFullYear()}`;
    },
    convertDateIso(dateString) {
      if (!dateString) {
        return "";
      }
      let parts = dateString.split("/");
      let day = parts[0];
      let month = parts[1];
      let year = parts[2];
      let date = new Date(`${year}-${month}-${day}`);
      let isoDate = date.toISOString();
      return isoDate;
    },
    convertMaDinhDanh(mdd) {
      if (!mdd) {
        return "";
      }
      let cccd = mdd.split(":")[1];
      return cccd;
    },
    getDocumentTypeIcon(type) {
      let typeDoc = "doc,docx";
      let typeExcel = "xls,xlsx";
      let typeImage = "png,jpg,jpeg";
      if (type) {
        if (typeDoc.indexOf(String(type).toLowerCase()) >= 0) {
          return {
            icon: "fas fa fa-file-word-o",
            color: "blue",
            size: 14,
          };
        } else if (typeExcel.indexOf(String(type).toLowerCase()) >= 0) {
          return {
            icon: "fas fa fa-file-excel-o",
            color: "green",
            size: 14,
          };
        } else if (String(type).toLowerCase() === "pdf") {
          return {
            icon: "fa fa-file-pdf-o",
            color: "red",
            size: 14,
          };
        } else if (typeImage.indexOf(String(type).toLowerCase()) >= 0) {
          return {
            icon: "fas fa fa-file-image-o",
            color: "primary",
            size: 14,
          };
        } else {
          return {
            icon: "fas fa fa-paperclip",
            color: "",
            size: 14,
          };
        }
      } else {
        return "";
      }
    },

    // -----
    visibilityChanged(e) {
      e && this.loadMoreItems();
    },
    visibilityChangedDonVi(e) {
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
      let vm = this;
      if (
        vm.fileTemplateList.length < vm.totalItemsSelectBox ||
        vm.pageSelectBox == 0
      ) {
        // vm.loading = true;
        vm.isShow = false;
        let filter1 = {
          page: vm.pageSelectBox,
          size: 10,
          tenDanhMuc: "mathanhphanhoso",
          keyword: vm.keywordSearchSelect ? vm.keywordSearchSelect : "",
        };
        let filter2 = {
          page: vm.pageSelectBox,
          size: 10,
          tenDanhMuc: "magiaytoketqua",
          keyword: vm.keywordSearchSelect ? vm.keywordSearchSelect : "",
        };
        let req1 = vm.$store.dispatch("getDanhMuc", filter1);
        let req2 = vm.$store.dispatch("getDanhMuc", filter2);
        let arrAction = [req1, req2];
        Promise.all(arrAction)
          .then((results) => {
            let res = results[0]["content"].concat(results[1]["content"]);
            vm.fileTemplateList = vm.fileTemplateList.concat(res);
            vm.isShow = true;
            vm.pageSelectBox++;
            vm.totalItemsSelectBox =
              results[0]["totalElements"] + results[1]["totalElements"];
            vm.loading = false;
            if (vm.$refs.autocomplete) {
              vm.$refs.autocomplete.onScroll();
            }
          })
          .catch((xhr) => {
            vm.loading = false;
          });
      }
    },
    loadMoreItemsDonVi() {
      let vm = this;
      if (
        vm.donViList.length < vm.totalItemsSelectDonVi ||
        vm.pageSelectDonVi == 0
      ) {
        // vm.loadingDonVi = true;
        vm.isShowDonVi = false;
        let filter = {
          page: vm.pageSelectDonVi,
          size: 20,
          keyword: vm.keywordSearchDonVi ? vm.keywordSearchDonVi : "",
        };
        vm.$store
          .dispatch("getDonVi", filter)
          .then((results) => {
            let res = results["content"];
            vm.donViList = vm.donViList.concat(res);
            vm.isShowDonVi = true;
            vm.pageSelectDonVi++;
            vm.totalItemsSelectDonVi = results["totalElements"];
            vm.loadingDonVi = false;
            if (vm.$refs.autocomplete1) {
              vm.$refs.autocomplete1.onScroll();
            }
          })
          .catch((xhr) => {
            vm.loadingDonVi = false;
          });
      }
    },
    strToJson(inputString) {
      var keyValuePairs = inputString.split(",");
      var result = {};

      keyValuePairs.forEach(function (keyValuePair) {
        var parts = keyValuePair.split("=");
        var key = parts[0].trim();
        var value = parts[1].trim();
        if (value.startsWith("U+")) {
          value = String.fromCharCode(parseInt(value.substring(2), 16));
        }
        result[key] = value;
      });
      return result;
    },
  },
};
</script>
