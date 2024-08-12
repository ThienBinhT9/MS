import { IGender } from "../interfaces/common-interface.ts";

export const GENDER: Array<IGender> = [
  { label: "Nữ", value: 2 },
  { label: "Nam", value: 1 },
  { label: "Không rõ", value: 3 },
];

export const STATES = [
  { label: "Công khai", value: "public" },
  { label: "Bạn bè", value: "friend" },
  { label: "Chỉ mình tôi", value: "private" },
];

export const RELATIONSHIP = [
  { label: "Độc thân", value: "single" },
  { label: "Hẹn hò", value: "dating" },
  { label: "Đã kết hôn", value: "married" },
];
