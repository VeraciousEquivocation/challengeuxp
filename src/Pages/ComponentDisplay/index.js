import scss from './componentDisplay.module.scss'
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import {cloneDeep} from 'lodash'
import clsx from 'clsx'

import {ReactComponent as VisibilityIcon} from '../../Assets/visibility-visible.svg';
import {ReactComponent as VisibilityHiddenIcon} from '../../Assets/visibility-hidden.svg';
import {ReactComponent as GearIcon} from '../../Assets/gear.svg';

import TopBar from '../../Components/TopBar';
import Properties from '../../Components/Properties';
import CustomIconBtn from '../../Components/CustomIcon';
import {useComponentList} from '../../Hooks/useComponentList';

function ComponentDisplay() {
    let [componentData, setComponentData] = useState(null)
    let [libraryVisibility, setLibraryVisibility] = useState(false)

    const {componentList} = useComponentList(); 

    // here we get a deep clone of the componentList's first entry on mount
    // and update it whenever the componentList changes
    // originally I wanted to have multiple components and be able to select different ones
    // but i chose not to, given the variance in components and the amount of additional work it would entail.
    useEffect(()=>{
      if(componentList) {
        setComponentData(cloneDeep(componentList[0]))
        setLibraryVisibility(componentList[0].isVisibleInLibrary)
      }
    },[componentList])

    const handleVisibilityClick = useCallback(()=>{
      setLibraryVisibility(old=>!old)
    },[])

  if(!componentData) return <div>...loading</div>

  return (
    <div className={scss.root}>
      <div className={scss.frame}>
        <TopBar />
        <div className={clsx(scss.header,[!libraryVisibility && scss.fadeEye])}>
          <span className={scss.title}>{componentData.name}</span>
          <CustomIconBtn message={'Toggle component visibility in library'} onClick={handleVisibilityClick}>
            { libraryVisibility 
              ? <VisibilityIcon />
              : <VisibilityHiddenIcon />
            }
          </CustomIconBtn>
          <CustomIconBtn message={'Component settings'}>
            <GearIcon />
          </CustomIconBtn>
        </div>
        <div className={scss.preview}>
          <div className={scss.subTitle}>
            Component Preview
          </div>
          <Button 
            color={componentData.properties.find(p=>p.name==='Color').defaultValue} 
            size={componentData.properties.find(p=>p.name==='Size').defaultValue} 
            variant={componentData.properties.find(p=>p.name==='Variant').defaultValue} 
            fullWidth={componentData.properties.find(p=>p.name==='Full width').defaultValue} 
          >
            Sign Up
          </Button>
        </div>
        {(componentData.properties && componentData.properties.length > 0) && <Properties componentName={componentData.name} propertyList={componentData.properties} />}
      </div>
    </div>
  );
}

export default ComponentDisplay;