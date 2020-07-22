export function setHeight(){
    let height = screen.height
    return height
}

export function getElementHeight(classname){ 
    let height = document.querySelector(classname).clientHeight || document.querySelector(classname).offsetHeight
    return height
}

export function getElementWidth(classname){ 
    let width =  document.querySelector(classname).offsetWidth
    return width
}