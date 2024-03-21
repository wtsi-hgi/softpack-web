import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { useContext, useState } from "react";

import { compareStrings } from "../../strings";
import { AvailableTagsContext } from "../AvailableTagsContext";

type TagSelectProps<Multiple extends boolean> = Multiple extends true
  ? {
    multiple: true;
    value: string[];
    onChange: (value: string[]) => void;
  }
  : {
    multiple: false;
    value: string | null;
    onChange: (value: string | null) => void;
  };

function isValidTag(tag: string): boolean {
  // this logic copied from softpack-core environment.py
  // It's not critical that this reject *all* invalid tags, it's just a nicer UX
  // if it does.
  return !!(
    tag === tag.trim() &&
    tag.match(/^[a-zA-Z0-9 ._-]+$/) &&
    !tag.match(/\s\s/)
  );
}

// TagSelect is a dropdown that allows the user to choose from `availableTags`
// or enter their own tag (or tags, if `multiple` is true).
export function TagSelect<Multiple extends boolean>(
  props: TagSelectProps<Multiple>,
) {
  const [tagInput, setTagInput] = useState("");
  const availableTags = useContext(AvailableTagsContext);

  const tags = props.multiple
    ? props.value
    : props.value != null
      ? [props.value]
      : [];

  const allTags = new Set([...availableTags, ...tags.filter(isValidTag)]);
  const tagOptions: (
    | string
    | { label: string; value: string; origValue: string }
  )[] = Array.from(allTags).toSorted(compareStrings);
  const trimmedTagInput = tagInput.trim(); // do a certain amount of auto-correcting
  if (
    tagOptions.indexOf(trimmedTagInput) < 0 &&
    trimmedTagInput.length > 0 &&
    isValidTag(trimmedTagInput) // but not too much
  ) {
    tagOptions.unshift({
      label: `Add "${trimmedTagInput}"`,
      value: trimmedTagInput,
      origValue: tagInput,
    });
  }

  type Value = (typeof tagOptions)[number];

  const commonProps = {
    disablePortal: true, // so it works in a Drawer
    openOnFocus: true,
    options: tagOptions,
    filterOptions: createFilterOptions<Value>({
      // make sure the "add ..." option still gets matched by search
      stringify: (option) =>
        typeof option === "string" ? option : option.origValue,
    }),
    inputValue: tagInput,
    onInputChange: (_: unknown, value: string) => setTagInput(value),
    getOptionLabel: (option: Value) =>
      typeof option === "string" ? option : option.label,
    renderInput: (params: AutocompleteRenderInputParams) => {
      return <TextField {...params} className="tag-input" variant="standard" />;
    },
    sx: {
      flexGrow: 1,
    },
  };

  // Branching on `multiple` is required in order to convince tsc that this code
  // is correctly typed. Branching on `multiple` within the callback doesn't
  // work. (Explicitly passing the `Multiple` type parameter also doesn't work;
  // you have to let tsc infer it from `multiple` and `value`.)
  return props.multiple ? (
    <Autocomplete
      {...commonProps}
      multiple={props.multiple}
      value={props.value}
      onChange={(_, value) =>
        props.onChange(
          value
            .map((elem) => (typeof elem === "string" ? elem : elem.value))
            .filter(isValidTag),
        )
      }
    />
  ) : (
    <Autocomplete
      {...commonProps}
      multiple={props.multiple}
      value={props.value}
      onChange={(_, value) => {
        const val = typeof value === "string" ? value : value?.origValue;
        props.onChange(val != null && isValidTag(val) ? val : null);
      }}
    />
  );
}
