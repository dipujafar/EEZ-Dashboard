const antTheme = {
  token: {
    colorPrimary: "#2f4f4f",
    colorInfo: "#2f4f4f",
  },
  components: {
    Layout: {
      bodyBg: "rgb(255,255,255)",
    },
    Menu: {
      itemSelectedColor: "#000",
      itemSelectedBg: "#0000000a",
      fontSize: 12,
    },
    Table: {
      headerBg: "#214246",
      headerColor: "#fff",
      colorBgContainer: "#F9F9FA",
      headerSplitColor: "#214246",
      colorText: "#5C5C5C",
      borderColor: "var(--color-section-bg)",
      rowHoverBg: "#21424617",
    },
    Modal: {
      colorIcon: "rgba(255,255,255,0.45)",
      contentBg: "var(--color-section-bg)",
      colorText: "var(--color-text-color)",
    },

    Button: {
      defaultBg: "var(--color-main)",
      defaultColor: "rgba(255,255,255,0.88)",
    },
    Popconfirm: {
      colorWarning: "rgb(205,3,53)",
    },
    Form: {
      // labelFontSize: 16,
    },
  },
};

export default antTheme;
