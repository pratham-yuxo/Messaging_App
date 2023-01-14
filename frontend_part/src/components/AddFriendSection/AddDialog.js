import { Dialog,styled,Box } from '@mui/material';
import AccountContext from '../../context/accountContext';
import React,{useContext} from 'react'
const Box1=styled(Box)`
height: 70vh;
width: 80vw;

`

const AddDialog = () => {
    const {dialogbox} = useContext(AccountContext)
  return (
    <Box>
        <Dialog hideBackdrop={true}  open={dialogbox}>
          <Box1>
            add
          </Box1>
        </Dialog>
    </Box>
  )
}

export default AddDialog