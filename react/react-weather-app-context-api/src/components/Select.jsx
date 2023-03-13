
import React from 'react'
import WeatherContext from '../context/Weather'
import { useContext } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import cities from "../cities.json"
import { MenuItem } from '@mui/material';


function Select() {


    const { setcity } = useContext(WeatherContext);



    return (
        <div>
            <Box sx={{ minWidth: 120, maxWidth: "150px" }} style={{ margin:"25px"}}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Şehir
                    </InputLabel>
                    <NativeSelect
                    
                       
                        onChange={(e) => { setcity(e.target.value) }}
                        
                    >
                        {cities.map((option) => (
                            
                            <option selected={option.id===6} key={option.id} >
                                
                                <MenuItem   value={option.name}  >
                                    {option.name}
                                </MenuItem>
                                
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </Box>
        </div>
    )
}

export default Select