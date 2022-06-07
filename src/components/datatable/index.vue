<template>
  <div class="contenedor-tabla">
    <el-table v-loading="cargando" :data="tableData" stripe :row-class-name="rowClassName">
      <el-table-column :width="13"></el-table-column>

      <slot></slot>
      <el-table-column :width="13"></el-table-column>

      <template #append>
        <slot name="append"></slot>
      </template>
    </el-table>
    <div style="display: flex">
      <el-pagination
        style="margin: auto"
        :current-page="paginationProps.pagActual"
        :page-sizes="paginationProps.pageSizes"
        :page-size="paginationProps.pagTotal"
        :layout="paginationProps.layout"
        :total="paginationProps.pagTotalItems"
        @size-change="paginationProps.pageSizes"
        @current-change="cambiarPagina"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MacaDatatable',
  components: {},
  // nota: Usar los props actualizar y bloquear con sync
  props: {
    url: {
      type: String,
      default: null,
    },
    params: {
      type: Object,
      default: () => {
        return {}
      },
    },
    datosPrueba: {
      type: Array,
      default: null,
    },
    variableDatos: {
      type: String,
      default: null,
    },
    actualizar: {
      type: Boolean,
      default: false,
    },
    bloquear: {
      type: Boolean,
      default: false,
    },
    rowClassName: {
      type: Function,
      default: null,
    },
    timeoutHabilitado: {
      type: Boolean,
      default: true,
    },
    atributosFalsos: {
      type: Array,
      default: null,
    },
    method: {
      type: String,
      default: 'get',
    },

    // Para atributos del frontend que son necesarios
    // agregar antes de que se carguen los datos al datatable
    // ej: checked
    // Esto pasa porque la tabla no se vuelve a renderizar si un atributo
    // que no estaba antes del renderizado cambia
    preAgregarAtributos: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      datosApi: null,
      pagActual: 1,
      cargando: false,
    }
  },
  computed: {
    // Obtiene los datos a mostrar en la tabla, osea el componente, desde los datos de API
    tableData() {
      if (this.datosApi != null) {
        // los datos estan paginados?
        if (this.datosApi.datos != null) {
          // En el caso de obtenerTodos productos, es datos.data en vez de datos
          // TODO cambiar a datos en API
          if (this.variableDatos == null)
            return this.datosApi.datos
          else
            return this.datosApi.datos[this.variableDatos]
        }
        else {
          return this.datosApi
        }
      }
      else {
        return []
      }
    },

    paginationProps() {
      /*
        Ej:
        Si pageSizes = 10 y total = 15 entonces se mostrará para seleccionar 2 páginas.
        si pageSizes = 1 y total = 5 entonces se mostrará para seleccionar 5 páginas.
        */
      const props = {
        pageSizes: [1],
        layout: 'prev, pager, next, jumper',
        pagTotal: 10,
        pagActual: 1,
        pagTotalItems: 1,
      }

      if (this.datosApi != null) {
        props.pagActual = this.datosApi.datosPaginado.pagActual
        props.pagTotalItems = this.datosApi.datosPaginado.pagTotalItems
      }

      return props
    },
  },
  watch: {
    // Prop para actualizar la tabla
    actualizar: {
      handler() {
        if (this.actualizar)
          this.cambiarPagina(this.pagActual)
      },
    },

    // Prop para bloquear la tabla
    bloquear: {
      handler() {
        this.cargando = this.bloquear
      },
    },
  },
  created() {
    if (!this.datosPrueba) {
      // la funcion cambiar pagina hace la peticion a la api
      this.cambiarPagina(this.pagActual)
    }
    else {
      this.datosApi = {
        datosPaginado: {
          pagActual: 1,
          pagTotalItems: this.datosPrueba.length,
        },
        datos: this.datosPrueba,
      }
      this.procesarDatosApi(this.datosApi)
    }
  },
  methods: {
    // Llamada a API con la URL proporcionada en props
    // Si existen parametros, añadirlos
    get() {
      const urlParams = {
        nroPagina: this.pagActual,
      }

      Object.keys(this.params).forEach((paramKey) => {
        urlParams[paramKey] = this.params[paramKey]
      })

      this.cargando = true

      if (this.timeoutHabilitado) {
        if (this.method == 'get')
          return this.$maca.api.get(this.url, urlParams)

        else if (this.method == 'post')
          return this.$maca.api.post(this.url, urlParams)
      }
      else {
        if (this.method == 'get')
          return this.$maca.api.get(this.url, urlParams, 0)

        else if (this.method == 'post')
          return this.$maca.api.post(this.url, urlParams, 0)
      }

      return new Promise(() => {
        return null
      })
    },

    // Guarda datos despues de recibirlos de la API
    // Emite eventos que pueden ser de utilidad, y desbloquea la tabla
    procesarDatosApi(datos) {
      // agregar atributos que el frontend necesita
      // por ejemplo, un atributo "checked" si se quiere seleccionar las filas
      if (this.preAgregarAtributos) {
        datos.datos.forEach((fila) => {
          Object.keys(this.preAgregarAtributos).forEach((atributo) => {
            fila[atributo] = this.preAgregarAtributos[atributo]
          })
        })
      }

      this.datosApi = datos

      this.cargando = false

      if (Array.isArray(datos)) {
        if (datos.length > 0)
          this.$emit('tabla-no-vacia')
      }
      else {
        if (datos != null && datos.datos != null && datos.datos.length > 0)
          this.$emit('tabla-no-vacia')
      }
      this.$emit('tabla-cargada', this.datosApi)
    },

    // Maneja los botones de cambio de página
    // *Emitir actualizar = false en cada posibilidad
    // sino el datatable se traba en actualizar = true en algunas ocaciones.
    // Por ejemplo, al setear actualizar = true al crear la tabla
    // Tener en cuenta que el proceso es asincronico. La tabla debe estar bloqueada/actualizando
    // hasta que la consulta termine
    async cambiarPagina(queryInfo) {
      this.pagActual = queryInfo

      const result = await this.get()

      this.procesarDatosApi(result)
      this.$emit('update:actualizar', false)
      this.$emit('update:bloquear', false)
    },
  },
}
</script>

<style scoped>
.contenedor-tabla {
  overflow: hidden;
  position: relative;
}
.contenedor-tabla-cargando {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background: rgba(255, 255, 255, 0.5);
}
</style>
