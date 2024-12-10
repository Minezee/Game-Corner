export const formatNormalDate = (dateString) => {
  const months = {
    Januari: "01",
    Februari: "02",
    Maret: "03",
    April: "04",
    Mei: "05",
    Juni: "06",
    Juli: "07",
    Agustus: "08",
    September: "09",
    Oktober: "10",
    November: "11",
    Desember: "12",
  };

  const [day, monthName] = dateString.split(" ");
  const month = months[monthName];
  const year = new Date().getFullYear(); // Ambil tahun saat ini

  return `${day}/${month}/${year}`;
}