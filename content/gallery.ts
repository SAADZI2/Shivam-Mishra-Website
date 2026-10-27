export type GalleryItem = { id: number; title: string; category: string; src: string; desc: string };

export const galleryCategories = [
  "All",
  "Clinic Interior",
  "Consultation Room",
  "Ayurvedic Medicines",
  "Panchakarma Therapy",
  "Patient Care Environment",
];

export const gallery: GalleryItem[] = [
  { id: 1, title: "Luxury Reception & Lounge", category: "Clinic Interior", src: "/images/clinic_reception.png", desc: "Modern emerald green and gold reception desk designed for patient comfort and calm." },
  { id: 2, title: "Senior Physician Chamber", category: "Consultation Room", src: "/images/doctor_consultation.png", desc: "Private consultation suite equipped with modern medical tools and traditional Nadi Pariksha desk." },
  { id: 3, title: "Teakwood Panchakarma Droni", category: "Panchakarma Therapy", src: "/images/panchakarma_room.png", desc: "Authentic carved teakwood therapy table with brass Shirodhara apparatus." },
  { id: 4, title: "Authentic Herb Preparation", category: "Ayurvedic Medicines", src: "/images/ayurvedic_herbs_prep.png", desc: "Freshly ground organic herbs, roots, and classical herbal oils." },
  { id: 5, title: "Patient Waiting Lounge", category: "Patient Care Environment", src: "/images/clinic_lounge.png", desc: "Spacious luxury seating area with indoor botanical greenery and soothing ambient light." },
  { id: 6, title: "Serene Botanical Environment", category: "Patient Care Environment", src: "/images/patient_wellness.png", desc: "Tranquil outdoor botanical therapy gardens encouraging natural recovery." },
  { id: 7, title: "Cinematic Ayurvedic Herbs", category: "Ayurvedic Medicines", src: "/images/hero_ayurvedic_bg.png", desc: "Traditional copper vessels, lotus flowers, and neem leaves setup." },
];
