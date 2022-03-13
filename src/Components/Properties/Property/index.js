import scss from './property.module.scss'
import { useEffect, useState } from 'react';
import clsx from 'clsx'

import {ReactComponent as VisibilityIcon} from '../../../Assets/visibility-visible.svg';
import {ReactComponent as VisibilityHiddenIcon} from '../../../Assets/visibility-hidden.svg';
import {ReactComponent as TrashIcon} from '../../../Assets/trash.svg';
import {ReactComponent as PlusIcon} from '../../../Assets/plus.svg';
import {ReactComponent as CloseIcon} from '../../../Assets/action-close.svg';

import PropertyForm from '../PropertyForm';
import CustomIcon from '../../CustomIcon'
import {useComponentList} from '../../../Hooks/useComponentList'

/**
 * A reusuable component for the Property rows of a MUI component
 * @param {comonentName:string,propertyObj:Property} param0 s
 * @returns 
 */
function Property({componentName, propertyObj}) {
  let [componentDisabled, setComponentDisabled] = useState(false)
  let [showForm, setShowForm] = useState(false)

  const {updateADefaultValue} = useComponentList()

  useEffect(()=>{
    setComponentDisabled(propertyObj.hide)
  },[])

  const handleRowClick = (e) => {
    e.stopPropagation()
    setShowForm(true)
  }
  const handleCloseCLick = (e) => {
    e.stopPropagation()
    setShowForm(false)
  }
  const handleDisableClick = () => {
    setComponentDisabled(old => !old)
  }

  /**
   * passes the component name, property name, and new default value
   * to the updateADefaultValue function from the useComponentList context hook
   * to update that value, so we can see the change in the Component preview
   * @param {string} val 
   */
  const handleUpdateDefaultVal = (val) => {
    updateADefaultValue(componentName,propertyObj.name, val)
  }

  return (
    <div className={clsx(scss.root,[showForm && scss.formIsVisible])} onClick={(e)=>!showForm ? handleRowClick(e) : false}>
      <div className={clsx(scss.title,[propertyObj.hide && scss.hide])}>
        <span className={scss.name}>{propertyObj.name}</span>
        <CustomIcon onClick={()=>handleDisableClick()} message={'Hide property'}>
          { componentDisabled 
            ? <VisibilityHiddenIcon />
            : <VisibilityIcon />
          }
        </CustomIcon>
        {showForm &&
          <CustomIcon message={'Delete property'}>
            <TrashIcon />
          </CustomIcon>
        }
      </div>
      {showForm &&
        <PropertyForm onChange={handleUpdateDefaultVal} propertyObj={propertyObj}/>
      }
      <div className={scss.expandIcon}>
        {!showForm
          ? <CustomIcon onClick={handleRowClick}>
            <PlusIcon />
          </CustomIcon>
          : <CustomIcon onClick={handleCloseCLick}>
            <CloseIcon />
          </CustomIcon>
        }
      </div>
    </div>
  );
}

export default Property;