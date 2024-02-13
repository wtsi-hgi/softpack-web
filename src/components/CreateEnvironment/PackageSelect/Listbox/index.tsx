import {
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  HTMLAttributes,
  ReactElement,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";

// virtualised listbox, passed to <Autocomplete>.
// substantially based on the example in the MUI documentation.
export const Listbox = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(
  function Listbox(props, ref) {
    const { children, ...otherProps } = props;
    const allChildren = (children as ReactElement[]).flatMap((child) => [
      child,
      ...((child as { children?: ReactElement[] }).children || []),
    ]);

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
      noSsr: true,
    });
    const itemCount = allChildren.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: React.ReactElement) => {
      if (child.hasOwnProperty("group")) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return allChildren.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={otherProps}>
          <VariableSizeList
            itemData={allChildren}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(allChildren[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  },
);

const LISTBOX_PADDING = 8;

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };
  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }
  return (
    <Typography component="li" {...dataSet.props} noWrap style={inlineStyle}>
      {dataSet.option}
    </Typography>
  );
}

function useResetCache(data: any) {
  const ref = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});
