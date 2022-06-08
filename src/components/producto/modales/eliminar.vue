<template>
    <div>
        <modal-eliminar
            ref="modal"
            titulo="Eliminar"
            :impedir-close="impedirClose"
        >
            <h2>¿Desea eliminar el producto?</h2>
            <el-row>
                <el-col :span="12">
                    <el-button type="danger" @click="cerrar()">Cancelar</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button type="primary" @click="eliminar()">Confirmar</el-button>
                </el-col>
            </el-row>
        </modal-eliminar>        
    </div>
</template>

<script>    

    export default {
        name: "NuevaCompraProv",
        components:{
            
        },
        data() {
            return {
                form: {
                    nombre: null,
                    unidadMedida: null,
                    id: null,
                },

                url: "http://127.0.0.1:8000/api",

            }
        },

        methods: {
            abrir(id) {
                this.id = id
                this.$refs.modal.abrir();
            },  

            cerrar() {
                this.$refs.modal.cerrar();
            },

            onSubmit(){
                let params = {
                nombre: this.form.nombre,
                unidadMedida: this.form.unidadMedida,
                }

                this.axios.post(this.url+"/productos/crear", params)
                .then(response => {
                    this.$emit('actualizarTabla')
                    this.cerrar()

                })

                this.form.nombre = ""
                this.form.unidadMedida = ""

            },

            async eliminar(id){
                console.log(id)
                await this.axios.delete(this.url+"/productos/eliminar/"+this.id)
                .then(response => {
                    // this.productos = response.data
                    this.$emit('actualizarTabla')
                    this.cerrar()
                })
                
                // this.obtenerTodos()            


            }
        },
    }    
</script>