<template>
  <div>
    <el-dialog v-model="visible" :width="width" :before-close="beforeClose" :show-close="false">
      <template #title>
        <div class="maca-modal_header">
          <div class="maca-modal_title">
            <component :is="headerIcon" style="margin-right: 5px"></component>
            <h1>{{ titulo }}</h1>
          </div>
          <!-- <MacaButton class="close-button" type="text" circle @click="cerrar">
            <vi-carbon-close></vi-carbon-close>
            <span>Cerrar</span>
          </MacaButton> -->
           <el-button class="close-button" type="danger" round @click="cerrar">X</el-button>
        </div>
      </template>
      <div :key="contentKey" class="maca-modal_body">
        <slot></slot>
      </div>
      <template #footer>
        <div class="maca-modal_footer">
          <slot name="footer"></slot>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { markRaw } from 'vue'

// vi-carbon-edit
// import IconEditImport from 'virtual:vite-icons/carbon/edit'
// // vi-carbon-new-tab
// import IconNewTabImport from 'virtual:vite-icons/carbon/new-tab'
// // vi-carbon-report
// import IconReportImport from 'virtual:vite-icons/carbon/report'

// const IconEdit = markRaw(IconEditImport)
// const IconNewTab = markRaw(IconNewTabImport)
// const IconReport = markRaw(IconReportImport)

export default {
  name: 'Modal',
  props: {
    titulo: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '900px',
    },
    icon: {
      type: Object,
      default: null,
    },
    impedirClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      contentKey: 0,
      // headerIcon: IconReport,
    }
  },
  created() {
    const titulo = this.titulo.toLowerCase()

    // if (this.icon != null)
    //   this.headerIcon = this.icon
    // else if (titulo.includes('crear ')
    //   || titulo.includes('nuevo ')
    //   || titulo.includes('nueva '))
    //   // this.headerIcon = IconNewTab
    // else if (titulo.includes('modificar ')
    //   || titulo.includes('actualizar ')
    //   || titulo.includes('editar '))
    //   // this.headerIcon = IconEdit
  },
  methods: {
    abrir() {
      this.contentKey += 1
      this.visible = true
    },
    cerrar() {
      this.visible = false
    },
    beforeClose(done) {
      if (this.impedirClose)
        return

      this.$confirm('¿Está seguro de que desea cerrar el formulario?')
        .then((_) => {
          done()
        })
        .catch(() => { })
    },
  },
}
</script>

<style scoped>
.maca-modal_header {
  padding: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
}
.maca-modal_body {
  padding: 35px;
  padding-top: 30px;
  padding-bottom: 10px;
}
.maca-modal_footer {
  padding: 35px;
  padding-top: 0px;
}
.maca-modal_title {
  display: flex;
  color: #283747;
  font-weight: bold;
}
.maca-modal_title > * {
  margin: auto;
  margin-left: 0px;
  margin-right: 0px;
}
.close-button {
  margin: auto;
  margin-right: 0px;
}
</style>

<style>
.el-dialog__header {
  padding: 0px;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.el-dialog {
  margin-top: 8vh !important;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 6px 10px 1px rgba(0, 0, 0, 0.2);
}
.el-dialog__body {
  padding: 0px;
}
.el-dialog__footer {
  padding: 0px;
}
</style>
