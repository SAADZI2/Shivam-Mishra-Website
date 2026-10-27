export type Story = {
  id: string;
  patientName: string;
  age: number;
  location: string;
  condition: string;
  category: string;
  rating: number;
  timeline: string;
  story: string;
  outcome: string;
};

export const storyCategories = ["All", "Gastroenterology", "Dermatology", "Rheumatology", "Respiratory", "Metabolic"];

export const stories: Story[] = [
  {
    id: "ibs-recovery",
    patientName: "Ananya Deshmukh",
    age: 38,
    location: "Mumbai, Maharashtra",
    condition: "IBS Recovery Story",
    category: "Gastroenterology",
    rating: 5,
    timeline: "8 Weeks Protocol",
    story:
      "I suffered from severe IBS-D for over 6 years. Every meal caused bloating, anxiety, and emergency restroom runs. After 8 weeks of Dr. Shivam Mishra’s Takradhara protocol and customized herbal formulations, my digestion has completely stabilized. I can eat normally again without fear!",
    outcome: "100% Digestive Normalization & Zero Flare-ups",
  },
  {
    id: "psoriasis-improvement",
    patientName: "Rajesh K. Mehta",
    age: 46,
    location: "Ahmedabad, Gujarat",
    condition: "Psoriasis Improvement Story",
    category: "Dermatology",
    rating: 5,
    timeline: "4 Months Treatment",
    story:
      "Thick scaling silver plaques covered my elbows, scalp, and knees. Modern ointments gave temporary relief but it always returned worse. Dr. Shivam prescribed Rakta Shodhana Panchakarma and pure herbal decoctions. Within 4 months, 90% of scaling vanished and skin texture returned to normal.",
    outcome: "90% Plaque Reversal & Clear Skin",
  },
  {
    id: "diabetes-success",
    patientName: "Sanjay Verma",
    age: 52,
    location: "New Delhi",
    condition: "Diabetes Management Success",
    category: "Metabolic",
    rating: 5,
    timeline: "3 Months Treatment",
    story:
      "Fasting sugar was above 210 mg/dL despite high medication doses. Dr. Shivam’s metabolic fire revival plan and Nisha-Amalaki formulations helped drop my HbA1c from 8.9% to 6.4% safely. My energy levels are at an all-time high.",
    outcome: "HbA1c reduced from 8.9% to 6.4%",
  },
  {
    id: "ra-relief",
    patientName: "Sunita Patwardhan",
    age: 44,
    location: "Pune, Maharashtra",
    condition: "Rheumatoid Arthritis Relief",
    category: "Rheumatology",
    rating: 5,
    timeline: "12 Weeks Treatment",
    story:
      "Morning joint stiffness made it impossible to grip a teacup or walk downstairs. The Amavata detox and Valuka Sweda treatments recommended by Dr. Shivam eliminated my joint swelling and severe morning pain completely.",
    outcome: "Zero Morning Joint Stiffness & Full Mobility",
  },
  {
    id: "asthma-improvement",
    patientName: "Vikramaditya Singh",
    age: 35,
    location: "Bengaluru, Karnataka",
    condition: "Asthma & Allergy Relief",
    category: "Respiratory",
    rating: 5,
    timeline: "10 Weeks Treatment",
    story:
      "Used inhalers twice daily due to chronic bronchial spasms and dust allergies. Following Nasyam and lung Rasayana therapy, my chest tightness eased within weeks. I have not needed an emergency inhaler in over 6 months.",
    outcome: "Discontinued Inhaler Dependence",
  },
  {
    id: "knee-pain-recovery",
    patientName: "Meenakshi Iyer",
    age: 59,
    location: "Chennai / Online",
    condition: "Knee Osteoarthritis Recovery",
    category: "Rheumatology",
    rating: 5,
    timeline: "8 Weeks Treatment",
    story:
      "Orthopedic doctors advised knee replacement for grade-3 osteoarthritis. Dr. Shivam’s Janu Basti oil retention therapy and bone-nourishing herbs saved me from surgery. I now walk 4 km daily painless.",
    outcome: "Avoided Knee Surgery & 4km Daily Walks",
  },
  {
    id: "sciatica-relief",
    patientName: "Amitabh Mukherjee",
    age: 41,
    location: "Kolkata, West Bengal",
    condition: "Sciatica & Disc Bulge Relief",
    category: "Rheumatology",
    rating: 5,
    timeline: "6 Weeks Treatment",
    story:
      "Shooting pain down my left leg kept me bedridden. Kati Basti and spinal alignment herbs reduced my disc compression pain by 95% in just 6 weeks.",
    outcome: "95% Nerve Pain Reduction",
  },
  {
    id: "digestive-health",
    patientName: "Pooja Nair",
    age: 32,
    location: "London, UK / Online",
    condition: "Digestive Health Recovery",
    category: "Gastroenterology",
    rating: 5,
    timeline: "6 Weeks Online Protocol",
    story:
      "Living in London, I consulted Dr. Shivam via video call for severe chronic hyperacidity and stomach cramps. The herbs were delivered to my door in the UK. Truly life-changing care!",
    outcome: "Complete Acid Reflux Elimination",
  },
];
