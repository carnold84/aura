/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        appMenuHide: "appMenuHide 450ms cubic-bezier(0.16, 1, 0.3, 1)",
        appMenuShow: "appMenuShow 450ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogContentHide:
          "dialogContentHide 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogContentShow:
          "dialogContentShow 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        drawerContentHide:
          "drawerContentHide 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        drawerContentShow:
          "drawerContentShow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayHide: "overlayHide 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        spinFast: "spin 500ms linear infinite",
      },
      colors: {
        error: colors.red,
        primary: colors.orange,
        success: colors.green,
      },
      fontFamily: {
        display: [
          '"Inter", sans-serif',
          {
            fontOpticalSizing: "auto",
            fontVariationSettings: '"slnt" 0',
          },
        ],
      },
      keyframes: {
        appMenuHide: {
          "0%": {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          "100%": {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
        },
        appMenuShow: {
          "0%": {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
          "100%": {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
        },
        dialogContentHide: {
          from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          to: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
        },
        dialogContentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        drawerContentHide: {
          from: {
            transform: "translate(0, 0)",
          },
          to: {
            transform: "translate(-100%, 0)",
          },
        },
        drawerContentShow: {
          from: {
            transform: "translate(-100%, 0)",
          },
          to: {
            transform: "translate(0, 0)",
          },
        },
        overlayHide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
