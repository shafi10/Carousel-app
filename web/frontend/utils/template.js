export const templates = [
  { id: "freeMode", label: "Free Mode" },
  // { id: "gridCarousel", label: "Grid Carousel" },
  { id: "effectCube", label: "Effect Cube" },
  { id: "effectCoverflow", label: "Effect Coverflow" },
  { id: "effectFlip", label: "Effect Flip" },
  { id: "effectCards", label: "Effect Cards" },
  { id: "EFSlideIn", label: "Effect Creative" },
  { id: "EF3DPrespective", label: "Effect 3D Perspective" },
  { id: "EFRotatingSlide", label: "Effect Rotating Slide" },
  { id: "EFDepthSlide", label: "Effect Depth Slide" },
];

export const pricingPlan = [
  {
    name: "Free",
    amount: 0,
    trialDays: 0,
    feature: ["Free template"],
    buttonTitle: "Free",
    interval: "Unlimited",
  },
  {
    name: "Pro",
    amount: 5.0,
    trialDays: 7,
    feature: ["use 6 template"],
    buttonTitle: "Buy Now",
    interval: "EVERY_30_DAYS",
  },
  {
    name: "Plus",
    amount: 10.0,
    trialDays: 0,
    feature: ["use all template"],
    buttonTitle: "Buy Now",
    interval: "EVERY_30_DAYS",
  },
];

export const accessComponentType = (planType) => {
  const templateAccessByPlan = {
    Free: ["freeMode"],
    Pro: [
      "freeMode",
      "effectCoverflow",
      "effectCards",
      "effectCube",
      "effectFlip",
    ],
    Plus: [
      "effectCoverflow",
      "effectCards",
      "effectCube",
      "effectFlip",
      "freeMode",
      "EF3DPrespective",
      // "gridCarousel",
      "EFSlideIn",
      "EFRotatingSlide",
      "EFDepthSlide",
    ], // all templates
  };
  return templateAccessByPlan[planType];
};

export const getPlanType = (subscription) => {
  if (!subscription) return "Free"; // Default if nothing is returned

  const planName = subscription?.name?.toLowerCase();

  if (planName.includes("plus")) return "Plus";
  if (planName.includes("pro")) return "Pro";

  return "Free"; // Fallback
};
