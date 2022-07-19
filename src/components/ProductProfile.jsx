import {
  Box,
  TextField,
  createTheme,
  styled,
  Stack,
  FormControlLabel,
  Button,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import blankPhoto from "../assets/blank-photo.png";
import { getCategories } from "./../API/CategoriesAPI";
import { ProductValidation } from "../Validations";
import { errors } from "joi-browser";
import { number } from "joi";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d1d535",
    },
    secondary: {
      main: "#76448A ",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 35,
            color: "green",
          },
        },
      ],
    },
  },
});

const MyComponent = styled("button")(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
  display: "flex",
  fontSize: 16,
  margin: 5,
  type: "button",
  cursor: "pointer",
}));

export default function ProductProfile() {
  const [errorsList, setErrorsList] = useState({});
  const [imgURL, setImgURL] = useState(blankPhoto);
  const [Categs, setCateg] = useState([]);
  const [Product, setProduct] = useState({
    productNo: 0,
    catNo: "",
    isActive: 1,
  });

  useEffect(async () => {
    setCateg(await getCategories());
  }, []);

  const handleChange = ({ target: input }) => {
    let updatedValue = {};

    // Remove the empty value
    if (input.value === "") {
      let copyOfProduct = { ...Product };
      delete copyOfProduct[input.name];

      setProduct((Product) => ({
        ...copyOfProduct,
      }));
      return;
    }

    //adding a new Values
    updatedValue = { [input.name]: input.value };
    setProduct((Product) => ({
      ...Product,
      ...updatedValue,
    }));
  };

  const handleAddImageURL = ({ target: input }) => {
    console.log({ input });
    setImgURL(URL.createObjectURL(input.files[0]));

    let updatedValue = { picName: input.files[0].name };
    setProduct((Product) => ({
      ...Product,
      ...updatedValue,
    }));
  };

  const handleSubmitted = (e) => {
    e.preventDefault();
    validateProduct();
  };

  const validateProduct = () => {
    setErrorsList({});
    let validationErrors = ProductValidation(Product);

    let errors = {};
    validationErrors.map((err) => {
      errors[err.path] = err.message;
    });

    if (Product.oldPrice != undefined && +Product.price >= +Product.oldPrice)
      errors["oldPrice"] = "Old Price must be greater that the sale Price";
    setErrorsList((errorsList) => ({
      ...errorsList,
      ...errors,
    }));
  };

  return (
    <form>
      <Stack direction="row" spacing={5} marginY={3}>
        <Box flex={3}>
          <Box>
            <TextField
              id="productName"
              name="productName"
              label="Product Name"
              variant="outlined"
              size="small"
              fullWidth
              helperText={errorsList.productName}
              error={errorsList.productName ? true : false}
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
          </Box>
          <Box justifyContent={"space-between"} display={"flex"} marginY={3}>
            <TextField
              id="code"
              name="code"
              label="Code"
              variant="outlined"
              margin="dense"
              size="small"
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
            <FormControl>
              <InputLabel id="lbl-CatNo">Category</InputLabel>
              <Select
                labelId="lbl-CatNo"
                id="catNo"
                name="catNo"
                variant="outlined"
                value={Product.catNo}
                size="small"
                sx={{ marginTop: 1, minWidth: 210 }}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {Categs.length > 0 ? (
                  Categs.map((categ) => (
                    <MenuItem key={categ.catNo} value={categ.catNo}>
                      {categ.catName}
                    </MenuItem>
                  ))
                ) : (
                  <h1></h1>
                )}
              </Select>
            </FormControl>
          </Box>

          <Box justifyContent={"space-between"} display={"flex"} marginY={3}>
            <TextField
              id="canvasType"
              name="canvasType"
              label="Canvas Type"
              variant="outlined"
              margin="dense"
              size="small"
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
            <TextField
              id="madeIn"
              name="madeIn"
              label="Made In"
              variant="outlined"
              margin="dense"
              size="small"
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
          </Box>
          <Box justifyContent={"start"} display={"flex"} marginY={3}>
            <TextField
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              margin="dense"
              size="small"
              type="number"
              helperText={errorsList.price}
              error={errorsList.price ? true : false}
              onChange={(e) => {
                handleChange(e);
              }}
              sx={{ width: "100px", marginRight: 1 }}
            ></TextField>
            <TextField
              id="oldPrice"
              name="oldPrice"
              label="Old Price"
              variant="outlined"
              margin="dense"
              size="small"
              type={"number"}
              helperText={errorsList.oldPrice}
              error={errorsList.oldPrice ? true : false}
              sx={{ width: "100px" }}
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
          </Box>
          <Box marginY={3}>
            <TextField
              id="comments"
              name="comments"
              label="Comments"
              variant="outlined"
              size="small"
              minRows={3}
              multiline
              fullWidth
              onChange={(e) => {
                handleChange(e);
              }}
            ></TextField>
          </Box>
          <Box marginY={3}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              name="isActive"
              label="Active"
              onChange={(e) => {
                e.target.checked ? (e.target.value = 1) : (e.target.value = 0);
                handleChange(e);
              }}
            />
          </Box>
        </Box>
        <Box flex={3}>
          <Box>
            <img className="card-Image" src={imgURL} />
          </Box>
          <Box>
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleAddImageURL(e)}
              />
              <LoadingButton
                startIcon={<SaveIcon />}
                variant="outlined"
                component="span"
                sx={{ width: "180px" }}
                size="small"
              >
                "Upload Image"
              </LoadingButton>
              <FormHelperText error={errorsList.productName ? true : false}>
                {errorsList.picName}
              </FormHelperText>
            </label>
          </Box>
        </Box>
      </Stack>
      <Box justifyContent={"center"} display="flex">
        <Button
          variant="contained"
          color="success"
          disableElevation
          sx={{ width: "200px" }}
          onClick={(e) => handleSubmitted(e)}
        >
          Save
        </Button>
      </Box>
    </form>
  );
}
