
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

    photo: { type: String },
    phone: { type: String },
    roles: {
        doctor: {
            type: Number,
            default: 1001
        },
        admin: Number
    },
    ticketPrice: { type: Number, default: 30 },
    specialization: { type: String, required: true },
    qualifications: [qualificationSchema],
