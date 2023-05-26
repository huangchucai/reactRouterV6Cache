import React, {
    useContext,
    useRef,
    isValidElement,
    cloneElement,
    useEffect,
    useLayoutEffect
} from 'react'

import keepaliveContext from '../core/keepContext'
import {
    ACTION_UPDATE,
    ACITON_CREATED,
    isFuntion,
    ACTION_ACTIVE,
    ACITON_UNACTIVE,
    ACTION_UNACTIVED, isArray
} from '../utils'

export function useCacheDestory() {
    return useContext(keepaliveContext).cacheDestory
}

const renderWithChildren = (children) => (mergeProps) => {
    console.log('-hcc---isValidElement(children)--',isArray(children),children)
    if(isArray(children)) {
        children = children.filter(item => isValidElement(item))
        if(children.length ===1 ) {
            children = children[0]
        }
    }
    return children ?
        isFuntion(children) ?
        children(mergeProps) :
        isValidElement(children) ?
        cloneElement(children, mergeProps) :
        isArray(children) ? children.map((item, index) => cloneElement(item, {key: index,...mergeProps})) : null :
        null
}

function KeepaliveItem({
    children,
    cacheId,
    style
}) {
    console.log('----item---渲染---')
    const {
        cacheDispatch,
        hasAliveStatus
    } = useContext(keepaliveContext)
    const first = useRef(false)
    const parentNode = useRef(null)
    const load = (currentNode) => {
        console.log('-hcc-load--执行---')
        parentNode.current.appendChild(currentNode)
    }
    !first.current && !hasAliveStatus(cacheId) && cacheDispatch({
        type: ACITON_CREATED,
        payload: {
            load,
            cacheId,
            children: renderWithChildren(children)
        }
    })
    /* TODO: 自动生成 cacheId  */
    console.log('-hcc-children--', children)
    useLayoutEffect(() => {
        console.log('-hcc--hcc-children----useLayoutEffect---',children,  hasAliveStatus(cacheId), first.current)
        // /* 触发更新逻辑 */
        hasAliveStatus(cacheId) !== ACTION_UNACTIVED && first.current && cacheDispatch({
            type: ACTION_UPDATE,
            payload: {
                cacheId,
                children: renderWithChildren(children)
            }
        })
    }, [children])
    useEffect(() => {
        first.current = true
        console.log('-hcc--hcc-children----useEffect---')
        cacheDispatch({
            type: ACTION_ACTIVE,
            payload: {
                cacheId,
                load
            }
        })
        return function () {
            cacheDispatch({
                type: ACITON_UNACTIVE,
                payload: cacheId
            })
        }
    }, [])
    return <div className='KeepaliveItem' ref={parentNode} style={style}/>
}

export default KeepaliveItem
