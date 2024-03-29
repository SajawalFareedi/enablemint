import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import jwt_decode from "jwt-decode";
import config from '../config';
import { Context } from '../context/AppContext';
import Slider from "../components/Slider";

const items = [
  { text: "Companies Processed", process: "80%", count: "400/500" },
  { text: "Campaign Slots", process: "90%", count: "2/3" },
  { text: "Storage Usage", process: "50%", count: "250/500" },
]

const DashboardApp = () => {
  const [ email, setEmail ] = useState("");
  const { campaigns, setCampaigns } = useContext(Context);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const current_user = jwt_decode(token);
    setEmail(current_user.email);
  }, [])

  useEffect( () => {
    const fetchPosts = async () => {
      const res = await fetch(`${config.server_url}api/dashboardRoutes/getCampaigns/${email}`);
      const data = await res.json();
      setCampaigns(data);
    };
    fetchPosts();
  }, [email]);

  return (
    <Box sx={{
      backgroundImage: `url(/assets/Header_Bg.png)`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    }}>
      <Container>
        <Box sx={{
          padding: "150px 80px 100px 80px !important",
          ['@media (max-width:992px)']: { // eslint-disable-line no-useless-computed-key 
            padding: "120px 10px 70px 10px!important",
          }
        }}>
          <TableContainer component={Paper} 
            sx={{ 
              boxShadow: "none",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow sx={{background: "#388E3C"}}>
                  <TableCell sx={{padding: "5px", color: "white", width: "25%" }} align="center">Campaign</TableCell>
                  <TableCell sx={{padding: "5px", color: "white", width: "25%" }} align="center">Queries</TableCell>
                  <TableCell sx={{padding: "5px", color: "white", width: "25%" }} align="center">Companies Found</TableCell>
                  <TableCell sx={{padding: "5px", color: "white", width: "25%" }} align="center">Contacts Found</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{backgroundColor: "white"}}>
                  { campaigns.map((item, i)=>(
                  <TableRow>
                    <TableCell key={i} sx={{borderRight: "1px solid #A6A6A6", padding: "20px 0"}} align="center">
                      {item.name}
                    </TableCell>
                    <TableCell sx={{borderRight: "1px solid #A6A6A6", padding: "20px 0"}} align="center"></TableCell>
                    <TableCell sx={{borderRight: "1px solid #A6A6A6", padding: "20px 0"}} align="center"></TableCell>
                    <TableCell sx={{borderRight: "1px solid #A6A6A6", padding: "20px 0"}} align="center"></TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
          { items.map((item, i)=>(
              <Box key={i} sx={{
                position: "relative",
                height: "140px",
                background: "#FFFFFF",
                borderRadius: "15px !important",  
                padding: "20px 45px !important",
                margin: "20px 0 !important"
              }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#388E3C",
                    marginBottom: "15px"
                  }}
                >
                  {item.text}
                </Typography>
                <Box sx={{
                  width: `${item.process}`,
                  height: "25px",
                  background: "#388E3C",
                  borderRadius: "18px",
                }}></Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineGeight: "19px",
                    color: "#6D6D6D",
                    position: "absolute",
                    bottom: "10px",
                    right: "15px",
                }}>
                  {item.count}
                </Typography>
              </Box>
            ))
          }
        </Box>
      </Container>
    </Box>
  )
}

const TitleField = () => {
  return (
    <Box>
      <img src='/assets/dashboard/Vector (7).png' style={{width: "25px", height: "25px", margin: "0 15px 6px 0px"}} />
      Dashboard
    </Box>
  )
}
const textField = "An overview of all of your campaigns and previous activity rolled up into a single view";

const Dashboard = () => {
  return (
    <Slider Component={DashboardApp} TitleField={TitleField} textField={textField} />
  )
}

export default Dashboard