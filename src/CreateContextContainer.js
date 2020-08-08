import React, { useContext } from "react";

const flex = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "10px 0 20px 0",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes);

export const CreateContextContainer = ({ className }) => {
  return (
    <div className={className}>
      <ThemeContext.Provider value={themes.light}>
        <h1>Covering useContext</h1>
        <Toolbar />
      </ThemeContext.Provider>
    </div>
  );
};

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
      <button style={{ background: theme.background, color: theme.foreground }}>
        I am styled by theme context!
      </button>
  );
}
