import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { useStyles } from "./style";

const optionsList = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" }
];
const Popup = ({ click }) => {
  const [options, setoptions] = React.useState(optionsList);
  const [inputValue, setInputValue] = React.useState([]);
  const [array, setarray] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [value1, setValue1] = React.useState([]);
  const [text, setText] = React.useState("");

  const handleClick = (item, index) => {
    array.splice(index, 1);
    const a = [...array];
    setarray(a);
    const opt = [...options];

    opt.push(item);

    setoptions(opt);
  };
  const handleLink = () => {
    const dummyarr = [...array];
    if (inputValue !== "") {
      dummyarr.push(value);

      let uniqueOptions = [...new Set(dummyarr)];
      setarray(uniqueOptions);
      const arropt = options.filter((val) => val.value !== value.value);
      setoptions(arropt);
      setValue1("");
    }
  };
  const handleInput = (e, newInputValue) => {
    setInputValue(newInputValue);
    setValue1(newInputValue);
  };

  const handleonchange_Auto2 = (e, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClick_Cancel();
    postUser();
  };

  const handleClick_Cancel = () => {
    click("right", false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAuto2 = (newValue, a, i) => {
    const autoarr = array;
    autoarr[i] = newValue;
    var options2 = [...optionsList];
    autoarr.map((val1, index) => {
      options2 = options2.filter((val2) => val2?.value !== val1?.value);
    });
    setoptions(options2);
  };

  async function postUser() {
    let payload = {
      segment_name: text,
      schema: array
    };
    alert(JSON.stringify(payload));
    axios
      .post(
        "https://webhook.site/3b144348-9bd4-4839-ad5f-bb687bfee3c1",
        payload
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const classes = useStyles();

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <diV className={classes.popup}>
          <Button className={classes.btnSegment} onClick={handleClick_Cancel}>
            <ArrowBackIosIcon /> Saving Segment
          </Button>
        </diV>
        <div className={classes.middle}>
          <div style={{ margin: "25px" }}>
            <Typography>Enter the Name of the segment</Typography>
            <br />
            <div>
              <TextField
                className={classes.txtfield}
                size="small"
                placeholder="Name of the segment"
                onChange={handleChange}
              ></TextField>{" "}
            </div>
            <br />
            <Typography>
              To save your segment, you need to add the schemas to build the
              query
            </Typography>
            <br />
            <div className={array.length ? classes.divauto2 : ""}>
              {array.map((item, index) => {
                return (
                  <div className={classes.disauto2} key={index}>
                    <Autocomplete
                      className={classes.autoComplete2}
                      size="small"
                      value={item.label}
                      onChange={(event, newValue) => {
                        handleAuto2(newValue, item, index);
                      }}
                      disablePortal
                      options={options}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          style={{
                            width: "400px"
                          }}
                          {...params}
                        />
                      )}
                    />
                    <Button onClick={() => handleClick(item, index)}>
                      <RemoveIcon />
                    </Button>
                  </div>
                );
              })}
            </div>
            <br />
            <div className={classes.divautoComplete}>
              <Autocomplete
                value={value1}
                onChange={(event, newValue) => {
                  handleonchange_Auto2(event, newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  handleInput(event, newInputValue);
                }}
                options={options}
                sx={{ width: 300, margin: "10px" }}
                getOptionDisabled={(option) => option === inputValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "400px" }}
                    label="Add schema to segment"
                  />
                )}
              />
            </div>
            <Button className={classes.link}>
              <Link onClick={() => handleLink()}>+ Add new schema</Link>
            </Button>
          </div>
        </div>
        <div className={classes.divbtnSave} style={{}}>
          <Button className={classes.btnSave} type="submit">
            Save the Segment
          </Button>
          <Button className={classes.btnCancel} onClick={handleClick_Cancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
