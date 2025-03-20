import Image from "next/image";
import Box from "@mui/material/Box";

export default function Hero() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Image
        src="/botanical-leaves копія.jpg"
        alt="Hero image"
        layout="fill"
        objectFit="cover"
      />
    </Box>
  );
}
