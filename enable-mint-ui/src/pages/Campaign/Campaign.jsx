import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Button, } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Slider from "../../components/Slider";
import UploadFile from "../UploadFile";

const workFlowFiles = [
  { text: "Company_Website_LinkedIns.xlsx" },
  { text: "Company_Profiles.xlsx" },
  { text: "Company_Contacts.xlsx" },
]
const contactListUpload = [
  { text: "Target_Audience_Cleaned.xlsx" },
]
const emailFinderTool = [
  { text: "Target_Audience_Cleaned.xlsx" },
]

const Campaign = () => {
  const { state } = useLocation();

  const handleCampaignDelete = () => {
    toast.info("Campaign is deleted successfully!");
  };

  const TitleField = () => {
    return <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
    >
      <Box>
        <img src='/assets/dashboard/Color-Vector (3).png' alt="" style={{ width: "38px", height: "25px", margin: "0 15px 6px 0px" }} />
        {state.name}
      </Box>
      <Button
        sx={{
          width: "160px",
          height: "40px",
          background: "transparent",
          borderRadius: "7px",
          fontFamily: 'Inter',
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "19px",
          color: '#ff0000',
          '&:hover': {
            background: "#ff0000",
            color: "#fff"
          },
          ['@media (max-width:769px)']: { // eslint-disable-line no-useless-computed-key 
            fontSize: "15px",
            width: "160px",
            height: "33px",
          },
        }}
        onClick={handleCampaignDelete}
      >
        Delete Campaign
      </Button>
    </Box>

  }

  const textField = state.description;

  const CampaignApp = () => {
    return (
      <Box sx={{
        backgroundImage: `url(/assets/Header_Bg.png)`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}>
        <Container sx={{
          padding: "130px 60px 100px 60px !important",
          ['@media (max-width:684px)']: { // eslint-disable-line no-useless-computed-key 
            padding: "80px 20px 100px 20px!important",
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
                fontSize: "24px",
                lineHeight: "24px",
                textDecorationLine: "underline",
                color: "#191A15",
              }}
            >
              {state.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#388E3C",
                margin: "10px 0 0 0 !important",
              }}
            >
              {state.description}
            </Typography>
          </Box>

          <UploadFile/>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "#FFFFFF",
            borderRadius: "15px !important",
            marginTop: "5px",
            paddingTop: { md: "35px !important", sm: "25px!important" },
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key 
              padding: "25px 15px!important",
            }
          }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "24px",
                textDecorationLine: "underline",
                color: "#191A15",
                margin: { md: "0px 45px !important", sm: "0px 25px !important" },
              }}
            >
              Workflow Files
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#388E3C",
                wordBreak: "normal",
                margin: { md: "10px 45px 0 45px !important", sm: "10px 25px 0 25px !important" },
              }}
            >
              These files are the result files of the companies that have been process through our workflows.
            </Typography>
            <Box>
              <Box sx={{
                width: "100%",
                padding: "10px 48px",
                background: "#388E3C",
                borderRadius: "6px",
              }}>
                <Typography sx={{
                  fontFamily: 'Inter',
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                  padding: "10px 45px !important",
                  ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                    padding: "10px 16px !important",
                  }
                }}>
                  {state.name}
                </Typography>
              </Box>
              {workFlowFiles.map((item, i) => (
                <Box key={i} sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "10px 48px !important",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "1px solid #A6A6A6",
                  ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                    padding: "10px 16px !important",
                  }
                }}>
                  <Typography sx={{
                    fontFamily: 'Inter',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#434343",
                    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                      fontSize: "16px",
                      lineHeight: "16px",
                    }
                  }}>
                    {item.text}
                  </Typography>
                  <img style={{ width: '18px', height: "25px" }} src="/assets/dashboard/Color-Vector (2).png" />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "#FFFFFF",
            borderRadius: "15px !important",
            margin: "15px 0 0 0 !important",
            paddingTop: { md: "35px !important", sm: "25px!important" },
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key 
              padding: "25px 15px!important",
            }
          }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "24px",
                textDecorationLine: "underline",
                color: "#191A15",
                margin: { md: "0px 45px !important", sm: "0px 25px !important" },
              }}
            >
              Contact List Upload Tool
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "24px",
                color: "#388E3C",
                wordBreak: "normal",
                margin: { md: "10px 45px 0 45px !important", sm: "10px 25px 0 25px !important" },
              }}
            >
              Use this tool to clean your exported Contact Lists by filtering characteristics of interest (e.g. Job Titles, Seniority, Location)
            </Typography>
            <Box sx={{
              background: "#F9F8FE",
              borderRadius: "24px",
              margin: "30px 45px 30px 45px !important",
              padding: '9px 0 !important',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Typography sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "19px",
                color: "#191A15",
              }}>
                Upload or Drop your .csv file
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center"
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#388E3C",
                  cursor: "pointer"
                }}
              >
                <img style={{ width: "25px", height: "25px" }} src="/assets/dashboard/+.png" />
              </Box>
            </Box>
            <Box sx={{
              margin: "0 !important",
              padding: "0 !important"
            }}>
              <Box sx={{
                width: "100%",
                padding: "10px 48px",
                background: "#388E3C",
                borderRadius: "6px",
              }}>
                <Typography sx={{
                  fontFamily: 'Inter',
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                  padding: "10px 45px !important",
                  ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                    padding: "10px 16px !important",
                  }
                }}>
                  Contact List Upload Tool Results
                </Typography>
              </Box>
              {contactListUpload.map((item, i) => (
                <Box key={i} sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "10px 48px !important",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "1px solid #A6A6A6",
                  ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                    padding: "10px 16px !important",
                  }
                }}>
                  <Typography sx={{
                    fontFamily: 'Inter',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#434343",
                    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                      fontSize: "16px",
                      lineHeight: "16px",
                    }
                  }}>
                    {item.text}
                  </Typography>
                  <img style={{ width: '18px', height: "25px" }} src="/assets/dashboard/Color-Vector (2).png" />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "#FFFFFF",
            borderRadius: "15px !important",
            margin: "15px 0 0 0 !important",
            paddingTop: { md: "35px !important", sm: "25px!important" },
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key 
              padding: "25px 15px!important",
            }
          }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "24px",
                textDecorationLine: "underline",
                color: "#191A15",
                margin: { md: "0px 45px !important", sm: "0px 25px !important" },
              }}
            >
              Email Finder Tool
            </Typography>
            <Box sx={{
              background: "#F9F8FE",
              borderRadius: "24px",
              margin: "30px 45px 30px 45px !important",
              padding: '9px 0 !important',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Typography sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "19px",
                color: "#191A15",
              }}>
                Upload or Drop your .csv file
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center"
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#388E3C",
                  cursor: "pointer"
                }}
              >
                <img style={{ width: "25px", height: "25px" }} src="/assets/dashboard/+.png" />
              </Box>
            </Box>
            <Box sx={{
              margin: "0 !important",
              padding: "0 !important"
            }}>
              <Box sx={{
                width: "100%",
                padding: "10px 48px",
                background: "#388E3C",
                borderRadius: "6px",
              }}>
                <Typography sx={{
                  fontFamily: 'Inter',
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                  padding: "10px 45px !important",
                  ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                    padding: "10px 16px !important",
                  }
                }}>
                  Email Finder Tool Results
                </Typography>
              </Box>
              {emailFinderTool.map((item, i) => (
                <Box key={i} sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "10px 48px !important",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "1px solid #A6A6A6",
                  ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                    padding: "10px 16px !important",
                  }
                }}>
                  <Typography sx={{
                    fontFamily: 'Inter',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#434343",
                    ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key 
                      fontSize: "16px",
                      lineHeight: "16px",
                    }
                  }}>
                    {item.text}
                  </Typography>
                  <img style={{ width: '18px', height: "25px" }} src="/assets/dashboard/Color-Vector (2).png" />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </Box>
    )
  }

  return (
    <Slider Component={CampaignApp} TitleField={TitleField} textField={textField} />
  )
}

export default Campaign