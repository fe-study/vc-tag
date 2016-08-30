<template>
    <div class="vc-tag-component" v-show="show" transition="fade">
        <button
            v-el:tag
            :class="{ 'tag btn': true, 'btn-disabled': disabled, 'size-sm': size === 'small', 'size-lg': size === 'large' }"
            :style="{ 'background-color': color }"
            :disabled="disabled"
        >
            <span class="vc-tag-text">{{ label }}</span>
            <i v-show="closeable" @click="handleClear" class="clear-it glyphicon glyphicon-remove" aria-hidden="true"></i>
        </button>
    </div>
</template>

<style>
    .vc-tag-component .tag {
        display: inline-block;
        line-height: 28px;
        height: 28px;
        padding: 0 10px;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        background: #f7f7f7;
        font-size: 14px;
        -webkit-transition: all .3s cubic-bezier(.78, .14, .15, .86);
        transition: all .3s cubic-bezier(.78, .14, .15, .86);
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        margin: 2px 4px 2px 0;
        cursor: pointer;
        color: #fff;
    }
    .vc-tag-component .btn[disabled]:hover {
        color: #fff;
        cursor: not-allowed;
    }
    .vc-tag-component .size-sm {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
    }
    .vc-tag-component .size-lg {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
    }
    .vc-tag-component .clear-it {
        font-size: 10px;
        font-weight: 100;
    }

    .fade-transition {
        display: inline-block;
    }
    .fade-enter {
        animation: fadeIn .2s;
    }
    .fade-leave {
        animation: fadeOutLeft .5s;
    }

    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
    .fadeIn {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }

    @-webkit-keyframes fadeOutLeft {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }
    }

    @keyframes fadeOutLeft {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }
    }

    .fadeOutLeft {
        -webkit-animation-name: fadeOutLeft;
        animation-name: fadeOutLeft;
    }
</style>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        },
        label: {
            type: String
        },
        size: {
            type: String,
            default: 'default'
        },
        closeable: {
            type: Boolean 
        },
        disabled: {
            type: Boolean,
            default: false
        },
        status: String,
        onClose: Function,
        // animationend callback
        afterClose: Function
    },
    data: function () {
        return {
        }
    },
    created: function () {

    },
    ready: function () {
    },
    computed: {
        color () {
            if (this.status === 'success') {
                return '#87d068'
            }
            if (this.status === 'warning') {
                return '#fa0'
            }
            if (this.status === 'danger') {
                return '#f50'
            }
            if (this.status === 'info') {
                return '#2db7f5'
            }
        }
    },
    watch: {
    },
    methods: {
        handleClear () {
            this.show = false
            this.onClose && this.onClose()
            let tag = this.$el
            tag && tag.addEventListener('animationend', () => {
                this.afterClose && this.afterClose()
            }, false)
        }
    },
    beforeDestroy: function () {

    },
    destroy: function () {

    }
}
</script>
