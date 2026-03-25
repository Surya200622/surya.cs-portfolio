export const generateWhatsAppLink = (message) => {
  const phoneNumber = '918220443165';
  const encodedMessage = encodeURIComponent(message || 'Hi I want a website');
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const generateMessage = (type, features, price) => {
  return `Hi Surya, I need a ${type} website with ${features.join(", ")}. My budget is ₹${price}. Please share details.`;
};

export const handleWhatsApp = (message) => {
  const url = `https://wa.me/918220443165?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
