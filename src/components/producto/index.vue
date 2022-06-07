<template>
  <div ref="indexProducto">
    <el-button type="primary" @click="$refs.modalNuevo.abrir()">Nuevo</el-button>


    <el-card>
      <el-card>
        
      </el-card>

      <el-card style="margin-top: 10px">
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
              <el-button type="danger" round @click="eliminar(props.row.id)">Eliminar</el-button>                
            </template>
          </el-table-column>

          
          
        </el-table>
      </el-card>
    </el-card>

    <modal-nuevo
      ref="modalNuevo"
      @actualizarTabla="obtenerTodos"
    ></modal-nuevo>

    <modal-modificar
      ref="modalModificar"
      @actualizarTabla="obtenerTodos"
    ></modal-modificar>
  </div>
</template>

<script>
  import ModalNuevo from './modales/nuevo.vue'
  import ModalModificar from './modales/modificar.vue'

  export default {
    components:{
      ModalNuevo,
      ModalModificar
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

        this.axios.delete(this.url+"/productos/eliminar/"+id)
          .then(response => {
            this.productos = response.data
          })
        
            this.obtenerTodos()            


      }
    }
  }
</script>

<style>

</style>