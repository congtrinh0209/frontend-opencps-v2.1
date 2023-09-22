<template>
  <div id="pdfSign">
    <v-card-text class="px-0 pt-0 pb-0">
      <div class="edit-toolbar">
        <div style="max-width: 892px;margin: 0 auto;">
          <span style="float: left;margin-top: 10px;">Quét để chọn vị trí đặt chữ ký số</span>
          <div style="display: inline-block">
              <button class="btn-pdf-page" @click="changePage('first')"><i class="fa fa-angle-double-left icon-btn"></i></button>
              <button class="btn-pdf-page" @click="changePage('priv')"><i class="fa fa-angle-left icon-btn"></i></button>
              <span style="font-size: 18px;border: 1px solid #dee2e6; color: #6c757d;padding: 5px 10px;border-radius: 5px;">
                {{ currentPage }} / {{ totalPage }}
              </span>
              <button class="btn-pdf-page" @click="changePage('next')"><i class="fa fa-angle-right icon-btn"></i></button>
              <button class="btn-pdf-page" @click="changePage('last')"><i class="fa fa-angle-double-right icon-btn"></i></button>
          </div>
          
          <button class="btn-submit-sign right" @click="exportCoordinate"><i class="fa fa-check"></i> Xác nhận vị trí đã chọn</button>
          <button class="btn-submit-sign auto-sign mx-3 right" @click="signAuto"><i class="fa fa-refresh mr-2"></i>Đặt vị trí tự động</button>
        </div>
      </div>
      <div style="background: #e9ecef;text-align: center;">
        <canvas id="pdf-doc"></canvas>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import Vue from "vue";
import toastr from "toastr";
Vue.use(toastr);

