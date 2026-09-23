let counter = 100;

export const generateBookingId = () => {
  const year = new Date().getFullYear();
  // Generate a random increment or sequential pad
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  counter += 1;
  const sequence = String(counter + randomSuffix).padStart(6, '0').slice(-6);
  return `WC-${year}-${sequence}`;
};

export const generateEnquiryId = () => {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ENQ-${year}-${randomSuffix}`;
};
