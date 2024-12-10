import React, { useEffect, useState } from 'react';
import { bookingManager, equipmentManager, TimeSlotFactory } from '@/models';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BookingPage = () => {
  const router = useRouter();
  const { device } = router.query;
  const [isClient, setIsClient] = useState(false);
  const today = new Date(); // Tanggal saat ini
  const currentDay = today.getDate();

  const startDate = new Date(today);
  startDate.setDate(currentDay - 5);

  const endDate = new Date(today);
  endDate.setDate(currentDay + 5);

  const dates = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const equipment = equipmentManager?.getEquipmentById(device);

  const groupedDates = dates.reduce((acc, date) => {
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(date);
    return acc;
  }, {});

  const defaultDate = dates[Math.floor(dates.length / 2)];
  const [activeDate, setActiveDate] = useState(
    `${defaultDate.toLocaleString('default', { month: 'long' })} ${defaultDate.getDate()}, ${defaultDate.getFullYear()}`
  );

  const bookedData = bookingManager?.getAllBookings();

  const timeSlots = TimeSlotFactory.generateTimeSlots(8, 18).map((slot) => {
    const equipmentId = device;

    const [month, day, year] = activeDate.split(/[\s,]+/);
    const formattedDate = `${day.padStart(2, "0")}/${monthIndex(month)}/${year}`;

    const isAvailable = !bookedData.some(
      (booking) =>
        booking.date === formattedDate &&
        booking.time === slot.time &&
        booking.equipment.id === equipmentId
    );

    return { ...slot, available: isAvailable };
  });

  function monthIndex(month) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const index = months.indexOf(month) + 1;
    return index < 10 ? `0${index}` : `${index}`;
  }

  if (!isClient) return (
    <div className='bg-white min-h-screen w-full'>
    </div>
  )

  return (
    <div className='container py-14'>
      <h1 className='font-micro text-[68px] text-primary'>{equipment?.name}</h1>
      <div className='mt-28 flex flex-col gap-5 text-primary'>
        <h2 className='text-[2rem] font-bold'>Available Date</h2>
        {Object.entries(groupedDates).map(([monthYear, days], idx) => (
          <div key={idx}>
            <h3 className='text-xl font-semibold'>{monthYear}</h3>
            <div className='grid [grid-template-columns:repeat(16,minmax(0,1fr))] gap-3 mt-4'>
              {days.map((date, index) => {
                const formattedDate = `${monthYear.split(' ')[0]} ${date.getDate()}, ${date.getFullYear()}`;
                const dayName = date.toLocaleString('default', { weekday: 'short' });
                return (
                  <button
                    key={index}
                    onClick={() => setActiveDate(formattedDate)}
                    className={`aspect-square flex border border-secondary flex-col items-center justify-center rounded-lg font-bold ${activeDate === formattedDate
                      ? 'bg-secondary text-white'
                      : 'bg-primary text-white'
                      }`}
                  >
                    <span className='text-sm font-medium'>{dayName}</span>
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className='mt-4 flex flex-col w-full max-w-[752px]'>
        {timeSlots.map((slot, index) => (
          <Link aria-disabled href={
            slot.available
              ? `/booking/${device}/${encodeURIComponent(`${activeDate.split(', ').join('-')}T${slot.time.replace('.', ':')}`)}`
              :
              ""
          }
            key={index}
            className={`flex items-center justify-between font-semibold py-7 border-b border-[#D3D3D3]`}
          >
            <span>{slot.time}</span>
            <span className='text-red-500'>{slot.available ? <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_7_206)">
                <path d="M10.737 8L5.73902 12.686C5.59841 12.8226 5.51373 13.0066 5.50153 13.2022C5.48933 13.3979 5.55047 13.591 5.67302 13.744C5.7306 13.8174 5.80293 13.878 5.88534 13.9218C5.96775 13.9655 6.05842 13.9916 6.1515 13.9982C6.24458 14.0048 6.33801 13.9918 6.42577 13.9601C6.51353 13.9283 6.59367 13.8786 6.66102 13.814L12.261 8.564C12.3365 8.49074 12.3965 8.40307 12.4375 8.30619C12.4785 8.20931 12.4996 8.10519 12.4996 8C12.4996 7.89481 12.4785 7.79069 12.4375 7.69381C12.3965 7.59693 12.3365 7.50926 12.261 7.436L6.66102 2.186C6.59367 2.12142 6.51353 2.07166 6.42577 2.03994C6.33801 2.00822 6.24458 1.99524 6.1515 2.00184C6.05842 2.00843 5.96775 2.03446 5.88534 2.07823C5.80293 2.12201 5.7306 2.18257 5.67302 2.256C5.55047 2.40897 5.48933 2.60213 5.50153 2.79776C5.51373 2.99339 5.59841 3.17745 5.73902 3.314L10.737 8Z" fill="#11141A" />
              </g>
              <defs>
                <clipPath id="clip0_7_206">
                  <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
              :
              'Not Available'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
