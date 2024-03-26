/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
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
        overlayHide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        dialogContentHide:
          "dialogContentHide 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogContentShow:
          "dialogContentShow 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayHide: "overlayHide 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 250ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
