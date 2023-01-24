const allowedOrigins = [
  "http://localhost:3000",
  "https://du-web-five.vercel.app",
];

const corsOption = {
  origin: (origin:any, callback:any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not alowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOption;
