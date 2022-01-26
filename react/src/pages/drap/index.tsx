import React from "react";
import useDrop from "../../hooks/useDrop";
const commonStyle:React.CSSProperties ={
    width:"100px",
    height:"100px",
    borderRadius:"50%",
    textAlign:"center",
    lineHeight:"100px",
    cursor:'pointer',
    userSelect:"none"
}
const Drop:React.FC = ()=>{
    const [style,elementRef] =useDrop<HTMLDivElement>({
        x:200,
        y:169
    })
    const [style1,elementRef1] =useDrop<HTMLDivElement>()

    // console.log(style)
    return <><div ref={elementRef} style={{...commonStyle,
        transform:`translate(${style.x}px,${style.y}px)`,
        background:"red"
    }}>
        拖拽
    </div>
        <div ref={elementRef1} style={{...commonStyle,
            transform:`translate(${style1.x}px,${style1.y}px)`,
            background:"gold"
        }}>
            拖拽
        </div>
    </>
}
export default Drop