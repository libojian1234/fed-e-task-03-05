//  模拟reactive
//  接收一个参数，判断这参数是否是对象
//  创建拦截器对象 handler，设置 get/set/deleteProperty
//  返回 Proxy 对象


const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(target) {
    if (!isObject(target)) return target

    const handler = {
        get(target, key, receiver) {
            console.log('get', key)
            track(target, key)  // 收集依赖
            const result = Reflect.get(target, key, receiver)
            return convert(result)
        },
        set(target, key, value, receiver) {
            const oldValue = Reflect.get(target, key, receiver)
            let result = true
            if (oldValue !== value) {
                result = Reflect.set(target, key, value, receiver)
                // 触发更新
                trigger(target, key)
                console.log('set', key, value)
            }
            return result
        },
        deleteProperty(target, key) {
            const hadkey = hasOwn(target, key)
            const result = Reflect.deleteProperty(target, key)
            if (hadkey && result) {
                // 触发更新
                trigger(target, key)
                console.log('delete', key)
            }
            return result
        }
    }

    return new Proxy(target, handler)
}



// 收集依赖  ---start----
let activeEffect = null
export function effect(callback) {
    activeEffect = callback
    callback() // 访问响应式对象属性，去收集依赖
    activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
}
// 收集依赖  ---end----

// 触发更新
export function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    const dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}

export function ref (raw) {
    // 判断 raw 是否是 ref 创建的对象， 如果是的话直接返回
    if (isObject(raw) && raw.__v_isRef) return

    let value = convert(raw)
    const r = {
        __v_isRef: true,
        get value () {
            track(r, 'value')
            return value
        },
        set value (newValue) {
            if (newValue !== value) {
                raw = newValue
                value = convert(raw)
                trigger(r, 'value')
            }
        }
    }
    return r
}

export function toRefs (proxy) {
    const ret = proxy instanceof Array ? new Array(proxy.length) : {}

    for (const key in proxy) {
        ret[key] = toProxyRef(proxy, key)
    }
    return ret
}

function toProxyRef (proxy, key) {
    const r = {
        __v_isRef: true,
        get value () {
            return proxy[key]
        },
        set value (newValue) {
            proxy[key] = newValue
        }
    }
    return r
}

export function computed (getter) {
    const result = ref()

    effect(() => (result.value = getter()))
    return result
}