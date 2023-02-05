
import { VueDom, TablePropsObject } from '../src/index'
/**
 * 获取table列数据
 */
export function getColumn<T extends VueDom | undefined>(dom: T): Array<VueDom[]> {
    const ROW_LENGTH = dom?.children.length
    let arrayDom: Array<VueDom[]> = []

    if (ROW_LENGTH) {
        const COLUMN_LENGTH = dom.children[0].children.length

        for (let index = 0; index < COLUMN_LENGTH; index++) {
            let tempArr = []

            for (let index2 = 0; index2 < ROW_LENGTH; index2++) {

                tempArr.push(dom.children[index2].children[index])
            }
            arrayDom.push(tempArr)

        }
    }
    return arrayDom

}


/**
 * 将table组件传入的数据处理成渲染所需的数据
 * 根据prop中的元素从data中提取指定的值
 */
export function getRenderData(prop: Array<string>, data: Array<TablePropsObject>): Array<object> {
    let renderData: Array<object> = []

    if (prop) {

        for (const key in data) {
            let tempArr: Array<any> = []
            for (const key2 in prop) {

                if (data[key][prop[key2]]) {
                    tempArr.push(data[key][prop[key2]])
                } else {
                    tempArr.push('')
                }
            }
            renderData.push(tempArr)
        }
    }

    return renderData
}