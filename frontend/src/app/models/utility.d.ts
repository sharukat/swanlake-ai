export interface Message {
  text: string;
  sender: "user" | "assistant";
}

export interface ListItem {
  key: string
  label: string
  description: string
}