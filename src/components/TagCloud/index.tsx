import { useContext } from "react";
import { Link } from "react-router-dom";
import { TagCloud as ReactTagCloud, Tag } from "react-tagcloud";

import { EnvironmentsQueryContext } from "../EnvironmentsQueryContext";

export const TagCloud = () => {
  const environmentsQuery = useContext(EnvironmentsQueryContext);

  if (environmentsQuery.loading) {
    return "todo loading spinner";
  }

  if (environmentsQuery.error) {
    return (
      <div style={{ color: "red" }}>{environmentsQuery.error.message}</div>
    );
  }

  const tagCounts: Record<string, number> = {};
  environmentsQuery.data?.environments.forEach((env) => {
    env.tags.forEach((tag) => {
      if (!Object.hasOwn(tagCounts, tag)) {
        tagCounts[tag] = 0;
      }
      tagCounts[tag]++;
    });
  });
  const tags: Tag[] = Object.entries(tagCounts).map(([tag, count]) => ({
    value: tag,
    count,
  }));

  return (
    <ReactTagCloud
      disableRandomColor
      minSize={20}
      maxSize={50}
      tags={tags}
      renderer={(tag, size, colour) => {
        return (
          <Link
            key={tag.key || tag.value}
            to="/environments"
            style={{ fontSize: `${size}px` }}
          >
            {tag.value}
          </Link>
        );
      }}
      onClick={({ value }) => {
        console.log(`clicked tag ${value}`);
      }}
    />
  );
};
