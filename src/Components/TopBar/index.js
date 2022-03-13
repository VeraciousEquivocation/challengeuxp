import scss from './topBar.module.scss'
import { useState } from 'react';
import clsx from 'clsx'

import {ReactComponent as ButtonIcon} from '../../Assets/layout-medium-tile-outline.svg';
import {ReactComponent as ToolTipIcon} from '../../Assets/Polygon.svg';

function TopBar() {
  const [saveState, setSaveState] = useState(true);
  const [showToolTip, setShowToolTip] = useState(false);

  const handleClick = () => {
    setSaveState(old=>!old)
  }

  /**
   * toggles tooltip
   * @param {event} e 
   */
  const handleShowTooltip = (e) => {
    e.stopPropagation()
    setShowToolTip(old=>!old)
  }

  return (
    <div className={scss.root}>
      <div className={scss.row}>
        <div onMouseEnter={(e)=>handleShowTooltip(e)} onMouseLeave={(e)=>handleShowTooltip(e)} className={scss.icon}>
          <ButtonIcon className={scss.img} />
        </div>
        <div className={scss.divider}></div>
        <div className={scss.title}>
          <span>Material UI / </span>
          <span>Button</span>
        </div>
        <div className={clsx(scss.actions,[saveState && scss.hasChanges])}>
          <span>Discard changes</span>
          { saveState && <div onClick={handleClick}><div>Save changes</div></div> }
          { !saveState && <div onClick={handleClick}><div>No changes to save</div></div> }
        </div>
      </div>
      <div className={scss.botBorder}></div>
      {showToolTip &&
        <div className={scss.tooltipRow}>
          <ToolTipIcon className={scss.toolTipArrow}/>
          <div className={scss.tip}>Open Dashboard</div>
        </div>
      }
    </div>
  );
}

export default TopBar;