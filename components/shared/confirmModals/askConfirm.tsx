import React from 'react'
import { createRoot } from "react-dom/client";
import ConfirmModal from './ConfirmModal';

const askConfirm = (message: string) => {
    return new Promise((resolve) => {
        const div = document.createElement("div")
        document.body.append(div)

        const root = createRoot(div)

        function handleConfirm() {
            cleanUp()
            resolve(true)
        }

        function handleCancel() {
            cleanUp()
            resolve(false)
        }

        function cleanUp() {
            root.unmount()
            div.remove()
        }

        root.render(
            <ConfirmModal
                message={message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        )
    })
}

export default askConfirm
