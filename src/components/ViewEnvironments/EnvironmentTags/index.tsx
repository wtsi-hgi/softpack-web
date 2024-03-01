import { Chip, Stack } from "@mui/material";

type EnvironmentTagsProps = {
  tags: string[];
};

export function EnvironmentTags(props: EnvironmentTagsProps) {
  return (
    <Stack
      sx={{ marginTop: 1 }}
      direction="row"
      flexWrap="wrap"
      useFlexGap
      spacing={1}
    >
      {props.tags.map((tag) => (
        <Chip key={tag} sx={{ marginTop: -0.5 }} label={tag} size="small" />
      ))}
    </Stack>
  );
}
