import Vue from 'vue/dist/vue.min.js'
import Vuex from 'vuex'
import toastr from 'toastr'
import axios from 'axios'
import support from './support.json'

Vue.use(Vuex)
Vue.use(toastr)
export const store = new Vuex.Store({
  state: {
    initData: support.initData,
    endPoint: '/o/rest/v2',
    // endPoint: 'http://127.0.0.1:8081/api',
    originality: '',
    groupIdSite: '',
    totalEmployee: 0,
    filterDossierKey: {
      dossierNo: '',
      applicantIdNo: '',
      secretCode: ''
    },
    workingUnitSelect: null,
    loading: false,
    dossierDetail: {},
    index: 0,
    activeDetailService: false,
    applicantIdNoSearch: '',
    dossierNoSearch: '',
    fullScreen: false,
    isMobile: false
  },
  actions: {
    loadInitResource ({commit, state}) {
      return new Promise((resolve, reject) => {
        if (window.themeDisplay !== null && window.themeDisplay !== undefined) {
          state.initData['groupId'] = window.themeDisplay.getScopeGroupId()
          state.initData['user'] = {
            'userName': window.themeDisplay.getUserName(),
            'userEmail': '',
            'userId': window.themeDisplay.getUserId()
          }
        } else {
          state.initData['groupId'] = 0
          state.initData['user'] = {
            'userName': '',
            'userEmail': '',
            'userId': 20103
          }
        }
        resolve(state.initData)
      })
    },
    loadingDataHoSo ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            },
            params: {
              start: filter.page * 10 - 10,
              end: filter.page * 10,
              dossierNo: filter.dossierNo ? filter.dossierNo : '',
              applicantIdNo: filter.applicantIdNo ? filter.applicantIdNo : ''
            }
          }
          axios.get(state.endPoint + '/dossiers', param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadingDataHoSoFromMcToDvc ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let config = {
            headers: {
              'groupId': window.themeDisplay.getScopeGroupId()
            }
          }
          let textPost = {
            start: 0,
            end: 1,
            dossierNo: filter.dossierNo ? filter.dossierNo : ''
          }
          let dataPost = new URLSearchParams()
          dataPost.append('method', 'GET')
          dataPost.append('url', '/dossiers')
          dataPost.append('data', JSON.stringify(textPost))
          dataPost.append('serverCode', filter.serverCode)
          axios.post('/o/rest/v2/proxy', dataPost, config).then(function (response) {
            let serializable = response.data.data[0]
            resolve(serializable)
          }).catch(xhr => {
            reject(xhr)
          })
        })
      })
    },
    loadingDanhSachHoSo ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            },
            params: {
              dossierNo: filter.dossierNo ? filter.dossierNo : '',
              start: filter.start,
              end: filter.end
            }
          }
          axios.get(state.endPoint + '/dossiers', param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadingDataHoSoKQ ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: filter['groupId'] ? filter['groupId'] : state.initData.groupId
            },
            params: {
              step: '300,310,400',
              fromReleaseDate: filter.fromDate,
              toReleaseDate: filter.toDate,
              keyword: filter.keyword
            }
          }
          // test local
          axios.get(filter.url, param).then(function (response) {
          // axios.get('http://127.0.0.1:8081/api/dossiers', param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject([])
          })
        })
      })
    },
    loadingDataHoSoTN ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: filter['groupId'] ? filter['groupId'] : state.initData.groupId
            },
            params: {
              fromReceiveDate: filter.fromDate,
              toReceiveDate: filter.toDate,
              keyword: filter.keyword
            }
          }
          axios.get(state.endPoint + '/dossiers', param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    getDomainLists ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/serviceinfos/statistics/domains', param).then(function (response) {
            let serializable = response.data
            if (serializable.data) {
              let dataReturn = serializable.data
              resolve(dataReturn)
            } else {
              resolve([])
            }
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    getDomainListsPublic ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            },
            params: {
              start: filter.page * 10 - 10,
              end: filter.page * 10
            }
          }
          // test local
          axios.get(state.endPoint + '/serviceconfigs/pubish/' + filter.administrationCode + '/domains', param).then(function (response) {
          // axios.get('http://127.0.0.1:8081/api/serviceinfos/statistics/domains', param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    getGovAgency ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: data['groupId'] ? data['groupId'] : state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/serviceinfos/statistics/agencies', param).then(function (response) {
            let serializable = response.data
            if (serializable.data) {
              let dataReturn = serializable.data
              resolve(dataReturn)
            } else {
              resolve([])
            }
          }).catch(function (xhr) {
            console.log(xhr)
          })
        })
      })
    },
    agencies ({commit, state}) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let groupIdCurrent = ''
          let groupIdArr = []
          let groupIds = state.groupIdSite
          if (groupIds) {
            groupIdArr = groupIds.split(',')
          }
          if (groupIdArr.length === 0) {
            groupIdCurrent = window.themeDisplay.getScopeGroupId()
          }
          if (groupIdArr.length === 1) {
            groupIdCurrent = groupIdArr[0]
          }
          let filter = {
            groupId: groupIdCurrent
          }
          store.dispatch('getGovAgency', filter).then(function (result) {
            console.log('agencies', result)
            resolve(result)
          }).catch(reject => {
            resolve([])
          })
        })
      })
    },
    getGovAgencyDictItem ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/dictcollections/GOVERNMENT_AGENCY/dictitems', param).then(function (response) {
            let serializable = response.data
            if (serializable.data) {
              let dataReturn = serializable.data
              resolve(dataReturn)
            } else {
              resolve([])
            }
          }).catch(function (xhr) {
            console.log(xhr)
          })
        })
      })
    },
    getLevelLists ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/serviceinfos/statistics/levels', param).then(function (response) {
            let serializable = response.data
            if (serializable.data) {
              let dataReturn = serializable.data
              resolve(dataReturn)
            } else {
              resolve([])
            }
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    getServiceLists ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            },
            params: {
              start: filter.page * 10 - 10,
              end: filter.page * 10,
              administration: filter.administration ? filter.administration : '',
              keyword: filter.keyword ? filter.keyword : '',
              level: filter.level ? filter.level : 0,
              domain: filter.domain ? filter.domain : ''
            }
          }
          axios.get(state.endPoint + '/serviceinfos', param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    getServiceDetail ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/serviceinfos/' + filter.index, param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    getDossierDetail ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/dossiers/' + filter.dossierId, param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    getDossierDetailAllCase ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          if (!filter.isDvc) {
            let param = {
              headers: {
                groupId: state.initData.groupId
              }
            }
            axios.get(state.endPoint + '/dossiers/' + filter.dossierId, param).then(function (response) {
              let serializable = response.data
              resolve(serializable)
            }).catch(function (error) {
              console.log(error)
              reject(error)
            })
          } else {
            let config = {
              headers: {
                'groupId': window.themeDisplay.getScopeGroupId()
              }
            }
            let textPost = {
            }
            let dataPost = new URLSearchParams()
            dataPost.append('method', 'GET')
            dataPost.append('url', '/dossiers/' + filter.referenceUid)
            dataPost.append('data', JSON.stringify(textPost))
            dataPost.append('serverCode', filter.serverCode)
            axios.post('/o/rest/v2/proxy', dataPost, config).then(function (response) {
              let serializable = response.data
              resolve(serializable)
            }).catch(xhr => {
              reject(xhr)
            })
          }
          
        })
      })
    },
    getDossierDetailPass ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          if (!filter.isDvc) {
            let param = {
              headers: {
                groupId: state.initData.groupId,
                secretCode: filter.password
              },
              params: {}
            }
            axios.get(state.endPoint + '/dossiers/' + filter.dossierId, param).then(function (response) {
              resolve(response)
            }).catch(function (error) {
              console.log('error', error)
              reject(error)
            })
          } else {
            let config = {
              headers: {
                'groupId': window.themeDisplay.getScopeGroupId()
              }
            }
            let textPost = {
              secretKey: filter.password
            }
            let dataPost = new URLSearchParams()
            dataPost.append('method', 'GET')
            dataPost.append('url', '/dossiers/' + filter.referenceUid)
            dataPost.append('data', JSON.stringify(textPost))
            dataPost.append('serverCode', filter.serverCode)
            axios.post('/o/rest/v2/proxy', dataPost, config).then(function (result) {
              resolve(result)
            }).catch(xhr => {
              reject(xhr)
            })
          }
        })
      })
    },
    getDetailDossierQR ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            },
            params: {
              secretKey: filter.secretKey
            }
          }
          axios.get(state.endPoint + '/dossiers/' + filter.dossierId, param).then(function (response) {
            let serializable = response.data
            console.log('response', response)
            resolve(response)
          }).catch(function (error) {
            console.log('error', error)
            reject(error)
          })
        })
      })
    },
    getListHistoryProcessingItems ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          var listHistoryProcessing = []
          // test local
          axios.get(state.endPoint + '/dossierlogs/' + filter.dossierId + '/logs', param).then(function (response) {
          // axios.get('http://127.0.0.1:8081/api/dossiers/dossierlogs/77602/logs', param).then(function (response) {
            var serializable = response.data
            for (var key in serializable.data) {
              if (serializable.data[key].notificationType === 'PROCESS_TYPE') {
                listHistoryProcessing.push(serializable.data[key])
              }
            }
            resolve(listHistoryProcessing)
          })
          .catch(function (error) {
            reject(error)
          })
        })
      })
    },
    loadDossierActions ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let config = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/dossiers/' + data.dossierId + '/sequences', config).then(function (response) {
            resolve(response.data)
          }).catch(function (xhr) {
            reject(xhr)
          })
        })
      })
    },
    loadDossierTemplates ({ commit, state }, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.endPoint + '/dossiertemplates/' + filter.dossierTemplateNo, param).then(function (response) {
            let serializable = response.data
            resolve(serializable.dossierParts)
          }).catch(function (reject) {
            console.log(reject)
          })
        })
      })
    },
    // voting
    loadVoting ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        store.dispatch('loadInitResource').then(function (result1) {
          if (!data.isDvc) {
            let param = {
              headers: {
                groupId: state.initData.groupId
              }
            }
            axios.get(state.endPoint + '/postal/votings/' + data.className + '/' + data.classPk, param).then(result => {
              if (result.data) {
                resolve(result.data.data)
              } else {
                resolve([])
              }
              commit('setLoading', false)
            }).catch(xhr => {
              reject(xhr)
              commit('setLoading', false)
            })
          } else {
            let config = {
              headers: {
                'groupId': window.themeDisplay.getScopeGroupId()
              }
            }
            let textPost = {
            }
            let dataPost = new URLSearchParams()
            dataPost.append('method', 'GET')
            dataPost.append('url', '/postal/votings/' + data.className + '/' + data.classPk)
            dataPost.append('data', JSON.stringify(textPost))
            dataPost.append('serverCode', data.serverCode)
            axios.post('/o/rest/v2/proxy', dataPost, config).then(function (result) {
              if (result.data) {
                resolve(result.data.data)
              } else {
                resolve([])
              }
            }).catch(xhr => {
              reject(xhr)
            })
          }
          
        })
      })
    },
    loadVotingNew ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        store.dispatch('loadInitResource').then(function (result1) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          // test local
          axios.get(state.endPoint + '/postal/votings/dossier/0', param).then(result => {
          // axios.get('http://127.0.0.1:8081/api/votings/12/' + data.classPK, param).then(result => {
            if (result.data) {
              resolve(result.data.data)
            } else {
              resolve([])
            }
            commit('setLoading', false)
          }).catch(xhr => {
            reject(xhr)
            commit('setLoading', false)
          })
        })
      })
    },   
    submitVoting ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result1) {
          var params = new URLSearchParams()
          const config = {
            headers: {
              'groupId': state.initData.groupId
            }
          }
          params.append('className', data.className)
          params.append('classPk', data.classPk)
          params.append('selected', data.selected)
          if (data.className === 'dossier') {
            params.append('votingCode', data.votingCode ? data.votingCode : '')
          }
          // test local
          // axios.post('http://127.0.0.1:8081/api/votings/' + data.votingId, params, config).then(result => {
          axios.post(state.endPoint + '/postal/votings/' + data.votingId + '/results', params, config).then(result => {
            resolve(result.data)
          }).catch(xhr => {
            toastr.error('Gửi đánh giá thất bại')
            reject(xhr)
          })
        })
      })
    },
    submitVotingMC ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result1) {
          // api đồng bộ sang một cửa
          let config = {
            headers: {
              'groupId': window.themeDisplay.getScopeGroupId()
            }
          }
          let textPost = {
            className: data.className,
            classPk: data.classPk,
            selected: data.selected,
            votingCode: data.votingCode ? data.votingCode : ''
          }
          let dataPost = new URLSearchParams()
          dataPost.append('method', 'POST')
          dataPost.append('url', '/postal/votings/' + data.votingId + '/results')
          dataPost.append('data', JSON.stringify(textPost))
          dataPost.append('serverCode', data.serverCode)
          axios.post('/o/rest/v2/proxy', dataPost, config).then(function (result) {
            resolve(result.data)
          }).catch(xhr => {
            toastr.clear()
            toastr.error('Gửi đánh giá thất bại')
            reject(xhr)
          })
        }).catch(function (){})
      })
    },
    checkPermisionVoting ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function () {
          const config = {
            headers: {
              'groupId': state.initData.groupId
            },
            params: {
              applicantIdNo: filter.applicantIdNo,
              dossierNo: filter.dossierNo
            }
          }
          axios.get(state.endPoint + '/votings/checkpermission', config).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    },
    // action Danh gia can bo
    getWorkingUnit ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          // test local
          axios.get(state.endPoint + '/dictcollections/GOVERNMENT_AGENCY/dictitems', param).then(function (response) {
          // axios.get('http://127.0.0.1:8081/api/workingunits', param).then(function (response) {
            let serializable = response.data
            if (serializable.data) {
              let dataReturn = serializable.data
              resolve(dataReturn)
            } else {
              resolve([])
            }
          }).catch(function (error) {
            reject(error)
          })
        })
      })
    },
    getEmployee ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param
          param = {
            // workingunit: filter.workingunit,
            employeeName: filter.employeeName,
            start: filter.start,
            end: filter.end
          }
          let configs = {
            headers: {
              groupId: state.initData.groupId
            },
            params: param
          }
          // test local
          axios.get(state.endPoint + '/employees/publish/' + filter.workingunit, configs).then(function (response) {
          // axios.get('http://127.0.0.1:8081/api/employees', configs).then(function (response) {
            let serializable = response.data
            commit('setTotalEmployee', serializable.total)
            if (serializable.data) {
              let dataReturn = serializable.data
              for (let key in dataReturn) {
                dataReturn[key]['totalEvaluation'] = 0
                dataReturn[key]['veryGoodCount'] = 0
                dataReturn[key]['perVeryGood'] = 0
                dataReturn[key]['goodCount'] = 0
                dataReturn[key]['perGood'] = 0
                dataReturn[key]['badCount'] = 0
                dataReturn[key]['perBad'] = 0
              }
              resolve(dataReturn)
            } else {
              commit('setTotalEmployee', 0)
              resolve([])
            }
          }).catch(function (error) {
            commit('setTotalEmployee', 0)
            reject(error)
          })
        })
      })
    }
  },
  mutations: {
    setIndex (state, payload) {
      state.index = payload
    },
    setInitData (state, payload) {
      state.initData = payload
    },
    setDossierDetail (state, payload) {
      state.dossierDetail = payload
    },
    setFilterDossierKey (state, payload) {
      state.filterDossierKey = {
        dossierNo: payload.dossierNo ? payload.dossierNo : '',
        applicantIdNo: payload.applicantIdNo ? payload.applicantIdNo : '',
        secretCode: payload.secretCode ? payload.secretCode : ''
      }
    },
    setTotalEmployee (state, payload) {
      state.totalEmployee = payload
    },
    setWorkingUnitSelect (state, payload) {
      state.workingUnitSelect = payload
    },
    setActiveDetailService (state, payload) {
      state.activeDetailService = payload
    },
    setActiveDetailDossier (state, payload) {
      state.activeDetailDossier = payload
    },
    setApplicantIdNoSearch (state, payload) {
      state.applicantIdNoSearch = payload
    },
    setDossierNoSearch (state, payload) {
      state.dossierNoSearch = payload
    },
    setFullScreen (state, payload) {
      state.fullScreen = payload
    },
    setOriginality (state, payload) {
      state.originality = payload
    },
    setGroupid (state, payload) {
      state.groupIdSite = payload
    },
    setIsMobile (state, payload) {
      state.isMobile = payload
    }
  },
  getters: {
    index (state) {
      return state.index
    },
    getTotalEmployee (state) {
      return state.totalEmployee
    },
    getDetailDossier (state) {
      return state.dossierDetail
    },
    getFilterDossierKey (state) {
      return state.filterDossierKey
    },
    getActiveDetailService (state) {
      return state.activeDetailService
    },
    getApplicantIdNoSearch (state) {
      return state.applicantIdNoSearch
    },
    getDossierNoSearch (state) {
      return state.dossierNoSearch
    },
    getFullScreen (state) {
      return state.fullScreen
    },
    getIsMobile (state) {
      return state.isMobile
    },
    getOriginality (state) {
      return state.originality
    },
    getGroupid (state, payload) {
      return state.groupIdSite
    }
  }
})
