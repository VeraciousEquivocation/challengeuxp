import React, { useMemo, useEffect, useState, useContext, useCallback } from "react";
import { cloneDeep } from "lodash";
import {tempData} from './initialData'

const ComponentListContext = React.createContext();

export function useComponentList() {
    return useContext(ComponentListContext)
}

function ComponentListContextProvider(props) {
    const [componentList, setComponentList] = useState(null);

    useEffect(()=>{
        setComponentList(tempData)
    },[])

    /**
     * updates a component's properties' default Value via reference
     * @param {string} componentName 
     * @param {string} propertyName 
     * @param {string} newVal 
     * @returns 
     */
    const updateADefaultValue = useCallback((componentName, propertyName, newVal) => {
        let updatedList = cloneDeep(componentList)

        let component = updatedList.find(c => c.name === componentName)
        if(!component) return

        let property = component.properties.find(p => p.name === propertyName)
        if(!property) return

        property.defaultValue = newVal

        setComponentList(updatedList)
    },[componentList])

    const contextMemoData = useMemo(() => (
        {
            componentList,
            setComponentList,
            updateADefaultValue
        }), 
        [
            componentList,
            setComponentList,
            updateADefaultValue
        ]
    );

    return (
        <ComponentListContext.Provider value={contextMemoData}>
            {props.children}
        </ComponentListContext.Provider>
    )
}

export default React.memo(ComponentListContextProvider);