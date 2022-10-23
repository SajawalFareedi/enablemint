import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LookupPricingCard = ({updateData, amount, price}) => {

    const navigate = useNavigate()

    return <>
        <Box display='flex' alignItems='center' flexDirection='column' sx={{
            background: '#FFFFFF',
            boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.05)',
            borderRadius: '20px',
            padding: '30px 45px 36px 50px',
            width: '29%',
        }}>
            <Typography sx={{
                fontWeight: 600,
                fontSize: '36px',
                lineHeight: '44px',
                textAlign: 'center',
                color: '#191A15'
            }}>
                {amount}&nbsp;
                <Typography variant='span' sx={{
                    fontWeight: 600,
                    fontSize: '27px',
                    lineHeight: '44px',
                    textAlign: 'center',
                    color: '#191A15'
                }}>lookups</Typography>
            </Typography>
            <Typography variant='p' sx={{
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '27px',
                textAlign: 'center',
                color: '#A6A6A6',
                }}>Purchase once, use anytime
                Lookup {amount} Emails & Direct Phone Numbers
            </Typography>

            <Box display='flex' alignItems='flex-start' marginRight='35%'>
                <Typography variant='p' xs={{
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '30px',
                    color: '#A6A6A6'
                }}>$</Typography>
            </Box>

            <Typography variant='h6' xs={{
                fontWeight: 600,
                fontSize: '32px',
                lineHeight: '30px',
                color: '#191A15'
            }}>{price}</Typography>

            <Box marginTop='30px'>
                <Button
                sx={{
                    background: "#388E3C",
                    borderRadius: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#FFFFFF",
                    padding: '10px 50px',
                    ':hover': {
                        backgroundColor: "#1E5620",
                    }
                }}
                onClick={() => { navigate('/login') }}
            >
                Add to plan
            </Button>
            </Box>
        </Box>
    </>
}

export default LookupPricingCard
