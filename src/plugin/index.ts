import { App,defineAsyncComponent } from "vue";
import { setupElemementplus } from "./element-plus";
import { setupFontawesome } from "./font-awesome";
import { setupTailwindcss } from "./tailwindcss";

function autoComponent(app:App){
    // const components = import.meta.glob('@/components/**/*.vue')

    // Object.keys(components).forEach((key:any)=>{
    //     const name = key.split('/').pop()?.split('.').shift() as string
    //     app.component(name,defineAsyncComponent(components[key]))
    // })

    const components = [
        import.meta.globEager('@/components/**/*.vue'),
        import.meta.globEager('@/view/template/**/*.vue')
    ]
    
    Object.entries(components).forEach((item,index)=>{
        Object.keys(item[1]).forEach((key:string)=>{
            const name = key.split('/').pop()?.split('.').shift() as string
            app.component(name,item[1][key].default)
        })
    })
}

export function setupPlugin(app:App){
    setupFontawesome()
    setupTailwindcss()
    setupElemementplus(app)
    autoComponent(app)
}