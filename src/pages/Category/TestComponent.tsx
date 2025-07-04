// import React, { useCallback, useMemo, useState } from 'react'
// import { Box, Typography, Container, Breadcrumbs, Link, Button } from '@mui/material';
// import ChildComponent from './ChildComponent';

// export default function TestComponent() {
//     const [value, setValue] = useState(0) 
//     const [test, setTest] = useState(0) 
//     console.log("Parent component")

//     const newFunction = useCallback(() => {
//         console.log("New Function")
//         setTest(test+1)
//     }, [])

//     // const newFunction = () => {
//     //     console.log("New Function")
//     //     // setTest(test+1)
//     // }

//     return (
//         <div className='m-10'>
//             TestComponent
//             value {value}
//             test {test}

//             <Button variant='contained' onClick={() => setValue(value+1)}>Click</Button>
//             <br/>
//             <Button variant='contained' onClick={() => newFunction()}>Function CLick</Button>
//             <ChildComponent value={test} propFunction={newFunction}/>
//         </div>
//     )
// }
