import React, {useLayoutEffect, useRef, useState} from "react";
type positionType = {
    x:number,
    y:number
}
function useDrop<T>(initValue?:positionType):[positionType, React.RefObject<T extends HTMLElement ? T : HTMLElement>]{
    const positionRef = useRef({
        currentX:initValue?initValue.x:0,
        currentY:initValue?initValue.y:0,
        lastX:0,
        lastY:0
    })
    const elementRef = useRef<T extends HTMLElement ?T:HTMLElement>(null);
    const [,forceUpdate] = useState({})
    const elementMove = ()=>{
        let startX=0,startY=0;

        const start = function (event:TouchEvent) {
            const {clientX,clientY} = event.targetTouches[0];
            startX = clientX;
            startY =clientY;
            elementRef.current?.addEventListener('touchmove',move);
            elementRef.current?.addEventListener("touchend",end)
        }
        const move = (event:TouchEvent)=>{
            const {clientX,clientY} = event.targetTouches[0];
            positionRef.current.currentX = positionRef.current.lastX+(clientX-startX);
            positionRef.current.currentY = positionRef.current.lastY+(clientY-startY);
            forceUpdate({})
        }
        const end = (event:TouchEvent) => {
            positionRef.current.lastX = positionRef.current.currentX;
            positionRef.current.lastY=positionRef.current.currentY;
            elementRef.current?.removeEventListener("touchmove",move);
            elementRef.current?.removeEventListener("touchend",end)
        }
        elementRef.current?.addEventListener('touchstart',start)
    }
    useLayoutEffect(elementMove,[])
    let style = {
        x :positionRef.current.currentX,
        y:positionRef.current.currentY
    }
    return [
        style,
        elementRef
    ]
}
export default useDrop