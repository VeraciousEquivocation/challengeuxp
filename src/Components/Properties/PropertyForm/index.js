import scss from './propertyForm.module.scss'
import {ReactComponent as ChecronIcon} from '../../../Assets/chevron.svg';
import clsx from 'clsx'

/**
 * either returns a default form for add, 
 * or builds out the form for each property based on the properties type
 * @param {onClick:function, propertyObj:Property, isNew:boolean, onChange:function} param0 
 * @returns 
 */
function PropertyForm({onClick, propertyObj, isNew, onChange}) {
    if(isNew)
        return (
            <div className={scss.formRoot}>
                <div className={scss.inputRow}>
                    <span className={scss.text}>Property name</span>
                    <input />
                    <div className={scss.hint}>(name of the proerty given in code)</div>
                </div>
                <div className={scss.inputRow}>
                    <span className={scss.text}>Display name</span>
                    <input />
                </div>
                <div className={scss.inputRow}>
                    <span className={scss.text}>Description</span>
                    <div><textarea /></div>
                </div>
                <div className={scss.inputRow}>
                    <span className={scss.text}>Propety type</span>
                    <div className={scss.selectContainer}>
                        <input defaultValue={'one of'} className={scss.select} />
                        <ChecronIcon className={scss.icon} />
                    </div>
                </div>
                <div className={scss.inputRow}>
                    <span className={scss.text}>Property control</span>
                    <div className={scss.selectContainer}>
                        <input className={scss.select} />
                        <ChecronIcon className={scss.icon} />
                    </div>
                    <div className={scss.hint}>(type of control displayed in editor's properties panel.  <span className={scss.learnLink}>Learn more</span> about control types)</div>
                </div>
                <div className={scss.inputRow}>
                    <span className={scss.text}>Options</span>
                    <div><textarea /></div>
                    <div className={scss.hint}>(list options sepafared by comma)</div>
                </div>
                <div className={scss.inputRow}>
                    <span className={scss.text}>Default value</span>
                    <div className={scss.selectContainer}>
                        <input className={scss.select} />
                        <ChecronIcon className={scss.icon} />
                    </div>
                </div>
                <div className={scss.actionRow}>
                    <span className={scss.cancel} onClick={onClick}>Cancel</span>
                    <div className={scss.add} onClick={onClick}>Add</div>
                </div>
            </div>
        )

    // Here a switch is used to determine what input to use for default value, based on the Property type
    let defaultValueElement = (<div>empty</div>);
    switch (propertyObj.type) {
        case 'one of':
            defaultValueElement = (
                <div className={scss.selectContainer}>
                    <select onChange={(e)=>onChange(e.target.value)} className={scss.select} defaultValue={propertyObj.defaultValue} >
                        {propertyObj.options.split(',').map((option, idx) => {
                            return (<option key={option + idx} value={option}>{option}</option>)
                        })}
                    </select>
                    <ChecronIcon className={scss.icon} />
                </div>
            )
            break;
        case 'boolean':
            defaultValueElement = (
                <div className={scss.booleanGroup}>
                    <span 
                        className={[propertyObj.defaultValue && scss.selected]}
                        onClick={(e)=>{
                            if(propertyObj.defaultValue) return false
                            onChange(true)
                        }}
                    >
                        true
                    </span>
                    <span 
                        onClick={(e)=>{
                            if(!propertyObj.defaultValue) return false
                            onChange(false)
                        }}
                        className={[!propertyObj.defaultValue && scss.selected]}
                    >
                        false
                    </span>
                </div>
            )
            break;
            case 'node':
                defaultValueElement = (
                    <div><textarea defaultValue={propertyObj.options} /></div>
                )
            break
        default:
            break;
    }

    return (
        <div className={scss.formRoot}>
            <div className={clsx(scss.inputRow,[propertyObj.hide && scss.hide])}>
                <span className={scss.text}>Property name</span>
                <input defaultValue={propertyObj.name} />
                <div className={scss.hint}>(name of the proerty given in code)</div>
            </div>
            <div className={clsx(scss.inputRow,[propertyObj.hide && scss.hide])}>
                <span className={scss.text}>Display name</span>
                <input defaultValue={propertyObj.displayName} />
            </div>
            <div className={clsx(scss.inputRow,[propertyObj.hide && scss.hide])}>
                <span className={scss.text}>Description</span>
                <div><textarea defaultValue={propertyObj.description} /></div>
            </div>
            <div className={clsx(scss.inputRow,[propertyObj.hide && scss.hide])}>
                <span className={scss.text}>Propety type</span>
                <div className={scss.selectContainer}>
                    <input className={scss.select} defaultValue={propertyObj.type} />
                    <ChecronIcon className={scss.icon} />
                </div>
            </div>
            {propertyObj.control &&
                <div className={clsx(scss.inputRow,[propertyObj.hide && scss.hide])}>
                    <span className={scss.text}>Property control</span>
                    <div className={scss.selectContainer}>
                        <input className={scss.select} defaultValue={propertyObj.control} />
                        <ChecronIcon className={scss.icon} />
                    </div>
                    {propertyObj.control === 'textarea' && 
                        <input className={scss.rows} placeholder='rows' />
                    }
                    <div className={scss.hint}>(type of control displayed in editor's properties panel.  <span className={scss.learnLink}>Learn more</span> about control types)</div>
                </div>
            }
            {propertyObj.type === 'one of' &&
                <div className={clsx(scss.inputRow,[propertyObj.hide && scss.hide])}>
                    <span className={scss.text}>Options</span>
                    <div><textarea defaultValue={propertyObj.options} /></div>
                    <div className={scss.hint}>(list options sepafared by comma)</div>
                </div>
            }
            <div className={clsx(scss.inputRow,[propertyObj.hide && scss.hide])}>
                <span className={scss.text}>Default value</span>
                {defaultValueElement}
            </div>
        </div>
    )
}

export default PropertyForm;