/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height:{
        "30rem":"30rem"
      },
      dropShadow: {
        "4xl": "5px 5px 15px rgb(0 0 0 / 0.15) ",
      },
      boxShadow:{
        "4xl":"0px 2px 5px rgb(0 0 0 / 0.15), 0px -2px 15px rgb(0 0 0 / 0.15)"
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "auto-fit": "repeat(auto-fit, minmax(320px, 1fr))",
      },
      borderRadius: {
        curve: "10px",
      },
      colors: {
        "add-to-cart-seagreen": "rgb(46, 254, 178)",
      },
      keyframes:{
        forward:{
          from:{
            opacity:0,
            transform:"translateY(-2px);"
          },
          to:{
            opactiy:1,
            transform:"translateY(2px)"
          }
          
        },
        popUp:{
          from:{
              transform:"translateY(900px)"
          },
          to:{
            transform:"translateY(160px)"
          }

        }
      },
      animation:{
        "ease-forward":"forward 0.4s ease-in-out ",
        "pop-up":"popUp 0.4s ease-in-out"
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("open", "&[open]");
    },
  ],
};
