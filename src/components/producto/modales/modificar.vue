<template>
    <div>
        <modal
            ref="modal"
            titulo="Nueva compra proveedor"
            :impedir-close="impedirClose"
        >
            <el-form label-width="120px">
                <el-form-item label="Producto">
                    <el-input v-model="form.nombre" />
                </el-form-item>

                <el-form-item label="Un. medida">
                    <el-input v-model="form.unidadMedida" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Guardar</el-button>
                </el-form-item>

                </el-form> 
        </modal>        
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
                },
                id: null,
                producto: [],

                url: "http://127.0.0.1:8000/api",

            }
        },

        methods: {
            abrir(id) {
                console.log(id)
                this.$refs.modal.abrir();
                this.id = id

                this.getDatos()
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

            async getDatos(){
                await this.axios.get(this.url+"/productos/obtenerDatos/" + this.id)
                .then(response => {
                    this.producto = response.data                    
                    console.log("producto")
                    console.log(this.producto)
                })

                    this.form.nombre = this.producto.producto[0].nombre;
                    this.form.unidadMedida = this.producto.producto[0].unidadMedida;


                    console.log(this.form.nombre)

            }
        },
    }    
</script>