import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';




function App() {
  let formValues = {
    id: "",
    name: "",
    subtitle: "",
    author: "",
    publisher: "",
    
    error: {
      Title: "",
      subtitle: "",
      author: "",
      publisher: "",
      
    },
  };
  const [formData, setFormData] = useState(formValues);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://632afbeb713d41bc8e7cea33.mockapi.io/library"
      );
      setUserData(response.data);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    let error = { ...formData.error };
    if (e.target.value === "") {
      error[e.target.Title] = `${e.target.Title} is Required`;
    } else {
      error[e.target.Title] = "";
    }
    setFormData({ ...formData, [e.target.Title]: e.target.value, error });
  };

  const onPopulateData = (id) => {
    const selectedData = userData.filter((row) => row.id === id)[0];
    setFormData({
      ...formData,
      ...selectedData,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errKeys = Object.keys(formData).filter((key) => {
      if (formData[key] === "" && key != "error" && key != "id") {
        return key;
      }
    });
    if (errKeys.length >= 1) {
      alert("Please fill all values");
    } else {
      if (formData.id) {
       
        const response = await axios.put(
          `https://632afbeb713d41bc8e7cea33.mockapi.io/library${formData.id}`,
          {
            Title: formData.Title,
            subtitle: formData.subtitle,
            author: formData.author,
            publisher: formData.publisher,
           
          }
        );
        let users = [...userData];
        let index = users.findIndex((row) => row.id === response.data.id);
        users[index] = response.data;
        setUserData(users);
      } else {
       
        const response = await axios.post(
          "https://632afbeb713d41bc8e7cea33.mockapi.io/library",
          {
            Title: formData.Title,
            subtitle: formData.subtitle,
            author: formData.author,
            publisher: formData.publisher,
            
          }
        );
        setUserData([...userData, response.data]);
      }
      setFormData(formValues);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h3> Book </h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
       <TextField
          id="Title"
          type="Title"
          label="Title"
          variant="standard"
          name="Title"

          value={formData.Title}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.Title}</span>
        <br />
        <TextField
          id="subtitle"
          label="Subtitle"
          variant="standard"
         name="subtitle"
          value={formData.subtitle}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.subtitle}</span>
        <br />
        <TextField
          id="author"
          type="author"
          label="Author"
          variant="standard"
          name="author"
          value={formData.author}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.author}</span>
        <br />
        <TextField
          id="publisher"
          type="publisher"
          label="Publisher"
          variant="standard"
          name="publisher"

          value={formData.publisher}
          onChange={(e) => handleChange(e)}
        />
         <br />
        <TextField
          id="description"
          type="description"
          label="Description"
          variant="standard"
          name="description"

          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.publisher}</span>
       <br />
        
   <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      <h3 style={{ color: "purple" }}>Books Available </h3>
      <TableContainer component={Paper}>
        <Table sx={{ width: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#00838f" }}>Id</TableCell>
              <TableCell align="right"style={{ color: "#00838f" }}>Title</TableCell>
              <TableCell align="right" style={{ color: "#00838f" }}>Subtitle</TableCell>
              <TableCell align="right"style={{ color: "#00838f" }}>Author</TableCell>
              <TableCell align="right"style={{ color: "#00838f" }}>Publisher</TableCell>
              <TableCell align="right"style={{ color: "#00838f" }}>Description</TableCell>
              <TableCell align="right"style={{ color: "#00838f" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.Title}</TableCell>
                <TableCell align="right">{row.subtitle}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">{row.publisher}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                
                <TableCell>
                  <Button variant="contained" onClick={() => onPopulateData(row.id)}>
                    Edit
                  </Button>
                  <br />
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;


