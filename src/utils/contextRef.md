```js
    import { createContext, useContext } from 'react'

    export const REPLACEContext = createContext<REPLACEContextProps>({
        // Add initial values
    })

    export const useREPLACEContext = (): REPLACEContextProps => {
        return useContext(REPLACEContext)
    }

    export interface REPLACEContextProps {
        // Add types here
    }
```


