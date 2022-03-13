import scss from './app.module.scss'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useCallback, useEffect, useState } from 'react';

import ComponentDisplay from './Pages/ComponentDisplay';
import ComponentListContextProvider from './Hooks/useComponentList';

function App() {
  // for the scrollbar we get window height
  const [height,setHeight] = useState(window.innerHeight - 42)

  useEffect(()=>{
    // update the height whenever window is resized
    window.addEventListener('resize', updateHeights);

    // remove on onMount
    return () => window.removeEventListener('resize', updateHeights)
  })

  const updateHeights = useCallback(()=>{
    setHeight(window.innerHeight - 42)
  },[])

  return (
    <div className={scss.root}>
      <div className={scss.canvas}>
        <Scrollbars style={{width: window.innerWidth, height: height}}>
          <div className={scss.canvas_content}>
              <ComponentListContextProvider>
                <ComponentDisplay />
              </ComponentListContextProvider>
          </div>
        </ Scrollbars>
      </div>
    </div>
  );
}

export default App;
