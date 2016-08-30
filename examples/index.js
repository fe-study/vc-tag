import Vue from 'vue'
import vcTag from '../dist/build.js'

new Vue({
	el: '#app',
	data () {
		return {
            bools: {
                'true': true,
                'false': false
            },
            show: true,
            label: '我是标签1',
            size: 'default',
            status: 'success',
            disabled: false,
            closeable: true,
            onClose () {
                console.log('will close tag')
            },
            afterClose () {
                console.log('after close tag')
            }
		}
	},
    methods: {
        toggle () {
            this.show = !this.show
        },
        toggleCloseable () {
            this.closeable = !this.closeable
        },
        deleteLg () {
            this.disabled = false 
            this.size = 'large'
            setTimeout(() => {
                this.show = false
            }, 300)
        },
        showSm () {
            this.disabled = false 
            this.size = 'small'
            this.show = true
        },
        disabledDefault () {
            this.size = 'default'
            this.disabled = true
            this.show = true
        }
    },
	components: {
        vcTag
	}
})
