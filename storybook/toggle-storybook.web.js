import React, { useState, useEffect } from "react";
import * as QueryString from "query-string";
export const ToggleStorybook = (props) => {
    const [StorybookUIRoot, setStorybookUIRoot] = useState(null);
    const [queryParams, setQueryParams] = useState({});
    useEffect(() => {
        if (__DEV__) {
            // Load the storybook UI once
            setStorybookUIRoot(() => require("./storybook").StorybookUIRoot);
        }
    }, []);
    useEffect(() => {
        if (__DEV__) {
            setQueryParams(QueryString.parse(window.location.search));
        }
    }, [window.location.search]);
    if (queryParams?.storybook) {
        return StorybookUIRoot ? <StorybookUIRoot /> : null;
    }
    else {
        return props.children;
    }
};
//# sourceMappingURL=toggle-storybook.web.js.map