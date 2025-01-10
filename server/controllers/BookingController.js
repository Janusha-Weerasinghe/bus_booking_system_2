const BookingService = require("../services/BookingService");
const booking = require("../models/booking");
const newBooking = require("../models/booking");
const payment = require("../models/payment");
const seat = require("../models/seat");
const trip = require("../models/trip");
const bus = require("../models/bus");
const route = require("../models/busroute");
const user = require("../models/user");
const transport = require("../middlewares/sendMail");
//const moment = require('moment');

// Add a new booking
exports.addBooking = async (req, res, next) => {
  try {
    const newBooking = await BookingService.addBooking(req.body);

    // Transform MongoDB data to JSON:API compliant format
    const response = {
      success: true,
      data: {
        type: "booking",
        id: newBooking._id.toString(), // Convert ObjectId to string
        attributes: {
          userId: newBooking.userId.toString(), // Convert ObjectId to string
          tripId: newBooking.tripId.toString(), // Convert ObjectId to string
          seatId: newBooking.seatId,
          bookingDate: newBooking.bookingDate,
          bookingStatus: newBooking.bookingStatus,
        },
      },
    };

    async function getUserEmailById(userId) {
      try {
        const userdata = await user.findById(userId);

        if (!userdata) {
          throw new Error(`User with ID ${userId} not found`);
        }

        const seatIdParts = response.data.attributes.seatId.split("_");
        const seatNo = seatIdParts[seatIdParts.length - 1];

        try {
          await transport.sendMail({
            to: userdata.email,
            subject: "Booking Confirmation",
            text: `Your booking with ID ${response.data.id} has been successfully created.`,
            html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            <h2 style="color: #2c3e50; text-align: center; font-size: 24px;">Booking Confirmation</h2>
                            <p style="font-size: 16px; color: #555555;">Dear Customer ,</p>
                            
                            <p style="font-size: 16px; color: #555555;">Your Name <strong style="color: #e74c3c;">${userdata.fullName}</strong></p>
                            <p style="font-size: 16px; color: #555555;">Your booking with ID <strong style="color: #e74c3c;">${response.data.id}</strong> has been successfully created!</p>
                            
                            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px; font-size: 16px; color: #555555; background-color: #ecf0f1; border-radius: 5px; font-weight: bold;">Seat No:</td>
                                <td style="padding: 8px; font-size: 16px; color: #555555; background-color: #ecf0f1; border-radius: 5px;">${seatNo}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; font-size: 16px; color: #555555; background-color: #ecf0f1; border-radius: 5px; font-weight: bold;">Booking Date:</td>
                                <td style="padding: 8px; font-size: 16px; color: #555555; background-color: #ecf0f1; border-radius: 5px;">${response.data.attributes.bookingDate}</td>
                            </tr>
                            </table>

                            <div style="margin-top: 30px; text-align: center;">
                            <p style="font-size: 16px; color: #555555;">Thank you for booking with us!</p>
                            <p style="font-size: 14px; color: #777777;">If you have any questions, please contact us.</p>
                            </div>
                        </div>
                        </body>
                    </html>
                    `,
          });

          return { emailSent: true };
        } catch (mailError) {
          console.error("Failed to send confirmation email:", mailError);
          return { emailSent: false, error: mailError.message };
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
        throw error;
      }
    }

    // Call the function to send email
    const emailResult = await getUserEmailById(newBooking.userId);

    // Add email sending status to the response
    if (emailResult.emailSent) {
      response.data.attributes.emailStatus = "Email successfully sent.";
    } else {
      response.data.attributes.emailStatus = `Email failed: ${emailResult.error}`;
    }

    // Respond with the booking confirmation and email status
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingService.getAllbookings();
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found" });
    }
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update a booking
exports.updateBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    // Check if the ID is valid
    if (!bookingId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking ID" });
    }

    const updatedBooking = await BookingService.updateBooking(
      bookingId,
      req.body
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Respond with JSON:API structure
    res.status(200).json({
      success: true,
      data: {
        type: "booking",
        id: updatedBooking._id.toString(),
        attributes: {
          userId: updatedBooking.userId.toString(),
          tripId: updatedBooking.tripId.toString(),
          seatId: updatedBooking.seatId,
          bookingDate: updatedBooking.bookingDate,
          bookingStatus: updatedBooking.bookingStatus,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a booking
exports.deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const deletedBooking = await BookingService.deleteBooking(bookingId);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};

// Get all payments
exports.getAllpayments = async (req, res) => {
  try {
    const payments = await BookingService.getAllpayments();
    if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No payments found" });
    }
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await BookingService.getAllSeats();
    if (!seats || seats.length === 0) {
      return res.status(404).json({ success: false, message: "No seat found" });
    }
    res.status(200).json({ success: true, data: seats });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Add a new seat
exports.addSeat = async (req, res, next) => {
  try {
    // Extract necessary data from the request body
    const { busId, tripId, seatNumber, userNIC, phoneNumber, status } =
      req.body;

    // Generate seatId in the format YYYYMMDD_TripID_SeatNumber
    const currentDate = new Date();
    const date = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(currentDate)
      .replace(/\//g, ""); // Format the date as YYYYMMDD
    const seatId = `${date}_${tripId}_${seatNumber}`;

    // Create the seat data
    const seatData = {
      seatId,
      busId,
      tripId,
      seatNumber,
      userNIC,
      phoneNumber,
      status: status || "Available", // Default status to 'Available' if not provided
    };

    // Add the seat using the SeatService
    const newSeat = await BookingService.addSeat(seatData);

    // Transform MongoDB data to JSON:API compliant format
    const response = {
      success: true,
      data: {
        type: "seat",
        id: newSeat._id.toString(), // Convert ObjectId to string
        attributes: {
          seatId: newSeat.seatId,
          busId: newSeat.busId.toString(), // Convert ObjectId to string
          tripId: newSeat.tripId.toString(), // Convert ObjectId to string
          seatNumber: newSeat.seatNumber,
          userNIC: newSeat.userNIC,
          phoneNumber: newSeat.phoneNumber,
          status: newSeat.status,
          createdAt: newSeat.createdAt,
          updatedAt: newSeat.updatedAt,
        },
      },
    };

    // Respond with the new seat
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// Update a seat
exports.updateSeat = async (req, res, next) => {
  try {
    const updatedSeat = await SeatService.updateSeat(req.params.id, req.body);

    if (!updatedSeat) {
      return res
        .status(404)
        .json({ success: false, message: "Seat not found" });
    }

    // Respond with JSON:API structure
    res.status(200).json({
      success: true,
      data: {
        type: "seat",
        id: updatedSeat._id.toString(),
        attributes: {
          seatId: updatedSeat.seatId,
          busId: updatedSeat.busId.toString(),
          tripId: updatedSeat.tripId.toString(),
          seatNumber: updatedSeat.seatNumber,
          userNIC: updatedSeat.userNIC,
          phoneNumber: updatedSeat.phoneNumber,
          status: updatedSeat.status,
          createdAt: updatedSeat.createdAt,
          updatedAt: updatedSeat.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a seat
exports.deleteSeat = async (req, res, next) => {
  try {
    const seatDeleted = await SeatService.deleteSeat(req.params.id);

    if (!seatDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Seat not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};

// Get all trips
exports.getAlltrips = async (req, res) => {
  try {
    const trips = await BookingService.getAlltrips();
    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No trips found" });
    }
    res.status(200).json({ success: true, data: trips });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get filtered trips
exports.getFilteredTrips = async (req, res) => {
  try {
    const { date, busType, startLocation, endLocation } = req.query;

    // Ensure required params are present
    if (!date || !startLocation || !endLocation) {
      return res.status(400).json({
        message:
          "Missing required parameters: date, startLocation, endLocation",
      });
    }

    let query = {};

    // Normalize the input date to midnight (ignore time) in local timezone
    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0); // Set time to midnight in the local timezone

    const nextDay = new Date(searchDate);
    nextDay.setDate(searchDate.getDate() + 1); // Get the start of the next day (midnight)

    // Adjust query to match the full day from midnight to midnight
    query.date = { $gte: searchDate, $lt: nextDay };

    if (startLocation) {
      query.startLocation = { $regex: startLocation, $options: "i" };
    }

    if (endLocation) {
      query.endLocation = { $regex: endLocation, $options: "i" };
    }

    if (busType) {
      const buses = await bus.find({ type: busType }).select("_id");
      query.busId = { $in: buses.map((bus) => bus._id) };
    }

    // Log the query being sent to the database
    console.log("Query:", query);

    const trips = await trip
      .find(query)
      .populate("busId scheduleId routeId driverId conductorId");

    // Log the trips found
    console.log("Trips found:", trips);

    // Check if trips were found
    if (!trips.length) {
      return res
        .status(404)
        .json({ message: "No trips found matching your criteria" });
    }

    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching trips", error: err.message });
  }
};

// Add a new trip
exports.addTrip = async (req, res) => {
  try {
    const {
      scheduleId,
      routeId,
      busId,
      driverId,
      conductorId,
      departureTime,
      arrivalTime,
      availableSeats,
    } = req.body;
    const response = {
      success: true,
      data: {
        type: "trip",
        id: newTrip._id.toString(), // Convert ObjectId to string
        attributes: {
          busId: newTrip.busId.toString(), // Convert ObjectId to string
          routeId: newTrip.routeId.toString(), // Convert ObjectId to string
          departureTime: newTrip.departureTime,
          arrivalTime: newTrip.arrivalTime,
          availableSeats: newTrip.availableSeats,
          createdAt: newTrip.createdAt,
        },
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// Update a trip
exports.updateTrip = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const tripId = req.params.id;

    // Check if the ID is valid
    if (!tripId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid trip ID" });
    }

    const updatedTrip = await TripService.updateTrip(tripId, req.body);

    if (!updatedTrip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }

    // Respond with JSON:API structure
    res.status(200).json({
      success: true,
      data: {
        type: "trip",
        id: updatedTrip._id.toString(),
        attributes: {
          busId: updatedTrip.busId.toString(),
          routeId: updatedTrip.routeId.toString(),
          departureTime: updatedTrip.departureTime,
          arrivalTime: updatedTrip.arrivalTime,
          availableSeats: updatedTrip.availableSeats,
          createdAt: updatedTrip.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a trip
exports.deleteTrip = async (req, res, next) => {
  try {
    const tripId = req.params.id;

    // Check if the ID is valid
    if (!tripId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid trip ID" });
    }

    const deletedTrip = await TripService.deleteTrip(tripId);

    if (!deletedTrip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};
