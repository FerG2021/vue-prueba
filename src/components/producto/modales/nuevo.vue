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

                url: "http://127.0.0.1:8000/api",

            }
        },

        methods: {
            abrir() {
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
        },
    }    
</script>