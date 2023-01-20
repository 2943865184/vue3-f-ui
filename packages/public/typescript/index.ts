type sizeClassKeys = 'defaultSize' | 'largeSize' | 'smallSize'
type typeClassKeys = 'defaultType' | 'primaryType' | 'successType' | 'infoType' | 'warningType' | 'dangerType'
type underlineClassKeys = 'deleteUnderline'
export type sizeClass = { [key in sizeClassKeys]?: boolean }
export type typeClass = { [key in typeClassKeys]?: boolean }
export type underlineClass = { [key in underlineClassKeys]: boolean }

export interface buttonProps {
    size?: 'default' | 'large' | 'small'
    type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
}

/**
 * 组件类型判断api
 * @param props 
 * @returns 
 */
export function typeJudge(props: buttonProps): typeClass {

    let typeClass: typeClass = {}

    switch (true) {
        case props.type == 'primary':
            typeClass.primaryType = true
            break;
        case props.type == 'success':
            typeClass.successType = true
            break;
        case props.type == 'info':
            typeClass.infoType = true
            break;
        case props.type == 'warning':
            typeClass.warningType = true
            break;
        case props.type == 'danger':
            typeClass.dangerType = true
            break;
        default:
            typeClass.defaultType = true
            break
    }
    return typeClass
}
/**
 * 组件大小判断api
 * @param props 
 * @returns 
 */
export function sizeJudge(props: buttonProps): sizeClass {
    let buttonSizeClass: sizeClass = {}

    if (props.size == 'large') {
        buttonSizeClass.largeSize = true
    } else if (props.size == 'small') {
        buttonSizeClass.smallSize = true
    } else {
        buttonSizeClass.defaultSize = true
    }

    return buttonSizeClass
}

