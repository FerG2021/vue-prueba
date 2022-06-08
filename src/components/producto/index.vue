<template>
  <div ref="indexProducto">


    <el-card>
        <template #header>  
          <h3>Productos</h3>
        </template>

        <el-button type="primary" @click="$refs.modalNuevo.abrir()" style="margin: auto; margin-right: 0px">Nuevo</el-button>


        <el-table :data="productos" style="width: 100%" v-loading="loading">
          <el-table-column prop="nombre" label="Nombre"  />
          <el-table-column prop="unidadMedida" label="Unidad medida"  />
          <el-table-column prop="editar" label="Editar">
            <template #default="props">               
              <el-button type="primary" round @click="$refs.modalModificar.abrir(props.row.id)">Editar</el-button>     
            </template>
          </el-table-column>
          <el-table-column prop="eliminar" label="Eliminar">
            <template #default="props">                
              <el-button type="danger" round @click="$refs.modalEliminar.abrir(props.row.id)">Eliminar</el-button>                
            </template>
          </el-table-column>          
        </el-table>
    </el-card>

    <modal-nuevo
      ref="modalNuevo"
      @actualizarTabla="obtenerTodos"
    ></modal-nuevo>

    <modal-modificar
      ref="modalModificar"
      @actualizarTabla="obtenerTodos"
    ></modal-modificar>

    <modal-eliminar
      ref="modalEliminar"
      @actualizarTabla="obtenerTodos"      
    ></modal-eliminar>
  </div>
</template>

<script>
  import ModalNuevo from './modales/nuevo.vue'
  import ModalModificar from './modales/modificar.vue'
  import ModalEliminar from './modales/eliminar.vue'

  export default {
    components:{
      ModalNuevo,
      ModalModificar,
      ModalEliminar
    },
    data() {
      return {
        

        productos: [],
        actualizar: true,
        loading: false,

        url: "http://127.0.0.1:8000/api",
      }
    },

    created(){
      this.obtenerTodos()
    },

     watch: {
    // Prop para actualizar la tabla
    actualizar: {
        handler() {
          if (this.actualizar) this.cambiarPagina(this.pagActual);
        },
      },
    },

    methods:{
      obtenerTodos(){
        console.log("entrando a obtener todos")
        this.loading = true
        this.axios.get(this.url+"/productos/obtenerTodos")
          .then(response => {
            this.productos = response.data
            console.log(this.productos)
          })
        this.loading = false
      },  
      
      async eliminar(id){
        console.log(id)
        const confirmado = await this.$confirm(
					"Confirme que desea eliminar la orden de pago al proveedor"
				);

        if (!confirmado) return;

        await this.axios.delete(this.url+"/productos/eliminar/"+id)
          .then(response => {
            this.productos = response.data
            console.log("realiza la eliminacion")
          })
        
          // this.obtenerTodos()            


      }
    }
  }
</script>

<style>

</style>