import { Grid, Stack, Typography } from "@mui/material"

const HandleHeader = () => {
    return(
        <>
        <Grid>
            <Stack sx={{direction:"column", textTransform:"capitalize", color:"primary.light",alignItems:"center", justifyContent:"center" ,gap:2, mt:2 }}>
                <Typography  sx={{fontSize:"2rem", fontWeight:600, }}>
                    codey bloging site 
                </Typography>
                <Typography sx={{fontSize:"1.5rem", fontWeight:500}}>
                    create account to see and post to see blogs
                </Typography>
            </Stack>


        </Grid>
        
        
        </>
    )
}

export default HandleHeader;