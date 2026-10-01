// DEMO CONTENT. Reviews, offers and posts are fictional.
export const business = {
  name: 'SweetCrave', city: 'Yamuna Nagar', region: 'Haryana', country: 'IN',
  phone: '+91 00000 00000 (demo)', email: 'hello@sweetcrave.example (demo)',
  social: { instagram: 'https://instagram.com/your-handle', facebook: 'https://facebook.com/your-page', youtube: 'https://youtube.com/@your-channel' },
};
export const reviews = [
  { name: 'Demo Customer', text: "Ordered a chocolate cake for my friend's birthday and the whole process was really easy.", rating: 5 },
  { name: 'Demo Customer', text: 'The brownie box was perfect for our hostel movie night. Good value.', rating: 5 },
  { name: 'Demo Customer', text: 'Needed a cake on short notice and the same-day option saved the evening.', rating: 4 },
  { name: 'Demo Customer', text: 'Cupcakes looked great in photos and tasted even better.', rating: 5 },
  { name: 'Demo Customer', text: 'Simple checkout. Delivery slot was clear before I paid.', rating: 4 },
];
export const offers = [
  { id: 'student', title: 'Student Special', price: '₹299', desc: '2 brownies + 2 cookies at a student price.', valid: 'Demo: valid till 31 Dec 2026', eligible: 'Student Dessert Combo', slug: 'student-dessert-combo' },
  { id: 'birthday', title: 'Birthday Combo', price: '₹599', desc: 'Mini cake + 4 cupcakes for a small birthday.', valid: 'Demo: valid all week', eligible: 'Mini Birthday Combo', slug: 'mini-birthday-combo' },
  { id: 'weekend', title: 'Weekend Dessert Deal', price: '15% OFF', desc: 'Weekend discount on dessert boxes.', valid: 'Demo: Sat–Sun only', eligible: 'All Dessert Boxes', slug: null },
  { id: 'sameday', title: 'Same-Day Celebration Combo', price: '₹899', desc: 'Pick a same-day cake and add a brownie box.', valid: 'Demo: order before 2 PM', eligible: 'Same-day cakes + Fudge Brownie Box', slug: null },
];
// Add a new article by appending an object here. Blog list, article pages and related posts update automatically.
export const posts = [
  { slug: 'birthday-cake-ideas-yamuna-nagar', title: 'Best Birthday Cake Ideas for Celebrations in Yamuna Nagar', category: 'Cake Ideas', emoji: '🎂', tint: '#D6246E', date: '2026-09-02', read: 4, desc: 'Cake ideas for birthdays of every size, from hostel parties to family dinners in Yamuna Nagar.', body: ['Picking a cake starts with the guest list. For 4–6 people, a half-kilo chocolate or pineapple cake is plenty. For a bigger group, add a dessert box so everyone gets a choice.', 'Think about the person too. Chocolate fans rarely go wrong with a truffle cake, while a red velvet cake photographs well for a surprise party.'] },
  { slug: 'how-to-choose-birthday-cake', title: 'How to Choose the Right Cake for a Birthday', category: 'Guides', emoji: '🍰', tint: '#7A3FB5', date: '2026-09-05', read: 3, desc: 'A quick checklist for choosing flavour, size and design for a birthday cake.', body: ['Start with three questions: how many people, what flavour does the birthday person like, and when do you need it?', 'If time is short, choose a same-day cake. If you want a custom message or theme, order a day ahead.'] },
  { slug: 'affordable-desserts-college-students', title: '5 Affordable Dessert Ideas for College Students', category: 'Student Life', emoji: '🎒', tint: '#2E8B6E', date: '2026-09-09', read: 3, desc: 'Budget-friendly dessert ideas for hostel nights, study breaks and friend meetups.', body: ['You do not need a full cake to celebrate. Brownie boxes, cookie packs, mini dessert jars, cupcakes and student combos all split easily between friends.', 'Group orders bring the per-head cost down. Check the offers page for current student deals.'] },
  { slug: 'chocolate-vs-red-velvet-cake', title: 'Chocolate Cake vs Red Velvet Cake: Which One Should You Choose?', category: 'Comparisons', emoji: '⚖️', tint: '#A3162F', date: '2026-09-12', read: 4, desc: 'Compare taste, texture and occasions to pick between chocolate and red velvet cake.', body: ['Chocolate cake is rich and familiar. Red velvet is lighter, with a mild cocoa note and a tangy cream cheese frosting.', 'For a crowd with mixed tastes, chocolate is the safer pick. For a visual centrepiece, choose red velvet.'] },
  { slug: 'same-day-cake-ordering-guide', title: 'Same-Day Cake Ordering Guide', category: 'Guides', emoji: '⏱️', tint: '#E8943A', date: '2026-09-15', read: 3, desc: 'How same-day cake ordering works, what is available and how to order on time.', body: ['Look for the same-day badge on a product. Those items can be prepared and delivered on the day you order, subject to the cut-off time.', 'Add your delivery area and time slot at checkout, and keep your phone handy for delivery updates.'] },
  { slug: 'store-cake-keep-fresh', title: 'How to Store Cake and Keep It Fresh', category: 'Tips', emoji: '🧊', tint: '#3A7CA5', date: '2026-09-18', read: 3, desc: 'Simple storage tips for cream cakes, brownies and cookies.', body: ['Keep cream cakes in the fridge in a closed box and take them out about 20 minutes before serving.', 'Brownies and cookies stay soft in an airtight container at room temperature for a couple of days.'] },
];
