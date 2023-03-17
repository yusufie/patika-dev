import React from 'react'
import { useDispatch } from "react-redux"
import { helpMe } from "../redux/markdownSlice"
function Content() {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="header">
                <h1>Markdown Previewer</h1>
                <span className="help-button" onClick={() => dispatch(helpMe())}>
                    ?
                </span>
            </div>
        </div>
    )
}

export default Content