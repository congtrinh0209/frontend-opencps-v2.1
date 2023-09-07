<template>
  <div class="taotailieuketqua" style="background-color: white;width:100%">
    <v-expansion-panel :value="[true]" expand  class="expansion-pl">
      <v-expansion-panel-content>
        <div slot="header">
          <div class="background-triangle-small"> 
            <v-icon size="18" color="white">star_rate</v-icon> 
          </div> Tài liệu kết quả
        </div>
        <v-card>
          <div class="form_alpaca" style="position: relative;" v-for="(item, index) in createFiles" v-bind:key="item.partNo + 'cr'">
            <v-expansion-panel :value="[true]" expand  class="expaned__list__data">
              <v-expansion-panel-content hide-actions :value="false">
                <div slot="header" @click="stateView = false" style="background-color:#fff">
                  <div style="align-items: center;background: #fff; padding-left: 25px;" :style="{width: checkStyle(item)}">
                    <div v-for="(itemFileView, index) in dossierFilesItems" :key="index + 'cr'" v-if="item.dossierPartNo + id === itemFileView.dossierPartNo + id">
                      <div class="mb-2" style="width: calc(100% - 370px);display: flex;align-items: center;background: #fff;padding-left: 25px; font-size: 12px;">
                        <span class="text-bold">{{index + 1}}. </span>
                        <span v-on:click.stop="viewFile2(itemFileView)" class="ml-3" style="cursor: pointer;">
                          <v-icon class="mr-1" :color="getDocumentTypeIcon(itemFileView.fileType)['color']"
                            :size="getDocumentTypeIcon(itemFileView.fileType)['size']">
                            {{getDocumentTypeIcon(itemFileView.fileType)['icon']}}
                          </v-icon>
                          {{itemFileView.displayName ? itemFileView.displayName : itemFileView.dossierTemplateNo}} - 
                          <i>{{itemFileView.modifiedDate}}</i>
                        </span>
                        <!--  -->
                        <v-btn class="my-0 ml-2" small color="primary" style="height: 24px;"
                          v-if="(khoTaiLieuTapTrung || khoTaiLieuCongDan) && 
                          (!itemFileView.hasOwnProperty('isTaiSuDung') || itemFileView.isTaiSuDung == 0)" 
                          @click.stop="showAddStorage(item, itemFileView)"
                        >
                          <v-icon size="18" class="white--text">folder_shared</v-icon> &nbsp;
                          <span v-if="originality == 1">Lưu giấy tờ vào kho</span>
                          <span v-else>Số hóa</span>
                        </v-btn>
                        <!--  -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <v-card v-if="item.eForm">
                  <v-card-text style="background-color: rgba(244, 247, 213, 0.19);">
                    <v-layout wrap>
                      <v-flex xs12 class="text-xs-right">
                        <v-btn color="primary" @click="previewFileEfom(item, index)" v-if="item.daKhai && item.eForm">In</v-btn>
                        <div :id="'formAlpaca' + item.partNo + id">
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card> -->
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>
        </v-card>
        <v-dialog v-model="dialogPDF" max-width="900" transition="fade-transition" style="overflow: hidden;">
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>File đính kèm</v-toolbar-title>
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
            <iframe v-show="!dialogPDFLoading" :id="'dialogPDFPreviewTkq' + id" src="" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
            </iframe>
          </v-card>
        </v-dialog>
        <!--  -->
        <v-dialog v-model="dialog_add_giayto_trakq" scrollable persistent max-width="1000px">
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <span>Số hóa giấy tờ</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="dialog_add_giayto_trakq = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <so-hoa-giay-to ref="formSoHoaGiayToTraKq" @callBackSoHoaGiayTo="callBackSoHoa" :fileKhoGiayTo="fileKhoGiayTo" :partKhoGiayTo="partKhoGiayTo" :thongTinHoSo="detailDossier"></so-hoa-giay-to>
          </v-card>
        </v-dialog>
        <!--  -->
      </v-expansion-panel-content>
    </v-expansion-panel>
    <div style="display:none">
      <a id="downloadFileKhoTKQ" :href="srcDownload" download></a>
    </div>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import toastr from 'toastr'
  import SoHoaGiayTo from '.././TiepNhan/FormSoHoaGiayTo'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000'
  }
  export default {
    props: {
      id: {
        type: String,
        default: () => 'nm'
      },
      detailDossier: {
        type: Object,
        default: () => {}
      },
      createFiles: {
        type: Array,
        default: () => []
      }
    },
    components: {
      'so-hoa-giay-to': SoHoaGiayTo
    },
    data: () => ({
      dialog_add_giayto_trakq: false,
      partKhoGiayTo: '',
      fileKhoGiayTo: '',
      yeuCauSoHoa: false,
      khoTaiLieuTapTrung: false,
      khoTaiLieuCongDan: false,
      srcDownload: '',
      dossierTemplateItems: [],
      dossierMarksItems: [],
      dossierFilesItems: [],
      thongTinHoSo: {},
      valid: true,
      stateView: false,
      dialogAddOtherTemp: false,
      loadingAddOther: false,
      otherDossierTemplate: '',
      sheet: false,
      partView: '',
      dossierFileIdView: '',
      stateEdit: false,
      progressUploadPart: '',
      dialogPDF: false,
      dialogPDFLoading: true,
      stateAddFileOther: false,
      dossierTemplatesItemSelect: {},
      fileViews: [],
      sampleCount: 0,
      fileTemplateItems: []
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      originality () {
        var vm = this
        return vm.getOriginality()
      },
      initDataResource () {
        return this.$store.getters.loadingInitData
      }
    },
    watch: {
      dialog_add_giayto_trakq (val) {
        setTimeout(function () {
          if (val) {
            let myElements = document.querySelectorAll(".v-menu__content");
            for (let i = 0; i < myElements.length; i++) {
              myElements[i].style.position = 'fixed';
            }
          } else {
            let myElements = document.querySelectorAll(".v-menu__content")
            for (let i = 0; i < myElements.length; i++) {
              myElements[i].style.position = 'absolute';
            }
          }
        }, 300)
      },
    },
    created () {
      var vm = this
      try {
        vm.yeuCauSoHoa = yeuCauSoHoa
      } catch (error) {
      }
      try {
        vm.khoTaiLieuTapTrung = khoTaiLieuTapTrung
      } catch (error) {
      }
      try {
        vm.khoTaiLieuCongDan = khoTaiLieuCongDan
      } catch (error) {
      }
      vm.$nextTick(function () {
        if (vm.detailDossier['dossierId']) {
          var arrTemp = []
          arrTemp.push(vm.$store.dispatch('loadDossierFiles', vm.detailDossier.dossierId))
          arrTemp.push(vm.$store.dispatch('loadDossierTemplates', vm.detailDossier))
          Promise.all(arrTemp).then(values => {
            let dossierFiles = values[0]
            vm.dossierFilesItems = dossierFiles
            let arr = []
            for (let key in vm.createFiles) {
              let exits = arr.filter(function (item) {
                return vm.createFiles[key]['dossierPartNo'] === item.dossierPartNo
              })
              if (!exits || exits.length === 0) {
                arr.push(vm.createFiles[key])
              }
            }
            let dossierPart = values[1]['dossierParts']
            arr.forEach(element => {
              let part = dossierPart.find(function (item) {
                return item.partNo === element.dossierPartNo
              })
              element['partName'] = part.partName
            });
            vm.createFiles = arr
          })
        }
      })
    },
    mounted () {
      var vm = this
      vm.$nextTick(function () {
        if (vm.createFiles.length > 0) {
          setTimeout(function () {
            vm.genAllAlpacaForm(vm.dossierFilesItems, vm.createFiles)
          }, 300)
        }
      })
    },
    methods: {
      genAllAlpacaForm (dossierFiles, createFiles) {
        var vm = this
        if (dossierFiles.length > 0) {
          var dossierFilesEform = dossierFiles.filter(file => {
            return file.eForm
          })
          var dossierTemplatesHasForm = createFiles.filter(template => {
            return template.eForm
          })
          if (dossierFilesEform.length > 0) {
            dossierFilesEform.forEach(itemFiles => {
              if (itemFiles.eForm) {
                vm.$store.dispatch('loadAlpcaForm', itemFiles)
              }
            })
          } else {
            createFiles.forEach(val => {
              if (val.eForm) {
                val['templateFileNo'] = vm.detailDossier.dossierTemplateNo
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
                template['templateFileNo'] = vm.detailDossier.dossierTemplateNo
                vm.showAlpacaJSFORM(template)
              }
            })
          }
        } else {
          createFiles.forEach(val => {
            if (val.eForm) {
              val['templateFileNo'] = vm.detailDossier.dossierTemplateNo
              vm.showAlpacaJSFORM(val)
            }
          })
        }
      },
      mergeDossierTemplateVsDossierFiles (createFiles, dossierFiles) {
        var vm = this
        if (dossierFiles.length !== 0) {
          createFiles.forEach(template => {
            var itemFind = dossierFiles.find(file => {
              return template.partNo === file.dossierPartNo && file.eForm
            })
            if (itemFind) {
              template['daKhai'] = true
            } else if (!itemFind && template.eForm) {
              template['daKhai'] = false
            }
          })
        } else {
          createFiles.forEach(template => {
            if (template.eForm) {
              template['daKhai'] = false
            }
          })
        }
        return createFiles
      },
      showAlpacaJSFORM (item) {
        var vm = this
        item['dossierId'] = vm.detailDossier.dossierId
        vm.$store.dispatch('loadFormScript', item).then(resScript => {
          vm.$store.dispatch('loadFormData', item).then(resData => {
            window.$('#formAlpaca' + item.partNo + vm.id).empty()
            var formScript, formData
            /* eslint-disable */
            if (resScript) {
              formScript = eval('(' + resScript + ')')
            } else {
              formScript = {}
            }
            if (resData) {
              formData = eval('(' + resData + ')')
            } else {
              formData = {}
            }
            /* eslint-disable */
            formScript.data = formData
            window.$('#formAlpaca' + item.partNo + vm.id).alpaca(formScript)
          })
        })
      },
      loadAlpcaForm (data) {
        var vm = this
        var fileFind = vm.dossierFilesItems.find(itemFile => {
          return itemFile.dossierPartNo === data.partNo && itemFile.eForm
        })
        if (fileFind) {
          fileFind['id'] = vm.id
          vm.$store.dispatch('loadAlpcaForm', fileFind)
        } else {
          vm.createFiles.forEach(val => {
            if (val.eForm && data.partNo === val.partNo) {
              val['templateFileNo'] = vm.detailDossier.dossierTemplateNo
              vm.showAlpacaJSFORM(val)
            }
          })
        }
      },
      previewFileEfom (item, index) {
        var vm = this
        vm.dossierFilesItems.forEach(file => {
          if (file.dossierPartNo === item.partNo && file.eForm) {
            file['dossierId'] = vm.detailDossier.dossierId
            vm.dialogPDFLoading = true
            vm.dialogPDF = true
            file['id'] = vm.id
            vm.$store.dispatch('putAlpacaForm', file).then(resData => {
              setTimeout(function () {
                vm.$store.dispatch('viewFile', file).then(result => {
                  vm.dialogPDFLoading = false
                  document.getElementById('dialogPDFPreviewTkq' + vm.id).src = result
                })
              }, 1000)
            }).catch(reject => {
              toastr.error('Yêu cầu của bạn được thực hiện thất bại.')
            })
          }
        })
      },
      viewFile (data) {
        var vm = this
        vm.dossierFilesItems.forEach(val => {
          val['dossierId'] = vm.detailDossier.dossierId
          if (val.dossierPartNo === data.partNo) {
            this.$store.dispatch('viewFile', val)
          }
        })
      },
      viewFile2 (data) {
        var vm = this
        let fileKhoSoHoa = data.hasOwnProperty('url') && data.url && data.url.indexOf('{urlKhoSoHoa}/') == 0
        if (!fileKhoSoHoa) {
          if (data.fileType === 'doc' || data.fileType === 'docx' || data.fileType === 'xlsx' || data.fileType === 'xls' || data.fileType === 'zip' || data.fileType === 'rar' || data.fileType === 'txt') {
            var url = vm.initDataResource.dossierApi + '/' + vm.detailDossier.dossierId + '/files/' + data.referenceUid
            window.open(url)
          } else {
            vm.dialogPDFLoading = true
            vm.dialogPDF = true
            data['dossierId'] = vm.detailDossier.dossierId
            vm.$store.dispatch('viewFile', data).then(result => {
              vm.dialogPDFLoading = false
              document.getElementById('dialogPDFPreviewTkq' + vm.id).src = result
            })
          }
        } else {
          vm.dialogPDFLoading = true
          let filter = {
            id: data.url.split("/").pop(),
            collection: 'giaytoluutruso'
          }
          vm.$store.dispatch('getTepDuLieu', filter).then(function (result) {
            vm.dialogPDFLoading = false
            vm.dialogPDF = true
            let fileType = data.displayName.split(".")[1].toLowerCase()
            if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'pdf' || fileType === 'gif' ||
              fileType === 'tif' || fileType === 'tiff'
            ) {
              document.getElementById('dialogPDFPreviewTkq' + vm.id).src = result
            } else {
              vm.srcDownload = result
              setTimeout(function () {
                document.getElementById('downloadFileKhoTKQ').click()
              }, 100)
            }
          }).catch(function () {
            vm.dialogPDFLoading = false
            toastr.error('Tải xuống không thành công')
          })
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
      showAddStorage (part, file) {
        let vm = this
        vm.partKhoGiayTo = part
        vm.fileKhoGiayTo = file
        vm.dialog_add_giayto_trakq = true
        setTimeout(function () {
          vm.$refs.formSoHoaGiayToTraKq.initData()
        }, 100)
      },
      callBackSoHoa(data) {
        let vm = this
        vm.dialog_add_giayto = false
        console.log('fileKhoGiayTo', vm.fileKhoGiayTo)
        console.log('dossierFilesItems', vm.dossierFilesItems)
        if (vm.khoTaiLieuTapTrung) {
          let filter = {
            dossierId: vm.detailDossier.dossierId,
            referenceUid: vm.fileKhoGiayTo.referenceUid,
            url: '{urlKhoSoHoa}/' + data.GiayToCaNhanToChuc.TepDuLieu[0].MaDinhDanh
          }
          vm.$store.dispatch('capNhatGiayToSoHoa', filter).then(resData => {
            setTimeout(function () {
              if (vm.originality == 3) {
                let params = {
                  dossierId: vm.detailDossier.dossierId,
                  referenceUid: vm.fileKhoGiayTo.referenceUid,
                  payload: {
                    isTaiSuDung: 3
                  }
                }
                vm.$store.dispatch('updateDossierFile', params).then(result => {
                  setTimeout(function () {
                    vm.$store.dispatch('loadDossierFiles', vm.detailDossier.dossierId).then(resFiles => {
                      vm.dossierFilesItems = resFiles
                    }).catch(reject => {
                    })
                  }, 200)
                }).catch(reject => {
                })
              } else {
                vm.$store.dispatch('loadDossierFiles', vm.detailDossier.dossierId).then(resFiles => {
                  vm.dossierFilesItems = resFiles
                }).catch(reject => {
                })
              }
            }, 200)
          })
        } else {
          if (vm.originality == 3) {
            let params = {
              dossierId: vm.detailDossier.dossierId,
              referenceUid: vm.fileKhoGiayTo.referenceUid,
              payload: {
                isTaiSuDung: 3
              }
            }
            vm.$store.dispatch('updateDossierFile', params).then(result => {
              setTimeout(function () {
                vm.$store.dispatch('loadDossierFiles', vm.detailDossier.dossierId).then(resFiles => {
                  vm.dossierFilesItems = resFiles
                }).catch(reject => {
                })
              }, 200)
            }).catch(reject => {
            })
          } else {
            vm.$store.dispatch('loadDossierFiles', vm.detailDossier.dossierId).then(resFiles => {
              vm.dossierFilesItems = resFiles
            }).catch(reject => {
            })
          }
        }
        
      },
      checkStyle (item) {
        return 'calc(100% - ' + 50 + 'px)'
      },
      downloadFileTemplate (item, index) {
        var vm = this
        if (vm.fileTemplateItems.length > 0) {
          let fileFind = vm.fileTemplateItems.find(file => {
            return item.fileTemplateNo === file.fileTemplateNo
          })
          if (fileFind) {
            let url = vm.initDataResource.serviceInfoApi + '/' + fileFind.serviceCode + '/filetemplates/' + fileFind.fileTemplateNo
            window.open(url)
          } else {
            console.log('ko thay file')
          }
        }
      },
      getDocumentTypeIcon (type) {
        let vm = this
        let typeDoc = 'doc,docx'
        let typeExcel = 'xls,xlsx'
        let typeImage = 'png,jpg,jpeg'
        if (type) {
          if (typeDoc.indexOf(type.toLowerCase()) >= 0) {
            return {
              icon: 'fas fa fa-file-word-o',
              color: 'blue',
              size: 14
            }
          } else if (typeExcel.indexOf(type.toLowerCase()) >= 0) {
            return {
              icon: 'fas fa fa-file-excel-o',
              color: 'green',
              size: 14
            }
          } else if (type.toLowerCase() === 'pdf') {
            return {
              icon: 'fa fa-file-pdf-o',
              color: 'red',
              size: 14
            }
          } else if (typeImage.indexOf(type.toLowerCase()) >= 0) {
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
          return {
            icon: 'attach_file',
            color: 'primary',
            size: 14
          }
        }
      },
    }
  }
</script>
