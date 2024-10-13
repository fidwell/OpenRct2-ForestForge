import { button, horizontal, label, store, textbox, vertical, window } from "openrct2-flexui";

let isWindowOpen = false;
let _callback: (result: string) => any;

const nameValue = store<string>("");

const renamerWindow = window({
  title: "Palette name",
  width: 250,
  height: 80,
  position: "center",
  content: [
    vertical({
      content: [
        label({
          text: "Enter a new name for this palette:"
        }),
        textbox({
          text: nameValue,
          onChange(text) {
            nameValue.set(text);
          }
        }),
        horizontal({
          content: [
            button({
              text: "OK",
              onClick: () => {
                renamerWindow.close();
                if (_callback) {
                  _callback(nameValue.get());
                }
              }
            }),
            label({
              text: ""
            }),
            button({
              text: "Cancel",
              onClick: () => {
                renamerWindow.close();
              }
            })
          ]
        })
      ]
    })
  ],
  onClose: () => isWindowOpen = false
});

export default function showRenamer(initial: string, callback: (result: string) => any): void {
  _callback = callback;
  nameValue.set(initial);
  if (isWindowOpen) {
    renamerWindow.focus();
  } else {
    renamerWindow.open();
    isWindowOpen = true;
  }
}
