import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  Container,
  Button,
  Divider
} from "@mui/material";

export default function App() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isDisabled, setIsDisbled] = useState<boolean>(true);
  useEffect(() => {
    let active = true;
    if (answer) setIsDisbled(false);
    else setIsDisbled(true);
    return () => {
      active = false;
    };
  });
  const handleClick = (event: any) => {
    const value = event.target.value;

    if (value === "AC") {
      setAnswer(null);
      setIsDisbled(true);
      return;
    }

    if (value === "=") {
      // strip anything other than digits, (), -+/* and .
      let evalAnswer =
        answer &&
        answer
          .replace("%", "/")
          .replace("x", "*")
          .replace(/[^-()\d/*+.]/g, "");

      let finalAnswer = evalAnswer && eval(evalAnswer);
      setAnswer(`${finalAnswer}`);
    } else {
      if (answer) setAnswer(`${answer}${value}`);
      else setAnswer(value);
    }
  };
  return (
    <div className="App">
      <h1 style={{ padding: 10, color: "#868c94" }}>Calculator</h1>
      <Container style={{ padding: 10 }}>
        <TextField
          id="display"
          name="display"
          value={answer ?? 0}
          disabled
          fullWidth
        />
      </Container>

      <Container>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {["x", "%", "-", "+", "=", "AC"].map((value) => (
              <Grid key={value} item>
                <Button
                  style={{
                    height: 50,
                    width: 100,
                    background: "#868c94",
                    color: "#fff"
                  }}
                  value={value}
                  onClick={handleClick}
                  disabled={isDisabled}
                >
                  {value}
                </Button>
              </Grid>
            ))}
          </Grid>
          <span style={{ margin: 3 }} />
          <Grid container justifyContent="center" spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ","].map((value) => (
              <Grid key={value} item>
                <Paper
                  sx={{
                    height: 50,
                    width: 100,
                    backgroundColor: "#868c94"
                    // backgroundColor: (theme) =>
                    //   theme.palette.mode === "dark" ? "#1A2027" : "#fff"
                  }}
                >
                  <Button
                    style={{ height: 50, width: 100, color: "#fff" }}
                    value={value}
                    onClick={handleClick}
                  >
                    {value}
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
