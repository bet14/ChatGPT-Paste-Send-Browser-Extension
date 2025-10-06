<xaiArtifact artifact_id="38ccafc3-47b3-4cc5-935f-a6bdd656f20a" artifact_version_id="cdc29476-e6f8-49a0-ae83-106e2fc95f0a" title="README.md" contentType="text/markdown">

# GPT Paste & Send Browser Extension

## Overview
The **GPT Paste & Send** is a JavaScript-based browser extension designed to enhance user interaction with web-based chat interfaces, particularly those similar to ChatGPT. It adds a convenient "Paste & Send" button to the webpage, allowing users to paste text from their clipboard into a text input area (e.g., textarea or contenteditable div) and automatically submit it with a single click. The extension is lightweight, user-friendly, and dynamically adapts to various chat interfaces by detecting input fields and submit buttons.

## Features
- **Dynamic Button Creation**: Adds a fixed "Paste & Send" button to the webpage with a modern, responsive design.
- **Automatic Input Detection**: Identifies the appropriate text input field (textarea or contenteditable div) using a prioritized list of selectors.
- **Clipboard Integration**: Reads text from the user's clipboard and pastes it into the detected input field.
- **Automatic Submission**: Simulates user input and triggers the form's submit button after pasting the text.
- **Error Handling**: Displays user-friendly error messages if the input field or submit button cannot be found, or if clipboard access fails.
- **DOM Monitoring**: Uses a MutationObserver to ensure the button persists even if the webpage's DOM changes dynamically.
- **Responsive Styling**: The button includes hover effects and is styled to be visually appealing and non-intrusive.
- **Debugging Support**: Logs detailed information about the input field's position and styles for debugging purposes.

## Installation
To use this extension, you can either load it as a userscript (e.g., via Tampermonkey or Greasemonkey) or package it as a browser extension for Chrome, Firefox, or other compatible browsers.

### Option 1: Userscript
1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) for Chrome or Firefox.
2. Create a new userscript in Tampermonkey.
3. Copy and paste the provided JavaScript code into the userscript editor.
4. Save the script, and it will automatically run on supported webpages.

### Option 2: Browser Extension
1. Create a new directory for the extension.
2. Save the provided JavaScript code as `content.js`.
3. Create a `manifest.json` file with the following content:

<xaiArtifact artifact_id="a69b28bf-6b7c-45d4-967a-9b95cfa37117" artifact_version_id="b4d5f0ea-c6bf-4638-8b00-2fd8b972db9d" title="manifest.json" contentType="application/json">
{
  "manifest_version": 3,
  "name": "GPT Paste & Send",
  "version": "1.0",
  "description": "Adds a Paste & Send button to paste clipboard content and submit it on chat interfaces.",
  "permissions": [
    "clipboardRead"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
</xaiArtifact>

4. Load the extension in your browser:
   - **Chrome**: Go to `chrome://extensions/`, enable "Developer mode," and click "Load unpacked" to select your extension directory.
   - **Firefox**: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on," and select the `manifest.json` file.

## Usage
1. Navigate to a webpage with a chat interface (e.g., a ChatGPT-like platform).
2. A "Paste & Send" button will appear at the top center of the page.
3. Copy text to your clipboard (e.g., using Ctrl+C or Cmd+C).
4. Click the "Paste & Send" button to paste the text into the input field and automatically submit it.
5. If an error occurs (e.g., input field not found), a temporary error message will appear at the top of the page.

## How It Works
The script performs the following operations:

1. **Button Creation**:
   - Creates a styled "Paste & Send" button with fixed positioning, hover effects, and a modern design.
   - The button is appended to the webpage's body and remains visible even if the DOM changes.

2. **Input Field Detection**:
   - Searches for a suitable input field using a list of CSS selectors (e.g., `textarea[placeholder*="Message"]`, `div[contenteditable="true"]`).
   - Prioritizes selectors to ensure compatibility with various chat interfaces.

3. **Submit Button Detection**:
   - Identifies the submit button by checking for buttons with text like "Send" or an `aria-label` containing "send."

4. **Paste and Send Logic**:
   - Reads text from the clipboard using the `navigator.clipboard` API.
   - Pastes the text into the detected input field, handling both `<textarea>` and `contenteditable` divs.
   - Simulates an input event to ensure compatibility with reactive frameworks.
   - Waits 2 seconds, then clicks the submit button to send the message.

5. **Error Handling**:
   - Displays a styled error message for 4 seconds if the input field or submit button is not found, or if clipboard access fails.

6. **DOM Observation**:
   - Uses a `MutationObserver` to monitor changes in the DOM and re-add the button if it is removed.

7. **Debugging**:
   - Logs detailed information about the input field's position, styles, and parent element to the console for troubleshooting.

## Code Structure
The JavaScript code is modular and organized into several functions:

- `createPasteButton()`: Creates and styles the "Paste & Send" button with hover effects.
- `findPromptInput()`: Searches for the appropriate text input field using a prioritized selector list.
- `findSubmitButton()`: Locates the submit button based on its text or `aria-label`.
- `handlePasteAndSend()`: Handles the core logic of reading the clipboard, pasting text, and submitting the form.
- `showError(msg)`: Displays a temporary error message to the user.
- `init()`: Initializes the extension by creating and appending the button.
- DOM Observation: Uses a `MutationObserver` to ensure the button persists across DOM changes.

## Compatibility
- **Browsers**: Compatible with modern browsers supporting the Clipboard API (e.g., Chrome, Firefox, Edge, Safari).
- **Websites**: Designed for chat interfaces with a textarea or contenteditable div and a submit button. Tested on platforms similar to ChatGPT.
- **Permissions**: Requires the `clipboardRead` permission to access the clipboard.

## Limitations
- The extension may not work on websites with non-standard input fields or submit buttons that do not match the expected selectors.
- The Clipboard API requires user permission in some browsers, and access may be denied in secure contexts (e.g., non-HTTPS sites).
- The 2-second delay before clicking the submit button may need adjustment for certain websites with slower input processing.

## Troubleshooting
- **Button not appearing**: Ensure the webpage has fully loaded and check the console for errors.
- **Text not pasting**: Verify that the clipboard contains text and that the browser has granted clipboard permissions.
- **Submit button not found**: The website may use a non-standard submit button. Update the `findSubmitButton` function with additional selectors if needed.
- **Error messages**: Check the console logs for detailed information about the input field and submit button.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

Please ensure your code follows the existing style and includes appropriate comments.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions, suggestions, or issues, please open an issue on the GitHub repository or contact the maintainer.

---

This README provides a comprehensive guide to installing, using, and understanding the GPT Paste & Send extension. The code is designed to be robust, user-friendly, and adaptable to various chat interfaces, making it a valuable tool for automating text input and submission tasks.

</xaiArtifact>
