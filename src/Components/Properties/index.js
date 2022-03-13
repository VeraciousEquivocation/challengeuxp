import scss from './properties.module.scss'
import { useState } from 'react';

import {ReactComponent as PlusIcon} from '../../Assets/plus icon.svg';

import Property from './Property';
import PropertyForm from './PropertyForm';

function Properties({componentName, propertyList}) {
    let [showForm, setShowForm] = useState(false)

  return (
    <div className={scss.root}>
        <div className={scss.titleRow}>
            <div className={scss.title}>Properties</div>
            <div className={scss.link} onClick={() => setShowForm(true)}>
                <div className={scss.icon}>
                    <PlusIcon />
                </div>
                <div className={scss.text}>Add new Property</div>
            </div>
        </div>
        { showForm && <PropertyForm isNew onClick={()=>setShowForm(false)} /> }
        {
            propertyList.map(p => {
                return (<Property key={p.id} componentName={componentName} propertyObj={p} />)
            })
        }
    </div>
  );
}

export default Properties;