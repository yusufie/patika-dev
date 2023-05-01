import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function Loading() {
  return (
    <Stack spacing={1} alignItems={"center"} marginTop={5}>
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
      <Skeleton variant="rectangular" width={1200} height={90} />
    </Stack>
  );
}

export default Loading;