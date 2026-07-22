import { lazy, Suspense, useState } from "react";
import ChatLauncher from "./ChatLauncher.jsx";

import "../styles/ChatWidget.css";

const ChatPanel = lazy(() => import("./ChatPanel.jsx"));

function ChatWidget({ stacked = true }) {
    const [open, setOpen] = useState(false);

    function closeChat() {
        setOpen(false);
    }

    return (
        <>
            <ChatLauncher
                open={open}
                stacked={stacked}
                onOpen={() => setOpen(true)}
            />

            {open ? (
                <Suspense fallback={null}>
                    <ChatPanel stacked={stacked} onClose={closeChat} />
                </Suspense>
            ) : null}
        </>
    );
}

export default ChatWidget;
