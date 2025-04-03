import { Box, Typography } from "@mui/material";
import ImageUpload from "./components/imageUpload";

export default function Home() {
  return (
    <Box className="container" sx={{ textAlign: "center", mx: "auto" }}>
      <Box component="main" 
        sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", minHeight: "100vh", width: "100%", }}>
        <Box sx={{ mx: "auto" }}>
          <Typography sx={{ color: "#D29BAC", fontWeight: "bold", fontSize: "24px" }}>
            Image Compression Mini App
          </Typography>
        </Box>
        <Box className="gap-4 items-center flex-col md:flex-row">
          <ImageUpload />
        </Box>
      </Box>
      <Box component="footer" sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", justifyContent: "center", color: "#D29BAC" }}>
        <div>by Joli</div>
      </Box>
    </Box>
  );
}
