function generateID(code) {
  const currentDate = new Date();
  let date = currentDate.getDate().toString().padStart(2, "0");
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let year = currentDate.getFullYear();
  let th = currentDate.getHours().toString().padStart(2, "0");
  let tm = currentDate.getMinutes().toString().padStart(2, "0");
  let ts = currentDate.getSeconds().toString().padStart(2, "0");
  let time = `${th}${tm}${ts}`;
  let dday = `${year}${month}${date}`;
  let genID = `${code}-${dday}-${time}`;

  return genID;
}

module.exports = {
  generateID,
};
