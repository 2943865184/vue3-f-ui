type buttonSizeClassKeys = 'defaultSize' | 'largeSize' | 'smallSize'
type buttonTypeClassKeys = 'defaultType' | 'primaryType' | 'successType' | 'infoType' | 'warningType' | 'dangerType'
export type buttonSizeClass = { [key in buttonSizeClassKeys]?: boolean }
export type buttonTypeClass = { [key in buttonTypeClassKeys]?: boolean }

export interface buttonProps {
    size?: 'default' | 'large' | 'small'
    type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
}

/**
 * 按钮大小判断方法
 * @param  props 
 * @returns 
 */
function buttonSizeJudge(props: buttonProps): buttonSizeClass {
    let buttonSizeClass: buttonSizeClass = {}

    if (props.size == 'large') {
        buttonSizeClass.largeSize = true
    } else if (props.size == 'small') {
        buttonSizeClass.smallSize = true
    } else {
        buttonSizeClass.defaultSize = true
    }

    return buttonSizeClass
}
/**
 * 按钮类型判断方法
 * @param  props 
 * @returns 
 */
function buttonTypeJudge(props: buttonProps): buttonTypeClass {

    let buttonTypeClass: buttonTypeClass = {}

    switch (true) {
        case props.type == 'primary':
            buttonTypeClass.primaryType = true
            break;
        case props.type == 'success':
            buttonTypeClass.successType = true
            break;
        case props.type == 'info':
            buttonTypeClass.infoType = true
            break;
        case props.type == 'warning':
            buttonTypeClass.warningType = true
            break;
        case props.type == 'danger':
            buttonTypeClass.dangerType = true
            break;
        default:
            buttonTypeClass.defaultType = true
            break
    }
    return buttonTypeClass
}
export { buttonSizeJudge, buttonTypeJudge }