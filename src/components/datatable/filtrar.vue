<template>
  <div style="padding-left: 0px;">
    <span v-text="label"></span>
    <el-popover
      ref="popover"
      v-model="popoverVisible"
      placement="bottom"
      trigger="click"
      popper-class="popbuscar"
      @after-enter="hacerFocus"
    >
      <div style="display: flex;">
        <el-button
          type="text"
          icon="el-icon-delete"
          size="small"
          style="width: 40px"
          @click="limpiar()"
        ></el-button>
        <el-input
          ref="textbox"
          v-model="buscarInput"
          size="small"
          :placeholder="label"
          @keyup.enter="guardarValor()"
        ></el-input>
        <div style="display: flex">
          <el-button
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-check"
            size="small"
            plain
            circle
            @click="guardarValor()"
          ></el-button>
        </div>
      </div>
      <template #reference>
        <el-button
          v-if="currentValue == null || currentValue == ''"
          type="text"
          style="margin-left: 5px; width: 25px;"
          size="small"
        >
          <span>
            <i class="el-icon-search"></i>
          </span>
        </el-button>
        <el-button v-else type="primary" circle size="mini" style="margin-left: 5px;">
          <span>
            <i class="el-icon-search"></i>
          </span>
        </el-button>
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      buscarInput: '',
      currentValue: null,
      popoverVisible: false,
    }
  },
  created() {
    this.currentValue = this.modelValue
  },
  methods: {
    guardarValor() {
      this.$emit('update:modelValue', this.buscarInput)
      this.currentValue = this.buscarInput
      this.popoverVisible = false
    },
    limpiar() {
      this.$emit('update:modelValue', null)
      this.currentValue = null
      this.popoverVisible = false
    },
    hacerFocus() {
      this.$refs.textbox.focus()
    },
  },
}
</script>
