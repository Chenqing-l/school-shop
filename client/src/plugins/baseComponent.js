
const files = require.context('@/components', true, /^\.\/(\w*\/)+index\.(vue|js)$/)
export default {
    install(Vue) {
        files.keys().forEach((path) => {
            const type = this.typeof(path, files(path))
            switch (type) {
                case 'component':
                    this.installComonent(Vue, files(path));
                    break;
                case 'componentGroup':
                    this.instalGroupComponent(Vue, files(path));
                    break;
                case 'serveApi':
                    this.installServeApi(Vue, files(path));
                    break;
            }
        })
    },
    typeof(path, file) {
        if (path.lastIndexOf('.js') === -1) {
            return 'component'
        } else {
            if (file.default.install) {
                return 'serveApi'
            } else {
                return 'componentGroup'
            }
        }
    },
    instalGroupComponent(Vue, file) {
        const components = file.default
        Object.keys(components).forEach((name) => {
            Vue.component('one' + name, components[name])
        })
    },
    installComonent(Vue, file) {
        const options = file.default
        const name = options.name
        Vue.component('one' + name, options)
    },
    installServeApi(Vue, file) {
        Vue.use(file.default)
    }
}