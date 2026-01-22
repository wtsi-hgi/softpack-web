import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const ErrorSnackbar = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const showError = (err: unknown, fallback = "Something went wrong") => {
        const text = err instanceof Error ? err.message : fallback;
        setMessage(text);
        setOpen(true);
    };

    return {
        showError,
        snackbar: (
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="error">
                    {message ?? "Unexpected error"}
                </Alert>
            </Snackbar>
        ),
    };
};
