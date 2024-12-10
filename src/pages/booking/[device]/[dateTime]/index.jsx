import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/helper/formatDate';
import { equipmentManager, bookingManager, UserFactory } from '@/models';
import { formatNormalDate } from '@/utils/helper/formatNormalDate';

const BookingForm = () => {
  const router = useRouter();
  const { device, dateTime, } = router.query;
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    tanggal: '',
    jam: '',
  });

  useEffect(() => {
    if (dateTime && device) {
      const decodedDateTime = decodeURIComponent(dateTime);
      const [datePart, timePart] = decodedDateTime.split('T');
      const tanggal = formatDate(datePart.replace(/%20/g, ' '));
      const jam = timePart.replace('%3A', ':');

      setFormData((prev) => ({
        ...prev,
        tanggal,
        jam,
      }));
    }
  }, [dateTime, device]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookedData = bookingManager.getAllBookings();
  console.log(bookedData)

    const equipment = equipmentManager.getEquipmentById(device);
    if (!equipment) {
      alert('Device tidak valid.');
      return;
    }

    const slotAvailable = bookingManager.isTimeSlotAvailable(equipment.id, formData.tanggal, formData.jam);
    if (!slotAvailable) {
      alert('Slot waktu tidak tersedia.');
      return;
    }

    const user = UserFactory.createUser(
      bookingManager.getAllBookings().length + 1,
      formData.name,
      formData.nim
    );

    
    bookingManager.addBooking(user, equipment.name, formatNormalDate(formData.tanggal), formData.jam);
    router.push('/');
  };

  return (
    <div className="container py-14">
      <h1 className="font-micro text-[68px] text-primary">Booking Form</h1>
      <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8 max-w-[548px]">
        <div>
          <label htmlFor="name" className="text-xl text-primary">
            NAMA
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-3 mt-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="nim" className="text-xl text-primary">
            NIM
          </label>
          <input
            type="text"
            id="nim"
            name="nim"
            value={formData.nim}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-3 mt-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tanggal" className="text-xl text-primary">
              TANGGAL
            </label>
            <input
              type="text"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              disabled
              className="w-full border border-gray-300 px-2 py-3 mt-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="jam" className="text-xl text-primary">
              JAM
            </label>
            <input
              type="text"
              id="jam"
              name="jam"
              value={formData.jam}
              disabled
              className="w-full border border-gray-300 px-2 py-3 mt-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-secondary w-full py-3 rounded font-bold hover:bg-primary-dark"
        >
          BOOK NOW!
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
