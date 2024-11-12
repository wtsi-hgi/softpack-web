import { Box } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { TagCloud as ReactTagCloud, Tag } from "react-tagcloud";

import { compareStrings } from "../../strings";
import { EnvironmentsContext } from "../../endpoints";

export const TagCloud = () => {
  const [environmentsQuery] = useContext(EnvironmentsContext);
  const [, setFilterUsers] = useLocalStorage<string[]>(
    "environments-filterusers",
    [],
  );
  const [, setFilterGroups] = useLocalStorage<string[]>(
    "environments-filtergroups",
    [],
  );
  const [, setFilterTags] = useLocalStorage<string[]>(
    "environments-filtertags",
    [],
  );

  if (!environmentsQuery.data?.length) {
    return <></>;
  }

  if (environmentsQuery.error) {
    return (
      <div style={{ color: "red" }}>{environmentsQuery.error}</div>
    );
  }

  const tagCounts: Record<string, number> = {};
  environmentsQuery?.data.forEach((env) => {
    env.tags.forEach((tag) => {
      if (!Object.hasOwn(tagCounts, tag)) {
        tagCounts[tag] = 0;
      }
      tagCounts[tag]++;
    });
  });
  const tags: Tag[] = Object.entries(tagCounts)
    .map(([tag, count]) => ({
      value: tag,
      count,
    }))
    .sort((a, b) => compareStrings(a.value, b.value));

  return (
    <Box textAlign="center">
      <ReactTagCloud
        shuffle={false}
        colorOptions={{
          luminosity: "dark",
        }}
        randomSeed={19}
        minSize={16}
        maxSize={160 / 2}
        tags={tags}
        // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/68862
        style={{ textWrap: "wrap", wordBreak: "break-all" }}
        renderer={(tag, size, color) => {
          return (
            <Link
              key={tag.key || tag.value}
              to="/environments"
              style={{
                fontSize: `${size}px`,
                color,
                margin: "0 5px",
                textDecoration: "none",
                verticalAlign: "middle",
                textWrap: "nowrap",
                borderRadius: "8px",
                padding: "0 0.4ex",
              }}
            >
              {tag.value}
            </Link>
          );
        }}
        onClick={({ value }) => {
          setFilterUsers([]);
          setFilterGroups([]);
          setFilterTags([value]);
        }}
      />
    </Box>
  );
};
