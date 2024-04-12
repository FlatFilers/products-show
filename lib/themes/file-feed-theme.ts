export const fileFeedTheme = {
  root: {
    primaryColor: "#CD2659",
    warningColor: "#FF9800",
  },
  sidebar: {
    logo: `https://images.ctfassets.net/e8fqfbar73se/4c9ouGKgET1qfA4uxp4qLZ/e3f1a8b31be67a798c1e49880581fd3d/white-logo-w-padding.png`,
    textColor: "#FFFFFF",
    titleColor: "#FFFFFF",
    focusBgColor: "#e26189",
    focusTextColor: "#FFFFFF",
    backgroundColor: "#CD2659",
    footerTextColor: "#FFFFFF",
    textUltralightColor: "#FF0000",
  },
  table: {
    inputs: {
      radio: {
        color: "rgb(8 117 225)",
      },
      checkbox: {
        color: "rgb(8 117 225)",
      },
    },
    filters: {
      color: "#808080",
      active: {
        backgroundColor: "rgb(8 117 225)",
      },
      error: {
        activeBackgroundColor: "#FA8072",
      },
    },
    column: {
      header: {
        fontSize: "12px",
        backgroundColor: "rgb(240 240 240)",
        color: "#678090",
        dragHandle: {
          idle: "rgb(8 117 225)",
          dragging: "#0000FF",
        },
      },
    },
    fontFamily: "Arial",
    indexColumn: {
      backgroundColor: "rgb(240 240 240)",
      selected: {
        color: "rgb(240 240 240)",
        backgroundColor: "rgb(200 200 200)",
      },
    },
    cell: {
      selected: {
        backgroundColor: "rgb(235 245 255)",
      },
      active: {
        borderColor: "rgb(8 117 225)",
        spinnerColor: "#808080",
      },
    },
    boolean: {
      toggleChecked: "rgb(240 240 240)",
    },
    loading: {
      color: "rgb(240 240 240)",
    },
  },
};
