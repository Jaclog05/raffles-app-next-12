const elements = (numTickets) => Array.from({ length: parseInt(numTickets) }, (_, index) => {
    return {
      value: index + 1,
      picked: false
    }
});

module.exports = elements