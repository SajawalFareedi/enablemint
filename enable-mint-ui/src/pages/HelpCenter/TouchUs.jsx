import { Container, Box, Typography, TextField, Button } from "@mui/material"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


const TouchUs = () => {
  const navigate = useNavigate();
  const email = '';
  const name = '';
  const message = '';
  

  const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .required("Password is required")
        .min(8),
});

const formik = useFormik({
    initialValues: {
        email: email,
        name: name,
        message: message,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        formik.isSubmitting = true;
        setTimeout(() => {
        }, 700);
    },
});
  return (
    <Box sx={{
      width: "50%", 
      margin: "120px 0 0 50px !important",
      padding: "44px 60px",
      background: "#222938",
      borderRadius: "20px",
      margin: "auto",
      ['@media (max-width: 768px)']: { // eslint-disable-line no-useless-computed-key
          width: "80%", margin: "20px 0 0 0px !important",
          margin: "auto",
          padding: "20px 30px",
      }, 
      ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
          width: "100%", 
          margin: "20px 0 0 0px !important",
          padding: "20px 16px",
      }, 
    }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "30px",
            lineHeight: "36px",
            color: "white",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Get in touch with us
        </Typography>
        <Box sx={{display: "flex", flexDirection: 'column', justifyContent: "space-between", margin: '16px 0 16px 0'}}>
            <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "white",
                  marginBottom: "10px",
                  textAlign: "left",
                }}
            >
                Name
            </Typography>
            <TextField
                variant="outlined"
                id="name"
                name="name"
                type="name"
                autoComplete='off'
                placeholder="Enter your Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                label={formik.touched.name && formik.errors.name}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                    width: '100%',
                    background: "#FFFFFF",
                    borderRadius: "10px",
                }}
            />
        </Box>
        <Typography
            sx={{
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "19px",
                color: "white",
                marginBottom: "10px",
                textAlign: "left",
            }}
        >
            Email
        </Typography>
        <TextField
            variant="outlined"
            id="email"
            name="email"
            type="email"
            autoComplete='off'
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            label={formik.touched.email && formik.errors.email}
            InputLabelProps={{ shrink: true }}
            required
            sx={{
                width: '100%',
                background: "#FFFFFF",
                borderRadius: "10px",
            }}
        />
        <Box sx={{display: "flex", flexDirection: 'column', justifyContent: "space-between", marginTop: '16px'}}>
          <Typography
              sx={{
                  fontFamily: 'Inter',
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "white",
                  marginBottom: "10px",
                  textAlign: "left",
              }}
          >
              Message
          </Typography>
          <TextField
              variant="outlined"
              id="message"
              name="message"
              type="message"
              autoComplete='off'
              placeholder="What would you like say"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              error={formik.touched.message && Boolean(formik.errors.message)}
              label={formik.touched.message && formik.errors.message}
              InputLabelProps={{ shrink: true }}
              required
              sx={{
                  width: '100%',
                  background: "#FFFFFF",
                  borderRadius: "10px",
              }}
          />
        </Box>

        <Box display="flex" justifyContent="center">
            <Button type="submit" 
              sx={{
                marginTop: "20px",
                width: "100%",
                height: "50px",
                background: "#388E3C",
                borderRadius: "11px",
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '19px',
                textAlign: 'center',
                color: "#FFFFFF",
                '&:hover': {
                    background: "#377d3a",
                }
              }}
              disabled={formik.isSubmitting}
          >
              Contact US
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default TouchUs