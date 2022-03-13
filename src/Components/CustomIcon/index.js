import scss from './customIcon.module.scss'
import { useState } from 'react';

import {ReactComponent as ToolTipArrow} from '../../Assets/Polygon.svg';

/**
 * a reusuable component for the icon buttons
 * if a message is not provided, the tooltip will not show
 * @param {onClicl:function,children:ReactComponent,message:string} param0 
 * @returns 
 */
function CustomIconBtn({onClick,children,message}) {
    let [showToolTip, setShowToolTip] = useState(false)

  const handleClick = (e) => {
      e.stopPropagation()
    onClick(e)
  }

  const handleShowTooltip = (e) => {
    e.stopPropagation()
    setShowToolTip(old=>!old)
  }

  return (
    <div onClick={(e)=>handleClick(e)} className={scss.iconDiv} onMouseEnter={(e)=>handleShowTooltip(e)} onMouseLeave={(e)=>handleShowTooltip(e)} >
      {children}
      {(showToolTip && message) &&
        <div className={scss.tooltipRow}>
          <ToolTipArrow className={scss.toolTipArrow}/>
          <div className={scss.tip}>{message}</div>
        </div>
      }
    </div>
  );
}

export default CustomIconBtn;