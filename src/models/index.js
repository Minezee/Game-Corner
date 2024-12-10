class Equipment {
  constructor(id, name, quantity) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }
}

class User {
  constructor(id, name, nim) {
    this.id = id;
    this.name = name;
    this.nim = nim;
  }
}

class Booking {
  constructor(user, equipment, date, time) {
    this.user = user;
    this.equipment = equipment;
    this.date = date;
    this.time = time;
  }

  getDetails() {
    return `${this.user.name} booked ${this.equipment.name} on ${this.date} at ${this.time}`;
  }
}

// Singleton for equipment management
class EquipmentManager {
  constructor() {
    if (EquipmentManager.instance) {
      return EquipmentManager.instance;
    }
    this.equipmentList = [
      new Equipment("xbox", 'Xbox', 1),
      new Equipment("ps5", 'Playstation 5', 1),
      new Equipment("ps4", 'Playstation 4', 1),
      new Equipment("step", 'Step Revolution', 1),
    ];
    EquipmentManager.instance = this;
  }

  getEquipmentByName(name) {
    return this.equipmentList.find((e) => e.name === name);
  }

  getEquipmentById(id){
    return this.equipmentList.find((e) => e.id === id)
  }

  reduceQuantity(equipmentName) {
    const equipment = this.getEquipmentByName(equipmentName);
    if (equipment && equipment.quantity > 0) {
      equipment.quantity -= 1;
      return true;
    }
    return false;
  }

  getEquipmentList() {
    return this.equipmentList;
  }
}

// Factory for creating Users
class UserFactory {
  static createUser(id, name, nim) {
    return new User(id, name, nim);
  }
}

// Factory for creating Bookings
class BookingFactory {
  static createBooking(user, equipment, date, time) {
    return new Booking(user, equipment, date, time);
  }
}

// Factory Method for time slots
class TimeSlotFactory {
  static generateTimeSlots(start, end) {
    const timeSlots = [];
    for (let hour = start; hour <= end; hour++) {
      timeSlots.push({ time: `${hour}:00`, available: true });
    }
    return timeSlots;
  }

  static updateTimeSlotAvailability(equipmentId, date) {
    const equipment = equipmentManager.getEquipmentList().find((e) => e.id === equipmentId);
    const equipmentBookings = bookingManager.getBookingsByDate(date).filter(
      (booking) => booking.equipment.id === equipmentId
    );
  
    const timeSlots = this.generateTimeSlots(8, 18);
  
    return timeSlots.map((slot) => ({
      ...slot,
      available: equipmentBookings.filter((b) => b.time === slot.time).length < equipment.quantity,
    }));
  }
}

class BookingManager {
  constructor() {
    if (BookingManager.instance) {
      return BookingManager.instance;
    }
    this.bookings = [];
    this.loadFromLocalStorage(); // Load data saat inisialisasi
    BookingManager.instance = this;
  }

  saveToLocalStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }
  }
  
  loadFromLocalStorage() {
    if (typeof window !== "undefined") {
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        this.bookings = JSON.parse(storedBookings).map(
          (b) => new Booking(
            new User(b.user.id, b.user.name, b.user.nim),
            new Equipment(b.equipment.id, b.equipment.name, b.equipment.quantity),
            b.date,
            b.time
          )
        );
      }
    }
  }

  addBooking(user, equipmentName, date, time) {
    const equipment = equipmentManager.getEquipmentByName(equipmentName);
    if (!equipment) {
      throw new Error(`Equipment with name "${equipmentName}" not found.`);
    }
  
    if (!this.isTimeSlotAvailable(equipment.id, date, time)) {
      throw new Error(`The time slot at ${time} on ${date} for ${equipmentName} is not available.`);
    }
  
    const booking = BookingFactory.createBooking(user, equipment, date, time);
    this.bookings.push(booking);
  
    // Simpan ke localStorage
    this.saveToLocalStorage();
  
    return booking;
  }

  getBookingsByDate(date) {
    return this.bookings.filter((booking) => booking.date === date);
  }

  isTimeSlotAvailable(equipmentId, date, time) {
    const equipmentBookings = this.bookings.filter(
      (booking) => booking.equipment.id === equipmentId && booking.date === date && booking.time === time
    );
    const equipment = equipmentManager.getEquipmentList().find((e) => e.id === equipmentId);
  
    // Kuantitas tidak berkurang secara global, jadi cek apakah booking untuk slot waktu tertentu kurang dari kuantitas equipment
    return equipment && equipmentBookings.length < equipment.quantity;
  }

  getAllBookings() {
    return this.bookings;
  }
}

const bookingManager = new BookingManager();
const equipmentManager = new EquipmentManager();

export { UserFactory, BookingFactory, equipmentManager, bookingManager, TimeSlotFactory };
