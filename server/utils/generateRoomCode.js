
export const generateRoomCode = (length = 6) => {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // avoid ambiguous chars
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
