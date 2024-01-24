import { useState } from "react";
import { IMyContext } from "./definitions";

const useMyContext = ():IMyContext =>{
    const [test, setTest] = useState<boolean>(false);
    
  
    const turnTest = ()=>{
        setTest(prev=>!prev);
    }
    
    const contextDefaultValue = {
      test: test,
      turnTest: turnTest
    }
    return contextDefaultValue;
  }

  export default useMyContext;