import * as React from 'react';
import { Container, Box, Typography, Button, } from '@mui/material';
import Slider from "../../components/Slider";
import { styled } from '@mui/system';

const InputField = styled('input')({
  width: "100%",
  padding: "15px 20px",
  background: "#FFFFFF",
  border: "1px solid #388E3C",
  borderRadius: "32px",
  fontFamily: 'Inter',
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "#A6A6A6",
});


const CampaignA = () => {
  return (
    <Box sx={{background: "#F5F5F5", height: "100vh"}}>
      <Container sx={{
        padding: "130px 60px 0 60px !important",
        ['@media (max-width:684px)']: { // eslint-disable-line no-useless-computed-key 
          padding: "80px 20px 0 20px!important",
        }
      }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "#FFFFFF",
            borderRadius: "15px !important",
            padding: { md: "35px 45px !important", sm: "25px 15px!important" },
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key 
              padding: "25px 15px!important",
            }
          }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: "39px",
                textDecorationLine: "underline",
                color: "#191A15",
              }}
            >
              Campaign A
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: "39px",
                textDecorationLine: "underline",
                color: "#191A15",
              }}
            >
              Campaign A
            </Typography>
          </Box>
      </Container>
    </Box>
  )
}

const TitleField = () => {
  return (
    <Box>
      <img src='/assets/dashboard/Color-Vector (3).png' style={{width: "38px", height: "25px", margin: "0 15px 6px 0px"}} />
      Campaign A
    </Box>
  )
}
const textField = "A collection of your result files and additional tools for a specific target audience";

const NewCampaign = () => {
  return (
    <Slider Component={CampaignA} TitleField={TitleField} textField={textField} />
  )
}

export default NewCampaign