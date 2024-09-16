import React, { Component } from "react";
import "./HomePage.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CrudServices from "../Services/CrudServices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Swal from 'sweetalert2';
import Autocomplete from '@mui/material/Autocomplete';


const service = new CrudServices();
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      age: "",
      dept: "",
      salary: "",
      email: "",
      pass: "",
      DataRecord: [],
      MenuDataRecord : [],
      UpdateFlag: false,
    };
  }

  componentWillMount() {
    console.log("Component will mount calling");
    this.ReadRecord();
    this.MenuRecord();
  }

  MenuRecord() {
    service
      .MenuRecord()
      .then((data) => {
        console.log(data);
        console.log("Get Menu : ", data.data);
        this.setState({ MenuDataRecord: data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ReadRecord() {
    service
      .ReadRecord()
      .then((data) => {
        console.log(data);
        console.log("Get Record : ", data.data);
        this.setState({ DataRecord: data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, console.log(this.state));
  };

  handleClick = () => {
    if (
      this.state.name === "" ||
      this.state.age === "" ||
      this.state.dept === "" ||
      this.state.salary === "" ||
      this.state.email === "" ||
      this.state.pass === ""
    ) {
      //alert("Please fill all the fields");
      Swal.fire({
        icon:'warning',
        title:'Input Error',
        text:'Please fill all the fields',
      })
      console.log("Input fields are empty");
      return;
    }
    console.log("Data : ", this.state);
    if (this.state.UpdateFlag === false) {
      const data = {
        name: this.state.name,
        age: Number(this.state.age),
        dept: this.state.dept,
        salary: Number(this.state.salary),
        email: this.state.email,
        pass: this.state.pass,
      };
      service
        .CreateRecord(data)
        .then((data) => {
          console.log(data);
          Swal.fire({
            icon:'success',
            title:'Success',
            text:'Record Added Successfully',
          })
          this.ReadRecord();
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon:'error',
            title:'Error',
            text:'Something went wrong',
          })
        });
    } else {
      const data = {
        id: this.state.id,
        name: this.state.name,
        age: Number(this.state.age),
        dept: this.state.dept,
        salary: Number(this.state.salary),
        email: this.state.email,
        pass: this.state.pass,
      };
      service
        .UpdateRecord(data)
        .then((data) => {
          console.log(data);
          Swal.fire({
            icon:'success',
            title:'Success',
            text:'Record Updated Successfully',
          })
          this.ReadRecord();
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon:'error',
            title:'Error',
            text:'Something went wrong',
          })
        });
    }
    this.setState({
      id: "",
      name: "",
      age: "",
      dept: "",
      salary: "",
      email: "",
      pass: "",
      UpdateFlag: false,
    });
  };

  handleEdit = (data) => {
    this.setState({
      id: data.id,
      name: data.name,
      age: data.age,
      dept: data.dept,
      salary: data.salary,
      email: data.email,
      pass: data.pass,
      UpdateFlag: true,
    });
  };

  handleDelete = (datas) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with delete operation
        const data = {
          id: datas.id,
        };
  
        service
          .DeleteRecord(data)
          .then((response) => {
            // Remove the deleted record from the state
            const updatedRecords = this.state.DataRecord.filter(
              (record) => record.id !== datas.id
            );
            this.setState({ DataRecord: updatedRecords });
  
            // Show success message
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The record has been deleted.',
            });
          })
          .catch((error) => {
            // Show error message
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while deleting the record!',
            });
            console.log(error);
          });
      }
    });
  };
  

  render() {
    let state = this.state;
    let Self = this;
    return (
      <div className="MainContainer">
        <div className="SubContainer">
          {localStorage.getItem("dept") === "Admin" ? (
            <div className="Box1">
              <div className="Input-Container">
                <div className="flex-Container">
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    size="small"
                    variant="outlined"
                    value={state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="flex-Container">
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    size="small"
                    variant="outlined"
                    value={state.age}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="flex-Container">
  <FormControl fullWidth size="small" variant="outlined">
    <Autocomplete
      options={["Admin", "User"]}  // Array of options
      getOptionLabel={(option) => option}  // Set option label
      value={this.state.dept}  // Current selected value
      onChange={(event, newValue) => {
        this.setState({ dept: newValue });  // Update state when value changes
      }}
      renderInput={(params) => (
        <TextField
        size="small"
          {...params}
          label="Department"
          variant="outlined"
        />
      )}
    />
  </FormControl>
</div>

                <div className="flex-Container">
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    size="small"
                    variant="outlined"
                    value={state.salary}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="flex-Container">
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    size="small"
                    variant="outlined"
                    value={state.email}
                    onChange={this.handleChange}
                    disabled={state.UpdateFlag}
                  />
                </div>
                <div className="flex-Container">
                  <TextField
                    fullWidth
                    label="Password"
                    name="pass"
                    size="small"
                    variant="outlined"
                    value={state.pass}
                    onChange={this.handleChange}
                    disabled={state.UpdateFlag}
                  />
                </div>

                <div className="flex-button">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleClick}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="Box2">
            {Array.isArray(this.state.DataRecord) &&
            this.state.DataRecord.length > 0 ? (
              this.state.DataRecord.map(function (data, index) {
                return (
                  <div key={index} className="data-flex">
                    <div className="UserName">{data.name}</div>
                    <div className="Department">{data.dept}</div>
                    {localStorage.getItem("dept") === "Admin" ? (
                      <div className="Update">
                        <Button
                          variant="outlined"
                          onClick={() => Self.handleEdit(data)}
                        >
                          <EditIcon />
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {localStorage.getItem("dept") === "Admin" ? (
                      <div className="Delete">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => Self.handleDelete(data)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