toastr.options = {
  positionClass: "toast-top-center",
  timeOut: "5000",
};
export default {
  name: "PdfCoordinate",
  props: ["urlPdf", "bas64Pdf"],
  data() {
    return {
      coordinateSign: [],
      pdfRef: null,
      currentPage: 1,
      totalPage: 0
    };
  },
  created() {
    let vm = this;
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      let vm = this;
      let currentQuery = newRoute.query;
    },
  },
  computed: {},
  methods: {
    renderPage (pageNum, pdf) {
      let vm = this
      const canvasRef = document.getElementById("pdf-doc");
      let canvasOfDoc = canvasRef;
      const zoomScale = 1.5;
      const rotateAngle = 0;
      pdf &&
        pdf.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({ scale: zoomScale, rotation: rotateAngle });
          canvasOfDoc.height = viewport.height;
          canvasOfDoc.width = viewport.width;
          const renderContext = {
            canvasContext: canvasOfDoc.getContext("2d"),
            viewport: viewport,
            textContent: vm.pdfRef,
          };
          page.render(renderContext);
        });
    },
    init() {
      let vm = this;
      const canvasRef = document.getElementById("pdf-doc");
      vm.pdfRef = null;
      let pdf_image = null;
      let cursorInCanvas = false;
      let canvasOfDoc = canvasRef;
      let startX = 0;
      let startY = 0;
      let ctx = canvasOfDoc.getContext("2d");

      // Thiết lập thông số
      vm.currentPage = 1;
      // Hàm render trang PDF
      

      // Hàm lưu hình ảnh ban đầu của canvas
      const saveInitialCanvas = () => {
        if (canvasOfDoc.getContext) {
          const canvasPic = new Image();
          canvasPic.src = canvasOfDoc.toDataURL();
          pdf_image = canvasPic;
        }
      };

      // Hàm xử lý khi chuột di vào canvas
      const handleMouseIn = (e) => {
        if (!pdf_image) {
          saveInitialCanvas();
        }
        e.preventDefault();
        e.stopPropagation();
        startX = ((e.offsetX * canvasOfDoc.width) / canvasOfDoc.clientWidth) | 0;
        startY = ((e.offsetY * canvasOfDoc.width) / canvasOfDoc.clientWidth) | 0;
        cursorInCanvas = true;
      };

      // Hàm xử lý khi chuột di ra khỏi canvas
      const handleMouseOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        cursorInCanvas = false;
      };

      // Hàm xử lý khi chuột di chuyển trên canvas
      const handleMouseMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!cursorInCanvas) {
          return;
        }
        const mouseX = ((e.offsetX * canvasOfDoc.width) / canvasOfDoc.clientWidth) | 0;
        const mouseY = ((e.offsetY * canvasOfDoc.width) / canvasOfDoc.clientWidth) | 0;
        const width = mouseX - startX;
        const height = mouseY - startY;
        if (ctx) {
          ctx.clearRect(0, 0, canvasOfDoc.width, canvasOfDoc.height);
          ctx.drawImage(pdf_image, 0, 0);
          ctx.beginPath();
          ctx.rect(startX, startY, width, height);
          ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
          ctx.fillRect(startX, startY, width, height);
        }
        vm.coordinateSign = [startX*2/3, startY*2/3, mouseX*2/3, mouseY*2/3]
        // console.log('yyyy', startX, startY, mouseX, mouseY)
      };

      // Thêm sự kiện chuột cho canvas
      canvasOfDoc.addEventListener("mousedown", (e) => handleMouseIn(e));
      canvasOfDoc.addEventListener("mousemove", (e) => handleMouseMove(e));
      canvasOfDoc.addEventListener("mouseup", (e) => handleMouseOut(e));
      canvasOfDoc.addEventListener("mouseout", (e) => handleMouseOut(e));

      const loadPdf = () => {
        const loadingTask = pdfjsLib.getDocument(vm.urlPdf ? vm.urlPdf  : {data: atob(vm.bas64Pdf)});
        loadingTask.promise.then(
          (loadedPdf) => {
            vm.pdfRef = loadedPdf;
            console.log('pdfRef', vm.pdfRef)
            vm.renderPage(vm.currentPage, vm.pdfRef);
            vm.totalPage = vm.pdfRef.numPages
          },
          function (reason) {
            console.error(reason);
          }
        );
      };
      loadPdf();
    },
    changePage (action) {
      let vm = this
      if (action === 'first') {
        vm.currentPage = 1
      } else if (action === 'priv') {
        if (vm.currentPage !== 1) {
          vm.currentPage -= 1
        } else {
          return
        }
      } else if (action === 'next') {
        if (vm.currentPage !== vm.totalPage) {
          vm.currentPage += 1
        } else {
          return
        }
      } else {
        vm.currentPage = vm.totalPage
      }
      vm.renderPage(vm.currentPage, vm.pdfRef);
    },
    exportCoordinate () {
      let vm = this
      if (!vm.coordinateSign.length || (vm.coordinateSign[0] == vm.coordinateSign[2])) {
        toastr.error('Vui lòng quét để chọn vị trí đặt chữ ký')
        return
      }
      let x = []
      let y = []
      let coordSubmit = []
      
      let widthCanvas = document.getElementById("pdf-doc").width*2/3
      let heightCanvas = document.getElementById("pdf-doc").height*2/3
      if (vm.coordinateSign && vm.coordinateSign.length) {
        if (vm.coordinateSign[0] <= vm.coordinateSign[2]) {
          x = [vm.coordinateSign[0], vm.coordinateSign[1]]
          y = [vm.coordinateSign[2], vm.coordinateSign[3]]
        } else {
          y = [vm.coordinateSign[0], vm.coordinateSign[1]]
          x = [vm.coordinateSign[2], vm.coordinateSign[3]]
        }
        coordSubmit = [Math.round(x[0]), Math.round(heightCanvas - y[1]), Math.round(heightCanvas - x[1]), Math.round(y[0])]
      }
      console.log('x:y', x, y)
      vm.$emit("submitCoordinate", {"coordinate": coordSubmit, "page": vm.currentPage})
    },
    signAuto () {
      let vm = this
      vm.$emit("submitCoordinate", {"coordinate": [0,0,0,0], "page": 1})
    },
    getCoordinate () {
      let vm = this
      return vm.coordinateSign
    }
  },
};
</script>

  
  